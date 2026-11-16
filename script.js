const PROJETOS = [
  {
    destaque: true,
    titulo: "PADIM’MUSIC",
    resumo:
      "Plataforma de streaming de música, evoluída a partir de um clone do Spotify em front-end até virar produto com back-end, banco e deploy.",
    recursos: [
      "Cadastro e login (bcrypt + JWT)",
      "Playlists por usuário",
      "Podcasts",
      "Músicas em alta no Brasil via API do iTunes",
      "3 idiomas",
      "Player completo",
    ],
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express",
      "PostgreSQL (Aiven)",
      "Render",
    ],
    prova:
      "Que consigo levar uma ideia de ponta a ponta: tela, API, banco, testes e publicação.",
    desafio:
      "Sair do front-end puro para um back-end real: autenticação segura, rate limit, Helmet, CORS, migrações no PostgreSQL e testes automatizados.",
    aprendi:
      "Como as camadas conversam, da interface ao banco, e o que muda ao rodar em produção no Render com banco hospedado no Aiven.",
    nota: "A v1 toca prévias de 30 s. A versão completa é meta futura.",
    demo: "https://padimmusic.onrender.com",
    codigo: "[link do repositório]",
    midia: {
      src: "images/padim-music.webp",
      alt: "Tela inicial do PADIM’MUSIC com a lista “Em alta no Brasil”, busca e playlists",
      w: 1600,
      h: 909,
    },
  },
  {
    titulo: "Attack on Titan",
    resumo:
      "Site temático em HTML, CSS, JavaScript e Bootstrap, publicado no Netlify.",
    stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    prova: "Layout responsivo e publicação de um site estático.",
    demo: "https://attack-on-titan26.netlify.app",
    codigo: "https://github.com/thiagopereira19/attack-on-titan",
  },
  {
    titulo: "Controle de EPIs",
    resumo:
      "Sistema de controle de EPIs para construção civil, em PHP + MySQL, com deploy no Render e Aiven.",
    stack: ["PHP", "MySQL", "Render", "Aiven"],
    prova:
      "Back-end com banco relacional aplicado a um problema do mundo real.",
    status: "no ar",
    demo: "https://sistema-epis-1.onrender.com",
    codigo: "[link]",
  },
  {
    titulo: "Pipocaí",
    resumo: "Site estilo Netflix com banner em vídeo, carrossel e modal.",
    stack: ["HTML", "CSS", "JavaScript", "Bootstrap 4"],
    prova: "Componentes de interface interativos: carrossel e modal.",
    status: "em andamento",
    demo: "[link]",
    codigo: "[link]",
  },
];
const CLONES = ["Clone do Spotify", "Clone da Starbucks", "Clone de cassino"];

// monta os projetos na tela
const criar = (t, c, x) => {
  const n = document.createElement(t);
  if (c) n.className = c;
  if (x != null) n.textContent = x;
  return n;
};
const urlValida = (u) => /^https?:/.test(u || "");
const lista = (arr, c) => {
  const u = criar("ul", c);
  arr.forEach((i) => u.append(criar("li", null, i)));
  return u;
};

function links(p) {
  const d = criar("div", "links");
  [
    ["Demo", p.demo],
    ["Código", p.codigo],
  ].forEach(([l, u]) => {
    if (urlValida(u)) {
      const a = criar("a", null, l + " ↗");
      a.href = u;
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute("aria-label", `${l} de ${p.titulo} (abre em nova aba)`);
      d.append(a);
    } else d.append(criar("span", "pend", `${l} ${u || "[link]"}`));
  });
  return d;
}
function midia(p) {
  const m = criar("div", "midia");
  if (p.midia) {
    const i = criar("img");
    i.src = p.midia.src;
    i.alt = p.midia.alt;
    i.width = p.midia.w;
    i.height = p.midia.h;
    i.loading = "lazy";
    m.append(i);
  } else {
    const k = criar("div", "mock");
    k.setAttribute("role", "img");
    k.setAttribute("aria-label", `Ilustração da interface do ${p.titulo}`);
    k.innerHTML =
      '<i class="side"></i><div class="main"><b></b><b></b><b></b><div class="eq"><u></u><u></u><u></u><u></u><u></u><u></u></div></div><div class="bar"><span></span></div>';
    m.append(
      k,
      criar("small", "cap pend", "Ilustração · [trocar por print real]"),
    );
  }
  return m;
}
function destaque(p) {
  const a = criar("article", "destaque reveal");
  const c = criar("div", "corpo");
  c.append(
    criar("span", "selo", "Projeto principal"),
    criar("h3", null, p.titulo),
    criar("p", null, p.resumo),
  );
  [
    ["O que prova: ", p.prova],
    ["Desafio técnico: ", p.desafio],
    ["O que aprendi: ", p.aprendi],
  ].forEach(([k, v]) => {
    if (!v) return;
    const q = criar("p");
    q.append(criar("strong", null, k), document.createTextNode(v));
    c.append(q);
  });
  if (p.nota) c.append(criar("p", "pend", p.nota));
  c.append(links(p));
  const s = criar("aside");
  s.append(
    criar("h4", null, "Funcionalidades"),
    lista(p.recursos || []),
    criar("h4", null, "Stack"),
    lista(p.stack || [], "tags"),
  );
  a.append(midia(p), c, s);
  return a;
}
function card(p) {
  const a = criar("article", "card reveal");
  a.append(
    lista(p.stack || [], "tags"),
    criar("h3", null, p.titulo),
    criar("p", null, p.resumo),
  );
  if (p.prova) {
    const q = criar("p");
    q.append(
      criar("strong", null, "O que prova: "),
      document.createTextNode(p.prova),
    );
    a.append(q);
  }
  if (p.status) a.append(criar("p", "pend", "Status: " + p.status));
  a.append(links(p));
  return a;
}
PROJETOS.forEach((p) =>
  (p.destaque
    ? document.getElementById("destaque")
    : document.getElementById("grade")
  ).append(p.destaque ? destaque(p) : card(p)),
);
CLONES.forEach((c) =>
  document.getElementById("clones").append(criar("li", null, c)),
);

// tema claro/escuro
const root = document.documentElement;
document.getElementById("tema").addEventListener("click", () => {
  const atual =
    root.dataset.theme ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const prox = atual === "dark" ? "light" : "dark";
  root.dataset.theme = prox;
  try {
    localStorage.setItem("tema", prox);
  } catch (e) {}
});

// animação ao rolar a página
const itens = document.querySelectorAll(".reveal");
if (
  "IntersectionObserver" in window &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12 },
  );
  itens.forEach((i) => io.observe(i));
} else itens.forEach((i) => i.classList.add("in"));

// formulário de contato (Web3Forms)
// a chave vem por e-mail em web3forms.com (usei Thiagodiju@hotmail.com)
// pode ficar no código, a chave é pública mesmo
const WEB3FORMS_KEY = "COLE_SUA_CHAVE_AQUI";
const chaveOk = WEB3FORMS_KEY.length > 10 && !WEB3FORMS_KEY.includes("COLE");
const form = document.getElementById("form");
const statusEl = document.getElementById("status-form");
function abrirEmail(dados) {
  const corpo = `${dados.message}\n\n${dados.name} (${dados.email})`;
  location.href = `mailto:Thiagodiju@hotmail.com?subject=${encodeURIComponent("Contato pelo portfólio")}&body=${encodeURIComponent(corpo)}`;
}
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const dados = Object.fromEntries(new FormData(form));
  if (dados.botcheck) return;
  if (!chaveOk) {
    statusEl.textContent =
      "Falta colar a chave do Web3Forms no script.js. Abrindo seu app de e-mail…";
    console.error("WEB3FORMS_KEY não configurada");
    return abrirEmail(dados);
  }
  const btn = form.querySelector("button");
  btn.disabled = true;
  statusEl.textContent = "Enviando…";
  try {
    const r = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...dados, access_key: WEB3FORMS_KEY }),
    });
    const res = await r.json();
    if (!res.success) throw new Error(res.message || "resposta sem sucesso");
    form.reset();
    statusEl.textContent = "Mensagem enviada! Respondo em breve.";
  } catch (err) {
    console.error("Erro no envio:", err);
    statusEl.textContent = `Não consegui enviar (${err.message}). Abrindo seu app de e-mail…`;
    abrirEmail(dados);
  }
  btn.disabled = false;
});

document.getElementById("ano").textContent = new Date().getFullYear();

// barra de progresso, menu ativo e brilho que segue o mouse
const secs = [...document.querySelectorAll("main section[id]")];
const navs = [...document.querySelectorAll("nav a")];
const barra = document.querySelector(".progress");
let tick = false;
addEventListener(
  "scroll",
  () => {
    if (tick) return;
    tick = true;
    requestAnimationFrame(() => {
      tick = false;
      barra.style.setProperty(
        "--p",
        scrollY /
          Math.max(1, document.documentElement.scrollHeight - innerHeight),
      );
      const a = secs.filter((s) => s.getBoundingClientRect().top <= 120).pop();
      navs.forEach((n) =>
        n.toggleAttribute(
          "aria-current",
          !!a && n.getAttribute("href") === "#" + a.id,
        ),
      );
    });
  },
  { passive: true },
);
const hero = document.querySelector(".hero");
if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
  addEventListener(
    "pointermove",
    (e) => {
      document.documentElement.style.setProperty("--mx", e.clientX + "px");
      document.documentElement.style.setProperty("--my", e.clientY + "px");
    },
    { passive: true },
  );

// botão de copiar e-mail
document.getElementById("copiar").addEventListener("click", async () => {
  const av = document.getElementById("aviso");
  try {
    await navigator.clipboard.writeText("Thiagodiju@hotmail.com");
    av.textContent = "E-mail copiado!";
  } catch (e) {
    av.textContent = "Copie manualmente: Thiagodiju@hotmail.com";
  }
  setTimeout(() => (av.textContent = ""), 2500);
});
