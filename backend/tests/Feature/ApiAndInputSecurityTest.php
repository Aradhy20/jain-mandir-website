<?php

namespace Tests\Feature;

use App\Models\Blog;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiAndInputSecurityTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_endpoint_exposes_only_published_blogs(): void
    {
        // 1 published blog
        $published = Blog::create([
            'title' => 'Published Article',
            'slug' => 'published-article',
            'content' => 'Public can see this',
            'published_at' => now()->subDay(),
        ]);

        // 1 draft blog (published_at is null)
        $draft = Blog::create([
            'title' => 'Secret Draft Article',
            'slug' => 'secret-draft-article',
            'content' => 'Public should not see this',
            'published_at' => null,
        ]);

        // 1 future scheduled blog
        $future = Blog::create([
            'title' => 'Future Scheduled Article',
            'slug' => 'future-scheduled-article',
            'content' => 'Public should not see this yet',
            'published_at' => now()->addDays(5),
        ]);

        // Public visitor request
        $response = $this->getJson('/api/blogs');

        $response->assertStatus(200);
        $titles = collect($response->json())->pluck('title')->all();

        $this->assertContains('Published Article', $titles);
        $this->assertNotContains('Secret Draft Article', $titles);
        $this->assertNotContains('Future Scheduled Article', $titles);
    }

    public function test_public_show_endpoint_returns_404_for_unpublished_draft(): void
    {
        $draft = Blog::create([
            'title' => 'Draft Blog',
            'slug' => 'draft-blog',
            'content' => 'Secret draft content',
            'published_at' => null,
        ]);

        $response = $this->getJson("/api/blogs/{$draft->id}");
        $response->assertStatus(404);
    }

    public function test_admin_can_view_draft_blog_via_show(): void
    {
        $draft = Blog::create([
            'title' => 'Admin Review Draft',
            'slug' => 'admin-review-draft',
            'content' => 'Secret draft content for admin',
            'published_at' => null,
        ]);

        $admin = User::factory()->create(['is_admin' => true]);

        $response = $this->actingAs($admin)->getJson("/api/blogs/{$draft->id}");
        $response->assertStatus(200)
            ->assertJson(['title' => 'Admin Review Draft']);
    }

    public function test_contact_form_validates_and_sanitizes_input(): void
    {
        $response = $this->postJson('/api/contact', [
            'name' => '<b>Pilgrim Devotee</b>',
            'email' => 'pilgrim@example.com',
            'message' => '<script>alert("xss")</script>Namaste, requesting darshan timings.',
        ]);

        $response->assertStatus(201)
            ->assertJson(['message' => 'Submission successful']);

        $this->assertDatabaseHas('contact_submissions', [
            'name' => 'Pilgrim Devotee',
            'email' => 'pilgrim@example.com',
            'message' => 'alert("xss")Namaste, requesting darshan timings.',
        ]);
    }

    public function test_contact_form_rejects_oversized_payloads(): void
    {
        $oversizedMessage = str_repeat('A', 5001);

        $response = $this->postJson('/api/contact', [
            'name' => 'Test Pilgrim',
            'email' => 'pilgrim@example.com',
            'message' => $oversizedMessage,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['message']);
    }

    public function test_status_endpoint_returns_sanitized_health_check_without_leaking_credentials(): void
    {
        $response = $this->getJson('/api/status');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'service',
                'timestamp',
            ])
            ->assertJson(['status' => 'healthy']);

        // Verify no DB passwords or sensitive internals are returned
        $this->assertArrayNotHasKey('password', $response->json());
        $this->assertArrayNotHasKey('connection', $response->json());
    }

    public function test_responses_contain_protective_security_headers(): void
    {
        $response = $this->getJson('/api/status');

        $response->assertHeader('X-Content-Type-Options', 'nosniff');
        $response->assertHeader('X-Frame-Options', 'SAMEORIGIN');
        $response->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->assertHeader('X-XSS-Protection', '1; mode=block');
    }
}

