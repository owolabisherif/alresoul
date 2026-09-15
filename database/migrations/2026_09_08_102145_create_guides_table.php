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
        Schema::create('guides', function (Blueprint $table) {
            $table->id();
            $table->string("slug");
            $table->string("title");
            $table->string("image")->nullable();
            $table->string("about")->nullable();
            $table->string("time_start");
            $table->string("time_end");
            $table->date("date_start");
            $table->date("date_end");
            $table->boolean("is_featured")->default(false);
            $table->string("meta_title")->nullable();
            $table->string("meta_desc")->nullable();
            $table->string("tags")->nullable();
            $table->boolean("status")->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guides');
    }
};
