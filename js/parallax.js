// js/parallax.js

// Detección simple de dispositivo móvil
function isMobileDevice() {
  const ua = navigator.userAgent || '';
  return /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
}

export function initParallax() {
  console.log("Parallax: inicializando...");

  // Referencias a las capas
  const layerBG = document.getElementById("layerBG");
  const layerCard = document.getElementById("layerCard");

  // --------------------------------------------------
  // 1. Parallax en Desktop (mousemove)
  // --------------------------------------------------
  function handleMouseMove(e) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const diffX = e.clientX - centerX;
    const diffY = e.clientY - centerY;

    // Factor de sensibilidad en Desktop
    const factor = 0.04; 
    const rotateY = diffX * factor; 
    const rotateX = -diffY * factor;

    layerBG.style.transform = `translateZ(-50px) rotateX(${rotateX / 2}deg) rotateY(${rotateY / 2}deg)`;
    layerCard.style.transform = `translateZ(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  // Solo registramos mousemove en desktop
  if (!isMobileDevice()) {
    window.addEventListener("mousemove", handleMouseMove);
  }

  // --------------------------------------------------
  // 2. Parallax en Mobile (touchmove) por defecto
  // --------------------------------------------------
  function handleTouchMove(e) {
    const touch = e.touches[0];
    if (!touch) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const diffX = touch.clientX - centerX;
    const diffY = touch.clientY - centerY;

    // Factor de sensibilidad en Mobile (arrastre con dedo)
    const factor = 0.2;
    const rotateY = diffX * factor;
    const rotateX = -diffY * factor;

    layerBG.style.transform = `translateZ(-50px) rotateX(${rotateX / 2}deg) rotateY(${rotateY / 2}deg)`;
    layerCard.style.transform = `translateZ(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  if (isMobileDevice()) {
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
  }

  // --------------------------------------------------
  // 3. Parallax por sensores (deviceorientation) - Toggle
  // --------------------------------------------------
  let orientationReceived = false;    // Bandera para saber si llegaron datos "válidos"
  let sensorTimeout = null;          // Timeout de 3s para verificar bloqueo
  let sensorParallaxEnabled = false; // Estado del toggle

  function handleDeviceOrientation(event) {
    // Obtenemos los valores
    const beta = event.beta ?? 0;  
    const gamma = event.gamma ?? 0; 

    // Definimos un umbral mínimo para considerar datos válidos (evita 0,0)
    const threshold = 0.1; 
    if (Math.abs(beta) > threshold || Math.abs(gamma) > threshold) {
      orientationReceived = true;
    }

    // Factor de sensibilidad con giroscopio
    const factor = 0.5;
    const rotateX = beta * factor;
    const rotateY = gamma * factor;

    layerBG.style.transform = `translateZ(-50px) rotateX(${rotateX / 2}deg) rotateY(${rotateY / 2}deg)`;
    layerCard.style.transform = `translateZ(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  // Activar parallax con sensores
  function enableSensorParallax() {
    console.log("Intentando activar parallax de movimiento...");

    // 1. Verificar si es Mobile
    if (!isMobileDevice()) {
      alert("Esta función está diseñada para dispositivos móviles con sensor de movimiento.");
      return;
    }

    // 2. Verificar si el navegador soporta DeviceOrientationEvent
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation, true);
      sensorParallaxEnabled = true;
      orientationReceived = false;

      // Temporizador de 3s para comprobar si llegan datos válidos
      sensorTimeout = setTimeout(() => {
        if (!orientationReceived && sensorParallaxEnabled) {
          alert("No se reciben datos de orientación. Posiblemente tu navegador bloquea los sensores. Revisa configuraciones o intenta con Chrome.");
        }
      }, 3000);

    } else {
      alert("Este dispositivo/navegador no soporta DeviceOrientationEvent.");
    }
  }

  // Desactivar parallax con sensores
  function disableSensorParallax() {
    console.log("Desactivando parallax de movimiento...");
    window.removeEventListener('deviceorientation', handleDeviceOrientation, true);

    // Cancelar el timeout pendiente, si existe
    if (sensorTimeout) {
      clearTimeout(sensorTimeout);
      sensorTimeout = null;
    }
    sensorParallaxEnabled = false;
  }

  // Función toggle
  function toggleSensorParallax() {
    const sensorBtn = document.getElementById("activateSensorBtn");
    if (!sensorBtn) return;

    if (!sensorParallaxEnabled) {
      // Activar
      enableSensorParallax();
      if (sensorParallaxEnabled) {
        sensorBtn.textContent = "Desactivar Parallax al Movimiento";
      }
    } else {
      // Desactivar
      disableSensorParallax();
      sensorBtn.textContent = "Activar Parallax al Movimiento";
    }
  }

  // --------------------------------------------------
  // 4. Vincular el botón de toggle
  // --------------------------------------------------
  const sensorBtn = document.getElementById("activateSensorBtn");
  if (sensorBtn) {
    sensorBtn.addEventListener("click", toggleSensorParallax);
  } else {
    console.warn("No se encontró el botón #activateSensorBtn en el HTML.");
  }
}
