function validar() {
    const nombre = document.getElementById('nombre');
    const segnombre = document.getElementById('segnombre');
    const apellido = document.getElementById('apellido');
    const segapellido = document.getElementById('segapellido');
    const email = document.getElementById('email');
    const contacto = document.getElementById('contacto');

    clearAlerts(); // Limpiar las alertas previas

    let formIsValid = true; // Bandera para saber si el formulario es válido

    // Validación de campos vacíos
    if (!nombre.value) {
        nombre.classList.add('is-invalid');
        formIsValid = false;
    } else {
        nombre.classList.remove('is-invalid');
        nombre.classList.add('is-valid');
    }

    if (segnombre.value) {
        segnombre.classList.remove('is-invalid');  // Elimina cualquier error previo
        segnombre.classList.add('is-valid');       // Aplica la clase 'is-valid' si tiene valor
    } else {
        segnombre.classList.remove('is-invalid');  // No es obligatorio, no muestra error si está vacío
        segnombre.classList.remove('is-valid');    // Si está vacío, remueve la clase 'is-valid'
    }

    if (!apellido.value) {
        apellido.classList.add('is-invalid');
        formIsValid = false;
    } else {
        apellido.classList.remove('is-invalid');
        apellido.classList.add('is-valid');
    }

    if (segapellido.value) {
        segapellido.classList.remove('is-invalid');  // Elimina cualquier error previo
        segapellido.classList.add('is-valid');       // Aplica la clase 'is-valid' si tiene valor
    } else {
        segapellido.classList.remove('is-invalid');  // No es obligatorio, no muestra error si está vacío
        segapellido.classList.remove('is-valid');    // Si está vacío, remueve la clase 'is-valid'
    }

    if (!contacto.value) {
        contacto.classList.add('is-invalid');
        formIsValid = false;
    } else {
        contacto.classList.remove('is-invalid');
        contacto.classList.add('is-valid');
    }

    if (!email.value) {
        email.classList.add('is-invalid');
        formIsValid = false;
    } else if (email.validity.typeMismatch) {
        email.classList.add('is-invalid');
        showAlertError('El correo no es válido.');
        formIsValid = false;
    } else {
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
    }

    // Si todo es válido, guardar los datos en localStorage y mostrar mensaje de éxito
    if (formIsValid) {
        if (nombre.value) localStorage.setItem('nombre', nombre.value);
        if (segnombre.value) localStorage.setItem('segnombre', segnombre.value);
        if (apellido.value) localStorage.setItem('apellido', apellido.value);
        if (segapellido.value) localStorage.setItem('segapellido', segapellido.value);
        if (email.value) localStorage.setItem('email', email.value);
        if (contacto.value) localStorage.setItem('contacto', contacto.value);

        // Limpiar formulario después del guardado
        document.getElementById("registerForm").reset();
        showAlertSuccess();
    }
}

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    validar();
});

function clearAlerts() {
    const alertSuccess = document.getElementById("alert-success");
    const alertError = document.getElementById("alert-danger");

    alertSuccess.classList.add("fade");
    alertSuccess.classList.remove("show");

    alertError.classList.add("fade");
    alertError.classList.remove("show");
}

function showAlertSuccess() {
    const alertSuccess = document.getElementById("alert-success");
    alertSuccess.classList.remove("fade");
    alertSuccess.classList.add("show");
    alertSuccess.querySelector('p').textContent = "Registro guardado correctamente.";
}

function showAlertError(message) {
    const alertError = document.getElementById("alert-danger");
    alertError.classList.remove("fade");
    alertError.classList.add("show");
    alertError.querySelector('p').textContent = message;
}

// Combinación de todas las funciones de `DOMContentLoaded`
document.addEventListener('DOMContentLoaded', function() {
    // Cargar valores del localStorage en el formulario
    if (localStorage.getItem('nombre')) {
        document.getElementById('nombre').value = localStorage.getItem('nombre');
    }
    if (localStorage.getItem('segnombre')) {
        document.getElementById('segnombre').value = localStorage.getItem('segnombre');
    }
    if (localStorage.getItem('apellido')) {
        document.getElementById('apellido').value = localStorage.getItem('apellido');
    }
    if (localStorage.getItem('segapellido')) {
        document.getElementById('segapellido').value = localStorage.getItem('segapellido');
    }
    if (localStorage.getItem('email')) {
        document.getElementById('email').value = localStorage.getItem('email');
    }
    if (localStorage.getItem('contacto')) {
        document.getElementById('contacto').value = localStorage.getItem('contacto');
    }

   

    // Listeners para alternar entre Modo Día y Noche
    const toggleModo = document.getElementById('toggleModo');
    const labelModo = document.getElementById('labelModo');

    if (toggleModo) {
        toggleModo.addEventListener('change', function () {
            if (this.checked) {
                activarModoNoche();
                localStorage.setItem('theme', 'dark'); // Guardar la preferencia en localStorage
            } else {
                activarModoDia();
                localStorage.setItem('theme', 'light');
            }
        });
    }
});

 // Verificar y aplicar el modo guardado en localStorage
 const modoActual = localStorage.getItem('theme');
 if (modoActual === 'dark') {
     activarModoNoche();
     toggleModo.checked = true;
 } else {
     activarModoDia();
 }
 
// Función para activar el Modo Noche
function activarModoNoche() {
    document.body.classList.add('dark-mode'); // Agregar clase para fondo oscuro
   /*  document.querySelector('.navbar').classList.remove('navbar-light', 'bg-light');
    document.querySelector('.navbar').classList.add('navbar-dark', 'bg-dark'); */
    labelModo.innerHTML = '<i class="bi bi-sun"></i>';
}

// Función para activar el Modo Día
function activarModoDia() {
    document.body.classList.remove('dark-mode'); // Quitar clase de fondo oscuro
    document.body.classList.add('light-mode'); // Agregar clase para fondo claro
/*     document.querySelector('.navbar').classList.remove('navbar-dark', 'bg-dark');
    document.querySelector('.navbar').classList.add('navbar-light', 'bg-light'); */
    labelModo.innerHTML = '<i class="bi bi-moon"></i>';
}

/* funcion para que aparezca el campo de email, rellenado por el emai que se ingresa en el login */


document.addEventListener('DOMContentLoaded', function() {
    const emailUsuario = sessionStorage.getItem('nombreUsuario'); // Recupera el email de sessionStorage
    if (emailUsuario) {
        // Si hay un email en sessionStorage, úsalo
        document.getElementById('email').value = emailUsuario;
        console.log("Email del sessionStorage cargado:", emailUsuario);
    } else {
        // Si no hay un email en sessionStorage, carga el del localStorage (si existe)
        const emailLocal = localStorage.getItem('email');
        if (emailLocal) {
            document.getElementById('email').value = emailLocal;
            console.log("Email del localStorage cargado:", emailLocal);
        }
    }
});

//img de perfil
document.getElementById("inputGroupFile02").addEventListener("change", function (event) {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            //guardo foto en el localstorage
            localStorage.setItem("profileImage", e.target.result);
            
            // Muestra la imagen en el contenedor de perfil
            const profileImage = document.getElementById("profileImage");
            profileImage.src = e.target.result;
            profileImage.style.display = "block"; //muestro la foto
        };
        reader.readAsDataURL(file); //lee el archivo como si fuera una URL
    }
});

//si hay foto en el localstorage, la carga
function loadProfileImage() {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
        const profileImage = document.getElementById("profileImage");
        profileImage.src = storedImage;
        profileImage.style.display = "block"; //muestro la img de perfil si hay
    }
}

//carga la foto de perfil al cargar la página
window.onload = loadProfileImage;
