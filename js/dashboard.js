document.addEventListener("DOMContentLoaded", function () {
  // Selección de elementos
  const dashboardContainer = document.querySelector(".dashboard-container");
  const viewButtons = document.querySelectorAll(".view-btn");
  const widgets = document.querySelectorAll(".dashboard-widget");
  const currentDateElement = document.getElementById("current-date");

  // Establecer la fecha actual
  if (currentDateElement) {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    currentDateElement.textContent = now.toLocaleDateString("es-ES", options);
  }

  // Event listeners para los botones de vista
  viewButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remover clase active de todos los botones
      viewButtons.forEach((btn) => btn.classList.remove("active"));

      // Añadir clase active al botón clickeado
      this.classList.add("active");

      // Actualizar vista del dashboard
      const viewType = this.getAttribute("data-view");
      updateDashboardView(viewType);
    });
  });

  // Función para actualizar la vista del dashboard
  function updateDashboardView(viewType) {
    // Remover clases de vista anteriores
    dashboardContainer.classList.remove("grid-view", "compact-view");

    // Añadir la clase para la nueva vista
    dashboardContainer.classList.add(`${viewType}-view`);

    // Reiniciar las animaciones
    widgets.forEach((widget, index) => {
      widget.style.animation = "none";
      widget.offsetHeight; // Forzar reflow
      widget.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s`;
    });
  }

  // Funcionalidad para actualizar widgets
  const refreshButtons = document.querySelectorAll(".widget-btn .fa-sync-alt");
  refreshButtons.forEach((button) => {
    button.parentElement.addEventListener("click", function () {
      // Obtener el widget padre
      const widget = this.closest(".dashboard-widget");

      // Añadir clase de rotación al icono
      const icon = this.querySelector("i");
      icon.classList.add("fa-spin");

      // Simular carga
      setTimeout(() => {
        // Detener rotación
        icon.classList.remove("fa-spin");

        // Añadir efecto de actualización al widget
        widget.style.animation = "none";
        widget.offsetHeight;
        widget.style.animation = "fadeIn 0.5s ease-out";
      }, 1000);
    });
  });

  // Interactividad para las barras del gráfico
  const chartBars = document.querySelectorAll(".chart-bar");
  chartBars.forEach((bar) => {
    bar.addEventListener("mouseenter", function () {
      const value = this.getAttribute("data-value");
      const tooltip = this.querySelector(".chart-tooltip");

      if (tooltip) {
        tooltip.style.opacity = "1";
      }
    });

    bar.addEventListener("mouseleave", function () {
      const tooltip = this.querySelector(".chart-tooltip");

      if (tooltip) {
        tooltip.style.opacity = "0";
      }
    });
  });

  // Manejar cambios de estado en los checkboxes de tareas
  const taskCheckboxes = document.querySelectorAll(
    '.task-item input[type="checkbox"]'
  );
  taskCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const taskItem = this.closest(".task-item");
      const taskDate = taskItem.querySelector(".task-date");

      if (this.checked) {
        taskDate.textContent = "Completada";
      } else {
        // Recuperar la fecha original (simulado)
        if (taskDate.textContent === "Completada") {
          // Aquí se podría recuperar la fecha real de una base de datos
          // Por ahora, usamos fechas de ejemplo
          const dates = ["Hoy", "Mañana", "2 Abr", "5 Abr"];
          taskDate.textContent =
            dates[Math.floor(Math.random() * dates.length)];
        }
      }
    });
  });

  // Accesibilidad: Mejorar foco en los botones de widget
  const widgetButtons = document.querySelectorAll(".widget-btn");
  widgetButtons.forEach((button) => {
    button.addEventListener("keydown", function (e) {
      // Si se presiona Enter o Space, activar el botón
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Simulación de actualización de datos
  function simulateDataUpdates() {
    // Actualizar estadísticas aleatoriamente
    const statValues = document.querySelectorAll(".stat-value");
    statValues.forEach((stat) => {
      const currentValue = parseInt(stat.textContent.replace(/[^\d]/g, ""));
      const newValue = currentValue + Math.floor(Math.random() * 20) - 10;

      if (stat.textContent.includes("$")) {
        stat.textContent = "$" + newValue.toLocaleString();
      } else {
        stat.textContent = newValue.toLocaleString();
      }
    });

    // Programar próxima actualización
    setTimeout(simulateDataUpdates, 30000); // Cada 30 segundos
  }

  // Iniciar simulación después de 10 segundos
  setTimeout(simulateDataUpdates, 10000);
});
