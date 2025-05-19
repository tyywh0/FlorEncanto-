// JavaScript para a página de confirmação de pedido

class ConfirmacaoPedido {
  constructor() {
  
    this.limparCarrinho();
  }
  
  limparCarrinho() {

    carrinho.limparCarrinho();
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const confirmacao = new ConfirmacaoPedido();
});