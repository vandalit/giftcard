// js/parallax.js

export function initParallax() {
    console.log("Parallax: inicializando...");
  
    // Tomamos referencia a los elementos
    const layerBG = document.getElementById("layerBG");
    const layerCard = document.getElementById("layerCard");
  
    // Función que maneja el mousemove en desktop
    function handleMouseMove(e) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
  
      // Distancia respecto al centro
      const diffX = e.clientX - centerX;
      const diffY = e.clientY - centerY;
  
      // Ajusta "fuerza" del parallax
      const factor = 0.01; 
      
      const rotateY = diffX * factor; 
      const rotateX = -diffY * factor;
  
      // Movemos la capa BG un poco menos
      layerBG.style.transform = `translateZ(-50px) rotateX(${rotateX / 2}deg) rotateY(${rotateY / 2}deg)`;
      // Movemos la capa frontal
      layerCard.style.transform = `translateZ(0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  
    // Escuchamos movimiento de mouse en desktop
    window.addEventListener("mousemove", handleMouseMove);
  
    // Lógica para mobile (giroscopio)
    function handleDeviceOrientation(event) {
      const beta = event.beta || 0;    // Inclinación frontal (rango aprox -180 a 180)
      const gamma = event.gamma || 0; // Inclinación lateral (rango aprox -90 a 90)
  
      const factor = 1.5;
      const rotateX = beta * factor;
      const rotateY = gamma * factor;
  
      layerBG.style.transform = `translateZ(-50px) rotateX(${rotateX / 2}deg) rotateY(${rotateY / 2}deg)`;
      layerCard.style.transform = `translateZ(0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleDeviceOrientation, true);
    }
  }
  