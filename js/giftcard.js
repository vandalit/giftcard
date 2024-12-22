// js/giftcard.js

// Función que inicializa la lógica de giftcards
export function initGiftcardLogic() {
  console.log("GiftcardLogic: inicializando...");

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
  const giftcardToken = params.get("token");

  // Función para mostrar error
  function showError() {
    errorSection.classList.remove("hidden");
    giftcardSection.classList.add("hidden");
  }

  // Función para mostrar la giftcard
  function showGiftcard(giftcard) {
    errorSection.classList.add("hidden");
    giftcardSection.classList.remove("hidden");

    // Imagen de fondo
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

    // Ajustes de colores
    if (giftcard.colors && giftcard.colors.primary) {
      redeemButton.style.backgroundColor = giftcard.colors.primary;
    }
    if (giftcard.colors && giftcard.colors.secondary) {
      redeemButton.style.color = giftcard.colors.secondary;
    }

    // Botón canjear
    redeemButton.addEventListener("click", () => {
      alert("¡Giftcard canjeada!");
    });
  }

  // 2. Cargar el JSON
  fetch("./data/giftcards.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo cargar giftcards.json");
      }
      return response.json();
    })
    .then(data => {
      // 3. Verificar el ID
      if (!giftcardId || !data[giftcardId]) {
        showError();
        return;
      }
      const giftcard = data[giftcardId];

      // 4. Verificar el token
      if (!giftcardToken || giftcardToken !== giftcard.token) {
        showError();
        return;
      }

      // Mostrar giftcard
      showGiftcard(giftcard);
    })
    .catch(err => {
      console.error("Error al leer giftcards.json:", err);
      showError();
    });
}
