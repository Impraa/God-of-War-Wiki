<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

    public function getOne(Request $request)
    {
        $data = $request->validate([
            "post_id" => ["required", "string"],
        ]);

        $post = Post::find($data["post_id"]);

        if (Post::isEmpty($post)) {
            return response()->json(["message" => "There is no such post"], 404);
        }

        return response()->json(["message" => "Post was successfully found", "post" => $post], 200);
    }

    public function getAll()
    {
        $posts = Post::all();
        if (Post::isEmpty($posts)) {
            return response()->json(["message" => "No posts where found"], 404);
        }
        return response()->json(["message" => "All posts recived", "post" => $posts], 200);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            "post_id" => ["required", "string"],
            "title" => ["string"],
            'description' => ['string'],
            "image" => ['image', 'max:3000'],

        ]);

        $post = Post::find($id);
        if (Post::isEmpty($post)) {
            return response()->json(["message" => "No post was found"], 404);
        }
        $post->name = $request->name;
        $post->description = $request->description;

        if ($post->image && $data["image"] != $post->image) {
            $file = $request->file("image");

            $extension = $file->getClientOriginalExtension();

            $filename = $post->id . '-' . uniqid() . $extension;

            $path = $file->storeAs('public/postImages', $filename);

            Storage::delete('' . $post->image);

            $post->image = $path;
        }

        $post->save();

        return response()->json(['message' => 'Post was successfully updated', "post" => $post], 200);
    }

    public function destroy($id)
    {
        $post = Post::find($id);
        if (Post::isEmpty($post)) {
            return response()->json(["message" => "Post was not found"], 404);
        }
        $post->delete();
        return response()->json(["message" => "Post was deleted successfully", "post" => $post], 200);
    }
}
