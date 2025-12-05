// Event listener para el botón
document.getElementById("Crear").addEventListener("click", async () => {

  // Obtiene el input donde el usuario escribe el nombre de la nueva categoría
  let imput = document.getElementById("NuevaCategoria");
  let name = imput.value.trim();   // Elimina espacios al inicio y final

  // Validación: si el campo está vacío, muestra mensaje de error
  if (!name) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El nombre es obligatorio",
    });
    return false; // Evita continuar con el proceso
  }

  try {
    // Realiza una petición POST al backend para crear la nueva categoría
    fetch('http://localhost:3000/categories', {
      method: 'POST',                           // Tipo de petición
      headers: { 'Content-Type': 'application/json' }, // Indica que se envía JSON
      body: JSON.stringify({ name: name })      // Convierte el nombre a JSON
    });

    // Redirige al usuario al index después de crear la categoría
    window.location.href = "index.html";

  } catch (error) {
    // Captura errores de ejecución, como problemas de conexión
    console.error('Error:', error);
    return false;
  }
});
