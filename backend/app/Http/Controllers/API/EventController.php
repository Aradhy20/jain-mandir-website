<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        return Event::orderBy('event_date', 'asc')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'event_date' => 'nullable|date',
            'location' => 'nullable|string',
            'image_url' => 'nullable|string',
        ]);

        $event = Event::create($validated);

        return response()->json($event, 201);
    }

    public function show(Event $event)
    {
        return $event;
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'event_date' => 'nullable|date',
            'location' => 'nullable|string',
            'image_url' => 'nullable|string',
        ]);

        $event->update($validated);

        return response()->json($event);
    }

    public function destroy(Event $event)
    {
        $event->delete();
        return response()->json(null, 204);
    }
}
