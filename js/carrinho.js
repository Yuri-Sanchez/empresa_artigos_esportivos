/**
 * cart.js
 * Lógica para adicionar itens, persistir em localStorage,
 * mostrar badge de contagem e manipular a página carrinho.html
 *
 * Atenção: esse arquivo é carregado em index.html e carrinho.html
 */

(function () {
  const STORAGE_KEY = "carrinho_loja";
  const badge = () => document.getElementById("cart-count-badge");

  // lê carrinho do localStorage
  function readCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.error("Erro ao ler carrinho:", e);
      return {};
    }
  }

  // salva carrinho
  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
  }

  // adiciona item (ou incrementa qtd)
  function addItem(item) {
    const cart = readCart();
    if (cart[item.id]) {
      cart[item.id].qty += item.qty;
    } else {
      cart[item.id] = item;
    }
    saveCart(cart);
  }

  // remove item
  function removeItem(id) {
    const cart = readCart();
    if (cart[id]) {
      delete cart[id];
      saveCart(cart);
    }
  }

  // atualizar quantidade
  function updateQty(id, newQty) {
    const cart = readCart();
    if (cart[id]) {
      cart[id].qty = newQty;
      if (cart[id].qty <= 0) delete cart[id];
      saveCart(cart);
    }
  }

  // limpa carrinho
  function clearCart() {
    localStorage.removeItem(STORAGE_KEY);
    updateCartBadge();
  }

  // calcula total
  function calcTotal() {
    const cart = readCart();
    let total = 0;
    Object.values(cart).forEach((it) => {
      total += parseFloat(it.preco) * (it.qty || 0);
    });
    return total;
  }

  // atualiza badge de contagem exibindo soma das quantidades
  function updateCartBadge() {
    const b = badge();
    if (!b) return;
    const cart = readCart();
    let count = 0;
    Object.values(cart).forEach((it) => (count += it.qty || 0));
    b.textContent = count;
  }

  // -> Função para formatação de preços
  function fmt(valor) {
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  // === Handlers para a página index (botões "Adicionar ao Carrinho") ===
  function attachAddButtons() {
    const buttons = document.querySelectorAll(".add-to-cart");
    if (!buttons) return;
    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = btn.dataset.id;
        const nome = btn.dataset.nome || "Produto";
        const preco = parseFloat(btn.dataset.preco || "0");
        const item = {
          id,
          nome,
          preco,
          qty: 1,
        };
        addItem(item);

        // feedback rápido:
        btn.textContent = "Adicionado ✓";
        setTimeout(() => (btn.textContent = "Adicionar ao Carrinho"), 900);

        // atualiza badge
        updateCartBadge();
      });
    });
  }

  // === Funções para carrinho.html (render) ===
  function renderCartPage() {
    // se não estamos na página do carrinho, ignore
    if (!document.getElementById("cart-container")) return;

    const cart = readCart();
    const itemsTbody = document.getElementById("cart-items");
    const wrapper = document.getElementById("cart-table-wrapper");
    const empty = document.getElementById("empty-cart");
    const totalEl = document.getElementById("cart-total");

    // limpar tabela
    itemsTbody.innerHTML = "";

    const keys = Object.keys(cart);
    if (!keys.length) {
      wrapper.style.display = "none";
      empty.style.display = "block";
      updateCartBadge();
      return;
    }

    wrapper.style.display = "block";
    empty.style.display = "none";

    keys.forEach((key) => {
      const it = cart[key];
      const tr = document.createElement("tr");

      // nome
      const tdNome = document.createElement("td");
      tdNome.textContent = it.nome;
      tr.appendChild(tdNome);

      // preco
      const tdPreco = document.createElement("td");
      tdPreco.style.textAlign = "right";
      tdPreco.textContent = fmt(it.preco);
      tr.appendChild(tdPreco);

      // quantidade controles
      const tdQty = document.createElement("td");
      tdQty.style.textAlign = "center";
      const qtyWrap = document.createElement("div");
      qtyWrap.className = "qty-controls";

      const btnMinus = document.createElement("button");
      btnMinus.textContent = "-";
      btnMinus.addEventListener("click", () => {
        updateQty(it.id, (it.qty || 1) - 1);
        renderCartPage(); // rerender
      });

      const spanQty = document.createElement("span");
      spanQty.textContent = it.qty;

      const btnPlus = document.createElement("button");
      btnPlus.textContent = "+";
      btnPlus.addEventListener("click", () => {
        updateQty(it.id, (it.qty || 0) + 1);
        renderCartPage();
      });

      qtyWrap.appendChild(btnMinus);
      qtyWrap.appendChild(spanQty);
      qtyWrap.appendChild(btnPlus);
      tdQty.appendChild(qtyWrap);
      tr.appendChild(tdQty);

      // subtotal
      const tdSub = document.createElement("td");
      tdSub.style.textAlign = "right";
      const subtotal = parseFloat(it.preco) * (it.qty || 0);
      tdSub.textContent = fmt(subtotal);
      tr.appendChild(tdSub);

      // remover
      const tdRem = document.createElement("td");
      tdRem.style.textAlign = "center";
      const remBtn = document.createElement("button");
      remBtn.className = "remove-btn";
      remBtn.textContent = "Remover";
      remBtn.addEventListener("click", () => {
        removeItem(it.id);
        renderCartPage();
      });
      tdRem.appendChild(remBtn);
      tr.appendChild(tdRem);

      itemsTbody.appendChild(tr);
    });

    // total
    totalEl.textContent = "Total: " + fmt(calcTotal());

    // ligar ações de limpar e finalizar
    const clearBtn = document.getElementById("clear-cart");
    if (clearBtn) {
      clearBtn.onclick = () => {
        if (confirm("Deseja limpar todo o carrinho?")) {
          clearCart();
          renderCartPage();
        }
      };
    }

    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.onclick = () => {
        // Aqui você integraria com checkout real (API / redirect etc.)
        // Por enquanto mostraremos um resumo simples.
        const total = calcTotal();
        if (total <= 0) {
          alert("Seu carrinho está vazio.");
          return;
        }
        // Simulação: exibir resumo e limpar carrinho
        if (confirm(`Total da compra: ${fmt(total)}\nDeseja simular finalização?`)) {
          // simula finalizar e limpa
          clearCart();
          alert("Compra simulada! Obrigado.");
          renderCartPage();
        }
      };
    }

    updateCartBadge();
  }

  // === Inicialização ===
  document.addEventListener("DOMContentLoaded", () => {
    attachAddButtons();
    updateCartBadge();
    renderCartPage();
  });

  // Expor funções para console dev (opcional)
  window.__carrinho = {
    readCart,
    saveCart,
    addItem,
    removeItem,
    updateQty,
    clearCart,
  };
})();
