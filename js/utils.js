
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function obterParametroURL(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function criarCardProduto(produto, mostrarPreco = true) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.id = produto.id;
  
  const overlay = document.createElement('div');
  overlay.className = 'product-overlay';
  
  const botaoVer = document.createElement('a');
  botaoVer.href = `produto.html?id=${produto.id}`;
  botaoVer.className = 'btn-primary';
  botaoVer.textContent = 'Ver';
  
  overlay.appendChild(botaoVer);
  
  const conteudo = `
    <div class="product-image" style="background-image: url('${produto.imagem}')">
      ${mostrarPreco ? `<div class="product-price-tag">${formatarMoeda(produto.preco)}</div>` : ''}
    </div>
    <div class="product-details">
      <h3 class="product-name">${produto.nome}</h3>
      ${mostrarPreco 
        ? `<p class="product-description">${produto.descricaoBreve}</p>` 
        : `<p class="product-price">${formatarMoeda(produto.preco)}</p>`
      }
    </div>
  `;
  
  card.innerHTML = conteudo;
  card.appendChild(overlay);
  
  return card;
}

function mostrarToast(mensagem, tipo = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  const toastContent = document.getElementById('toast-content');
  toastContent.textContent = mensagem;
  
  toast.className = 'toast show';
  if (tipo === 'success') toast.classList.add('toast-success');
  if (tipo === 'error') toast.classList.add('toast-error');

  setTimeout(() => {
    toast.classList.remove('show', 'toast-success', 'toast-error');
  }, 3000);
}

function configurarMenuMobile() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }
}

function configurarRodape() {
  const anoElemento = document.getElementById('current-year');
  if (anoElemento) {
    anoElemento.textContent = new Date().getFullYear();
  }
}

function configurarBusca() {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const searchInputMobile = document.getElementById('search-input-mobile');
  const searchButtonMobile = document.getElementById('search-button-mobile');
  
  const realizarBusca = (input) => {
    if (input && input.value.trim()) {
      window.location.href = `catalogo.html?busca=${encodeURIComponent(input.value.trim())}`;
    }
  };
  
  if (searchInput && searchButton) {
    searchButton.addEventListener('click', () => realizarBusca(searchInput));
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') realizarBusca(searchInput);
    });
  }
  
  if (searchInputMobile && searchButtonMobile) {
    searchButtonMobile.addEventListener('click', () => realizarBusca(searchInputMobile));
    searchInputMobile.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') realizarBusca(searchInputMobile);
    });
  }
}

function inicializarPagina() {
  configurarMenuMobile();
  configurarRodape();
  configurarBusca();
  atualizarContadorCarrinho();
}

document.addEventListener('DOMContentLoaded', inicializarPagina);