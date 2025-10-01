// servicios.js

document.addEventListener("DOMContentLoaded", () => {
  // --- MENÚ RESPONSIVE ---
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active"); 
    menuToggle.classList.toggle("open");
  });

  // --- BOTÓN ADMINISTRACIÓN (Correo) ---
  const btnAdmin = document.querySelector(".btn-enviar");
  if (btnAdmin) {
    btnAdmin.addEventListener("click", () => {
      window.location.href =
        "mailto:lucasbenitezlemos@gmail.com?subject=Soporte de Administración";
    });
  }

  // --- BOTÓN ADSCRIPCIÓN (WhatsApp) ---
  const btnAdscrip = document.querySelector(".btn-consulta");
  if (btnAdscrip) {
    btnAdscrip.addEventListener("click", () => {
      // Número de WhatsApp en formato internacional (+598 Uruguay, cambiar por tu número real)
      const numero = "59891234567"; 
      const mensaje = "Hola, necesito consultar sobre Adscripción.";
    window.open(`https://wa.me/59899239556${numero}?text=${encodeURIComponent(mensaje)}`, "_blank");
    });
  }

  // --- BOTÓN DE AYUDA ---
  const btnSoporte = document.querySelector(".ayuda button");
  if (btnSoporte) {
    btnSoporte.addEventListener("click", () => {
      alert("📩 Se abrirá tu cliente de correo para contactar al soporte.");
      window.location.href =
        "mailto:lucasbenitezlemos@gmail.com?subject=Necesito asistencia técnica";
    });
  }

  // --- SALUDO DINÁMICO (opcional) ---
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
