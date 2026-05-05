<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\NewsItem;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index()
    {
        return NewsItem::orderBy('news_date', 'desc')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'news_date' => 'nullable|date',
            'image_url' => 'nullable|string',
        ]);

        $news = NewsItem::create($validated);

        return response()->json($news, 201);
    }

    public function show(NewsItem $newsItem)
    {
        return $newsItem;
    }

    public function update(Request $request, NewsItem $newsItem)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'content' => 'string',
            'news_date' => 'nullable|date',
            'image_url' => 'nullable|string',
        ]);

        $newsItem->update($validated);

        return response()->json($newsItem);
    }

    public function destroy(NewsItem $newsItem)
    {
        $newsItem->delete();
        return response()->json(null, 204);
    }
}
