/* ═══════════════════════════════════════════
   PARTÍCULAS — Canvas Background
═══════════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  /* Redimensiona o canvas para cobrir a tela */
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  /* Cria uma partícula com posição e velocidade aleatórias */
  function Particle() {
    this.x     = Math.random() * W;
    this.y     = Math.random() * H;
    this.vx    = (Math.random() - 0.5) * 0.4;
    this.vy    = (Math.random() - 0.5) * 0.4;
    this.r     = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.4 + 0.1;
  }

  /* Inicializa 80 partículas */
  function init() {
    particles = Array.from({ length: 80 }, () => new Particle());
  }

  /* Loop de animação */
  function draw() {
    ctx.clearRect(0, 0, W, H);

    /* Movimenta e desenha cada partícula */
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      /* Wrap-around nas bordas */
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99,179,237,${p.alpha})`;
      ctx.fill();
    });

    /* Desenha linhas entre partículas próximas */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(167,139,250,${0.12 * (1 - dist / 120)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  /* Inicialização */
  resize();
  init();
  draw();

  /* Recria partículas ao redimensionar a janela */
  window.addEventListener('resize', () => {
    resize();
    init();
  });
})();


/* ═══════════════════════════════════════════
   NAVEGAÇÃO — Troca de seções
═══════════════════════════════════════════ */
(function () {
  const navBtns  = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.section');

  /* Ativa as barras de skill com animação */
  function animateSkillBars() {
    document.querySelectorAll('.bar-fill').forEach(bar => {
      bar.style.transform = `scaleX(${bar.style.getPropertyValue('--w') || 1})`;
      bar.classList.add('go');
    });
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      /* Atualiza botão ativo */
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      /* Exibe a seção correspondente */
      const target = btn.dataset.section;
      sections.forEach(s => {
        s.classList.remove('visible');
        if (s.id === target) s.classList.add('visible');
      });

      /* Anima barras ao abrir a aba de tecnologias */
      if (target === 'tech') {
        setTimeout(animateSkillBars, 80);
      }
    });
  });

  /* Caso a seção de tech já esteja visível no carregamento */
  if (document.getElementById('tech').classList.contains('visible')) {
    setTimeout(animateSkillBars, 300);
  }
})();
