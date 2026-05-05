<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    public function index()
    {
        return Blog::orderBy('published_at', 'desc')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image_url' => 'nullable|string',
            'author' => 'nullable|string',
            'published_at' => 'nullable|date',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . time();

        $blog = Blog::create($validated);

        return response()->json($blog, 201);
    }

    public function show(Blog $blog)
    {
        return $blog;
    }

    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'content' => 'string',
            'image_url' => 'nullable|string',
            'author' => 'nullable|string',
            'published_at' => 'nullable|date',
        ]);

        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']) . '-' . time();
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
