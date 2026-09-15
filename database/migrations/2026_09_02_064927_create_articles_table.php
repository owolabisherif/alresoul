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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string("slug");
            $table->string("title");
            $table->string("image");
            $table->string("video")->nullable();
            $table->enum("type", ["image", "video"])->default("image");
            $table->longText("body");
            $table->string("author")->nullable();
            $table->string("author_image")->nullable();
            $table->enum("listing_type", ["news", "article"])->default("news");
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
        Schema::dropIfExists('articles');
    }
};
