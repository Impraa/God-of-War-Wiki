<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    //
    public function create(Request $request)
    {
        $data = $request->validate([
            "title" => ["required", "string"],
            "content" => ["required", "string"],
            "image" => ['image', 'max:3000'],
        ]);

        $newPost = Post::create([
            'title' => $data['title'],
            'content' => $data['content']
        ]);

        if ($data['image']) {
            $file = $request->file('image');

            $extension = $file->getClientOriginalExtension();

            $filename = $newPost->id . '-' . uniqid() . $extension;

            $path = $file->storeAs('public/postImages', $filename);

            $newPost->image = $path;
        }

        return response()->json(["message" => "Post was successfully created"], 201);
    }
}
