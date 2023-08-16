import { CaixaDaLanchonete } from './caixa-da-lanchonete.js';

const cardapioDiv = document.querySelector('.cardapio');
const formaPagamentoSelect = document.getElementById('formaPagamento');
const pedir = document.querySelector('.fazer-pedido');
const closeModal = document.querySelector('.close-modal');

const cardapio = {
  cafe: { descricao: 'Café', valor: 3.0, codigo: 'cafe,1' },
  chantily: {
    descricao: 'Chantily (extra do Café)',
    valor: 1.5,
    codigo: 'chantily,1',
  },
  suco: { descricao: 'Suco Natural', valor: 6.2, codigo: 'suco,1' },
  sanduiche: { descricao: 'Sanduíche', valor: 6.5, codigo: 'sanduiche,1' },
  queijo: {
    descricao: 'Queijo (extra do Sanduíche)',
    valor: 2.0,
    codigo: 'queijo,1',
  },
  salgado: { descricao: 'Salgado', valor: 7.25, codigo: 'salgado,1' },
  combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.5, codigo: 'combo1,1' },
  combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.5, codigo: 'combo2,1' },
};

let itens = [];
let formaPagamentoEscolhida = null;

const arrayItens = (e) => {
  e.preventDefault();
  const itemCode = e.target.closest('.card').id;
  itens.push(itemCode);

  updateQuantidade(itemCode, 1);
};

const diminuirQuantidade = (e) => {
  e.preventDefault();
  const itemCode = e.target.closest('.card').id;
  const index = itens.indexOf(itemCode);
  if (index !== -1) {
    itens.splice(index, 1);

    updateQuantidade(itemCode, -1);
  }
};

const updateQuantidade = (itemCode, change) => {
  const card = document.getElementById(itemCode);
  const quantidadeElement = card.querySelector('.quantidade');
  let quantidade = parseInt(quantidadeElement.textContent);
  quantidade += change;
  quantidadeElement.textContent = quantidade;
};

const criarCard = (itemCode, descricao, valor, codigo) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.id = codigo;
  card.innerHTML = `
    <div class='card-individual'>
      <div>
        <h3>${descricao}</h3>
        <p>Valor: R$ ${valor.toFixed(2)}</p>
        <p class="quantidade">0</p>
      </div>
      <div>
        <button class="subtrair-button">-</button>
        <button class="adicionar-button">+</button>
      </div>
    </div>
  `;
  cardapioDiv.appendChild(card);

  const botaoAdicionar = card.querySelector('.adicionar-button');
  const botaoSubtrair = card.querySelector('.subtrair-button');
  botaoAdicionar.addEventListener('click', arrayItens);
  botaoSubtrair.addEventListener('click', diminuirQuantidade);
};

for (const itemCode in cardapio) {
  const item = cardapio[itemCode];
  criarCard(itemCode, item.descricao, item.valor, item.codigo);
}

formaPagamentoSelect.addEventListener('change', (event) => {
  formaPagamentoEscolhida = event.target.value;
});

const fazerPedido = (e) => {
  e.preventDefault();
  const lanchonete = new CaixaDaLanchonete();
  const pedido = lanchonete.calcularValorDaCompra(
    formaPagamentoEscolhida,
    itens
  );

  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = `<p>${pedido}</p>`;
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
};

pedir.addEventListener('click', fazerPedido);

closeModal.addEventListener('click', () => {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  location.reload();
});
