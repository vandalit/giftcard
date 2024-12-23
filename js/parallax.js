// js/parallax.js

// Chequeo básico de si es un dispositivo móvil
function isMobileDevice() {
    const ua = navigator.userAgent || '';
    return /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
  }
  
  export function initParallax() {
    console.log("Parallax: inicializando...");
  
    // Referencias a las capas
    const layerBG = document.getElementById("layerBG");
    const layerCard = document.getElementById("layerCard");
  
    // ----------------------------------------
    // 1. Efecto parallax en Desktop (mousemove)
    // ----------------------------------------
    function handleMouseMove(e) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const diffX = e.clientX - centerX;
      const diffY = e.clientY - centerY;
  
      const factor = 0.03; 
      const rotateY = diffX * factor; 
      const rotateX = -diffY * factor;
  
      // Capa de fondo
      layerBG.style.transform = `translateZ(-50px) rotateX(${rotateX / 2}deg) rotateY(${rotateY / 2}deg)`;
      // Capa frontal (la tarjeta)
      layerCard.style.transform = `translateZ(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  
    if (!isMobileDevice()) {
      // Solo en Desktop, usamos mousemove
      window.addEventListener("mousemove", handleMouseMove);
    }
  
    // ----------------------------------------
    // 2. Efecto parallax en Mobile (touchmove) por defecto
    // ----------------------------------------
    function handleTouchMove(e) {
      const touch = e.touches[0];
      if (!touch) return;
  
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
  
      const diffX = touch.clientX - centerX;
      const diffY = touch.clientY - centerY;
  
      const factor = 0.04;
      const rotateY = diffX * factor;
      const rotateX = -diffY * factor;
  
      layerBG.style.transform = `translateZ(-50px) rotateX(${rotateX / 2}deg) rotateY(${rotateY / 2}deg)`;
      layerCard.style.transform = `translateZ(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  
    if (isMobileDevice()) {
      // Solo en Mobile, usamos touchmove
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
    }
  
    // ----------------------------------------
    // 3. Parallax con sensores (deviceorientation) - Toggle
    // ----------------------------------------
    let orientationReceived = false;
    let sensorTimeout = null;    
    let sensorParallaxEnabled = false; // Estado del toggle
  
    function handleDeviceOrientation(event) {
      orientationReceived = true;
  
      const beta = event.beta || 0;    // Inclinación frontal
      const gamma = event.gamma || 0;  // Inclinación lateral
  
      const factor = 1.0;
      const rotateX = beta * factor;
      const rotateY = gamma * factor;
  
      layerBG.style.transform = `translateZ(-50px) rotateX(${rotateX / 2}deg) rotateY(${rotateY / 2}deg)`;
      layerCard.style.transform = `translateZ(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  
    function enableSensorParallax() {
      console.log("Intentando activar parallax de movimiento...");
      
      if (!isMobileDevice()) {
        alert("Esta función está diseñada para dispositivos móviles con sensor de movimiento.");
        return;
      }
  
      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', handleDeviceOrientation, true);
  
        orientationReceived = false;
        // Creamos un timeout de 3s para comprobar si no llegan datos
        sensorTimeout = setTimeout(() => {
          if (!orientationReceived && sensorParallaxEnabled) {
            alert("No se reciben datos de orientación. Posiblemente tu navegador bloquee los sensores. Revisa configuraciones o usa Chrome.");
          }
        }, 3000);
  
        sensorParallaxEnabled = true;      
      } else {
        alert("Este dispositivo/navegador no soporta DeviceOrientationEvent.");
      }
    }
  
    function disableSensorParallax() {
      console.log("Desactivando parallax de movimiento...");
      window.removeEventListener('deviceorientation', handleDeviceOrientation, true);
  
      // Si había un timeout en curso, lo limpiamos
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
        // Habilitar
        enableSensorParallax();
        if (sensorParallaxEnabled) {
          sensorBtn.textContent = "Desactivar Parallax al Movimiento";
        }
      } else {
        // Deshabilitar
        disableSensorParallax();
        sensorBtn.textContent = "Activar Parallax al Movimiento";
      }
    }
  
    // ----------------------------------------
    // 4. Vinculamos el botón
    // ----------------------------------------
    const sensorBtn = document.getElementById("activateSensorBtn");
    if (sensorBtn) {
      sensorBtn.addEventListener("click", toggleSensorParallax);
    } else {
      console.warn("No se encontró el botón #activateSensorBtn en el HTML.");
    }
  }
  