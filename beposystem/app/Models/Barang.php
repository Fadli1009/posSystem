<?php

namespace App\Models;


use App\Models\Kategori;
use App\Models\Merchant;
use Illuminate\Database\Eloquent\Model;

class Barang extends Model
{
    protected $table = 'barangs';

    protected $fillable = [
        'id_merchant',
        'id_kategori',
        'nama_barang',
        'gambar',
        'jumlah',
        'harga',
        'tanggal',
        'barcode',
    ];

    public function merchant()
    {
        return $this->belongsTo(Merchant::class, 'id_merchant');
    }

    public function kategori()
    {
        return $this->belongsTo(Kategori::class, 'id_kategori');
    }
}
