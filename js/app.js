// js/app.js

// Espera hasta que el DOM esté cargado, por buenas prácticas
document.addEventListener("DOMContentLoaded", () => {
    // Referencias a elementos del DOM
    const errorSection = document.getElementById("errorSection");
    const giftcardSection = document.getElementById("giftcardSection");
    const giftcardImage = document.getElementById("giftcardImage");
  
    const nicknameElem = document.getElementById("nickname");
    const commentElem = document.getElementById("comment");
    const emitterElem = document.getElementById("emitter");
    const receiverElem = document.getElementById("receiver");
    const extraValueElem = document.getElementById("extraValue");
    const redeemButton = document.getElementById("redeemButton");
  
    // 1. Obtener parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const giftcardId = params.get("id");
    const giftcardToken = params.get("token"); // Ej: ?id=16&token=abc123
  
    // Función que muestra la sección de error
    function showError() {
      errorSection.classList.remove("hidden");
      giftcardSection.classList.add("hidden");
    }
  
    // Función que muestra la sección de giftcard
    function showGiftcard(giftcard) {
      // Removemos "hidden" y dejamos visible
      errorSection.classList.add("hidden");
      giftcardSection.classList.remove("hidden");
  
      // Configuramos imagen de fondo
      if (giftcard.bgImage) {
        giftcardImage.style.backgroundImage = `url(${giftcard.bgImage})`;
      }
  
      // Llenamos textos
      nicknameElem.textContent = giftcard.nickname || "Sin apodo";
      commentElem.textContent = giftcard.comment || "";
      emitterElem.textContent = giftcard.emitterName
        ? `De: ${giftcard.emitterName}`
        : "";
      receiverElem.textContent = giftcard.receiverName
        ? `Para: ${giftcard.receiverName}`
        : "";
  
      extraValueElem.textContent = giftcard.extraValue || "";
  
      // Colores: Usamos Tailwind inline style o setProperty
      if (giftcard.colors && giftcard.colors.primary) {
        redeemButton.style.backgroundColor = giftcard.colors.primary;
      }
  
      // Ejemplo: cambiar color de texto si hay un secondary
      if (giftcard.colors && giftcard.colors.secondary) {
        redeemButton.style.color = giftcard.colors.secondary;
      }
  
      // Manejo del botón "Canjear"
      redeemButton.addEventListener("click", () => {
        alert("¡Giftcard canjeada con éxito!");
        // Aquí podrías redirigir o realizar otra acción
      });
    }
  
    // 2. Leer el JSON local
    fetch("./data/giftcards.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("No se pudo cargar el archivo giftcards.json");
        }
        return response.json();
      })
      .then(data => {
        // 3. Verificamos si existe ese ID
        if (!giftcardId || !data[giftcardId]) {
          // No existe la giftcard
          showError();
          return;
        }
  
        // Tenemos el objeto giftcard
        const giftcard = data[giftcardId];
  
        // 4. Comparamos el token de la URL con el del JSON
        if (!giftcardToken || giftcardToken !== giftcard.token) {
          // Token no coincide o no se envió token
          showError();
          return;
        }
  
        // Si todo va bien, mostramos la giftcard
        showGiftcard(giftcard);
      })
      .catch(err => {
        console.error("Error al leer giftcards.json:", err);
        showError();
      });
  });
  