<?php

// Define o namespace do controller (estrutura de pastas onde ele está)
namespace App\Http\Controllers;

// Importa o modelo User - a tabela de users no BD
use App\Models\User;

// Importa a classe Request para receber com requisições HTTP
use Illuminate\Http\Request;

// Importa a Hash para criptografar senhas no BD
use Illuminate\Support\Facades\Hash;

// Define a classe AuthController que herda da classe base Controller
class AuthController extends Controller
{
    // Função responsável por registrar novos usuários
    public function register(Request $request)
    {
        // Valida os dados recebidos na requisição
        $fields = $request->validate([
            'name' => 'required|string', // nome é obrigatório e deve ser uma string
            'email' => 'required|email|unique:users,email', // email obrigatório, no formato certo e único na tabela users
            'password' => 'required|string|confirmed' // senha obrigatória, string e com confirmação (password_confirmation)
        ]);

        // Cria um novo usuário no banco de dados com os dados validados
        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            // A senha é criptografada antes de salvar
            'password' => Hash::make($fields['password'])
        ]);

        // Retorna o usuário criado como JSON com status 201 (Created)
        return response()->json($user, 201);
    }

    // Função responsável por fazer o login do usuário
    public function login(Request $request)
    {
        // Valida os dados da requisição de login
        $fields = $request->validate([
            'email' => 'required|email', // email obrigatório e no formato correto
            'password' => 'required|string' // senha obrigatória
        ]);

        // Procura o usuário no banco com o email fornecido
        $user = User::where('email', $fields['email'])->first();

        // Se não encontrou o usuário ou a senha está incorreta
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        // Gera um token de autenticação usando o Sanctum
        $token = $user->createToken('apitoken')->plainTextToken;

        // Retorna o usuário e o token como resposta JSON
        return response()->json(['user' => $user, 'token' => $token]);
    }
}
