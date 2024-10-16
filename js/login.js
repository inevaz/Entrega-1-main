
   
// Añade un evento de click al botón de "Ingresar" para que llame a la función iniciar
document.getElementById("ingresar").addEventListener("click", iniciar); 

function iniciar() {
    // Captura los valores de los campos de email y contraseña
    const email = document.getElementById('nombre_usuario').value;
    const password = document.getElementById('contraseña_usuario').value;

    // Verifica si ambos campos están llenos
    if (email && password) {
        // Guarda el estado de sesión y el email del usuario en sessionStorage
        sessionStorage.setItem('sesion', 'true');  // Guarda que el usuario inició sesión
        sessionStorage.setItem('nombreUsuario', email);  // Guarda el email del usuario

        // Redirige al usuario a la página principal (index.html) o a la página que prefieras
        window.location.href = 'index.html';
    } else {
        // Muestra una alerta de error si faltan campos por llenar
        showAlertError();
    }
}

// Añade un evento de click al botón de "Ingresar" para que llame a la función iniciar
document.getElementById("ingresar").addEventListener("click", iniciar);

// Función para mostrar la alerta de error
function showAlertError() {
    const alertDanger = document.getElementById('alert-danger');
    alertDanger.classList.add('show');
    setTimeout(() => {
        alertDanger.classList.remove('show');
    }, 3000); // Oculta la alerta después de 3 segundos
}

