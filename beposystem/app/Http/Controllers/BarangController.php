<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use Illuminate\Http\Request;

class BarangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
        $id_merchant = auth()->user()->id_merchant;
        $data = Cache::remember('barang',60,function(){
            return Barang::where('id_merchant',$id_merchant)->get();
        });
        return response()->json(['data'=>$data,'status'=>true,'message'=>'Berhasil mengambil data barang'],200);
        } catch (\Throwable $th) {
            return response()->json(['data'=>null,'status'=>false,'message'=>'Gagal mengambil data barang: '.$th->getMessage()],500);
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
            $validate = $request->validate([
                'nama_barang'=>'required|string',
                'harga'=>'required|numeric',
                'jumlah'=>'required|numeric',                
                'tgl'=>'required',
                'barqode'=>'required',
                'id_merchant'=>'required',
                'id_kategori'=>'required',                
                'gambar'=>'required|mimes:jpg,png,jpeg|max:2048',                
            ],[
                'nama_barang.required'=>'Nama barang wajib diisi',
                'harga.required'=>'Harga barang wajib diisi',
                'jumlah.required'=>'Jumlah barang wajib diisi',
                'tgl.required'=>'Tanggal wajib diisi',
                'barqode.required'=>'Barqode wajib diisi',
                'id_merchant.required'=>'ID merchant wajib diisi',
                'id_kategori.required'=>'ID kategori wajib diisi',
                'gambar.required'=>'Gambar wajib diisi',
                'gambar.mimes'=>'Gambar harus berformat jpg, png, jpeg',
                'gambar.max'=>'Gambar maksimal 2M',
            ]);

            $image = $request->file('gambar');
            $imageName = time().'_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('image',$imageName,'public');   
            $barang = Barang::create([
                'nama_barang'=>$validate['nama_barang'],
                'harga'=>$validate['harga'],
                'jumlah'=>$validate['jumlah'],
                'tgl'=>$validate['tgl'],
                'barqode'=>$validate['barqode'],
                'id_merchant'=>$validate['id_merchant'],
                'id_kategori'=>$validate['id_kategori'],
                'gambar'=>$imageName,
            ]);
            return response()->json(['data'=>$barang,'status'=>true,'message'=>'Berhasil menambahkan data barang'],201);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Barang $barang)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Barang $barang)
    {
        $data = Barang::find($barang->id);
        return response()->json(['data'=>$data,'status'=>true,'message'=>'Berhasil mengambil data barang'],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Barang $barang)
    {
        try {
            $validate = $request->validate([
                'nama_barang'=>'required|string',
                'harga'=>'required|numeric',
                'jumlah'=>'required|numeric',                
                'tgl'=>'required',
                'barqode'=>'required',
                'id_merchant'=>'required',
                'id_kategori'=>'required',                
            ],[
                'nama_barang.required'=>'Nama barang wajib diisi',
                'harga.required'=>'Harga barang wajib diisi',
                'jumlah.required'=>'Jumlah barang wajib diisi',
                'tgl.required'=>'Tanggal wajib diisi',
                'barqode.required'=>'Barqode wajib diisi',
                'id_merchant.required'=>'ID merchant wajib diisi',
                'id_kategori.required'=>'ID kategori wajib diisi',                
            ]);

            $barang->update($validate);
            return response()->json(['data'=>$barang,'status'=>true,'message'=>'Berhasil mengupdate data barang'],200);
        } catch (\Throwable $th) {
            return response()->json(['data'=>null,'status'=>false,'message'=>'Gagal mengupdate data barang: '.$th->getMessage()],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Barang $barang)
    {
        try {
            $barang->delete();
            return response()->json(['data'=>null,'status'=>true,'message'=>'Berhasil menghapus data barang'],200);
        } catch (\Throwable $th) {
            return response()->json(['data'=>null,'status'=>false,'message'=>'Gagal menghapus data barang: '.$th->getMessage()],500);
        }
    }
}
