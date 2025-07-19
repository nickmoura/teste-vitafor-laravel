<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToCharactersTable extends Migration
{
    public function up()
    {
        Schema::table('characters', function (Blueprint $table) {
            $table->integer('api_id')->nullable()->unique();
            $table->string('status')->nullable();
            $table->string('gender')->nullable();
            $table->string('type')->nullable();
            $table->string('origin')->nullable();
            $table->string('location')->nullable();
            $table->integer('episode_count')->nullable();
            $table->dateTime('created_at_api')->nullable();
        });
    }

    public function down()
    {
        Schema::table('characters', function (Blueprint $table) {
            $table->dropColumn([
                'api_id', 'status', 'gender', 'type', 'origin',
                'location', 'episode_count', 'created_at_api'
            ]);
        });
    }
}
