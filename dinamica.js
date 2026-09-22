document.addEventListener("DOMContentLoaded", () => {
  const botonTema = document.getElementById("btn-theme");
  const claveTema = "tema-soluciones-digitales";

  function actualizarTema(oscuro) {
    document.body.classList.toggle("dark-mode", oscuro);
    botonTema.textContent = oscuro ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
    botonTema.setAttribute(
      "aria-label",
      oscuro ? "Activar modo claro" : "Activar modo oscuro"
    );
  }

  try {
    actualizarTema(localStorage.getItem(claveTema) === "oscuro");
  } catch (_) {
    actualizarTema(false);
  }

  botonTema.addEventListener("click", () => {
    const oscuro = !document.body.classList.contains("dark-mode");
    actualizarTema(oscuro);

    try {
      localStorage.setItem(claveTema, oscuro ? "oscuro" : "claro");
    } catch (_) {}
  });

  const titulo = document.getElementById("texto-escrito");

  if (titulo && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const texto = titulo.textContent;
    let indice = 0;
    titulo.textContent = "";

    function escribir() {
      titulo.textContent = texto.slice(0, ++indice);

      if (indice < texto.length) {
        window.setTimeout(escribir, 65);
      }
    }

    escribir();
  }

  const fotos = [...document.querySelectorAll(".slide")];

  if (fotos.length > 0) {
    let posicion = 0;
    let temporizador;

    function mostrarFoto(nuevaPosicion) {
      fotos[posicion].removeAttribute("data-active");
      posicion = (nuevaPosicion + fotos.length) % fotos.length;
      fotos[posicion].setAttribute("data-active", "");
    }

    function iniciarCambioAutomatico() {
      window.clearInterval(temporizador);
      temporizador = window.setInterval(() => {
        mostrarFoto(posicion + 1);
      }, 3000);
    }

    document.getElementById("anterior").addEventListener("click", () => {
      mostrarFoto(posicion - 1);
      iniciarCambioAutomatico();
    });

    document.getElementById("siguiente").addEventListener("click", () => {
      mostrarFoto(posicion + 1);
      iniciarCambioAutomatico();
    });

    iniciarCambioAutomatico();
  }
});