import { CaixaDaLanchonete } from './caixa-da-lanchonete.js';

describe('CaixaDaLanchonete', () => {
  const validaTeste = (formaDePagamento, resultadoEsperado, itens) => {
    const resultado = new CaixaDaLanchonete().calcularValorDaCompra(
      formaDePagamento,
      itens
    );

    expect(resultado.replace('\xa0', ' ')).toEqual(resultadoEsperado);
  };

  test.each([
    [
      'com carrinho vazio',
      'dinheiro',
      'Não há itens no carrinho de compra!',
      [],
    ],
    [
      'com carrinho vazio',
      'credito',
      'Não há itens no carrinho de compra!',
      [],
    ],
    ['com carrinho vazio', 'debito', 'Não há itens no carrinho de compra!', []],
  ])(
    'compra %p em %p deve resultar em %p',
    (_, formaDePagamento, resultadoEsperado, itens) =>
      validaTeste(formaDePagamento, resultadoEsperado, itens)
  );

  test.each([
    ['dinheiro', 'R$ 2,85', ['cafe,1']],
    ['credito', 'R$ 3,09', ['cafe,1']],
    ['debito', 'R$ 3,00', ['cafe,1']],
  ])('compra simples em %p deve resultar em %p', validaTeste);

  test.each([
    ['credito', 'R$ 11,85', ['cafe,1', 'sanduiche,1', 'queijo,1']],
    ['debito', 'R$ 11,50', ['cafe,1', 'sanduiche,1', 'queijo,1']],
  ])('compra de 3 itens em %p deve resultar em %p', validaTeste);

  test.each([
    ['dinheiro', 'R$ 33,73', ['cafe,4', 'sanduiche,3', 'queijo,2']],
    ['credito', 'R$ 36,56', ['cafe,4', 'sanduiche,3', 'queijo,2']],
    ['debito', 'R$ 35,50', ['cafe,4', 'sanduiche,3', 'queijo,2']],
  ])('compra de múltiplas quantidades em %p deve resultar em %p', validaTeste);

  test.each([
    ['com quantidade zero', 'dinheiro', 'Quantidade inválida!', ['cafe,0']],
    ['com um valor', 'credito', 'Item inválido!', ['1']],
    ['com código inexistente', 'debito', 'Item inválido!', ['pizza, 1']],
    [
      'com forma de pagamento inválida',
      'especie',
      'Forma de pagamento inválida!',
      ['cafe, 1'],
    ],
  ])(
    'compra %p em %p deve resultar em %p',
    (_, formaDePagamento, resultadoEsperado, itens) =>
      validaTeste(formaDePagamento, resultadoEsperado, itens)
  );

  test.each([
    [
      'chantily',
      'dinheiro',
      'Item extra não pode ser pedido sem o principal',
      ['chantily,1'],
    ],
    [
      'queijo',
      'credito',
      'Item extra não pode ser pedido sem o principal',
      ['queijo,1'],
    ],
    [
      'chantily com outro item',
      'credito',
      'Item extra não pode ser pedido sem o principal',
      ['chantily,1', 'sanduiche,1'],
    ],
    [
      'queijo com outro item',
      'debito',
      'Item extra não pode ser pedido sem o principal',
      ['cafe,1', 'queijo,1'],
    ],
  ])(
    'compra %p em %p deve resultar em %p',
    (_, formaDePagamento, resultadoEsperado, itens) =>
      validaTeste(formaDePagamento, resultadoEsperado, itens)
  );

  const classeTeste = new CaixaDaLanchonete();
  it('Tenta fazer o pedido sem passar nenhum item', () => {
    const retorno = classeTeste.calcularValorDaCompra('dinheiro');
    expect(retorno).toBe('Nenhum item foi informado no pedido');
  });

  it('Deve ser possivel criar uma instancia de CaixaDaLanchonete', () => {
    const instanciaCaixa = new CaixaDaLanchonete();
    expect(instanciaCaixa).toBeInstanceOf(CaixaDaLanchonete);
  });

  it('verifica se itens é enviado em um formato válido', () => {
    const retorno = classeTeste.calcularValorDaCompra(
      'dinheiro',
      'cachorro quente',
      'xis salada'
    );
    expect(retorno).toBe('Erro: itens.map is not a function');
  });

  it('deve aceitar uma forma de pagamento válida', () => {
    const formaDePagamento = 'debito';
    const resultado = classeTeste.validarFormaDePagamento(formaDePagamento);
    expect(resultado).not.toBe('Forma de pagamento inválida!');
  });

  it('deve aceitar itens válidos', () => {
    const resultado = classeTeste.validarItem('cafe');
    expect(resultado).not.toBe('Item inválido!');
  });

  it('deve aceitar itens extras válidos com seu princpal', () => {
    const itens = ['cafe,1', 'chantily,1'];
    const resultado = classeTeste.verificarItensExtras(itens);
    expect(resultado).not.toBe('Item inválido!');
  });

  it('deve calcular o valor dos itens', () => {
    const itens = ['cafe,1', 'chantily,1'];
    const resultado = classeTeste.calcularValorItens(itens);
    expect(resultado).toBe(4.5);
  });
});
