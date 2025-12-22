<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('barangs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_merchant');
            $table->unsignedBigInteger('id_kategori');
            $table->string('barcode', 255);
            $table->string('nama_barang', 150);
            $table->string('gambar', 255);
            $table->integer('jumlah');
            $table->integer('harga');
            $table->date('tanggal');
            $table->timestamps();
            $table->foreign('id_merchant')
                ->references('id')
                ->on('merchants')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('id_kategori')
                ->references('id')
                ->on('kategoris')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('barangs');
    }
};
