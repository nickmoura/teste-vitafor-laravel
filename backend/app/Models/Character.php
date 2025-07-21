<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
// Modelo que será responsável por representar a tabela de personagens no BD
class Character extends Model
{
    protected $fillable = [
        'api_id', 'name', 'species', 'image', 'url',
        'status', 'gender', 'type', 'origin', 'location',
        'episode_count', 'created_at_api'
    ];

}