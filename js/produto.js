// JavaScript para a página de detalhes do produto

class DetalheProduto {
  constructor() {
    this.produtoContainer = document.getElementById('product-container');
    this.produtoLoading = document.getElementById('product-loading');
    this.produtoContent = document.getElementById('product-content');
    this.produtoNotFound = document.getElementById('product-not-found');
    
    this.produtoImagem = document.getElementById('product-image');
    this.produtoCategoria = document.getElementById('product-category');
    this.produtoTitulo = document.getElementById('product-title');
    this.produtoDescricao = document.getElementById('product-description');
    this.produtoPreco = document.getElementById('product-price');
    this.adicionarCarrinhoBtn = document.getElementById('add-to-cart-btn');
    
    this.produtoId = obterParametroURL('id');
    this.produto = null;
    
    this.inicializar();
  }
  
  inicializar() {
    if (!this.produtoId) {
      this.mostrarProdutoNaoEncontrado();
      return;
    }
 
    this.carregarProduto();
  }
  
  carregarProduto() {
    try {
      const produto = obterProdutoPorId(this.produtoId);
      
      if (!produto) {
        this.mostrarProdutoNaoEncontrado();
        return;
      }
      
      this.produto = produto;
     
      this.renderizarProduto();
    
      this.configurarBotaoAdicionarCarrinho();

      document.title = `${produto.nome} | FlorEncanto`;
    } catch (erro) {
      console.error('Erro ao carregar produto:', erro);
      this.mostrarProdutoNaoEncontrado();
    }
  }
  
  renderizarProduto() {
    this.produtoImagem.src = this.produto.imagem;
    this.produtoImagem.alt = this.produto.nome;
    
    this.produtoCategoria.textContent = this.getCategoriaTexto(this.produto.categoria);
    this.produtoTitulo.textContent = this.produto.nome;
    this.produtoDescricao.textContent = this.produto.descricao;
    this.produtoPreco.textContent = formatarMoeda(this.produto.preco);
    
    this.produtoLoading.style.display = 'none';
    this.produtoContent.style.display = 'flex';
  }
  
  getCategoriaTexto(categoriaId) {
    const categoria = categorias.find(cat => cat.id === categoriaId);
    return categoria ? categoria.nome : 'Produto';
  }
  
  configurarBotaoAdicionarCarrinho() {
    if (this.adicionarCarrinhoBtn) {
      this.adicionarCarrinhoBtn.addEventListener('click', () => {
        adicionarAoCarrinho(this.produto.id);
      });
    }
  }
  
  mostrarProdutoNaoEncontrado() {
    this.produtoLoading.style.display = 'none';
    this.produtoContent.style.display = 'none';
    
    this.produtoNotFound.style.display = 'block';
    
    document.title = 'Produto não encontrado | FlorEncanto';
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const detalheProduto = new DetalheProduto();
});