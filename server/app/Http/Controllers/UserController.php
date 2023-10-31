<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //
    public function register(Request $request){
        $data  = $request->validate([
            "username" => ["required","string",Rule::unique("users",'username')],
            "email"=>  ["required","email",Rule::unique("users",'email')],
            'password'=> ['required','string','confirm'], 
        ]);


        $data['password'] = bcrypt($data['password']);

        $newUser = User::create($data);
        auth()->login($newUser);

        $token = $newUser->createToken('user_'.$newUser->id)->accessToken;
        
        return response()->json(['message' => "User was created successfully", 'token' => $token],201);
    }  

    public function login(Request $request){
        $data = $request->validate([
            "email" => "required",
            "password" => "required",
         ]);

         if(auth()->attempt($data)){

            $user = User::where("email", $data["email"])->first();
            $token = $user->createToken("user_".$user->id)->accessToken;

            return response()->json(["message"=> "User logged in successfully","token"=> $token]);

        }

        return response()->json(["message"=> "User not found"],404);
    }
}
