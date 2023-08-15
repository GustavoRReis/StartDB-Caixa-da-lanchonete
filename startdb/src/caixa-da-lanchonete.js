class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: { descricao: 'Café', valor: 3.0 },
      chantily: { descricao: 'Chantily (extra do Café)', valor: 1.5 },
      suco: { descricao: 'Suco Natural', valor: 6.2 },
      sanduiche: { descricao: 'Sanduíche', valor: 6.5 },
      queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.0 },
      salgado: { descricao: 'Salgado', valor: 7.25 },
      combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.5 },
      combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.5 },
    };

    this.pagamento = ['dinheiro', 'debito', 'credito'];

    this.descontoDinheiro = 0.05;
    this.acrescimoCredito = 0.03;

    this.itemPrincipalNecessario = {
      chantily: 'cafe',
      queijo: 'sanduiche',
    };
  }

  validarFormaDePagamento(formaDePagamento) {
    if (!this.pagamento.includes(formaDePagamento)) {
      return 'Forma de pagamento inválida!';
    }
  }

  validarItem(itemCode) {
    if (!this.cardapio[itemCode]) {
      return 'Item inválido!';
    }
  }

  verificarItensExtras(itens) {
    const principaisNoPedido = itens.map((itemInfo) => itemInfo.split(',')[0]);

    for (const itemCode of principaisNoPedido) {
      if (this.itemPrincipalNecessario[itemCode]) {
        const principal = this.itemPrincipalNecessario[itemCode];
        if (!principaisNoPedido.includes(principal)) {
          return 'Item extra não pode ser pedido sem o principal';
        }
      }
    }
  }

  calcularValorItens(itens) {
    let total = 0;

    for (const itemInfo of itens) {
      const [itemCode, quantity] = itemInfo.split(',');

      if (quantity <= 0) {
        return 'Quantidade inválida!';
      }

      const itemValidationMessage = this.validarItem(itemCode);
      if (itemValidationMessage) {
        return itemValidationMessage;
      }

      const item = this.cardapio[itemCode];
      total += item.valor * quantity;
    }

    return total;
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    try {
      const itemExiste = itens ? true : false;

      if (itemExiste) {
        if (itens.length === 0) {
          return 'Não há itens no carrinho de compra!';
        }
      }

      if (!itemExiste) {
        return 'Nenhum item foi informado no pedido';
      }
      const formaDePagamentoMessage =
        this.validarFormaDePagamento(formaDePagamento);
      if (formaDePagamentoMessage) {
        return formaDePagamentoMessage;
      }

      const verificarItensExtrasMessage = this.verificarItensExtras(itens);
      if (verificarItensExtrasMessage) {
        return verificarItensExtrasMessage;
      }

      const valorItens = this.calcularValorItens(itens);

      if (typeof valorItens === 'string') {
        return valorItens;
      }

      let total = valorItens;

      total *=
        formaDePagamento === 'dinheiro'
          ? 1 - this.descontoDinheiro
          : formaDePagamento === 'credito'
          ? 1 + this.acrescimoCredito
          : 1;

      return `R$ ${total.toFixed(2).replace('.', ',')}`;
    } catch (error) {
      return `Erro: ${error.message}`;
    }
  }
}

export { CaixaDaLanchonete };
