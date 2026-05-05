<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index()
    {
        return GalleryItem::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'image_url' => 'required|string',
            'category' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

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
            'image_url' => 'string',
            'category' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $galleryItem->update($validated);

        return response()->json($galleryItem);
    }

    public function destroy(GalleryItem $galleryItem)
    {
        $galleryItem->delete();
        return response()->json(null, 204);
    }
}
