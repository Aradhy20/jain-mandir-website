<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = Blog::query();

        // Enforce published-only visibility for public callers
        $user = auth('sanctum')->user();
        $isAdmin = $user && $user->isAdmin();

        if (! $isAdmin) {
            $query->whereNotNull('published_at')
                  ->where('published_at', '<=', now());
        }

        return $query->orderBy('published_at', 'desc')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|min:2|max:255',
            'content' => 'required|string|max:65535',
            'image_url' => 'nullable|string|max:2048',
            'author' => 'nullable|string|max:100',
            'published_at' => 'nullable|date',
        ]);

        $validated['title'] = strip_tags(trim($validated['title']));
        if (isset($validated['author'])) {
            $validated['author'] = strip_tags(trim($validated['author']));
        }

        $validated['slug'] = Str::slug($validated['title']) . '-' . time();

        $blog = Blog::create($validated);

        return response()->json($blog, 201);
    }

    public function show(Blog $blog)
    {
        $user = auth('sanctum')->user();
        $isAdmin = $user && $user->isAdmin();

        if (! $isAdmin && (! $blog->published_at || $blog->published_at > now())) {
            abort(404, 'Article not found');
        }

        return $blog;
    }

    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|min:2|max:255',
            'content' => 'sometimes|required|string|max:65535',
            'image_url' => 'nullable|string|max:2048',
            'author' => 'nullable|string|max:100',
            'published_at' => 'nullable|date',
        ]);

        if (isset($validated['title'])) {
            $validated['title'] = strip_tags(trim($validated['title']));
            $validated['slug'] = Str::slug($validated['title']) . '-' . time();
        }

        if (isset($validated['author'])) {
            $validated['author'] = strip_tags(trim($validated['author']));
        }

        $blog->update($validated);

        return response()->json($blog);
    }

    public function destroy(Blog $blog)
    {
        $blog->delete();
        return response()->json(null, 204);
    }
}
