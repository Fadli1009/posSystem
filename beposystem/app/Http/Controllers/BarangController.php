<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class BarangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $data = Cache::remember('barang',60,function(){
            $id_merchant = auth()->user()->id_merchant;                
            return Barang::with('kategori')->where('id_merchant',$id_merchant)->get();
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
                'tanggal'=>'required',
                'barcode'=>'nullable',
                'id_merchant'=>'nullable',
                'id_kategori'=>'required',                
                'gambar'=>'required|mimes:jpg,png,jpeg|max:2048',                
            ],[
                'nama_barang.required'=>'Nama barang wajib diisi',
                'harga.required'=>'Harga barang wajib diisi',
                'jumlah.required'=>'Jumlah barang wajib diisi',
                'tanggal.required'=>'Tanggal wajib diisi',                
                'id_merchant.required'=>'ID merchant wajib diisi',
                'id_kategori.required'=>'ID kategori wajib diisi',
                'gambar.required'=>'Gambar wajib diisi',
                'gambar.mimes'=>'Gambar harus berformat jpg, png, jpeg',
                'gambar.max'=>'Gambar maksimal 2M',
            ]);

            $image = $request->file('gambar');
            $imageName = time().'_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('image',$imageName,'public');   

            $dataTerakhir = Barang::orderBy('id','desc')->first();
            if($dataTerakhir){
                $lastNum = (int) substr($dataTerakhir->barcode,3);
                $newNum = $lastNum+1;
            }else{
                $newNum=1;
            }
              $id_merchant = auth()->user()->id_merchant;   
            $kodeBarang = 'BRG'. str_pad($newNum,4,'0',STR_PAD_LEFT);
            Cache::forget('barang');
            $barang = Barang::create([
                'nama_barang'=>$validate['nama_barang'],
                'harga'=>$validate['harga'],
                'jumlah'=>$validate['jumlah'],
                'tanggal'=>$validate['tanggal'],
                'barcode'=>$kodeBarang,
                'id_merchant'=>$id_merchant,
                'id_kategori'=>$validate['id_kategori'],
                'gambar'=>$imageName,
            ]);
            return response()->json(['data'=>$barang,'status'=>true,'message'=>'Berhasil menambahkan data barang'],201);
        } catch (\Throwable $th) {
            return response()->json(['data'=>null,'status'=>false,'message'=>'Gagal menambahkan data barang: '.$th->getMessage()],500);
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
                'tanggal'=>'required',
                'barqode'=>'required',
                'id_merchant'=>'required',
                'id_kategori'=>'required',            
                'gambar'=>'nullable|mimes:jpg,png,jpeg|max:2048',        
            ],[
                'nama_barang.required'=>'Nama barang wajib diisi',
                'harga.required'=>'Harga barang wajib diisi',
                'jumlah.required'=>'Jumlah barang wajib diisi',
                'tanggal.required'=>'Tanggal wajib diisi',
                'barqode.required'=>'Barqode wajib diisi',
                'id_merchant.required'=>'ID merchant wajib diisi',
                'id_kategori.required'=>'ID kategori wajib diisi',                
            ]);
            if($request->hasFile('gambar')){
                $image = $request->file('gambar');
                $imageName = time().'_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->storeAs('image',$imageName,'public');   
                $validate['gambar'] = $imageName;
            }            
            Cache::forget('barang');
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
            Cache::forget('barang');
            $barang->delete();
            return response()->json(['data'=>null,'status'=>true,'message'=>'Berhasil menghapus data barang'],200);
        } catch (\Throwable $th) {
            return response()->json(['data'=>null,'status'=>false,'message'=>'Gagal menghapus data barang: '.$th->getMessage()],500);
        }
    }
}
