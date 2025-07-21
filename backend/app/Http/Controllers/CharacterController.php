<?php

namespace App\Http\Controllers;

use App\Models\Character;
use Illuminate\Http\Request;
use Carbon\Carbon; // formata a data

class CharacterController extends Controller
{
    public function index()
    {
        return Character::all();
    }

    public function show($id)
    {
$character = Character::findOrFail($id);

    // Formata as datas pro nosso formato
    $created_at_formatted = Carbon::parse($character->created_at)
        ->locale('pt_BR')
        ->isoFormat('D [de] MMMM [de] YYYY'); // Ex: 1 de Janeiro de 2025

    $created_at_api_formatted = null;
    if ($character->created_at_api) {
        $created_at_api_formatted = Carbon::parse($character->created_at_api)
            ->locale('pt_BR')
            ->isoFormat('D [de] MMMM [de] YYYY');
    }

    // Adiciona os campos formatados no objeto character (ou cria um array de resposta)
    $response = $character->toArray();
    $response['created_at_formatted'] = $created_at_formatted; // Representa quando foi criado no banco
    $response['created_at_api_formatted'] = $created_at_api_formatted; // Representa quando foi criado na API de origem

    return response()->json($response);    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'api_id' => 'nullable|integer|unique:characters,api_id',
            'name' => 'required|string',
            'species' => 'required|string',
            'image' => 'required|string',
            'url' => 'required|string',
            'status' => 'nullable|string',
            'gender' => 'nullable|string',
            'type' => 'nullable|string',
            'origin' => 'nullable|string',
            'location' => 'nullable|string',
            'episode_count' => 'nullable|integer',
            'created_at_api' => 'nullable|date',
]);

        $character = Character::create($validated);
        return response()->json($character, 201);
    }

    public function update(Request $request, $id)
    {
        $character = Character::findOrFail($id);
        $character->update($request->all());
        return $character;
    }

    public function destroy($id)
    {
        $character = Character::findOrFail($id);
        $character->delete();
        return response()->json(null, 204);
    }
}
