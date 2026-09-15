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
        Schema::table('authors', function (Blueprint $table) {
            $table->after("id", function(Blueprint $table) {
                $table->string('name');
                $table->string('type')->default('author'); //organizer / author
                $table->string('phone')->nullable();
                $table->string('email')->nullable();
                $table->string('website')->nullable();
                $table->boolean("status")->default(1);
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('authors');
    }
};
