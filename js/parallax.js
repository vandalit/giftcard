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
  
    // ------------------------------
    // 1. Efecto parallax en Desktop (mousemove)
    // ------------------------------
    function handleMouseMove(e) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const diffX = e.clientX - centerX;
      const diffY = e.clientY - centerY;
  
      const factor = 0.01; 
      const rotateY = diffX * factor; 
      const rotateX = -diffY * factor;
  
      // Capa de fondo
      layerBG.style.transform = `translateZ(-50px) rotateX(${rotateX / 2}deg) rotateY(${rotateY / 2}deg)`;
      // Capa frontal (la tarjeta)
      layerCard.style.transform = `translateZ(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  
    // Solo registramos mousemove si es Desktop
    if (!isMobileDevice()) {
      window.addEventListener("mousemove", handleMouseMove);
    }
  
    // ------------------------------
    // 2. Efecto parallax en Mobile por "touchmove" (por defecto)
    // ------------------------------
    function handleTouchMove(e) {
      // Tomamos el primer dedo
      const touch = e.touches[0];
      if (!touch) return;
  
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
  
      const diffX = touch.clientX - centerX;
      const diffY = touch.clientY - centerY;
  
      const factor = 0.02; // Ajusta para más o menos sensibilidad
      const rotateY = diffX * factor;
      const rotateX = -diffY * factor;
  
      layerBG.style.transform = `translateZ(-50px) rotateX(${rotateX / 2}deg) rotateY(${rotateY / 2}deg)`;
      layerCard.style.transform = `translateZ(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  
    // Registramos touchmove si es Mobile
    if (isMobileDevice()) {
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
    }
  
    // ------------------------------
    // 3. Parallax con sensores (deviceorientation)
    //    Activado con un botón
    // ------------------------------
    let orientationReceived = false;
    let sensorTimeout = null; // Para controlar el tiempo de espera
  
    function handleDeviceOrientation(event) {
      orientationReceived = true;
  
      const beta = event.beta || 0;    // Inclinación frontal (rango -180 a 180)
      const gamma = event.gamma || 0;  // Inclinación lateral (rango -90 a 90)
  
      const factor = 1.0;
      const rotateX = beta * factor;
      const rotateY = gamma * factor;
  
      layerBG.style.transform = `translateZ(-50px) rotateX(${rotateX / 2}deg) rotateY(${rotateY / 2}deg)`;
      layerCard.style.transform = `translateZ(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  
    // Función para solicitar "parallax al movimiento"
    function enableSensorParallax() {
      console.log("Intentando activar parallax de movimiento...");
  
      // 1. Verificamos si es mobile
      if (!isMobileDevice()) {
        alert("Esta función está diseñada para dispositivos móviles con sensor de movimiento.");
        return;
      }
  
      // 2. Registramos el evento deviceorientation
      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', handleDeviceOrientation, true);
  
        // Reseteamos bandera y creamos un timeout de 3s para comprobar si no llegan datos
        orientationReceived = false;
        if (sensorTimeout) clearTimeout(sensorTimeout);
  
        sensorTimeout = setTimeout(() => {
          if (!orientationReceived) {
            alert("No se reciben datos de orientación. Posiblemente tu navegador bloquee los sensores. Revisa configuraciones o intenta con Chrome.");
          }
        }, 3000);
  
      } else {
        alert("Este dispositivo/navegador no soporta DeviceOrientationEvent.");
      }
    }
  
    // ------------------------------
    // 4. Vinculamos el botón "Activar Parallax al Movimiento"
    // ------------------------------
    const sensorBtn = document.getElementById("activateSensorBtn");
    if (sensorBtn) {
      sensorBtn.addEventListener("click", enableSensorParallax);
    } else {
      console.warn("No se encontró el botón #activateSensorBtn en el HTML.");
    }
  }
  