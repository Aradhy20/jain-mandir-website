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
            'title' => 'required|string|min:2|max:255',
            'description' => 'required|string|max:65535',
            'event_date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'image_url' => 'nullable|string|max:2048',
        ]);

        $validated['title'] = strip_tags(trim($validated['title']));
        if (isset($validated['location'])) {
            $validated['location'] = strip_tags(trim($validated['location']));
        }

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
            'title' => 'sometimes|required|string|min:2|max:255',
            'description' => 'sometimes|required|string|max:65535',
            'event_date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'image_url' => 'nullable|string|max:2048',
        ]);

        if (isset($validated['title'])) {
            $validated['title'] = strip_tags(trim($validated['title']));
        }
        if (isset($validated['location'])) {
            $validated['location'] = strip_tags(trim($validated['location']));
        }

        $event->update($validated);

        return response()->json($event);
    }

    public function destroy(Event $event)
    {
        $event->delete();
        return response()->json(null, 204);
    }
}
