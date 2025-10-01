// script.js

document.addEventListener("DOMContentLoaded", () => {
  // --- ELEMENTOS DEL SISTEMA DE PUBLICACIONES ---
  const fileInput = document.getElementById("fileInput");
  const descriptionInput = document.getElementById("description");
  const hashtagInput = document.getElementById("hashtag");
  const uploadButton = document.getElementById("uploadButton");
  const postsContainer = document.getElementById("posts");
  const filterInput = document.getElementById("filterInput");
  const preview = document.getElementById("preview");

  // --- ELEMENTOS DEL HEADER ---
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  // --- ELEMENTOS DE SERVICIOS ---
  const btnAdmin = document.querySelector(".btn-enviar");
  const btnAdscrip = document.querySelector(".btn-consulta");
  const btnSoporte = document.querySelector(".ayuda button");

  let posts = [];

  // ========== FUNCIONES DE PUBLICACIONES ==========

  // Previsualizar imagen
  if (fileInput) {
    fileInput.addEventListener("change", () => {
      preview.innerHTML = "";
      const file = fileInput.files[0];
      if (file) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.style.maxWidth = "200px";
        img.style.borderRadius = "8px";
        img.onload = () => URL.revokeObjectURL(img.src); // liberar memoria
        preview.appendChild(img);
      }
    });
  }

  // Subir publicación
  if (uploadButton) {
    uploadButton.addEventListener("click", () => {
      const file = fileInput.files[0];
      const description = descriptionInput.value.trim();
      const hashtag = hashtagInput.value.trim();

      if (!file || !description) {
        alert("Por favor, sube una imagen y escribe una descripción.");
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        const post = {
          img: e.target.result,
          description: description,
          hashtags: [...extractHashtags(description), ...(hashtag ? [hashtag] : [])]
        };
        posts.unshift(post);
        renderPosts(posts);
        resetForm();
      };
      reader.readAsDataURL(file);
    });
  }

  // Extraer hashtags de la descripción
  function extractHashtags(text) {
    return text.match(/#\w+/g) || [];
  }

  // Renderizar publicaciones
  function renderPosts(postsToRender) {
    postsContainer.innerHTML = "";
    postsToRender.forEach((post, index) => {
      const postEl = document.createElement("div");
      postEl.classList.add("post");
      postEl.innerHTML = `
        <img src="${post.img}" alt="Publicación" />
        <p>${sanitizeHTML(post.description)}</p>
        <p class="hashtags">${post.hashtags.join(" ")}</p>
        <button class="delete-btn" data-index="${index}">🗑️ Eliminar</button>
      `;
      postsContainer.appendChild(postEl);
    });

    // Botón eliminar
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        posts.splice(index, 1);
        renderPosts(posts);
      });
    });
  }

  // Filtrar por hashtag
  if (filterInput) {
    filterInput.addEventListener("input", () => {
      const filter = filterInput.value.trim().toLowerCase();
      if (!filter) {
        renderPosts(posts);
        return;
      }
      const filteredPosts = posts.filter(post =>
        post.hashtags.some(h => h.toLowerCase().includes(filter))
      );
      renderPosts(filteredPosts);
    });
  }

  // Resetear formulario después de publicar
  function resetForm() {
    fileInput.value = "";
    descriptionInput.value = "";
    hashtagInput.value = "";
    preview.innerHTML = "";
  }

  // Prevenir inyección de HTML
  function sanitizeHTML(str) {
    const temp = document.createElement("div");
    temp.textContent = str;
    return temp.innerHTML;
  }

  // ========== FUNCIONES DE NAVEGACIÓN Y SERVICIOS ==========

  // Menú hamburguesa (responsive)
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // Botón Administración → correo
  if (btnAdmin) {
    btnAdmin.addEventListener("click", () => {
      window.location.href =
        "mailto:Lucasbenitezlemos@gmail.com?subject=Soporte de Administración";
    });
  }

  // Botón Adscripción → WhatsApp
  if (btnAdscrip) {
    btnAdscrip.addEventListener("click", () => {
      const numero = "59891234567"; // cámbialo por tu número real
      const mensaje = "Hola, necesito consultar sobre Adscripción.";
      window.open(`https://wa.me/59899239556${numero}?text=${encodeURIComponent(mensaje)}`, "_blank");
    });
  }

  // Botón Soporte
  if (btnSoporte) {
    btnSoporte.addEventListener("click", () => {
      alert("📩 Se abrirá tu cliente de correo para contactar al soporte.");
      window.location.href =
        "mailto:soporte@instituto.com?subject=Necesito asistencia técnica";
    });
  }

  // Saludo dinámico
  const welcomeText = document.querySelector(".welcome");
  if (welcomeText) {
    const hora = new Date().getHours();
    let saludo = "¡Bienvenido/a!";
    if (hora >= 6 && hora < 12) saludo = "☀️ Buenos días";
    else if (hora >= 12 && hora < 19) saludo = "🌞 Buenas tardes";
    else saludo = "🌙 Buenas noches";
    welcomeText.textContent = `${saludo}, Usuario!`;
  }
});
