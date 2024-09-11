// Variables para el carrito de compras y total
let carrito = [];
let total = 0;

// Menú de pizzas y extras con imágenes
const pizzas = [
    { nombre: 'Fugazzeta', precio: 3500, imagen: 'img/fugazzetta.jpg' },
    { nombre: 'Jamón y Queso', precio: 4000, imagen: 'img/jamon.jpg' },
    { nombre: 'Rucula', precio: 4500, imagen: 'img/rucula.jpg' },
    { nombre: 'Napolitana', precio: 3200, imagen: 'img/napolitana.jpg' },
    { nombre: 'Cantimpalo', precio: 3600, imagen: 'img/cantimpalo.jpg' },
    { nombre: 'Anchoas', precio: 3700, imagen: 'img/anchoas.jpg' },
    { nombre: 'Provolone', precio: 3800, imagen: 'img/provolone.jpg' },
    { nombre: 'Muzarella', precio: 3400, imagen: 'img/muzzarella.jpg' }
];

const extras = [
    { nombre: 'Extra Queso', precio: 500, imagen: 'img/extraQueso.jpeg' },
    { nombre: 'Champiñones', precio: 900, imagen: 'img/champi.jpg' },
    { nombre: 'Panceta', precio: 1200, imagen: 'img/bacon.jpeg' }
];

// Mostrar pizzas en el DOM
const pizzasDiv = document.getElementById('pizzas');
pizzas.forEach(pizza => {
    const pizzaDiv = document.createElement('div');
    pizzaDiv.innerHTML = `
        <img src="${pizza.imagen}" alt="${pizza.nombre}">
        <button data-nombre="${pizza.nombre}" data-precio="${pizza.precio}">
            ${pizza.nombre} - $${pizza.precio}
        </button>
    `;
    pizzasDiv.appendChild(pizzaDiv);
});

// Mostrar extras en el DOM
const extrasDiv = document.getElementById('extras');
extras.forEach(extra => {
    const extraDiv = document.createElement('div');
    extraDiv.innerHTML = `
        <img src="${extra.imagen}" alt="${extra.nombre}">
        <button>${extra.nombre} - $${extra.precio}</button>
    `;
    extraDiv.querySelector('button').addEventListener('click', () => agregarAlCarrito(extra));
    extrasDiv.appendChild(extraDiv);
});

// Agregar productos al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto);
    total += producto.precio;
    actualizarCarrito();
    guardarEnStorage();
}

// Actualizar carrito en el DOM
function actualizarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    carritoDiv.innerHTML = '';
    carrito.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.textContent = `${producto.nombre} - $${producto.precio}`;
        carritoDiv.appendChild(productoDiv);
    });

    const totalDiv = document.createElement('div');
    totalDiv.textContent = `Total: $${total}`;
    totalDiv.classList.add('total');
    carritoDiv.appendChild(totalDiv);
}

// Guardar el carrito en localStorage
function guardarEnStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', total);
}

// Recuperar el carrito del localStorage
function recuperarCarrito() {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    const totalGuardado = localStorage.getItem('total');

    if (carritoGuardado) {
        carrito = carritoGuardado;
        total = parseFloat(totalGuardado);
        actualizarCarrito();
    }
}

// Vaciar carrito
document.getElementById('vaciarCarrito').addEventListener('click', () => {
    carrito = [];
    total = 0;
    localStorage.clear();
    actualizarCarrito();
});

// Finalizar pedido
document.getElementById('finalizarPedido').addEventListener('click', () => {
    const resumenPedido = document.getElementById('resumenPedido');
    resumenPedido.textContent = `El total de tu pedido es $${total}. Tu pedido llegará en 30 minutos.`;
    localStorage.clear();
    carrito = [];
    total = 0;
    actualizarCarrito();
});

// Recuperar carrito al cargar la página
document.addEventListener('DOMContentLoaded', recuperarCarrito);

// Función de orden superior: Filtrar productos caros
function filtrarProductosCaros() {
    return carrito.filter(producto => producto.precio > 3000);
}

// Función de orden superior: Calcular total con descuento
function calcularTotalConDescuento() {
    const descuento = 0.1; // 10%
    return carrito.reduce((acumulador, producto) => acumulador + producto.precio * (1 - descuento), 0);
}

// Agregar eventos a los botones de pizza
document.querySelectorAll('#pizzas button').forEach(button => {
    button.addEventListener('click', () => {
        const nombre = button.getAttribute('data-nombre');
        const precio = parseFloat(button.getAttribute('data-precio'));
        agregarAlCarrito({ nombre, precio });
    });
});