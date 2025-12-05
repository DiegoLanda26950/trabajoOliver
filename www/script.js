let Catid = null;

// Cargar sitios por categoría
async function loadSitesByCategory(categoryId) {
  Catid = categoryId;
  try {
    const res = await fetch(`http://localhost:3000/categories/${categoryId}`);
    const data = await res.json();

    if (data.sites && data.sites.length > 0) {
      drawSites(data.sites);
    } else {
      Swal.fire({
        icon: "info",
        title: "Sin sitios",
        text: "Esta categoría no tiene sitios registrados."
      });
      drawSites([]); // limpia la tabla
    }
  } catch (err) {
    console.error("Error cargando sites por categoría:", err);
  }
}

// Dibujar sitios en tabla
function drawSites(sites) {
  const tbody = document.getElementById("sitesTableBody");
  tbody.innerHTML = "";

  sites.forEach(site => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${site.name}</td>
      <td>${site.user}</td>
      <td>${site.password}</td>
      <td><a href="${site.url}" target="_blank">${site.url}</a></td>
      <td>${site.description}</td>
      <td>
        <button class="delete-site" data-id="${site.id}">🗑️</button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  addDeleteSiteEvents();
}

// Eventos para borrar sitios
function addDeleteSiteEvents() {
  document.querySelectorAll(".delete-site").forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      deleteSite(id);
    };
  });
}

// Eliminar sitio
function deleteSite(id) {
  Swal.fire({
    title: "¿Eliminar sitio?",
    text: "No podrás revertir esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar"
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:3000/sites/${id}`, { method: "DELETE" })
        .then(res => {
          if (!res.ok) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se pudo eliminar el sitio"
            });
          } else {
            Swal.fire("Eliminado!", "El sitio ha sido eliminado.", "success");
            loadSitesByCategory(Catid); // recargar sitios de la categoría actual
          }
        });
    }
  });
}

// Cargar todos los sitios al iniciar
async function loadSites() {
  try {
    const res = await fetch("http://localhost:3000/sites");
    const data = await res.json();
    drawSites(data);
  } catch (err) {
    console.error("Error cargando sites:", err);
  }
}

// Dibujar categorías
let drawData = (data) => {
  data.forEach(category => {
    let parent = document.getElementsByTagName('ul')[0];

    let child = document.createElement('li');
    child.classList.add("category-name");

    let nameSpan = document.createElement('span');
    nameSpan.innerText = category.name;
    nameSpan.style.marginRight = '10px';

    // 👉 Al hacer clic en el nombre, carga sus sitios
    nameSpan.onclick = () => loadSitesByCategory(category.id);

    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = '❌';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => deleteCategory(category.id, child);

    child.appendChild(nameSpan);
    child.appendChild(deleteBtn);
    parent.appendChild(child);
  });
};

// Eliminar categoría
let deleteCategory = (id, child) => {
  Swal.fire({
    title: "¿Eliminar categoría?",
    text: "No podrás revertir esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar"
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:3000/categories/${id}`, { method: 'DELETE' })
        .then(res => {
          if (!res.ok) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se pudo eliminar la categoría"
            });
          } else {
            child.remove();
            Swal.fire("Eliminada!", "La categoría ha sido eliminada.", "success");
          }
        });
    }
  });
};

// Solicitar categorías y dibujarlas
fetch("http://localhost:3000/categories")
  .then(res => res.json())
  .then(data => drawData(data));

// 👉 Mostrar todos los sitios al inicio
loadSites();
