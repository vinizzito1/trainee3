import fastify from "fastify";

const app = fastify();

// Array com produtos e preços
let produtos = [
    {id: 1, nome: 'Teclado Mecânico', preco: 250},
    {id: 2, name: 'Mouse Gamer', preco: 150},
    {id: 3, name: 'Monitor OLED 27pol', preco: 1200},
    {id: 4, nome: "Headset Bluetooth", preco: 300}
];

// ROTAS

// Get/itens - listar todos
app.get('/produtos', async (request, reply) => {
    return produtos; 
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
app.delete('/teams/:id', async (request, reply) => {
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