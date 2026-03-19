# Desafio RxJS: Sistema de Monitoramento Reativo

Este projeto implementa um pipeline reativo completo utilizando RxJS e TypeScript para monitorar entregas em tempo real, combinando múltiplos fluxos de eventos assíncronos.

## 1. Como rodar o projeto

Certifique-se de ter o Node.js instalado. Após clonar o repositório, siga os passos abaixo no terminal:

1. Instale as dependências do projeto:
   \`\`\`bash
   npm install
   \`\`\`

2. Execute o sistema de monitoramento:
   \`\`\`bash
   npx tsx src/main.ts
   \`\`\`
   *(Nota: Utilizo a ferramenta `tsx` para lidar corretamente com o sistema de módulos ES nas versões mais recentes do Node.js).*

## 2. Descrição dos Streams

O sistema possui três streams principais:

* **`gps$`**: Emite atualizações a cada 1 segundo contendo a localização (latitude e longitude) e a velocidade atual dos entregadores.
* **`pedidos$`**: Emite atualizações de status dos pedidos a cada 2 segundos. Possui uma simulação de falha de rede em 10% das vezes, tratada com operadores de resiliência (`retry` e `catchError`).
* **`alertas$`**: Emite eventos críticos do sistema (como atrasos ou rotas desviadas) em intervalos aleatórios entre 3 e 8 segundos.

## 3. Tarefa 3.1

Para combinar os dados de `gps$` e `pedidos$`, a minha escolha principal foi utilizar o operador **`merge`** seguido do **`scan`**, em vez de `combineLatest` ou `withLatestFrom`.

O `combineLatest` exige que todos os streams emitam pelo menos um valor antes de disparar. Além disso, ele combinaria a última emissão geral do GPS com a última emissão geral de Pedidos. Como tenho múltiplos entregadores rodando em paralelo, usar `combineLatest` cruzaria o GPS do entregador A com o status do pedido do entregador B, gerando dados inconsistentes.

Utilizei o `merge` para unificar os dois fluxos em uma única linha do tempo. Em seguida, o `scan` atuou como um "acumulador de estado" (semelhante ao `reduce` de arrays). Ele me permitiu criar um dicionário em memória onde a chave é o `entregadorId`, garantindo que as atualizações de GPS e Pedidos sejam correlacionadas exclusivamente com seus respectivos donos.

## 4. Tarefa 3.2

Nesta tarefa, o meu objetivo era identificar quando um alerta de severidade 'alta' ocorresse ao mesmo tempo em que o entregador estivesse acima de 60 km/h.

Utilizei o operador `withLatestFrom`. Primeiro, o fluxo escuta apenas os `alertasCriticos$` filtrados por severidade 'alta'. Quando esse alerta ocorre, o `withLatestFrom` "tira uma foto" do estado mais recente do `painelEntregador$` (construído na tarefa 3.1). Com a junção desses dois dados, um `filter` verifica se o veículo do entregador específico daquele alerta estava com a velocidade acima do limite no momento exato da emissão.

## 5. Dificuldades Enfrentadas e Resoluções

Durante o desenvolvimento com TypeScript, enfrentei duas dificuldades principais relacionadas ao rigor da tipagem e configuração do ambiente:

1. **Inferência de Arrays e Tipos Nulos:** Ao sortear dados no simulador usando índices dinâmicos (`Math.random()`), o TypeScript alertava erro de *Object is possibly 'undefined'* (ex: `TS2532`), temendo que o índice acessasse posições inexistentes. Resolvi isso utilizando o (`!`) para garantir ao compilador que os retornos das minhas funções seriam válidos.
2. **Resolução de Módulos (ERR_MODULE_NOT_FOUND):** O Node.js com ES Modules exige explicitamente a extensão `.js` nas importações, mesmo trabalhando em arquivos `.ts`. Ao rodar o `ts-node` padrão, os meus imports relativos quebravam. Resolvi isso ajustando os imports para incluir `.js` no final e utilizando um executor moderno (`tsx`) que compreende a transpilação e os caminhos corretamente.