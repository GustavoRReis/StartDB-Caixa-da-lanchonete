const itemExiste = false;
if (itens) {
  itemExiste = true;
}

if (itemExiste) {
  if (item.length === 0) {
    return 'Não há itens no carrinho de compra!';
  }
}

if (!itemExiste) {
  return 'Nenhum item foi informado';
}
