document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos
    const galleryContainer = document.querySelector('.gallery-container');
    const controlButtons = document.querySelectorAll('.control-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Función para cambiar el layout de la galería
    function changeLayout(layoutType) {
      // Eliminar todas las clases de layout existentes
      galleryContainer.classList.remove('masonry-layout', 'grid-layout', 'mosaic-layout');
      
      // Añadir la clase del nuevo layout
      galleryContainer.classList.add(layoutType + '-layout');
      
      // Animar la aparición de los items
      galleryItems.forEach((item, index) => {
        // Resetear la animación
        item.style.animation = 'none';
        item.offsetHeight; // Forzar reflow
        
        // Aplicar animación con retardo basado en el índice
        item.style.animation = `fadeIn 0.5s ease-in-out ${index * 0.05}s`;
      });
    }
    
    // Event listeners para los botones de control
    controlButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Quitar la clase 'active' de todos los botones
        controlButtons.forEach(btn => btn.classList.remove('active'));
        
        // Añadir la clase 'active' al botón clickeado
        this.classList.add('active');
        
        // Cambiar el layout según el botón
        const layoutType = this.getAttribute('data-layout');
        changeLayout(layoutType);
      });
    });
    
    // Efecto de hover mejorado para items de galería
    galleryItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        // Añadir un pequeño efecto de elevación
        this.style.zIndex = '5';
        
        // Hacer que los demás items se atenúen ligeramente
        galleryItems.forEach(otherItem => {
          if (otherItem !== this) {
            otherItem.style.opacity = '0.7';
            otherItem.style.filter = 'grayscale(30%)';
          }
        });
      });
      
      item.addEventListener('mouseleave', function() {
        // Restaurar el z-index
        this.style.zIndex = '1';
        
        // Restaurar la opacidad y filtros de todos los items
        galleryItems.forEach(otherItem => {
          otherItem.style.opacity = '1';
          otherItem.style.filter = 'none';
        });
      });
    });
    
    // Para pantallas táctiles, detectar tap en las imágenes
    if ('ontouchstart' in window) {
      galleryItems.forEach(item => {
        item.addEventListener('touchstart', function() {
          // Mostrar el overlay
          const overlay = this.querySelector('.item-overlay');
          if (overlay) {
            overlay.style.transform = 'translateY(0)';
          }
        });
      });
    }
    
    // Inicializar con el layout masonry por defecto
    changeLayout('masonry');
  });