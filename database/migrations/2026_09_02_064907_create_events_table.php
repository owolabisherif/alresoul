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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string("slug");
            $table->string("title");
            $table->string("sub_title")->nullable();
            $table->string("image");
            $table->longText("body");
            $table->string("organizer")->nullable();
            $table->string("organizer_image")->nullable();
            $table->string("days")->nullable();
            $table->date("date_start")->nullable();
            $table->date("date_end")->nullable();
            $table->time("time_start")->nullable();
            $table->time("time_end")->nullable();
            $table->string("location")->nullable();
            $table->string("locale")->default("ar");
            $table->string("mode")->nullable(); //Online or Offline
            $table->string("type")->default("free"); //Paid or Free
            $table->string("amount")->default(0);
            $table->string("sessions")->default(0);
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
        Schema::dropIfExists('events');
    }
};
