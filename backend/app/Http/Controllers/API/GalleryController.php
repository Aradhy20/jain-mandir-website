<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index()
    {
        return GalleryItem::orderBy('created_at', 'desc')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'image_url' => 'required|string|max:2048',
            'category' => 'nullable|string|max:100',
            'description' => 'nullable|string|max:2000',
        ]);

        if (isset($validated['title'])) {
            $validated['title'] = strip_tags(trim($validated['title']));
        }
        if (isset($validated['category'])) {
            $validated['category'] = strip_tags(trim($validated['category']));
        }
        if (isset($validated['description'])) {
            $validated['description'] = strip_tags(trim($validated['description']));
        }

        $item = GalleryItem::create($validated);

        return response()->json($item, 201);
    }

    public function show(GalleryItem $galleryItem)
    {
        return $galleryItem;
    }

    public function update(Request $request, GalleryItem $galleryItem)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'image_url' => 'sometimes|required|string|max:2048',
            'category' => 'nullable|string|max:100',
            'description' => 'nullable|string|max:2000',
        ]);

        if (isset($validated['title'])) {
            $validated['title'] = strip_tags(trim($validated['title']));
        }
        if (isset($validated['category'])) {
            $validated['category'] = strip_tags(trim($validated['category']));
        }
        if (isset($validated['description'])) {
            $validated['description'] = strip_tags(trim($validated['description']));
        }

        $galleryItem->update($validated);

        return response()->json($galleryItem);
    }

    public function destroy(GalleryItem $galleryItem)
    {
        $galleryItem->delete();
        return response()->json(null, 204);
    }
}
