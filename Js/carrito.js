
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let total = parseFloat(localStorage.getItem('total')) || 0;

function guardarEnStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', total);
}

function actualizarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    carritoDiv.innerHTML = '';

    if (carrito.length === 0) {
        carritoDiv.textContent = 'El carrito está vacío';
        return;
    }

    carrito.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => eliminarDelCarrito(index));

        productoDiv.appendChild(botonEliminar);
        carritoDiv.appendChild(productoDiv);
    });

    const totalDiv = document.createElement('div');
    totalDiv.textContent = `Total: $${total}`;
    totalDiv.classList.add('total');
    carritoDiv.appendChild(totalDiv);
}

function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.id === producto.id);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }
    total += producto.precio;
    actualizarCarrito();
    guardarEnStorage();
}


function eliminarDelCarrito(indice) {
    const producto = carrito[indice];
    total -= producto.precio * producto.cantidad;
    carrito.splice(indice, 1);
    actualizarCarrito();
    guardarEnStorage();
}

document.getElementById('vaciarCarrito').addEventListener('click', () => {
    carrito = [];
    total = 0;
    localStorage.clear();
    actualizarCarrito();
});


document.getElementById('finalizarPedido').addEventListener('click', () => {
    const resumenPedido = document.getElementById('resumenPedido');
    if (carrito.length > 0) {
        Swal.fire({
            icon: 'success',
            title: 'Pedido Finalizado',
            text: `El total de tu pedido es $${total}. Tu pedido llegará en 30 minutos.`,
        });
        localStorage.clear();
        carrito = [];
        total = 0;
        actualizarCarrito();
    } else {
        mostrarError('No hay productos en el carrito.');
    }
});
