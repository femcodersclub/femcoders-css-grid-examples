document.addEventListener('DOMContentLoaded', function() {
    // Resaltar la página activa en el menú
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref === currentPage) {
        link.classList.add('active');
      }
    });
  
    // Animación para las demostraciones de Grid
    const gridItems = document.querySelectorAll('.grid-demo .demo-item');
    if (gridItems.length) {
      // Aplicar clases de animación con retardo
      gridItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.transform = 'scale(1.1)';
          setTimeout(() => {
            item.style.transform = 'scale(1)';
          }, 300);
        }, index * 200);
      });
  
      // Repetir la animación cada 5 segundos
      setInterval(() => {
        gridItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.transform = 'scale(1.1)';
            setTimeout(() => {
              item.style.transform = 'scale(1)';
            }, 300);
          }, index * 200);
        });
      }, 5000);
    }
  
    // Animación para los términos de Grid
    const terms = document.querySelectorAll('.term');
    if (terms.length) {
      terms.forEach((term, index) => {
        setTimeout(() => {
          term.style.opacity = '0';
          term.style.display = 'inline-block';
          term.style.opacity = '1';
          term.style.transform = 'translateY(-5px)';
          setTimeout(() => {
            term.style.transform = 'translateY(0)';
          }, 300);
        }, index * 300);
      });
    }
  
    // Interactividad para las tarjetas de ejemplo
    const exampleCards = document.querySelectorAll('.example-card');
    exampleCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        const previewElements = this.querySelectorAll('.example-preview > div');
        previewElements.forEach((el, index) => {
          setTimeout(() => {
            el.style.transform = 'scale(0.95)';
            setTimeout(() => {
              el.style.transform = 'scale(1)';
            }, 200);
          }, index * 100);
        });
      });
    });
  });