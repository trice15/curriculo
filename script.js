(function () {
  const botao = document.getElementById('menu-btn');
  const nav = document.getElementById('nav');

  function alternarMenu(abrir) {
    nav.classList.toggle('aberto', abrir);
    botao.setAttribute('aria-expanded', abrir);
    botao.textContent = abrir ? '✕' : '☰'; 
  }

  botao.addEventListener('click', () => alternarMenu(!nav.classList.contains('aberto')));
  
  nav.addEventListener('click', e => {
    if (e.target.tagName === 'A') alternarMenu(false); 
  });

  const links = [...nav.querySelectorAll('a')];
  const secoes = links.map(a => document.querySelector(a.getAttribute('href')));

  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(en => {
      if (en.isIntersecting) {
        links.forEach(a => a.classList.toggle('ativo', a.getAttribute('href') === '#' + en.target.id));
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  secoes.forEach(s => s && observador.observe(s));

  const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('#projetos .card');
  const vazio = document.getElementById('vazio');

  chips.forEach(chip => chip.addEventListener('click', () => {
    const f = chip.dataset.filtro;
    chips.forEach(c => {
      c.classList.toggle('on', c === chip);
      c.setAttribute('aria-pressed', c === chip);
    });

    let visiveis = 0;
    cards.forEach(card => {
      const mostrar = f === 'todos' || card.dataset.cat.split(' ').includes(f); 
      card.hidden = !mostrar;
      if (mostrar) visiveis++;
    });
    
    vazio.hidden = visiveis > 0; 
  }));

  const copiar = document.getElementById('copiar');
  copiar.addEventListener('click', async () => {
    const email = document.getElementById('email').textContent;
    try {
      await navigator.clipboard.writeText(email);
      copiar.textContent = 'Copiado!';
    } catch (e) {
      console.log('droga, nao funcionou o clipboard', e); 
      copiar.textContent = 'Copie manualmente';
    }
    setTimeout(() => (copiar.textContent = 'Copiar'), 2000);
  });

  document.getElementById('ano').innerHTML = new Date().getFullYear(); 
})();
