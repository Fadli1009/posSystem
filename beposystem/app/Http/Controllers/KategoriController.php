<?php

namespace App\Http\Controllers;

use App\Models\Kategori;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;


class KategoriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
    try {
        $id_merchant = auth()->user()->id_merchant;

        $kategoriBarang = Cache::remember(
            "kategoriBarang_{$id_merchant}",
             now()->addMinutes(60), 
             function () use ($id_merchant) {
                return Kategori::select('id', 'nama_kategori')
                ->where('id_merchant', $id_merchant)
                ->get();
        });

        return response()->json([
            'status' => true,
            'message' => 'Data kategori berhasil diambil',
            'data' => $kategoriBarang
        ]);
    } catch (\Throwable $th) {
        return response()->json([
            'status'=> false,
            'message'=>'Gagal mengambil data',
             'error' => $th->getMessage() 
        ]);
    }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $id_merchant = auth()->user()->id_merchant;

             $request->validate([
                'nama_kategori'=>'required|string|max:150'
            ]);

            $kategori = Kategori::create([
                'nama_kategori' => $request->nama_kategori,
                'id_merchant' => $id_merchant,
            ]);

            Cache::forget("kategoriBarang_{$id_merchant}");

            return response()->json([
                'status' => true,
                'message' => 'Berhasil menambahkan kategori barang',
                'data' => [
                    'id' => $kategori->id,
                    'nama_kategori' => $kategori->nama_kategori,
                ]
            ]);
        } catch (\Throwable $th) {
              return response()->json([
            'status'=> false,
            'message'=>'Gagal menambah data',
             'error' => $th->getMessage() 
        ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Kategori $kategori)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kategori $kategori)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            // dd($request->all());
            $id_merchant = auth()->user()->id_merchant;
            
            $kategoriBarang = Kategori::where('id_merchant', $id_merchant)
            ->findOrFail($id);
            

             $request->validate([
                'nama_kategori'=>'required|string|max:150'
            ]);

            $kategoriBarang->update([
                'nama_kategori' => $request->nama_kategori
            ]);

            Cache::forget("kategoriBarang_{$id_merchant}");

            return response()->json([
                'status' => true,
                'message' => 'Berhasil memperbaharui data',
                'data' => [
                    'id' => $kategoriBarang->id,
                    'nama_kategori' => $kategoriBarang->nama_kategori
                ],
            ]);

        } catch (\Throwable $th) {
            return response()->json([
            'status'=> false,
            'message'=>'Gagal memperbaharui data',
             'error' => $th->getMessage() 
        ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $id_merchant = auth()->user()->id_merchant;

             $kategoriBarang = Kategori::where('id_merchant', $id_merchant)
            ->findOrFail($id);

            $kategoriBarang->delete();

            Cache::forget("kategoriBarang_{$id_merchant}");

            return response()->json([
                'status' => true,
                'message' => 'Berhasil menghapus data',
                'data' => $kategoriBarang,
            ]);


        } catch (\Throwable $th) {
             return response()->json([
            'status'=> false,
            'message'=>'Gagal menghapus data',
             'error' => $th->getMessage() 
        ]);
        }
    }
}
