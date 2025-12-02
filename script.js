// ============================================================================
// 🔁 ANIMACIÓN AUTOMÁTICA
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  const animationConfig = { "Estructura": 3, "Pulsa": 2, "Categorias": 2 , "Flechas": 2};
  const frameDuration = 200; 
  const bgImages = document.querySelectorAll(".machine-bg");

  setInterval(() => {
    bgImages.forEach(img => {
      const src = img.getAttribute("src");
      const match = src.match(/([A-Za-zñÑ_]+)_(\d+)\.png$/);
      if (!match) return; 
      const baseName = match[1];
      let currentFrame = parseInt(match[2]);
      const totalFrames = animationConfig[baseName];
      if (!totalFrames || totalFrames <= 1) return; 
      currentFrame = currentFrame + 1 > totalFrames ? 1 : currentFrame + 1;
      const newSrc = src.replace(/_\d+\.png$/, `_${currentFrame}.png`);
      img.setAttribute("src", newSrc);
    });
  }, frameDuration);
});

// ============================================================================
// 💡 LUCES Y POSICIONES
// ============================================================================
function animateLights(duration = 3000) {
    const lightImg = document.querySelector('img[src*="Luces_1.png"]');
    if (!lightImg) return;
    let currentFrame = 1;
    const totalFrames = 2;       
    const interval = setInterval(() => {
        currentFrame = currentFrame === totalFrames ? 1 : currentFrame + 1;
        const newSrc = lightImg.src.replace(/_\d+\.png$/, `_${currentFrame}.png`);
        lightImg.src = newSrc;
    }, 200);
    setTimeout(() => {
        clearInterval(interval);
        lightImg.src = lightImg.src.replace(/_\d+\.png$/, `_1.png`);
    }, duration);
}

const slotPositions = {
    slot_top: '400px', marca_left: '265px', tono_left: '395px',  
    medio_left: '515px', regla_left: '640px'  
};
const leverPosition = { lever_top: '270px', lever_right: '50px' };

// =========================================================================
// 🔊 AUDIO
// =========================================================================
const leverSound = new Audio('lever_pull.mp3');
const reelSound = new Audio('reels_spinning.mp3');
reelSound.loop = true; 
const winSound = new Audio('jackpot_win.mp3');

function enableSounds() {
    leverSound.volume = 0.5; reelSound.volume = 0.3; winSound.volume = 0.6;
    document.removeEventListener('click', enableSounds);
}
document.addEventListener('click', enableSounds);

// =========================================================================
// INICIALIZACIÓN
// =========================================================================
function applyPositions() {
    document.getElementById('slot-marca').style.top = slotPositions.slot_top;
    document.getElementById('slot-marca').style.left = slotPositions.marca_left;
    document.getElementById('slot-tono').style.top = slotPositions.slot_top;
    document.getElementById('slot-tono').style.left = slotPositions.tono_left;
    document.getElementById('slot-medio').style.top = slotPositions.slot_top;
    document.getElementById('slot-medio').style.left = slotPositions.medio_left;
    document.getElementById('slot-regla').style.top = slotPositions.slot_top;
    document.getElementById('slot-regla').style.left = slotPositions.regla_left;
    document.getElementById('lever-hitbox').style.top = leverPosition.lever_top;
    document.getElementById('lever-hitbox').style.right = leverPosition.lever_right;
}
document.addEventListener('DOMContentLoaded', applyPositions);

// =========================================================================
// ARRAYS DE DATOS
// =========================================================================
const marcas = [
    'images/Marcas/Zara.png', 'images/Marcas/Lego.png', 'images/Marcas/PC.png',
    'images/Marcas/Roca.png', 'images/Marcas/Airbnb.png', 'images/Marcas/apple.png',
    'images/Marcas/cocacola.png', 'images/Marcas/colgate.png', 'images/Marcas/Crocs.png',
    'images/Marcas/Decathlon.png', 'images/Marcas/dove.png', 'images/Marcas/ferrero.png',
    'images/Marcas/heinz.png', 'images/Marcas/Ikea.png', 'images/Marcas/Levis.png',
    'images/Marcas/Netflix.png', 'images/Marcas/Nivea.png', 'images/Marcas/once.png',
    'images/Marcas/RayBan.png', 'images/Marcas/Revolut.png', 'images/Marcas/red-Bull.png',
    'images/Marcas/spotify.png', 'images/Marcas/tupperware.png'
];
const tonos = [
    'images/Tonos/Asombro.png', 'images/Tonos/Divertido.png', 'images/Tonos/Tristeza.png',
    'images/Tonos/Sorpresa.png', 'images/Tonos/Felicidad.png', 'images/Tonos/Decepcion.png'
];
const medios = [
    'images/Medios/accion.png', 'images/Medios/corto.png', 'images/Medios/cuna_radio.png',
    'images/Medios/email_marketing.png', 'images/Medios/flayer.png', 'images/Medios/instagram_carrusel.png',
    'images/Medios/instagram_post.png', 'images/Medios/instagram_story.png', 'images/Medios/Lona.png',
    'images/Medios/Portada_periodico.png', 'images/Medios/tiktok.png', 'images/Medios/youtube.png'
];
const reglas = [
    'images/Reglas/aida.png', 'images/Reglas/arquetipos.png', 'images/Reglas/editar.png',
    'images/Reglas/ia.png', 'images/Reglas/insight.png', 'images/Reglas/planos.png',
    'images/Reglas/plot_twist.png', 'images/Reglas/reserva.png', 'images/Reglas/tripode.png'
];

// =========================================================================
// LÓGICA DE GIRO
// =========================================================================
function getRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function animateSlot(id, arr, duration, isImage = false) {
    const el = document.getElementById(id);
    const interval = 100;
    let time = 0;
    let finalValue = getRandom(arr); 
    
    const anim = setInterval(() => {
        const randomValue = getRandom(arr);
        if (isImage) {
            el.innerHTML = `<img src="${randomValue}" style="width:100px; height:auto;">`;
        } else {
            el.textContent = randomValue;
        }
        time += interval;
        if (time >= duration) {
            clearInterval(anim);
            if (isImage) {
                el.innerHTML = `<img src="${finalValue}" style="width:100px; height:auto;">`;
            } else {
                el.textContent = finalValue;
            }
        }
    }, interval);
}

function pullLever() {
    const hitbox = document.getElementById('lever-hitbox');
    if (hitbox.classList.contains('disabled')) return;

    const leverImg = document.querySelector('img[src*="Palanca_1.png"]');
    if (leverImg) {
        leverImg.src = leverImg.src.replace("_1.png", "_2.png"); 
        setTimeout(() => { leverImg.src = leverImg.src.replace("_2.png", "_1.png"); }, 1000); 
    }

    leverSound.play();
    reelSound.play();
    hitbox.classList.add('active', 'disabled');
    setTimeout(() => hitbox.classList.remove('active'), 150);

    animateSlot('slot-marca', marcas, 1400, true);
    animateSlot('slot-tono', tonos, 1800, true);
    animateSlot('slot-medio', medios, 2200, true);
    animateSlot('slot-regla', reglas, 2600, true);

   setTimeout(() => {
    reelSound.pause(); reelSound.currentTime = 0; winSound.play(); 
    hitbox.classList.remove('disabled');
    animateLights(3000);
    }, 2700);
}

// =========================================================================
// GESTIÓN DE VISTAS (MÁQUINA vs PÁGINA "SOBRE NOSOTRAS" y otros)
// =========================================================================

const machineContainer = document.querySelector('.machine-container');
const nosotrasPage = document.getElementById('nosotras-page');

// Función para mostrar CUALQUIER página completa (Nosotras, Teoría, Plantilla, etc.)
function showFullPage(pageId) {
    closeAllModals(); 
    if (machineContainer) machineContainer.style.display = 'none'; // Oculta la máquina
    
    // Ocultar todas las páginas completas primero, asegurando que solo se muestre la que queremos
    document.querySelectorAll('.full-page-view').forEach(page => page.style.display = 'none');
    
    // Mostrar solo la página solicitada
    const requestedPage = document.getElementById(pageId);
    if (requestedPage) requestedPage.style.display = 'block'; 
}


// Función EXISTENTE para "Sobre Nosotras", ahora usa la función genérica
function showNosotrasPage() {
    showFullPage('nosotras-page');
}


// Función para volver a la máquina
function showMachinePage() {
    // Oculta todas las páginas full-page-view
    document.querySelectorAll('.full-page-view').forEach(page => page.style.display = 'none'); 
    if (machineContainer) machineContainer.style.display = 'flex'; // Muestra la máquina
}

// Función para abrir modales de texto (Instrucciones/Contacto)
function openModal(modalId) {
    document.getElementById('modal-overlay').style.display = 'block';
    document.getElementById(modalId).style.display = 'block';
}

// Función general para cerrar todo
function closeAllModals() {
    document.getElementById('modal-overlay').style.display = 'none';
    document.querySelectorAll('.modal-content').forEach(el => el.style.display = 'none');
}

// Aseguramos que TODAS las páginas de full-page-view estén ocultas al cargar
document.addEventListener('DOMContentLoaded', () => {
    // Esto se asegura de que solo se vea la máquina al inicio.
    document.querySelectorAll('.full-page-view').forEach(page => page.style.display = 'none');
    // También aseguramos que la máquina se muestre (por si acaso el CSS la oculta inicialmente)
    if (machineContainer) machineContainer.style.display = 'flex';
});