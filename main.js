// Declaración de las variables del programa
let dinero = parseFloat(prompt("Bienvendio a la Pizzería de Fabrizio, indique el dinero que lleva."));
const DINERO_INICIAL = dinero;
let total = 0;
let pedido = [];

const Fugazzeta = 3500;
const jamon_queso = 4000;
const cuatro_quesos = 4500;

const extra_queso = 500;
const champinones = 900;
const panceta = 1200;

// Función para mostrar el menú de pizzas y gestionar la elección
function seleccionarPizza() {
    console.log("-> Pizzería de Fabrizio <-\n");
    while (true) {
        // Menú de pizzas
        console.log(`1 - Fugazzeta - ${Fugazzeta}$`);
        console.log(`2 - Jamón y queso - ${jamon_queso}$`);
        console.log(`3 - Cuatro quesos - ${cuatro_quesos}$`);

        // Almacena la elección del usuario
        let eleccion = parseInt(prompt("Por favor, seleccioná tu pizza con un número de opción.\n"));

        // Se calcula el cambio y el total, se indica la pizza elegida, se añade a la lista
        switch (eleccion) {
            case 1:
                procesarPedido("Fugazzeta", Fugazzeta);
                return;
            case 2:
                procesarPedido("Jamón y queso", jamon_queso);
                return;
            case 3:
                procesarPedido("Cuatro quesos", cuatro_quesos);
                return;
            default:
                console.log("Opción incorrecta. Seleccioná una opción del 1 al 3.");
        }
    }
}

// Función para procesar el pedido de la pizza o ingrediente
function procesarPedido(nombre, precio) {
    console.log(`Elegiste la pizza de ${nombre}.\nTotal a pagar ${precio}$.`);
    dinero -= precio;
    console.log(`Te quedan ${dinero.toFixed(2)}$.`);
    total += precio;
    pedido.push(`${nombre} - ${precio}$`);
}

// Función para seleccionar ingredientes adicionales
function seleccionarIngredientes() {
    while (true) {
        // Menú de ingredientes
        console.log(`1 - Extra de queso - ${extra_queso}$`);
        console.log(`2 - Champiñones - ${champinones}$`);
        console.log(`3 - Panceta - ${panceta}$`);
        console.log("4 - No añadir nada extra y pagar.");

        // Almacena la elección del usuario
        let eleccion = parseInt(prompt("Si querés algún ingrediente extra, seleccionalo.\n"));

        // Se calcula el cambio y el total, se indican los ingredientes elegidos, se añaden a la lista
        switch (eleccion) {
            case 1:
                procesarPedido("Extra de queso", extra_queso);
                break;
            case 2:
                procesarPedido("Champiñones", champinones);
                break;
            case 3:
                procesarPedido("Panceta", panceta);
                break;
            case 4:
                console.log("De acuerdo, no se añade nada extra.");
                return;
            default:
                console.log("Opción incorrecta. Seleccioná una opción del 1 al 4.");
        }
    }
}

// Función para imprimir el ticket final
function imprimirTicket() {
    if (total <= DINERO_INICIAL) {
        console.log("\n--- TU PEDIDO ---");
        console.log(`El total de su pedido es: ${total}$.`);
        console.log(`Tu vuelto: ${dinero}$.\n`);

        pedido.forEach(item => console.log(`-${item}.`));

        console.log("\n¡Que lo disfrutes!");
    } else {
        console.log("No te alcanza el dinero para todo eso. Por favor, vuelva a empezar.");
    }
}

// Ejecución del programa
seleccionarPizza();
seleccionarIngredientes();
imprimirTicket();