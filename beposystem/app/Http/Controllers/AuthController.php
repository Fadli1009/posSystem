<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Merchant;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function registrasi(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'nama_merchant' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'password_confirmation' => 'required|string|min:8',
        ]);
        $merchant = Merchant::create([
            'nama_merchant' => $validatedData['nama_merchant'],
            'email_merchant' => $validatedData['email'],           
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
            'id_role'=>1,
            'id_merchant' => $merchant->id,
        ]);
        return response()->json(['message' => 'User registered successfully','data'=>$user,'status'=>true], 201);

    }
}
