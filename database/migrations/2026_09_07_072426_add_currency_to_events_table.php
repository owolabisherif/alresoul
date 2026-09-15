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
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn("organizer");
            $table->dropColumn("organizer_image");
            $table->unsignedBigInteger('organizer_id')->default(0);
            $table->string("currency")->after("amount")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn('organizer_id');
            $table->dropColumn("currency");
        });
    }
};
