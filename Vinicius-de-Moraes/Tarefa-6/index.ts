import Fastify, { FastifyRequest, FastifyReply } from "fastify";
const app = Fastify({ logger: true });

let produtos = [
  {id:1, nome:"Teclado Mecânico", preco:250},
  {id:2, nome:"Mouse Gamer", preco:150},
  {id:3, nome:"Monitor OLED 27pol", preco:1200},
  {id:4, nome:"Headset Bluetooth", preco:300}
];

const sessoesAtivas: Record<string, any> = {};

app.post<{ Body: { username: string } }>('/login', async (request, reply) => {
  const { username } = request.body;

  if (!username) {
    return reply.code(400).send({ error: "O nome de usuario é obrigatório." });
  }

  sessoesAtivas[username] = {
    logadoEm: new Date(),
    ip: request.ip || 'unknown'
  };

  console.log(`Sessão criada na memória para ${username}`);

  return { 
    mensagem: "Login realizado.", 
    token_sessao: username 
  };
});

app.post('/logout', async (request, reply) => {
  // 'as string' força o tipo, sem precisar de interface
  const token = request.headers['x-session-id'] as string;

  if (token && sessoesAtivas[token]) {
    delete sessoesAtivas[token];
    return { mensagem: "Saiu. O servidor esqueceu de você" };
  }

  return { mensagem: "Você não estava logado." }
});

app.addHook('onRequest', async (request, reply) => {
  if (request.url === '/login') return;

  const tokenRecebido = request.headers['x-session-id'] as string;

  if (!tokenRecebido || !sessoesAtivas[tokenRecebido]) {
    return reply.code(401).send({ 
      error: 'Acesso negado. Você não fez login ou o servidor reiniciou.' 
    });
  }
});

app.get('/produtos', async (request, reply) => {
  const token = request.headers['x-session-id'] as string;
  // Como usamos 'any' lá em cima, aqui ele aceita qualquer acesso
  const dadosDaSessao = sessoesAtivas[token];
  
  return {
    usuario_logado: token,
    inicio_sessao: dadosDaSessao.logadoEm,
    dados: produtos
  };
});

app.get<{ Params: { id: string } }>('/produtos/:id', async (request, reply) => {
  const { id } = request.params;
  
  // Conversão Number(id) é essencial pois a URL sempre envia string
  const produto = produtos.find(p => p.id === Number(id));
  
  if (!produto) {
    return reply.code(404).send({ error: 'Produto não encontrado' });
  }
  
  return produto;
});

app.post<{ Body: { id: number, nome: string, preco: number } }>('/produtos', async (request, reply) => {
  const { id, nome, preco } = request.body;
  
  const novoProduto = { id, nome, preco };
  
  produtos.push(novoProduto);
  return reply.code(201).send(novoProduto);
});

app.put<{ Params: { id: string }, Body: { nome: string, preco: number } }>('/produtos/:id', async (request, reply) => {
  const { id } = request.params;
  const { nome, preco } = request.body;
  
  const index = produtos.findIndex(p => p.id === Number(id));
  
  if (index === -1) {
    return reply.code(404).send({ error: 'Produto não encontrado' });
  }
  
  // Atualiza mantendo o ID original
  produtos[index] = { id: Number(id), nome, preco };
  return produtos[index];
});

app.delete<{ Params: { id: string } }>('/produtos/:id', async (request, reply) => {
  const { id } = request.params;
  const index = produtos.findIndex(p => p.id === Number(id));
  
  if (index === -1) {
    return reply.code(404).send({ error: 'Produto não encontrado' });
  }
  
  produtos.splice(index, 1);
  return reply.code(204).send();
});

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