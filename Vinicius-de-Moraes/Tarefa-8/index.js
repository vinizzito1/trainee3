function prepararLanche() {
  return new Promise((resolve) => {
    
    setTimeout(() => {
      resolve("Lanche pronto! 🍔");
    }, 2000); 
  });
}

async function fazerPedido() {
  console.log("Pedido feito no caixa.");

  const lanche = await prepararLanche(); 
  
  console.log(`Aqui está seu lanche: ${lanche}`);
}

fazerPedido();
console.log("Esperando o lanche ficar pronto...");