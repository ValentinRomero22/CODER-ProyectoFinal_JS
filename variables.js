let producto
let _productos = []
let _carrito = []
let pedido
let _pedidos = []
let item
let _items = []

const catalogo = document.getElementById("catalogo")
const botonCarrito = document.getElementById("botonCarrito")
const listaCarrito = document.getElementById("listaCarrito")
const botonProductos = document.getElementById("botonProductos")
const botonPedidos = document.getElementById("botonPedidos");

function mostrarError(mensaje){
    Toastify({
        text: mensaje,
        avatar: "imagenes/error.png",
        style: {            
            color: "#FFFFFF",
            background: "#F51D0C",
            duration: 3000,
            stopOnFocus: true,
        }
      }).showToast();
}

function mostrarConfirmacion(mensaje){
    Toastify({
        text: mensaje,
        avatar: "imagenes/ok.png",
        style: {
            color: "#FFFFFF",
            background: "#4D9C3B",
            duration: 3000,
            stopOnFocus: true,
        }
      }).showToast();
}

function mostrarAlerta(icono, titulo, boton, tiempo, texto){
    Swal.fire({
        position: top,
        icon: icono,
        title: titulo,
        text: texto,
        showConfirmButton: boton,
        timer: tiempo
    })
}