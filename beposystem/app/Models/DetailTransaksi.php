<?php

namespace App\Models;

use App\Models\Barang;
use App\Models\Merchant;
use App\Models\Transaksi;
use Illuminate\Database\Eloquent\Model;

class DetailTransaksi extends Model
{
    protected $table = 'detail_transaksis';

    protected $fillable = [
        'id_merchant',
        'id_transaksi',
        'id_barang',
        'jumlah_item',
        'harga_item',
    ];

    public function merchant()
    {
        return $this->belongsTo(Merchant::class, 'id_merchant');
    }

    public function transaksi()
    {
        return $this->belongsTo(Transaksi::class, 'id_transaksi');
    }

    public function barang()
    {
        return $this->belongsTo(Barang::class, 'id_barang');
    }
}
