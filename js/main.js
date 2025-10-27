document.addEventListener("DOMContentLoaded", () => {
  initParticles();
  initBackgroundSlideshow();

  const enterBtn = document.getElementById("enterBtn");
  const hero = document.querySelector(".hero");
  const categorias = document.getElementById("categorias");

  enterBtn.addEventListener("click", () => {
    hero.classList.add("fade-out");
    categorias.classList.add("hidden"); // Asegura que esté oculta al inicio

    setTimeout(() => {
      hero.style.display = "none";
      categorias.style.display = "block"; // Muestra las categorías recién ahora
      categorias.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" }); // Sube al inicio
      animateSections();
    }, 1000);
  });


  document.querySelectorAll(".categoria").forEach(cat => {
    cat.addEventListener("click", () => openCategoria(cat.dataset.section));
  });
});

/* ===== DATOS ===== */
const categoriasData = {
  amistad: {
    titulo: "El comienzo de nuestra amistad 💫",
    fotos: [
      { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e", texto: "Nuestra primera foto 💕" },
      { src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f", texto: "Charlas infinitas ☕" },
      { src: "https://images.unsplash.com/photo-1535930749574-1399327ce78f", texto: "Donde todo empezó ✨" },
    ],
    carta: "Desde ese primer día supe que ibas a ser alguien importante. ❤️"
  },
  logros: {
    titulo: "Logros juntas 🏆",
    fotos: [
      { src: "https://images.unsplash.com/photo-1558980664-10ea1e38a00d", texto: "El día que lo logramos 💪" },
      { src: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51", texto: "Celebrando el éxito 🥂" },
    ],
    carta: "Sos capaz de todo, y siempre voy a estar aplaudiéndote. 🌟"
  },
  viaje: {
    titulo: "Viaje inolvidable ✈️",
    fotos: [
      { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", texto: "Rumbo a la aventura 🚗" },
      { src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429", texto: "Atardeceres 🌅" },
    ],
    carta: "Cada kilómetro valió la pena. Que tus nuevos caminos sean igual de mágicos. 💖"
  },
  momentos: {
    titulo: "Momentos que se vuelven eternos 💖",
    fotos: [
      { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9", texto: "Tu risa ese día fue todo 😍" },
      { src: "https://images.unsplash.com/photo-1607083206968-13611e3b9a7d", texto: "Momentos simples 💫" },
    ],
    carta: "Aunque pase el tiempo, hay recuerdos que quedan grabados en el corazón. 💌"
  }
};

function openCategoria(key) {
  const section = document.getElementById("albumSection");
  const categorias = document.getElementById("categorias");
  const data = categoriasData[key];
  let current = 0;

  // Combinar fotos + carta final
  const slidesData = [
    ...data.fotos.map(f => ({ tipo: "foto", src: f.src, texto: f.texto })),
    { tipo: "carta", texto: data.carta }
  ];

  section.innerHTML = `
    <div class="album-view">
      <h2>${data.titulo}</h2>
      <div class="carousel">
        ${slidesData.map((f, i) => `
          <div class="slide ${i === 0 ? 'active' : ''}">
            ${f.tipo === "foto"
      ? `<img src="${f.src}?auto=format&fit=crop&w=900&q=80" alt="">
                   <div class="note">${f.texto}</div>`
      : `<div class="carta-sobre" id="cartaSobre">
                     <div class="tapa"></div>
                     <div class="contenido">
                       <h3>💌 Carta final</h3>
                       <p>${f.texto}</p>
                     </div>
                   </div>`
    }
          </div>
        `).join('')}
        <div class="arrow left" id="prevSlide">❮</div>
        <div class="arrow right" id="nextSlide">❯</div>
      </div>
      <button id="volverCategorias">Volver</button>
    </div>
  `;

  categorias.classList.add("hidden");
  section.classList.remove("hidden");

  const slides = section.querySelectorAll(".slide");
  const nextBtn = section.querySelector("#nextSlide");
  const prevBtn = section.querySelector("#prevSlide");
  let startX = 0;

  // Flechas
  nextBtn.onclick = nextSlide;
  prevBtn.onclick = prevSlide;

  // Swipe en móvil
  const carousel = section.querySelector(".carousel");
  carousel.addEventListener("touchstart", e => (startX = e.touches[0].clientX));
  carousel.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextSlide();
    else if (endX - startX > 50) prevSlide();
  });

  // Scroll en PC
  carousel.addEventListener("wheel", e => {
    if (e.deltaY > 0) nextSlide();
    else prevSlide();
  });

  function nextSlide() {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }

  function prevSlide() {
    slides[current].classList.remove("active");
    current = (current - 1 + slides.length) % slides.length;
    slides[current].classList.add("active");
  }

  // Efecto abrir sobre
  const sobre = document.getElementById("cartaSobre");
  if (sobre) {
    sobre.addEventListener("click", () => sobre.classList.toggle("abierto"));
  }

  document.getElementById("volverCategorias").onclick = () => {
    section.classList.add("hidden");
    categorias.classList.remove("hidden");
  };
}
/* ===== FONDO ANIMADO ===== */
function initParticles() {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.3 - 0.15;
      this.speedY = Math.random() * 0.3 - 0.15;
      this.color = `rgba(255, ${150 + Math.random() * 50}, ${200 + Math.random() * 55}, 0.6)`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > w) this.speedX *= -1;
      if (this.y < 0 || this.y > h) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function init() { for (let i = 0; i < 60; i++) particles.push(new Particle()); }
  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  init(); animate();
}

/* ===== SLIDESHOW HERO (el tuyo original) ===== */
function initBackgroundSlideshow() {
  const heroEl = document.querySelector(".hero");
  const backgrounds = [
    "/img/portada.jpeg",
    "https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2000&q=80"
  ];
  let current = 0;

  const layerA = document.createElement("div");
  const layerB = document.createElement("div");
  [layerA, layerB].forEach(layer => {
    Object.assign(layer.style, {
      position: "absolute",
      inset: "0",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transition: "opacity 1.8s ease-in-out",
      zIndex: "-2",
      opacity: "0"
    });
    heroEl.appendChild(layer);
  });

  layerA.style.backgroundImage = `url(${backgrounds[0]})`;
  layerA.style.opacity = "1";

  setInterval(() => {
    current = (current + 1) % backgrounds.length;
    const visible = layerA.style.opacity === "1" ? layerA : layerB;
    const hidden = visible === layerA ? layerB : layerA;
    hidden.style.backgroundImage = `url(${backgrounds[current]})`;
    hidden.style.opacity = "0";
    hidden.style.zIndex = "-3";
    visible.style.zIndex = "-2";
    setTimeout(() => {
      hidden.style.opacity = "1";
      visible.style.opacity = "0";
    }, 100);
  }, 4000);
}
// ===== Cartas especiales con modal =====
document.addEventListener("DOMContentLoaded", () => {
  const portadas = document.querySelectorAll(".carta-portada");
  const modales = {
    paula: document.getElementById("modalPaula"),
    juli: document.getElementById("modalJuli")
  };

  portadas.forEach(portada => {
    portada.addEventListener("click", () => {
      const carta = portada.dataset.carta;
      const modal = modales[carta];
      if (modal) {
        modal.classList.add("show");
        setTimeout(() => {
          modal.querySelector(".carta-modal").classList.add("abierta");
          sonido.currentTime = 0;
          sonido.play();
        }, 300);
      }
    });
  });

  // Cerrar modal
  document.querySelectorAll(".cerrar").forEach(btn => {
    btn.addEventListener("click", e => {
      const modal = e.target.closest(".modal-carta");
      modal.querySelector(".carta-modal").classList.remove("abierta");
      setTimeout(() => modal.classList.remove("show"), 500);
    });
  });

  // Cerrar haciendo clic fuera
  document.querySelectorAll(".modal-carta").forEach(modal => {
    modal.addEventListener("click", e => {
      if (e.target === modal) {
        modal.querySelector(".carta-modal").classList.remove("abierta");
        setTimeout(() => modal.classList.remove("show"), 500);
      }
    });
  });
});
// ===== CONTADOR REGRESIVO EN FOOTER =====
document.addEventListener("DOMContentLoaded", () => {
  const diasEl = document.getElementById("dias");
  const horasEl = document.getElementById("horas");
  const minutosEl = document.getElementById("minutos");
  const segundosEl = document.getElementById("segundos");

  // Fecha actual + 365 días
  const fechaObjetivo = new Date();
  fechaObjetivo.setDate(fechaObjetivo.getDate() + 366);

  function actualizarContador() {
    const ahora = new Date();
    const diff = fechaObjetivo - ahora;

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);

    diasEl.textContent = dias.toString().padStart(2, '0');
    horasEl.textContent = horas.toString().padStart(2, '0');
    minutosEl.textContent = minutos.toString().padStart(2, '0');
    segundosEl.textContent = segundos.toString().padStart(2, '0');
  }

  actualizarContador();
  setInterval(actualizarContador, 1000);
});
