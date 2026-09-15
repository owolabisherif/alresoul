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
        Schema::create('scholars', function (Blueprint $table) {
            $table->id();
            $table->string('slug');
            $table->string('name');
            $table->string('type')->default('scholar');
            $table->string('image')->nullable();
            $table->longText('about')->nullable();
            $table->boolean('status')->default(1);
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
        Schema::dropIfExists('scholars');
    }
};
