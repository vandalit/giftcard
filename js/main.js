// js/main.js

import { initGiftcardLogic } from "./giftcard.js";
import { initParallax } from "./parallax.js";

// Escuchamos DOMContentLoaded una sola vez
document.addEventListener("DOMContentLoaded", () => {
  console.log("Main: DOMContentLoaded. Inicializando módulos...");

  // Inicializamos la lógica de giftcards
  initGiftcardLogic();

  // Inicializamos la lógica de parallax
  initParallax();
});
