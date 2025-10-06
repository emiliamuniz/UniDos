document.addEventListener("DOMContentLoaded", () => {
    // Expresiones regulares
    const usernameRegex = /^[a-zA-Z0-9_]{4,15}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;

    // Funciones para mostrar y ocultar errores
    const showError = (elementId, message) => {
        const el = document.getElementById(elementId);
        if (el) {
            el.textContent = message;
            el.style.display = "block";
        }
    };
    const hideError = (elementId) => {
        const el = document.getElementById(elementId);
        if (el) {
            el.textContent = "";
            el.style.display = "none";
        }
    };

    // =======================
    // LÓGICA REGISTRO
    // =======================
    
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const user = document.getElementById("registerUsername").value.trim().toLowerCase();
            const pass = document.getElementById("registerPassword").value;
            const confirmPass = document.getElementById("registerConfirmPassword").value;
            let isValid = true;

            hideError("registerUsernameError");
            hideError("registerPasswordError");

            // Recuperar lista de usuarios existentes
            let users = JSON.parse(localStorage.getItem("users")) || [];

            // Validar campos vacíos
            if (!user || !pass || !confirmPass) {
                showError("registerUsernameError", "Todos los campos son obligatorios.");
                isValid = false;
            }

            // Validar username
            if (!usernameRegex.test(user)) {
                showError("registerUsernameError", "Usuario: 4-15 caracteres válidos (letras, números o _).");
                isValid = false;
            }

            // Validar si el usuario ya existe
            if (users.some(u => u.username === user)) {
                showError("registerUsernameError", "Este nombre de usuario ya está registrado.");
                isValid = false;
            }

            // Validar contraseña
            if (!passwordRegex.test(pass)) {
                showError("registerPasswordError", "Contraseña: 8-20 caracteres, mayúsculas, minúsculas, número y símbolo.");
                isValid = false;
            }

            // Confirmar contraseña
            if (pass !== confirmPass) {
                showError("registerPasswordError", "Las contraseñas no coinciden.");
                isValid = false;
            }

            // Guardar usuario si todo es válido
            if (isValid) {
                users.push({ username: user, password: pass });
                localStorage.setItem("users", JSON.stringify(users));
                alert("Registro exitoso. Ahora puedes iniciar sesión.");
                window.location.href = "index.html"; // Redirigir a login
            }
        });

        // Mostrar/ocultar contraseña
        const togglePasswordRegister = document.getElementById("togglePasswordRegister");
        if (togglePasswordRegister) {
            togglePasswordRegister.addEventListener("change", function () {
                const pwd = document.getElementById("registerPassword");
                const confirmPwd = document.getElementById("registerConfirmPassword");
                pwd.type = this.checked ? "text" : "password";
                confirmPwd.type = this.checked ? "text" : "password";
            });
        }

        // Validación en vivo
        const registerUsername = document.getElementById("registerUsername");
        if (registerUsername) {
            registerUsername.addEventListener("input", (e) => {
                if (!usernameRegex.test(e.target.value.trim())) {
                    showError("registerUsernameError", "Usuario: 4-15 caracteres válidos (letras, números o _).");
                } else {
                    hideError("registerUsernameError");
                }
            });
        }

        const registerPassword = document.getElementById("registerPassword");
        if (registerPassword) {
            registerPassword.addEventListener("input", (e) => {
                if (!passwordRegex.test(e.target.value)) {
                    showError("registerPasswordError", "Contraseña: 8-20 caracteres, mayúsculas, minúsculas, número y símbolo.");
                } else {
                    hideError("registerPasswordError");
                }
            });
        }
    }

    // =======================
    // LÓGICA LOGIN
    // =======================
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const user = document.getElementById("loginUsername").value.trim().toLowerCase();
            const pass = document.getElementById("loginPassword").value;

            hideError("loginError");

            const users = JSON.parse(localStorage.getItem("users")) || [];
            const storedUser = users.find(u => u.username === user);

            if (storedUser && storedUser.password === pass) {
                alert("¡Inicio de sesión exitoso!");
                window.location.href = "home.html"; // Redirigir a home
            } else {
                showError("loginError", "Usuario o contraseña incorrectos.");
            }
        });

        // Mostrar/ocultar contraseña login
        const togglePasswordLogin = document.getElementById("togglePasswordLogin");
        if (togglePasswordLogin) {
            togglePasswordLogin.addEventListener("change", function () {
                const pwd = document.getElementById("loginPassword");
                pwd.type = this.checked ? "text" : "password";
            });
        }
    }
});
const errorElements = [
    "registerUsernameError",
    "registerPasswordError",
    "loginError"
];

errorElements.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.style.color = "red";
    }
});
const loginError = document.getElementById("loginError");
const loginButton = document.querySelector("#loginForm button[type='submit']");
if (loginError && loginButton) {
    loginButton.parentNode.insertBefore(loginError, loginButton);

}

