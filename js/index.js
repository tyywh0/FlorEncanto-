
class HeroSlider {
  constructor(sliderId) {
    this.slider = document.getElementById(sliderId);
    if (!this.slider) return;
    
    this.slides = this.slider.querySelectorAll('.slide');
    this.dotsContainer = this.slider.querySelector('.slider-controls');
    this.dots = this.slider.querySelectorAll('.slider-dot');
    this.currentIndex = 0;
    this.slidesCount = this.slides.length;
    this.slideInterval = null;
    
    this.inicializar();
  }
  
  inicializar() {
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.irParaSlide(index));
    });
    
    this.iniciarSlideAutomatico();
  
    this.slider.addEventListener('mouseenter', () => this.pararSlideAutomatico());
    this.slider.addEventListener('mouseleave', () => this.iniciarSlideAutomatico());
  }
  
  irParaSlide(index) {

    this.slides.forEach(slide => slide.classList.remove('active'));
    this.dots.forEach(dot => dot.classList.remove('active'));
    
    this.slides[index].classList.add('active');
    this.dots[index].classList.add('active');

    this.currentIndex = index;
   
    const slidesContainer = this.slider.querySelector('.slides');
    if (slidesContainer) {
      slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    }
  }
  
  proximoSlide() {
    const nextIndex = (this.currentIndex + 1) % this.slidesCount;
    this.irParaSlide(nextIndex);
  }
  
  slideAnterior() {
    const prevIndex = (this.currentIndex - 1 + this.slidesCount) % this.slidesCount;
    this.irParaSlide(prevIndex);
  }
  
  iniciarSlideAutomatico() {
    this.pararSlideAutomatico(); // Limpar qualquer intervalo existente
    this.slideInterval = setInterval(() => this.proximoSlide(), 5000);
  }
  
  pararSlideAutomatico() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }
}

class Categorias {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.botoes = this.container.querySelectorAll('.category-btn');
    this.inicializar();
  }
  
  inicializar() {
    this.botoes.forEach(botao => {
      botao.addEventListener('click', () => {
        this.botoes.forEach(b => b.classList.remove('active'));
        
      
        botao.classList.add('active');
        
        const categoria = botao.dataset.category;
        window.location.href = `catalogo.html${categoria === 'all' ? '' : `?categoria=${categoria}`}`;
      });
    });
  }
}

class ProdutosDestaque {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.carregarProdutos();
  }
  
  carregarProdutos() {
    try {
      const produtosDestacados = obterProdutosDestacados();
      
      this.container.innerHTML = '';
      
      if (produtosDestacados.length === 0) {
        this.container.innerHTML = '<p class="no-products">Nenhum produto em destaque disponível no momento.</p>';
        return;
      }
      
      produtosDestacados.forEach(produto => {
        const cardProduto = criarCardProduto(produto, false);
        this.container.appendChild(cardProduto);
      });
    } catch (erro) {
      console.error('Erro ao carregar produtos em destaque:', erro);
      this.container.innerHTML = '<p class="error">Erro ao carregar produtos. Por favor, tente novamente mais tarde.</p>';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {

  const heroSlider = new HeroSlider('hero-slider');

  const categorias = new Categorias('category-slider');
  
  const produtosDestaque = new ProdutosDestaque('featured-products');
});