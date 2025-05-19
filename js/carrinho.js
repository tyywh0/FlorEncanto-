// JavaScript para a página do carrinho

class PaginaCarrinho {
  constructor() {
  
    this.carrinhoItens = document.getElementById('cart-items');
    this.carrinhoContent = document.getElementById('cart-content');
    this.emptyCart = document.getElementById('empty-cart');
    this.totalElement = document.getElementById('cart-total-price');
    this.checkoutBtn = document.getElementById('checkout-btn');
    
   
    this.inicializar();
  }
  
  inicializar() {
    this.renderizarCarrinho();
    
    if (this.checkoutBtn) {
      this.checkoutBtn.addEventListener('click', (e) => {
        if (carrinho.itens.length === 0) {
          e.preventDefault();
          mostrarToast('Adicione produtos ao carrinho para continuar com a compra.', 'error');
        }
      });
    }
  }
  
  renderizarCarrinho() {
    if (carrinho.itens.length === 0) {
      this.mostrarCarrinhoVazio();
      return;
    }
  
    this.mostrarConteudoCarrinho();
    
    this.carrinhoItens.innerHTML = '';

    carrinho.itens.forEach(item => {
      const itemElemento = this.criarElementoItemCarrinho(item);
      this.carrinhoItens.appendChild(itemElemento);
    });

    this.atualizarTotal();
  }
  
  mostrarCarrinhoVazio() {
    this.carrinhoContent.style.display = 'none';
    this.emptyCart.style.display = 'block';
  }
  
  mostrarConteudoCarrinho() {
    this.carrinhoContent.style.display = 'block';
    this.emptyCart.style.display = 'none';
  }
  
  criarElementoItemCarrinho(item) {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.dataset.id = item.id;
    
    itemElement.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}" class="cart-item-image">
      
      <div class="cart-item-details">
        <h3 class="cart-item-name">${item.nome}</h3>
        <p class="cart-item-description">${item.descricaoBreve}</p>
        <p class="cart-item-price">${formatarMoeda(item.preco)}</p>
      </div>
      
      <div class="cart-item-actions">
        <div class="quantity-control">
          <button class="quantity-btn decrease-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" x2="19" y1="12" y2="12"></line></svg>
          </button>
          
          <input type="number" class="quantity-input" value="${item.quantidade}" min="1" max="99">
          
          <button class="quantity-btn increase-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg>
          </button>
        </div>
        
        <button class="remove-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
        </button>
      </div>
    `;
  
    this.configurarEventosItemCarrinho(itemElement, item.id);
    
    return itemElement;
  }
  
  configurarEventosItemCarrinho(itemElement, itemId) {
  
    const decreaseBtn = itemElement.querySelector('.decrease-btn');
    decreaseBtn.addEventListener('click', () => {
      const quantityInput = itemElement.querySelector('.quantity-input');
      const newQuantity = parseInt(quantityInput.value) - 1;
      
      if (newQuantity >= 1) {
        quantityInput.value = newQuantity;
        carrinho.atualizarQuantidade(itemId, newQuantity);
        this.atualizarTotal();
      } else {
        carrinho.removerItem(itemId);
        this.renderizarCarrinho();
      }
    });
   
    const increaseBtn = itemElement.querySelector('.increase-btn');
    increaseBtn.addEventListener('click', () => {
      const quantityInput = itemElement.querySelector('.quantity-input');
      const newQuantity = parseInt(quantityInput.value) + 1;
      
      if (newQuantity <= 99) {
        quantityInput.value = newQuantity;
        carrinho.atualizarQuantidade(itemId, newQuantity);
        this.atualizarTotal();
      }
    });

    const quantityInput = itemElement.querySelector('.quantity-input');
    quantityInput.addEventListener('change', () => {
      let newQuantity = parseInt(quantityInput.value);
    
      if (isNaN(newQuantity) || newQuantity < 1) {
        newQuantity = 1;
        quantityInput.value = 1;
      } else if (newQuantity > 99) {
        newQuantity = 99;
        quantityInput.value = 99;
      }
      
      carrinho.atualizarQuantidade(itemId, newQuantity);
      this.atualizarTotal();
    });
    
    const removeBtn = itemElement.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => {
      carrinho.removerItem(itemId);
      this.renderizarCarrinho();
    });
  }
  
  atualizarTotal() {
    const total = carrinho.calcularTotal();
    this.totalElement.textContent = formatarMoeda(total);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const paginaCarrinho = new PaginaCarrinho();
});