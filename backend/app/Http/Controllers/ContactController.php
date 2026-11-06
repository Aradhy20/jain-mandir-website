<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactSubmission;
use Illuminate\Support\Facades\DB;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:2|max:100',
            'email' => 'required|email|max:255',
            'message' => 'required|string|min:5|max:5000',
        ]);

        $validated['name'] = strip_tags(trim($validated['name']));
        $validated['message'] = strip_tags(trim($validated['message']));

        ContactSubmission::create($validated);

        return response()->json(['message' => 'Submission successful'], 201);
    }

    public function status()
    {
        try {
            DB::connection()->getPdo();
            $dbHealthy = true;
        } catch (\Throwable $e) {
            $dbHealthy = false;
        }

        return response()->json([
            'status' => $dbHealthy ? 'healthy' : 'degraded',
            'service' => 'Jambudweep API',
            'timestamp' => now()->toIso8601String(),
        ], $dbHealthy ? 200 : 503);
    }
}
