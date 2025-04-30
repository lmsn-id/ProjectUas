<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('userinterface', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->text('title')->nullable();
            $table->text('text')->nullable();
            $table->json('description')->nullable();
            $table->string('image')->nullable();
            $table->text('page');
            $table->text('layout');
            $table->integer('urutan');
            $table->text('position')->nullable();
            $table->boolean('status')->default(false);
            $table->timestamps();
        });
    }



    public function down(): void
    {
        Schema::dropIfExists('userinterface');
    }
};
