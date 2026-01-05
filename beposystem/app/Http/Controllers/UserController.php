<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

use function Pest\Laravel\json;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $id_merchant = Auth::user()->id_merchant;
            Cache::forget("pengguna_{$id_merchant}");
            $user = Cache::remember(
                "pengguna_{$id_merchant}",
                now()->addMinutes(60), 
                function () use ($id_merchant) {
                return 
                User::join('roles', 'roles.id', '=', 'users.id_role')
                ->where('users.id_merchant', $id_merchant)
                ->where('users.id', '!=', 1)
                ->select(
                    'users.id',
                    'users.name',
                    'users.email',
                    'users.id_role',
                    'roles.nama_role as role_name',
                )
                ->get();
            });

            return response()->json([
                'status' => true,
                'message' => 'Berhasil mendapatkan data pengguna',
                'data' => $user
            ]);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal mendapatkan mengambil data user',
                'error' => $th->getMessage() ,
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:150',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:8|confirmed',
                'id_role' => 'required|integer|exists:roles,id',
            ]);

            $id_merchant = Auth::user()->id_merchant;

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->password,
                'id_role' => $request->id_role,
                'id_merchant' => $id_merchant,
            ]);

            Cache::forget( "pengguna_{$id_merchant}");

            return response()->json([
                'status' => true,
                'message' => 'Berhasil menambahkan data pengguna',
                'data' => [
                'nama' => $user->name,
                'email' => $user->email,
            ]
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status'=> false,
                'message'=> 'Gagal menambahkan data pengguna',
                'error'=> $th->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {            
            $id_merchant = Auth::user()->id_merchant;

            $pengguna = User::where('id_merchant', $id_merchant)
            ->findOrFail($id);

            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email' ,
                'id_role' => 'required|exists:roles,id',
                'password' => 'nullable|min:8|confirmed',
            ]);

            $password = null;

            if ($request->filled('password')) {
                $password = Hash::make($request->password);
            } else {
                $password = $pengguna->password;
            }

            $pengguna->update([
                'name' => $request->name,
                'email' => $request->email,
                'id_role' => $request->id_role,
                'password' => $password,
            ]);

            Cache::forget("pengguna_{$id_merchant}");

            return response()->json([
                'status' => true,
                'message' => 'Berhasil memmperbarui data pengguna',
                'data' => [
                    'nama' => $pengguna->name,
                    'email' => $pengguna->email,
                ]
            ]);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menambahkan data pengguna',
                'error' => $th->getMessage(),
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
     try {

        $id_merchant = Auth::user()->id_merchant;

        $user = User::where('id_merchant', $id_merchant)
        ->findOrFail($id);

        $user->delete();

        Cache::forget("pengguna_{$id_merchant}");

        return response()->json([
            'status' => true,
            'message' => 'Berhasil menghapus data pengguna',
            'data' => [
                'nama' => $user->name,
                'email' => $user->email,
            ]
        ]);

     } catch (\Throwable $th) {
        return response()->json([
            'status' => false,
            'message' => 'Gagal menambahkan data pengguna',
            'error' => $th->getMessage(),
        ]);
     }
    }
}
