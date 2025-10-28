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
      { src: "/img/c1.jpeg", texto: "Nuestra primera foto 💕" },
      { src: "/img/c2.jpeg", texto: "Charlas infinitas ☕" },
      { src: "/img/c6.jpeg", texto: "Donde todo empezó ✨" },
      { src: "/img/c4.jpeg", texto: "Charlas infinitas ☕" },
      { src: "/img/c5.jpeg", texto: "Donde todo empezó ✨" },
      { src: "/img/c7.jpeg", texto: "Nuestra primera foto 💕" },
      { src: "/img/c8.jpeg", texto: "Charlas infinitas ☕" },
      { src: "/img/c9.jpeg", texto: "Donde todo empezó ✨" },
      { src: "/img/c10.jpeg", texto: "Charlas infinitas ☕" },
    ],
    carta: "Todo empezó en la facu, cuando ninguna entendía lo que explicaba nuestro amor, el Chelo. De ahí salieron las risas, los mates, los enredos y, sin darnos cuenta, la mejor amistad.Lo que empezó con “¿entendiste algo?” terminó siendo imposible de separar."
  },
  logros: {
    titulo: "Logros juntas 🏆",
    fotos: [
      { src: "/img/l1.jpeg", texto: "El día que lo logramos 💪" },
      { src: "/img/l2.jpeg", texto: "Celebrando el éxito 🥂" },
      { src: "/img/l3.jpeg", texto: "El día que lo logramos 💪" },
      { src: "/img/l4.jpeg", texto: "Celebrando el éxito 🥂" },
      { src: "/img/l5.jpeg", texto: "El día que lo logramos 💪" },
      { src: "/img/l6.jpeg", texto: "Celebrando el éxito 🥂" },
      { src: "/img/l7.jpeg", texto: "El día que lo logramos 💪" },
      { src: "/img/l8.jpeg", texto: "Celebrando el éxito 🥂" },
      { src: "/img/l9.jpeg", texto: "El día que lo logramos 💪" },
      { src: "/img/l10.jpeg", texto: "Celebrando el éxito 🥂" },
      { src: "/img/l11.jpeg", texto: "El día que lo logramos 💪" },
      { src: "/img/l12.jpeg", texto: "El día que lo logramos 💪" },
    ],
    carta: "Después de mil parciales, cafés, un par de porros, crisis y charlas eternas, lo logramos. Nos recibimos juntas (con chatgpt) después de cansarlo a nuestro hermano Zakhour con nuestra presencia."
  },
  viaje: {
    titulo: "Viaje inolvidable ✈️",
    fotos: [
      { src: "/img/v1.jpeg", texto: "Rumbo a la aventura 🚗" },
      { src: "/img/v2.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/v3.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/v4.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/v5.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/v6.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/v7.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/v8.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/v9.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/v11.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/v12.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/v14.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/v15.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/v16.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/v18.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/v19.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/v20.mp4", texto: "Atardeceres 🌅" },
      { src: "/img/v21.mp4", texto: "Atardeceres 🌅" },
      { src: "/img/v22.jpeg", texto: "Atardeceres 🌅" },
    ],
    carta: "Entre las alcoholizada que nos pegabamos todos los días, las charlas eternas hasta las 5 am y las risas que no se terminaban más, no hubo un solo momento aburrido. Fue ese tipo de viaje que te hace pensar “esto hay que repetirlo sí o sí (sin 40hs de viaje xfa)”. Lo mejor no fue el lugar, sino nosotras, y todo lo que tomamos juntas"
  },
  momentos: {
    titulo: "Momentos que se vuelven eternos 💖",
    fotos: [
      { src: "/img/m1.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/m2.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/m3.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/m4.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/m5.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/m6.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/m7.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/m8.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/m9.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/m10.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/m11.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/m12.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/m13.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/m14.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/m15.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/m16.jpeg", texto: "Atardeceres 🌅" },
      { src: "/img/m17.jpeg", texto: "Atardeceres 🌅" },
    ],
    carta: "Las pijamadas hablando de sexo toda la noche, los kilos de papas fritas que desaparecieron en minutos, los cafés eternos después de la facu donde arreglábamos el mundo, y los puchos post-clase. Son esos momentos los que hacen que todo valga la pena."
  }
};
function openCategoria(key) {
  const section = document.getElementById("albumSection");
  const categorias = document.getElementById("categorias");
  const data = categoriasData[key];
  let current = 0;

  // Combinar fotos, videos y carta final
  const slidesData = [
    ...(data.fotos || []).map(f => ({
      tipo: f.src.endsWith(".mp4") ? "video" : "foto",
      src: f.src,
      texto: f.texto
    })),
    { tipo: "carta", texto: data.carta }
  ];

  section.innerHTML = `
    <div class="album-view">
      <h2>${data.titulo}</h2>
      <div class="carousel">
        ${slidesData
      .map(
        (f, i) => `
          <div class="slide ${i === 0 ? "active" : ""}">
            ${f.tipo === "foto"
            ? `<img src="${f.src}" alt="">
                   <div class="note">${f.texto}</div>`
            : f.tipo === "video"
              ? `<div class="video-container">
     <video src="${f.src}" preload="metadata" playsinline></video>
     <div class="play-btn"></div>
   </div>
   <div class="note">${f.texto}</div>`
              : `<div class="carta-final">
                     <h3>💌 Carta final</h3>
                     <p>${f.texto}</p>
                   </div>`
          }
          </div>
        `
      )
      .join("")}
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

  nextBtn.onclick = nextSlide;
  prevBtn.onclick = prevSlide;

  const carousel = section.querySelector(".carousel");
  carousel.addEventListener("touchstart", e => (startX = e.touches[0].clientX));
  carousel.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextSlide();
    else if (endX - startX > 50) prevSlide();
  });

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

  document.getElementById("volverCategorias").onclick = () => {
    section.classList.add("hidden");
    categorias.classList.remove("hidden");
  };
  // Botón de play personalizado
  section.querySelectorAll(".video-container").forEach(container => {
    const video = container.querySelector("video");
    const playBtn = container.querySelector(".play-btn");

    playBtn.addEventListener("click", () => {
      playBtn.classList.add("fade-out");
      video.play();
    });

    video.addEventListener("pause", () => {
      playBtn.classList.remove("fade-out");
    });

    video.addEventListener("ended", () => {
      playBtn.classList.remove("fade-out");
    });
  });

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
    "/img/chicago.jpg",
    "/img/nyc.jpg",
    "/img/arg.jpg",
    "/img/portada.jpeg"
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
