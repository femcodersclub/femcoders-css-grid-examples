document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const playgroundGrid = document.querySelector('.playground-grid');
    const explicitColumnsSelect = document.getElementById('explicit-columns');
    const explicitRowsSelect = document.getElementById('explicit-rows');
    const autoFlowSelect = document.getElementById('auto-flow');
    const itemCountInput = document.getElementById('item-count');
    const itemCountValue = document.getElementById('item-count-value');
    const showLinesCheckbox = document.getElementById('show-lines');
    const generatedCssCode = document.getElementById('generated-css');
    
    // Inicializar el playground
    updateItemCount();
    updateGridLines();
    
    // Event listeners
    explicitColumnsSelect.addEventListener('change', updateGrid);
    explicitRowsSelect.addEventListener('change', updateGrid);
    autoFlowSelect.addEventListener('change', updateGrid);
    itemCountInput.addEventListener('input', function() {
      itemCountValue.textContent = this.value;
      updateItemCount();
    });
    showLinesCheckbox.addEventListener('change', updateGridLines);
    
    // Función para actualizar la cuadrícula
    function updateGrid() {
      const columns = explicitColumnsSelect.value;
      const rows = explicitRowsSelect.value;
      const autoFlow = autoFlowSelect.value;
      
      // Actualizar estilos de CSS
      playgroundGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
      playgroundGrid.style.gridTemplateRows = `repeat(${rows}, 100px)`;
      playgroundGrid.style.gridAutoFlow = autoFlow;
      
      // Actualizar visualización de líneas de grid
      updateGridLines();
      
      // Actualizar el código CSS mostrado
      updateCssCode(columns, rows, autoFlow);
      
      // Marcar los elementos como explícitos o implícitos
      markExplicitImplicit(columns, rows);
    }
    
    // Función para actualizar el número de elementos
    function updateItemCount() {
      const count = parseInt(itemCountInput.value);
      
      // Limpiar el grid
      playgroundGrid.innerHTML = '';
      
      // Añadir nuevos elementos
      for (let i = 1; i <= count; i++) {
        const item = document.createElement('div');
        item.className = 'grid-item';
        item.textContent = i;
        playgroundGrid.appendChild(item);
      }
      
      // Marcar elementos como explícitos o implícitos
      markExplicitImplicit(
        explicitColumnsSelect.value, 
        explicitRowsSelect.value
      );
    }
    
    // Función para mostrar/ocultar líneas de grid
    function updateGridLines() {
      if (showLinesCheckbox.checked) {
        playgroundGrid.classList.add('show-lines');
        
        // Actualizar la visualización de la cuadrícula según las columnas y filas actuales
        const columns = explicitColumnsSelect.value;
        const rows = explicitRowsSelect.value;
        
        playgroundGrid.style.backgroundSize = `calc(100% / ${columns}) 100%, 100% 100px`;
      } else {
        playgroundGrid.classList.remove('show-lines');
      }
    }
    
    // Función para marcar elementos como explícitos o implícitos
    function markExplicitImplicit(columns, rows) {
      const items = playgroundGrid.querySelectorAll('.grid-item');
      const explicitCells = parseInt(columns) * parseInt(rows);
      
      items.forEach((item, index) => {
        // Remover clases existentes
        item.classList.remove('explicit', 'implicit');
        
        // Añadir la clase correspondiente
        if (index < explicitCells) {
          item.classList.add('explicit');
        } else {
          item.classList.add('implicit');
        }
      });
    }
    
    // Función para actualizar el código CSS mostrado
    function updateCssCode(columns, rows, autoFlow) {
      const css = `.grid {
    display: grid;
    grid-template-columns: repeat(${columns}, 1fr);
    grid-template-rows: repeat(${rows}, 100px);
    grid-auto-flow: ${autoFlow};
    gap: 10px;
  }`;
      
      generatedCssCode.textContent = css;
    }
    
    // Inicializar el grid
    updateGrid();
    
    // Añadir efecto de hover a los elementos del grid
    playgroundGrid.addEventListener('mouseover', function(e) {
      if (e.target.classList.contains('grid-item')) {
        const item = e.target;
        const itemRect = item.getBoundingClientRect();
        const gridRect = playgroundGrid.getBoundingClientRect();
        
        // Calcular posición de la celda en la cuadrícula
        const columnWidth = gridRect.width / parseInt(explicitColumnsSelect.value);
        const rowHeight = 100;
        
        const column = Math.floor((itemRect.left - gridRect.left) / columnWidth) + 1;
        const row = Math.floor((itemRect.top - gridRect.top) / rowHeight) + 1;
        
        // Tooltip con información
        const tooltip = document.createElement('div');
        tooltip.className = 'grid-tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.top = `${itemRect.bottom + window.scrollY + 10}px`;
        tooltip.style.left = `${itemRect.left + window.scrollX}px`;
        tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '5px 10px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.zIndex = '100';
        tooltip.style.fontSize = '14px';
        
        const isExplicit = item.classList.contains('explicit');
        tooltip.textContent = `Elemento ${item.textContent}: Grid ${isExplicit ? 'Explícito' : 'Implícito'} (Col ${column}, Fila ${row})`;
        
        // Remover tooltips existentes
        document.querySelectorAll('.grid-tooltip').forEach(el => el.remove());
        
        // Añadir el tooltip
        document.body.appendChild(tooltip);
        
        // Eliminar el tooltip al salir del elemento
        item.addEventListener('mouseout', function() {
          tooltip.remove();
        });
      }
    });
  });