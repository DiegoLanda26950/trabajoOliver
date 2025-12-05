// Cargar categorías en el select
async function loadCategories() {
  try {
    const res = await fetch('http://localhost:3000/categories');
    const categories = await res.json();
    
    const select = document.getElementById('category');
    select.innerHTML = '<option value="">Selecciona una categoría</option>';
    
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.id;
      option.textContent = cat.name;
      select.appendChild(option);
    });
  } catch (error) {
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
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const url = document.getElementById('url').value.trim();
  const user = document.getElementById('user').value.trim();
  const password = document.getElementById('password').value.trim();
  const description = document.getElementById('description').value.trim();
  const categoryId = document.getElementById('category').value;
  
  // Validaciones
  if (!name || !url || !user || !password || !categoryId) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Todos los campos obligatorios deben estar completos'
    });
    return;
  }
  
  try {
    const res = await fetch(`http://localhost:3000/categories/${categoryId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        url: url,
        user: user,
        password: password,
        description: description
      })
    });
    
    if (!res.ok) {
      throw new Error('Error al crear el sitio');
    }
    
    await Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'El sitio se ha creado correctamente'
    });
    
    // Redirigir al index
    window.location.href = 'index.html';
    
  } catch (error) {
    console.error('Error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo crear el sitio'
    });
  }
});

// Cargar categorías al iniciar
loadCategories();