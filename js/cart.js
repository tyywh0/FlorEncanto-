// Gerenciamento do carrinho de compras


class ItemCarrinho {
  constructor(produto, quantidade = 1) {
    this.id = produto.id;
    this.nome = produto.nome;
    this.preco = produto.preco;
    this.imagem = produto.imagem;
    this.descricaoBreve = produto.descricaoBreve;
    this.quantidade = quantidade;
  }
}

class CarrinhoDeCompras {
  constructor() {
    this.itens = this.carregarCarrinho();
  }
  
  carregarCarrinho() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  }
  
  salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(this.itens));
    this.atualizarContadorVisivel();
  }
  adicionarItem(produto, quantidade = 1) {
    const itemExistente = this.itens.find(item => item.id === produto.id);
    
    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      const novoItem = new ItemCarrinho(produto, quantidade);
      this.itens.push(novoItem);
    }
    
    this.salvarCarrinho();
    return true;
  }
  
  removerItem(id) {
    this.itens = this.itens.filter(item => item.id !== id);
    this.salvarCarrinho();
  }
 
  atualizarQuantidade(id, quantidade) {
    if (quantidade <= 0) {
      this.removerItem(id);
      return;
    }
    
    const item = this.itens.find(item => item.id === id);
    if (item) {
      item.quantidade = quantidade;
      this.salvarCarrinho();
    }
  }

  limparCarrinho() {
    this.itens = [];
    this.salvarCarrinho();
  }
 
  calcularTotal() {
    return this.itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  }
 
  calcularQuantidadeTotal() {
    return this.itens.reduce((total, item) => total + item.quantidade, 0);
  }

  atualizarContadorVisivel() {
    const contadores = document.querySelectorAll('.cart-count');
    const quantidade = this.calcularQuantidadeTotal();
    
    contadores.forEach(contador => {
      contador.textContent = quantidade;
      
      if (quantidade > 0) {
        contador.style.display = 'flex';
      } else {
        contador.style.display = 'none';
      }
    });
  }
}

const carrinho = new CarrinhoDeCompras();

function atualizarContadorCarrinho() {
  carrinho.atualizarContadorVisivel();
}

function adicionarAoCarrinho(idProduto) {
  const produto = obterProdutoPorId(idProduto);
  
  if (produto) {
    carrinho.adicionarItem(produto);
    mostrarToast(`${produto.nome} foi adicionado ao carrinho!`, 'success');
    return true;
  }
  
  mostrarToast('Erro ao adicionar produto', 'error');
  return false;
}