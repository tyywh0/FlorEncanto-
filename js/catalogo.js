// JavaScript para a página de catálogo

class Catalogo {
  constructor() {
    this.produtosContainer = document.getElementById('catalog-products');
    this.noProductsMessage = document.getElementById('no-products');
    this.categorySlider = document.getElementById('category-slider');
    this.categoryButtons = document.querySelectorAll('.category-btn');
    

    this.categoriaAtual = 'all';
    this.termoBusca = '';
    
    this.inicializar();
  }
  
  inicializar() {
    this.categoriaAtual = obterParametroURL('categoria') || 'all';
    this.termoBusca = obterParametroURL('busca') || '';
    
    this.configurarBotoesCategorias();
   
    this.carregarProdutos();
  }
  
  configurarBotoesCategorias() {
    this.categoryButtons.forEach(botao => {
      botao.classList.remove('active');
    
      botao.addEventListener('click', () => {
        const categoria = botao.dataset.category;
        window.location.href = `catalogo.html${categoria === 'all' ? '' : `?categoria=${categoria}`}`;
      });
    });
    
    const botaoAtivo = Array.from(this.categoryButtons).find(
      botao => botao.dataset.category === this.categoriaAtual
    );
    
    if (botaoAtivo) {
      botaoAtivo.classList.add('active');
    } else {
  
      const botaoTodos = Array.from(this.categoryButtons).find(
        botao => botao.dataset.category === 'all'
      );
      
      if (botaoTodos) {
        botaoTodos.classList.add('active');
      }
    }
  }
  
  carregarProdutos() {
    try {
  
      let produtos;
      
      if (this.termoBusca) {
        produtos = buscarProdutos(this.termoBusca);
        document.title = `Busca: ${this.termoBusca} | FLORENCANTO`;
      } else {
        produtos = obterProdutos(this.categoriaAtual);
        
        const nomeCategoria = this.categoriaAtual === 'all' 
          ? 'Todos os Produtos' 
          : categorias.find(cat => cat.id === this.categoriaAtual)?.nome || 'Catálogo';
        
        document.title = `${nomeCategoria} | FLORENCANTO`;
      }
     
      this.produtosContainer.innerHTML = '';
   
      if (produtos.length === 0) {
        this.produtosContainer.style.display = 'none';
        this.noProductsMessage.style.display = 'block';
        return;
      }
      
      this.produtosContainer.style.display = 'grid';
      this.noProductsMessage.style.display = 'none';
      
      produtos.forEach(produto => {
        const cardProduto = criarCardProduto(produto, true);
        this.produtosContainer.appendChild(cardProduto);
      });
    } catch (erro) {
      console.error('Erro ao carregar produtos:', erro);
      this.produtosContainer.innerHTML = '<p class="error">Erro ao carregar produtos. Por favor, tente novamente mais tarde.</p>';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const catalogo = new Catalogo();
});