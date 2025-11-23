// Banco de dados simples de produtos
const produtos = {
  1: {
    nome: "Camiseta Nike DryFit",
    preco: "R$ 129,90",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    descricao:
      "Camiseta esportiva leve e respirável, ideal para treinos intensos."
  },
  2: {
    nome: "Tênis Adidas Runner",
    preco: "R$ 399,90",
    img: "https://images.unsplash.com/photo-1606813902911-1310ae2446a3?w=800",
    descricao:
      "Tênis com amortecimento reforçado e tecido respirável de alta qualidade."
  },
  3: {
    nome: "Bola de Futebol Puma",
    preco: "R$ 89,90",
    img: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?w=800",
    descricao:
      "Bola oficial com textura profissional e alta durabilidade."
  }
};

// Pega ID da URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Preenche a lista de tamanhos (35 até 44)
const tamanhoSelect = document.getElementById("tamanho");
for (let t = 35; t <= 44; t++) {
  const opt = document.createElement("option");
  opt.value = t;
  opt.textContent = t;
  tamanhoSelect.appendChild(opt);
}

// Se o produto existe
if (produtos[id]) {
  const p = produtos[id];

  document.getElementById("produto-img").src = p.img;
  document.getElementById("produto-nome").textContent = p.nome;
  document.getElementById("produto-preco").textContent = p.preco;
  document.getElementById("produto-descricao").textContent = p.descricao;

} else {
  // Produto não encontrado
  document.getElementById("produto-nome").textContent = "Produto não encontrado";
  document.getElementById("produto-img").src =
    "https://via.placeholder.com/400x300?text=Produto+Nao+Encontrado";
}
