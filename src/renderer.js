// Importamos los estilos globales y el componente principal de la aplicación
import "./index.css";
import "./app.jsx";

// Añadimos un evento click al documento para gestionar los enlaces externos
document.addEventListener("click", function (event) {
  // Verificamos si el elemento clickeado es un enlace (etiqueta "A") y si la URL comienza con "http"
  if (event.target.tagName === "A" && event.target.href.startsWith('http')) {
    // Creamos un objeto URL a partir de la URL del enlace
    const url = new URL(event.target.href);

    // Si la URL del enlace no es del mismo origen que la ubicación actual...
    if (url.origin !== this.location.origin) {
      // Prevenimos la acción por defecto del enlace
      event.preventDefault();

      // Enviamos un mensaje al proceso principal para abrir el enlace externo
      window.SmartStock.send("smartstock:open-external", event.target.href);
    }
  }
});
