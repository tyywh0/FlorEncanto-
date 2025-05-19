const produtos = [
  {
    id: 1,
    nome: "Buquê de Rosas",
    descricaoBreve: "Buquê de rosas clássicas, símbolo de amor, beleza e romantismo.",
    descricao: "Buquê de Rosas vermelhas, joias vivas da natureza, encantam com sua intensidade e delicadeza. Suas pétalas suaves, em tons que vão do escarlate ao rubi, exalam amor, paixão e romance ardente — como se cada flor guardasse um segredo do coração.",
    preco: 181.90,
    imagem: "./imagens/rosas.png",
    categoria: "roses",
    destaque: true,
    disponivel: true
  },
  {
    id: 2,
    nome: "Buquê de Tulipas",
    descricaoBreve: "Buquê de tulipas frescas que transmite delicadeza, amor e sofisticação.",
    descricao: "Celebre momentos especiais com a leveza e o charme do nosso Buquê de Tulipas. Com cores vibrantes e pétalas suaves, cada tulipa é cuidadosamente selecionada para compor um arranjo harmonioso e cheio de significado. Ideal para presentear em aniversários, declarações românticas ou simplesmente para alegrar o dia de alguém querido. Uma escolha clássica que nunca sai de moda.",
    preco: 72.90,
    imagem: "./imagens/tulipasbuque.png",
    categoria: "tulips",
    destaque: true,
    disponivel: true
  },
  {
    id: 3,
    nome: "Buquê de Girassóis",
    descricaoBreve: "Buquê vibrante de girassóis, ideal para iluminar o dia com alegria e energia.",
    descricao: "Um buquê radiante de girassóis frescos, perfeito para transmitir positividade, calor e felicidade. Ideal para celebrações, agradecimentos ou para alegrar qualquer ambiente com seu charme solar.",
    preco: 179.90,
    imagem: "./imagens/buquegirassois.png",
    categoria: "sunflowers",
    destaque: true,
    disponivel: true
  },
  {
    id: 4,
    nome: "Buquê de Margaridas Azuis",
    descricaoBreve: "Buquê delicado de margaridas azuis, símbolo de serenidade e encantamento.",
    descricao: "Encantador buquê de margaridas azuis frescas, ideal para expressar calma, ternura e originalidade. Perfeito para presentear com leveza e sofisticação em momentos especiais.",
    preco: 113.50,
    imagem: "./imagens/margaridasazuis.png",
    categoria: "daisies",
    destaque: true,
    disponivel: true
  },
  {
    id: 5,
    nome: "Rosas Premium",
    descricaoBreve: "Buquê sofisticado de rosas premium, ideal para impressionar com elegância.",
    descricao: "Um buquê luxuoso composto por rosas premium selecionadas, de pétalas aveludadas e aparência impecável. Ideal para ocasiões que pedem requinte, amor intenso e uma demonstração marcante de carinho e admiração.",
    preco: 199.90,
    imagem: "./imagens/rosaspremium.jpg",
    categoria: "roses",
    destaque: false,
    disponivel: true
  },
  {
    id: 6,
    nome: "Tulipas Exóticas",
    descricaoBreve: "Buquê de tulipas exóticas, para surpreender com beleza única e charme incomum.",
    descricao: "Um buquê refinado com tulipas exóticas de cores vibrantes e formas marcantes, perfeito para presentear com originalidade e sofisticação. Ideal para quem valoriza o inusitado e deseja transmitir sentimentos de admiração, elegância e exclusividade.",
    preco: 219.90,
    imagem: "./imagens/tulipasexoticas.jpg",
    categoria: "tulips",
    destaque: false,
    disponivel: true
  },
  {
    id: 7,
    nome: "Girassóis Gigantes",
    descricaoBreve: "Buquê de girassóis gigantes, cheio de luz e alegria.",
    descricao: "Um deslumbrante buquê de girassóis gigantes, com flores imponentes que irradiam energia, vitalidade e otimismo. Ideal para iluminar ambientes ou presentear com uma mensagem de felicidade e força.",
    preco: 179.90,
    imagem: "./imagens/girassoisgigantes.jpg",
    categoria: "sunflowers",
    destaque: false,
    disponivel: true
  },
  {
    id: 8,
    nome: "Arranjo de Lírios",
    descricaoBreve: "Arranjo elegante de lírios, símbolo de pureza e sofisticação.",
    descricao: "Um arranjo refinado de lírios frescos, cuidadosamente compostos para transmitir serenidade, elegância e beleza atemporal. Ideal para ocasiões especiais ou para transformar qualquer espaço com um toque de classe natural.",
    preco: 189.90,
    imagem: "./imagens/arranjolirios.jpg",
    categoria: "lilies",
    destaque: false,
    disponivel: true
  }
];

const categorias = [
  { id: 'all', nome: 'Todos' },
  { id: 'roses', nome: 'Rosas' },
  { id: 'tulips', nome: 'Tulipas' },
  { id: 'sunflowers', nome: 'Girassóis' },
  { id: 'daisies', nome: 'Margaridas' },
  { id: 'lilies', nome: 'Lírios' },
  { id: 'orchids', nome: 'Orquídeas' }
];

function obterProdutos(categoria) {
  if (!categoria || categoria === 'all') {
    return produtos;
  }
  return produtos.filter(produto => produto.categoria === categoria);
}

function obterProdutosDestacados() {
  return produtos.filter(produto => produto.destaque);
}

function obterProdutoPorId(id) {
  const idProduto = parseInt(id);
  if (isNaN(idProduto)) return null;
  
  return produtos.find(produto => produto.id === idProduto) || null;
}

function obterCategorias() {
  return categorias;
}

function buscarProdutos(termo) {
  if (!termo || termo.trim() === '') return produtos;
  
  const termoBusca = termo.toLowerCase().trim();
  return produtos.filter(produto => 
    produto.nome.toLowerCase().includes(termoBusca) || 
    produto.descricao.toLowerCase().includes(termoBusca) ||
    produto.categoria.toLowerCase().includes(termoBusca)
  );
}