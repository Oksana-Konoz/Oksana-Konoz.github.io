const burger = document.querySelector('.burger');
const sidebar = document.querySelector('.sidebar');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    sidebar.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        sidebar.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll('.home, .home nav, .home .main .main-text h1, .home .main .main-text h3, .home .main-text h4, .home .main .main-text .buttons, .home .main .main-text .button p, .home .main .image img, .quote .text h1, .quote .text img, .about-us .container .main-text p, .about-us .main-text h1, .about-us .container .main .text h3, .about-us .container .main .text p, .about-us .container .main .button a, .about-us .container img, .about-us .main .text h3, .about-us .main .text .line, .about-us .main .text .button, .services .main-text h1, .services .main-text p, .services .box-container .box, .price .main-text p, .price .main-text h1, .price .main .box, .price .button, .reviews .main-text h1, .reviews .main-text p, .reviews .main img, .certificates .main-text p, .certificates .main-text h1, .cert-carousel, .contacts, .contacts .main-text p, .conditionals .main-text h1, .conditionals .main-text p, .conditionals .box-container .box, .contacts .main-text h1, .contacts .content .main .text h3, .contacts .content .main .social-medias a, .contacts .content .main img, .footer').forEach(el => {
  observer.observe(el);
});



(function(){
  function initCarousel(carousel){
    const track = carousel.querySelector('.cert-track');
    const cards = Array.from(track.children);
    const prevBtn = carousel.querySelector('.prev-arrow');
    const nextBtn = carousel.querySelector('.next-arrow');

    let visibleCount = getVisibleCount();
    let index = 0;

    function getVisibleCount(){
      const w = window.innerWidth;
      if (w <= 560) return 1;
      if (w <= 900) return 2;
      return 3;
    }

    function update(){
      const cardWidth = cards[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      const offset = index * (cardWidth + gap);
      track.style.transform = `translateX(-${offset}px)`;

      prevBtn.disabled = index === 0;
      nextBtn.disabled = index >= cards.length - visibleCount;
    }

    prevBtn.addEventListener('click', () => {
      if (index > 0){
        index--;
        update();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (index < cards.length - visibleCount){
        index++;
        update();
      }
    });

    window.addEventListener('resize', () => {
      visibleCount = getVisibleCount();
      index = Math.min(index, Math.max(0, cards.length - visibleCount));
      update();
    });

    update();
  }

  document.querySelectorAll('.cert-carousel').forEach(initCarousel);
})();