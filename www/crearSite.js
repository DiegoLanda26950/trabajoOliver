// Cargar categorías en el select
async function loadCategories() {
  try {
    // Solicita al backend la lista de categorías
    const res = await fetch('http://localhost:3000/categories');

    // Convierte la respuesta a JSON
    const categories = await res.json();
    
    // Obtiene el <select> donde se mostrarán las categorías
    const select = document.getElementById('category');

    // Inserta una opción por defecto
    select.innerHTML = '<option value="">Selecciona una categoría</option>';
    
    // Recorre todas las categorías obtenidas
    categories.forEach(cat => {
      // Crea un elemento <option> por cada categoría
      const option = document.createElement('option');
      option.value = cat.id;      // El value será el ID de la categoría
      option.textContent = cat.name; // El nombre visible de la categoría
      select.appendChild(option);    // Lo agrega al <select>
    });
  } catch (error) {
    // Si algo falla, lo muestra en consola y lanza un alert visual
    console.error('Error cargando categorías:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudieron cargar las categorías'
    });
  }
}

// Event listener para el formulario
document.getElementById('crearSiteForm').addEventListener('submit', async (e) => {
  // Evita que el formulario recargue la página
  e.preventDefault();
  
  // Obtiene los valores de todos los campos
  const name = document.getElementById('name').value.trim();
  const url = document.getElementById('url').value.trim();
  const user = document.getElementById('user').value.trim();
  const password = document.getElementById('password').value.trim();
  const description = document.getElementById('description').value.trim();
  const categoryId = document.getElementById('category').value;
  
  // Validaciones: si falta un campo obligatorio, muestra alerta
  if (!name || !url || !user || !password || !categoryId) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Todos los campos obligatorios deben estar completos'
    });
    return;
  }
  
  try {
    // Envia al backend los datos del nuevo sitio
    const res = await fetch(`http://localhost:3000/categories/${categoryId}`, {
      method: 'POST',                       // Método POST para crear
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        url: url,
        user: user,
        password: password,
        description: description
      })
    });
    
    // Si la respuesta no es OK, lanza error
    if (!res.ok) {
      throw new Error('Error al crear el sitio');
    }
    
    // Muestra mensaje de éxito
    await Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'El sitio se ha creado correctamente'
    });
    
    // Redirige al index después de crear
    window.location.href = 'index.html';
    
  } catch (error) {
    // Si hay error en la creación, se muestra alerta
    console.error('Error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo crear el sitio'
    });
  }
});

// Ejecuta la carga de categorías automáticamente al iniciar la página
loadCategories();
