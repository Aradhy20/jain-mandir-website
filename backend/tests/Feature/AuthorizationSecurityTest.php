<?php

namespace Tests\Feature;

use App\Models\Blog;
use App\Models\Event;
use App\Models\GalleryItem;
use App\Models\NewsItem;
use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthorizationSecurityTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_visitor_cannot_create_blog(): void
    {
        $response = $this->postJson('/api/blogs', [
            'title' => 'Unauthorized Blog Post',
            'content' => 'Malicious injection attempt',
        ]);

        $response->assertStatus(401);
    }

    public function test_authenticated_non_admin_cannot_create_blog(): void
    {
        $regularUser = User::factory()->create(['is_admin' => false]);

        $response = $this->actingAs($regularUser)->postJson('/api/blogs', [
            'title' => 'Privilege Escalation Attempt',
            'content' => 'Should be forbidden',
        ]);

        $response->assertStatus(403)
            ->assertJson([
                'message' => 'Forbidden. Administrator privileges required.'
            ]);
    }

    public function test_authorized_administrator_can_create_update_and_delete_blog(): void
    {
        $admin = User::factory()->admin()->create();

        // Create
        $createResponse = $this->actingAs($admin)->postJson('/api/blogs', [
            'title' => 'Sacred Rituals at Jambudweep',
            'content' => 'Deep dive into spiritual ceremonies performed at Mount Sumeru.',
            'author' => 'Pujya Mataji Disciple',
            'published_at' => now()->toDateTimeString(),
        ]);

        $createResponse->assertStatus(201)
            ->assertJson(['title' => 'Sacred Rituals at Jambudweep']);

        $blogId = $createResponse->json('id');

        // Update
        $updateResponse = $this->actingAs($admin)->putJson("/api/blogs/{$blogId}", [
            'title' => 'Updated Sacred Rituals at Sumeru',
        ]);

        $updateResponse->assertStatus(200)
            ->assertJson(['title' => 'Updated Sacred Rituals at Sumeru']);

        // Delete
        $deleteResponse = $this->actingAs($admin)->deleteJson("/api/blogs/{$blogId}");
        $deleteResponse->assertStatus(204);

        $this->assertDatabaseMissing('blogs', ['id' => $blogId]);
    }

    public function test_authenticated_non_admin_cannot_delete_blog(): void
    {
        $blog = Blog::create([
            'title' => 'Protected Blog',
            'slug' => 'protected-blog-1',
            'content' => 'Content here',
            'published_at' => now(),
        ]);

        $regularUser = User::factory()->create(['is_admin' => false]);

        $response = $this->actingAs($regularUser)->deleteJson("/api/blogs/{$blog->id}");

        $response->assertStatus(403);
        $this->assertDatabaseHas('blogs', ['id' => $blog->id]);
    }

    public function test_unauthorized_visitor_cannot_modify_gallery_events_or_news(): void
    {
        // Unauthenticated
        $this->postJson('/api/gallery', [
            'title' => 'Hack Photo',
            'image_url' => 'https://example.com/hack.jpg'
        ])->assertStatus(401);

        $this->postJson('/api/events', [
            'title' => 'Hack Event',
            'description' => 'Unapproved event'
        ])->assertStatus(401);

        $this->postJson('/api/news', [
            'title' => 'Hack News',
            'content' => 'Unapproved news'
        ])->assertStatus(401);

        // Authenticated non-admin
        $regularUser = User::factory()->create(['is_admin' => false]);

        $this->actingAs($regularUser)->postJson('/api/gallery', [
            'title' => 'User Photo',
            'image_url' => 'https://example.com/user.jpg'
        ])->assertStatus(403);

        $this->actingAs($regularUser)->postJson('/api/events', [
            'title' => 'User Event',
            'description' => 'User event description'
        ])->assertStatus(403);

        $this->actingAs($regularUser)->postJson('/api/news', [
            'title' => 'User News',
            'content' => 'User news description'
        ])->assertStatus(403);
    }

    public function test_is_admin_cannot_be_set_via_mass_assignment_on_creation(): void
    {
        $user = User::create([
            'name' => 'Privilege Escalation Tester',
            'email' => 'escalate_create@test.com',
            'password' => 'secret123',
            'is_admin' => true,
        ]);

        $this->assertFalse($user->isAdmin());
        $user->refresh();
        $this->assertFalse($user->is_admin);
        $this->assertFalse($user->isAdmin());
        $this->assertDatabaseHas('users', [
            'email' => 'escalate_create@test.com',
            'is_admin' => 0,
        ]);
    }

    public function test_is_admin_cannot_be_updated_via_mass_assignment(): void
    {
        $user = User::factory()->create(['is_admin' => false]);

        $user->update(['is_admin' => true]);

        $this->assertFalse($user->fresh()->is_admin);
        $this->assertFalse($user->fresh()->isAdmin());
    }

    public function test_is_admin_can_only_be_assigned_via_trusted_explicit_provisioning(): void
    {
        $user = User::factory()->create(['is_admin' => false]);

        $user->setAdmin(true)->save();

        $this->assertTrue($user->fresh()->is_admin);
        $this->assertTrue($user->fresh()->isAdmin());
    }

    public function test_database_seeder_does_not_seed_test_users_in_production(): void
    {
        $this->app['env'] = 'production';

        $this->seed(DatabaseSeeder::class);

        $this->assertDatabaseMissing('users', ['email' => 'test@example.com']);
    }

    public function test_admin_user_seeder_aborts_in_production_if_default_password_is_used(): void
    {
        $this->app['env'] = 'production';

        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('SECURITY ERROR: Cannot seed default credentials ("admin123") in production.');

        (new AdminUserSeeder())->run();
    }
}
