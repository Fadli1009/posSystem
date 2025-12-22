<?php

namespace App\Models;

use App\Models\User;
use App\Models\Merchant;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    protected $table = 'transaksis';

    protected $fillable = [
        'id_merchant',
        'id_users',
        'gr_qty',
        'tgl_transaksi',
        'total_harga',
        'nama_pembeli',
        'catatan',
        'status',
    ];

    public function merchant()
    {
        return $this->belongsTo(Merchant::class, 'id_merchant');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_users');
    }
}
