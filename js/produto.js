(function () {
  const products = [
    {
      id: "p1",
      nome: "Bola de Basquete Oficial",
      preco: 89.9,
      img: "../images/bola_basquete.png",
      descricao:
        "Bola profissional de basquete com borracha sintética de alta durabilidade. Costura reforçada e ótima aderência para treinos e jogos.",
    },
    {
      id: "p2",
      nome: "Short Adidas Performance",
      preco: 129.5,
      img: "../images/short_adidas.png",
      descricao:
        "Short leve com tecido respirável e tecnologia de secagem rápida. Ideal para corrida e treinos de alta intensidade.",
    },
    {
      id: "p3",
      nome: "Relógio Smart Corrida",
      preco: 59.0,
      img: "../images/relogio_smart_corrida.png",
      descricao:
        "Relógio esportivo com monitor de batimentos, cronômetro e resistência à água. Perfeito para corridas e atividades ao ar livre.",
    },
    {
      id: "p4",
      nome: "Boné Unissex Nike",
      preco: 199.9,
      img: "../images/bone_unissex_nike.png",
      descricao:
        "Boné unissex com design clássico, tecido confortável e proteção UV. Ajuste traseiro para maior comodidade.",
    },
    {
      id: "p5",
      nome: "Kit Beach Tennis",
      preco: 39.9,
      img: "../images/kit_beach_tennis.png",
      descricao:
        "Kit para iniciantes em beach tennis: raquetes leves e bolas de qualidade para partidas divertidas na praia.",
    },
    {
      id: "p6",
      nome: "Kit Mini Band Oxer",
      preco: 249.0,
      img: "../images/kit_mini_band_oxer.png",
      descricao:
        "Conjunto de mini bands com 5 níveis de resistência para treinos de força e reabilitação. Compacto e fácil de transportar.",
    },
    {
      id: "p7",
      nome: "Camiseta Nike",
      preco: 89.9,
      img: "../images/regata_nike_masc.png",
      descricao:
        "Camiseta Nike confeccionada em tecido Dry-FIT, garantindo respirabilidade e secagem rápida durante treinos intensos. Possui modelagem padrão, costuras reforçadas e gola careca para maior conforto e mobilidade.",
    },
    {
      id: "p8",
      nome: "Moletom Adidas",
      preco: 199.9,
      img: "../images/moletom_adidas_masc.png",
      descricao:
        "Moletom Adidas produzido em fleece de alta densidade, oferecendo isolamento térmico e maciez ao toque. Conta com capuz ajustável, bolso canguru e estampa minimalista com o logo oficial da marca.",
    },
    {
      id: "p9",
      nome: "Luva de Boxe Naja",
      preco: 159.9,
      img: "../images/luva_box_naja.png",
      descricao:
        "Luva de Boxe Naja desenvolvida em PU premium com enchimento multicamadas de alta absorção de impacto. Fecho por velcro duplo para melhor firmeza nos punhos e ventilação lateral para reduzir o acúmulo de suor.",
    },
    {
      id: "p10",
      nome: "Blusa Nike",
      preco: 129.9,
      img: "../images/blusa_nike_fem.png",
      descricao:
        "Blusa Nike feminina feita com tecido leve e elástico, ideal para caminhadas e treinos. Possui acabamento antiodor, caimento regular e detalhes refletivos para maior segurança em atividades noturnas.",
    },
    {
      id: "p11",
      nome: "Short Adidas",
      preco: 149.9,
      img: "../images/short_adidas.png",
      descricao:
        "Short Adidas de performance, confeccionado em poliéster respirável com tecnologia AeroReady. Conta com cós elástico ajustável, forro interno e bolsos laterais para suporte durante treinos e corridas.",
    },
    {
      id: "p12",
      nome: "Calça Puma",
      preco: 199.9,
      img: "../images/calca_puma.png",
      descricao:
        "Calça Puma em moletom premium, oferecendo conforto térmico e durabilidade. Possui modelagem jogging, cordão ajustável, punhos de ribana e bolsos laterais amplos para uso esportivo ou casual.",
    },
    {
      id: "p13",
      nome: "Conjunto Calça e Moletom Infantil",
      preco: 89.9,
      img: "../images/conj_calca_moletom_inf.png",
      descricao:
        "Conjunto infantil composto por calça e moletom em algodão macio, ideal para dias frios. Apresenta toque suave, elasticidade leve e reforço nas costuras, garantindo durabilidade e conforto para brincadeiras.",
    },
    {
      id: "p14",
      nome: "Kimono Infantil",
      preco: 99.9,
      img: "../images/kimono_inf.png",
      descricao:
        "Kimono infantil fabricado em trançado leve e resistente, recomendado para prática de artes marciais. Conta com costuras reforçadas, faixa inclusa e modelagem confortável para facilitar movimentos.",
    },
    {
      id: "p15",
      nome: "Tênis Nike Infantil",
      preco: 49.9,
      img: "../images/tenis_nike_inf.png",
      descricao:
        "Tênis Nike infantil com solado em EVA antiderrapante e cabedal respirável. Modelo leve, confortável e com ajuste em velcro para facilitar o calce, perfeito para uso diário e atividades escolares.",
    },
  ];

  function qs(name) {
    const u = new URL(location.href);
    return u.searchParams.get(name);
  }

  function formatPrice(v) {
    return Number(v).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const imgEl = document.getElementById("produto-imagem");
  const nomeEl = document.getElementById("produto-nome");
  const precoEl = document.getElementById("produto-preco");
  const descEl = document.getElementById("produto-desc");
  const btnAdd = document.getElementById("btn-add");
  const starsWrap = document.getElementById("stars");
  const avaliacaoNum = document.getElementById("avaliacao-num");
  const comentInput = document.getElementById("coment");
  const comentBtn = document.getElementById("coment-submit");
  const imgWrap = document.getElementById("imgWrap");
  const zoomBtn = document.getElementById("zoomBtn");

  // carregar produto
  const pid = qs("id") || "p1";
  const product = products.find((p) => p.id === pid) || products[0];

  function renderProduct(p) {
    imgEl.src = p.img;
    imgEl.alt = p.nome;
    nomeEl.textContent = p.nome;
    precoEl.textContent = formatPrice(p.preco);
    descEl.textContent = p.descricao;

    const ratingKey = `rating_${p.id}`;
    const commentKey = `comments_${p.id}`;

    let rating = Number(localStorage.getItem(ratingKey) || 0);
    let ratingCount = Number(localStorage.getItem(ratingKey + "_count") || 0);

    starsWrap.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const btn = document.createElement("button");
      btn.setAttribute("data-star", i);
      btn.innerHTML = starSVG();
      if (i <= rating) btn.classList.add("active");
      btn.addEventListener("click", () => {
        rating = i;
        ratingCount = ratingCount + 1;
        localStorage.setItem(ratingKey, rating);
        localStorage.setItem(ratingKey + "_count", ratingCount);
        updateRatingUI();
      });
      starsWrap.appendChild(btn);
    }
    updateRatingUI();

    const comments = JSON.parse(localStorage.getItem(commentKey) || "[]");
    if (comments.length) {
      comentInput.value = comments[comments.length - 1].text || "";
    } else {
      comentInput.value = "";
    }

    btnAdd.onclick = () => {
      const item = {
        id: p.id,
        nome: p.nome,
        preco: Number(p.preco),
        qty: 1,
      };

      if (window.__carrinho && typeof window.__carrinho.addItem === "function") {
        window.__carrinho.addItem(item);
      } else {
        const key = "carrinho_loja";
        const raw = localStorage.getItem(key);
        const cart = raw ? JSON.parse(raw) : {};
        if (cart[item.id]) cart[item.id].qty += 1;
        else cart[item.id] = item;
        localStorage.setItem(key, JSON.stringify(cart));
      }

      btnAdd.textContent = "Adicionado ✓";
      btnAdd.classList.add("added");
      setTimeout(() => {
        btnAdd.textContent = "Adicionar ao Carrinho";
        btnAdd.classList.remove("added");
      }, 850);
    };

    comentBtn.onclick = () => {
      const text = comentInput.value.trim();
      if (!text) return alert("Escreva algo antes de enviar.");
      const key = `comments_${p.id}`;
      const arr = JSON.parse(localStorage.getItem(key) || "[]");
      arr.push({ text, at: Date.now() });
      localStorage.setItem(key, JSON.stringify(arr));
      alert("Comentário salvo!");
    };
  }

  function updateRatingUI() {
    const ratingKey = `rating_${product.id}`;
    const rating = Number(localStorage.getItem(ratingKey) || 0);
    const ratingCount = Number(localStorage.getItem(ratingKey + "_count") || 0);

    Array.from(starsWrap.children).forEach((btn) => {
      const n = Number(btn.getAttribute("data-star"));
      btn.classList.toggle("active", n <= rating);
    });

    avaliacaoNum.textContent = rating
      ? `${rating}.0 (${ratingCount})`
      : "Sem avaliações";
  }

  function toggleZoom() {
    imgWrap.classList.toggle("zoomed");
  }
  imgEl.addEventListener("click", toggleZoom);
  zoomBtn.addEventListener("click", toggleZoom);

  function starSVG() {
    return `<svg viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>`;
  }

  renderProduct(product);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && imgWrap.classList.contains("zoomed")) {
      imgWrap.classList.remove("zoomed");
    }
  });
})();
