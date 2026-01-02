<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Merchant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use function Pest\Laravel\json;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
                'remember' => 'boolean',
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'message' => 'Email atau password salah!'
                ], 401);
            }

            $user->tokens()->delete();

            $expiresAt = $request->remember
                ? now()->addDays(10)
                : now()->addHours(2);

            $token = $user->createToken(
                're',
                ['*'],
                $expiresAt
            )->plainTextToken;

            return response()->json([
                'message' => 'Berhasil login',
                'token_type' => 'Bearer',
                'expires_at' => $expiresAt,
                'user' => $user,
                'token' => $token
            ], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Registration failed: ' . $th->getMessage(), 'status' => false], 500);
        }
    }
    public function registrasi(Request $request)
    {
        try {
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
                'id_role' => 1,
                'id_merchant' => $merchant->id,
            ]);
            return response()->json(['message' => 'User registered successfully', 'data' => $user, 'status' => true], 201);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Registration failed: ' . $th->getMessage(), 'status' => false], 500);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'berhasil logout'
        ], 200);
    }
}
