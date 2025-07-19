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
        Schema::create('characters', function (Blueprint $table) {
    $table->integer('api_id')->nullable(); // ID do personagem na API
    $table->string('name');
    $table->string('species');
    $table->string('image');
    $table->string('url');
    $table->string('status')->nullable();
    $table->string('gender')->nullable();
    $table->string('type')->nullable();
    $table->string('origin')->nullable();
    $table->string('location')->nullable();
    $table->integer('episode_count')->nullable();
    $table->dateTime('created_at_api')->nullable();
    $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('characters');
    }
};
