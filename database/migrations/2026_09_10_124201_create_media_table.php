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
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("parent_id")->nullable();
            $table->unsignedBigInteger("playlist_id")->default(0);
            $table->string("slug");
            $table->string("title");
            $table->string("description");
            $table->string("season")->default(0);
            $table->string("episode")->default(0);
            $table->string("cover");
            $table->string("video_url");
            $table->boolean("status")->default(true);
            $table->string("meta_title")->nullable();
            $table->string("meta_desc")->nullable();
            $table->string("tags")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
