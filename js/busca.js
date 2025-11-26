// Importa produtos (certifique-se que produtos.js está incluído antes deste script)
const campoBusca = document.getElementById("busca");
const caixaResultados = document.getElementById("resultados-busca");

campoBusca.addEventListener("input", function () {
  const texto = this.value.toLowerCase();

  if (texto.trim() === "") {
    caixaResultados.style.display = "none";
    return;
  }

  // Filtra produtos
  const filtrados = produtos
    .filter((p) => p.nome.toLowerCase().includes(texto))
    .sort((a, b) => a.nome.localeCompare(b.nome));

  // Se nada encontrado
  if (filtrados.length === 0) {
    caixaResultados.innerHTML = "<div>Nenhum produto encontrado</div>";
    caixaResultados.style.display = "block";
    return;
  }

  // Monta a lista
  caixaResultados.innerHTML = filtrados
    .map(
      (p) => `<div class="item-resultado" data-id="${p.id}">${p.nome}</div>`
    )
    .join("");

  caixaResultados.style.display = "block";
});

// Clique em um resultado → vai para página do produto
caixaResultados.addEventListener("click", function (e) {
  if (e.target.classList.contains("item-resultado")) {
    const id = e.target.getAttribute("data-id");
    window.location.href = `produto.html?id=${id}`;
  }
});

// Fechar resultados ao clicar fora
document.addEventListener("click", function (e) {
  if (!campoBusca.contains(e.target) && !caixaResultados.contains(e.target)) {
    caixaResultados.style.display = "none";
  }
});

// Fechar resultados ao pressionar ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    caixaResultados.style.display = "none";
  }
});