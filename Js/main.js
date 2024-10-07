
const pizzasDiv = document.getElementById('pizzas');
const extrasDiv = document.getElementById('extras');

async function fetchData() {
    try {
        const response = await fetch('../Data/data.json');

        if (!response.ok) {
            throw new Error('Error al cargar los datos');
        }

        const data = await response.json();
        mostrarProductos(data.productos);
    } catch (error) {
        mostrarError('Error en la carga de productos. Inténtalo de nuevo más tarde.');
        console.error(error);
    } finally {
        console.log('Fetch de productos finalizado');
    }
}

function mostrarError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: mensaje,
    });
}

function mostrarProductos(productos) {
    pizzasDiv.innerHTML = '';

    productos.forEach(producto => {
        const productoDiv = crearProductoDiv(producto);
        pizzasDiv.appendChild(productoDiv);
    });
}

function crearProductoDiv(producto) {
    const productoDiv = document.createElement('div');
    productoDiv.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <button data-nombre="${producto.nombre}" data-precio="${producto.precio}">
            Añadir al carrito - $${producto.precio}
        </button>
    `;

    productoDiv.querySelector('button').addEventListener('click', () => agregarAlCarrito(producto));
    return productoDiv;
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarCarrito();
    fetchData();
});
