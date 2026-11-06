<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthenticationSecurityTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_fails_with_invalid_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'admin@test.com',
            'password' => Hash::make('CorrectPassword123!'),
            'is_admin' => true,
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'admin@test.com',
            'password' => 'WrongPassword',
            'device_name' => 'test_runner',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_authorized_administrator_can_login_and_receives_sanitized_user_payload(): void
    {
        $admin = User::factory()->create([
            'name' => 'Head Admin',
            'email' => 'headadmin@jainmandir.com',
            'password' => Hash::make('SecureAdminPass123!'),
            'is_admin' => true,
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'headadmin@jainmandir.com',
            'password' => 'SecureAdminPass123!',
            'device_name' => 'test_runner',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'token',
                'user' => ['id', 'name', 'email', 'is_admin'],
            ])
            ->assertJson([
                'user' => [
                    'email' => 'headadmin@jainmandir.com',
                    'is_admin' => true,
                ],
            ]);

        // Verify password and remember_token are not exposed in response
        $this->assertArrayNotHasKey('password', $response->json('user'));
        $this->assertArrayNotHasKey('remember_token', $response->json('user'));
    }

    public function test_authenticated_non_admin_user_is_denied_admin_login(): void
    {
        $regularUser = User::factory()->create([
            'email' => 'visitor@example.com',
            'password' => Hash::make('VisitorPass123!'),
            'is_admin' => false,
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'visitor@example.com',
            'password' => 'VisitorPass123!',
            'device_name' => 'test_runner',
        ]);

        $response->assertStatus(403)
            ->assertJson([
                'message' => 'Unauthorized. Administrator access required.'
            ]);
    }

    public function test_login_endpoint_enforces_brute_force_rate_limiting(): void
    {
        for ($i = 0; $i < 5; $i++) {
            $this->postJson('/api/login', [
                'email' => 'attacker@test.com',
                'password' => 'attempt_' . $i,
                'device_name' => 'test_runner',
            ]);
        }

        // 6th attempt within the 1-minute throttle window must receive HTTP 429
        $response = $this->postJson('/api/login', [
            'email' => 'attacker@test.com',
            'password' => 'attempt_6',
            'device_name' => 'test_runner',
        ]);

        $response->assertStatus(429);
    }

    public function test_authenticated_me_endpoint_returns_admin_details(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);

        $response = $this->actingAs($admin)->getJson('/api/me');

        $response->assertStatus(200)
            ->assertJson([
                'id' => $admin->id,
                'email' => $admin->email,
                'is_admin' => true,
            ]);
    }

    public function test_unauthenticated_request_to_me_endpoint_is_rejected(): void
    {
        $response = $this->getJson('/api/me');

        $response->assertStatus(401);
    }

    public function test_logout_endpoint_revokes_token(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $token = $admin->createToken('test_token');

        $response = $this->withHeader('Authorization', 'Bearer ' . $token->plainTextToken)
            ->postJson('/api/logout');

        $response->assertStatus(200)
            ->assertJson(['message' => 'Logged out successfully']);

        $this->assertDatabaseMissing('personal_access_tokens', [
            'id' => $token->accessToken->id,
        ]);
    }
}

