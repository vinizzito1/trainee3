import fastify from "fastify";

// API app?
const app = fastify();
const sessoesAtivas = {};

// Array com produtos e preços
let produtos = [
    {id: 1, nome: 'Teclado Mecânico', preco: 250},
    {id: 2, name: 'Mouse Gamer', preco: 150},
    {id: 3, name: 'Monitor OLED 27pol', preco: 1200},
    {id: 4, nome: "Headset Bluetooth", preco: 300}
];

/* Stateless
// Gatilho pedindo senha
app.addHook('onRequest', async (request, reply) => {
    const apiKey = request.headers['x-api-key'];

    if (apiKey !== 'senha') {
        return reply.code(401).send({ error: 'Acesso negado.' });
    }
});
*/

// ROTAS

// Post/login - Rota de Login
app.post('/login', async (request, reply) => {
    const { username } = request.body;

    if (!username) {
        return reply.code(400).send({ error: "O nome de usuario é obrigatório."});
    }

    sessoesAtivas[username] = {
        logadoEm: new Date(),
        ip: request.ip
    };

    console.log(`Sessão criada na memória para ${username}`);

    return {
        mensagem: "Login realizado. O servidor agora sabe quem você é.",
        token_sessao: username
    };
});

// Post/logout - Rota de Logout
app.post('/logout', async (request, reply) => {
    const token = request.headers['x-session-id'];

    if (token && sessoesAtivas[token]) {
        delete sessoesAtivas[token];
        return { mensagem: "Saiu. O servidor esqueceu de você"};
    }

    return { mensagem: "Você não estava logado."}
});

// Addhook/onRequest - Vericação
app.addHook('onRequest', async (request, reply) => {
  if (request.url === '/login') return;

  const tokenRecebido = request.headers['x-session-id'];

  if (!sessoesAtivas[tokenRecebido]) {
    return reply.code(401).send({ 
      error: 'Acesso negado. Você não fez login ou o servidor reiniciou.' 
    });
  }
});

// Get/itens - listar todos
app.get('/produtos', async (request, reply) => {
  const token = request.headers['x-session-id'];
  const dadosDaSessao = sessoesAtivas[token];
  
  return {
    usuario_logado: token,
    inicio_sessao: dadosDaSessao.logadoEm,
    dados: produtos
  };
});

// Get/itens/:id - buscar por id
app.get('/produtos/:id', async (request, reply) => {
    const { id } = request.params;
    const produtos = produtos.find(p => p.id === id);
  
    if (!produtos) {
        return reply.code(404).send({ error: 'Produto não encontrado' });
    }
    
    return produtos;
});

// Post/itens - criar
app.post('/produtos', async (request, reply) => {
    const { id, name, price } = request.body;
    const novoProduto = { id, name, price };
  
    produtos.push(novoProduto);
    return reply.code(21).send(novoProduto);
});

// Put/itens/:id - atualizar
app.put('/produtos/:id', async (request, reply) => {
    const { id } = request.params;
    const { nome, preco } = request.body;
  
    const index = produtos.findIndex(p => p.id === id);
  
    if (index === -1) {
        return reply.code(404).send({ error: 'Produto não encontrado' });
    }
  
    produtos[index] = { id, nome, preco };
    return produtos[index];
});

// Delete/itens/:id - remover
app.delete('/produtos/:id', async (request, reply) => {
    const { id } = request.params;
    const index = produtos.findIndex(p => p.id === id);
  
    if (index === -1) {
        return reply.code(404).send({ error: 'Produto não encontrado' });
    }
  
    produtos.splice(index, 1);
    return reply.code(204).send();
});

// Inicialização do servidor
const start = async () => {
    try {
        await app.listen({ port: 3000 });
        console.log('http://localhost:3000');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();