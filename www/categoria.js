// Event listener para el botón
document.getElementById("Crear").addEventListener("click", async () => {

  let imput = document.getElementById("NuevaCategoria");
  let name = imput.value.trim();

  
  if (!name) {
    Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "El nombre es obligatorio",
    });
    return false;
  }
  try {
  fetch('http://localhost:3000/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name })
    
  })

  //Te manda al index
  window.location.href = "index.html";
}catch (error) {
    console.error('Error:', error);
    return false;
  }
}  
);