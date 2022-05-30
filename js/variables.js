let producto
let _productos = []
let _carrito = []
let pedido
let _pedidos = []
let item
let _items = []
let total
let _totales = []
let importe
let importesTotales
let _auxiliar = []
let _pedidosStorage = []
let tablaDetalle
let botonDetalle
let cabeceraDetalle
let filaDetalle
let banderaCantidad
let cantidadTabla
let contadorPedido


const catalogo = document.getElementById("catalogo")
const tablaCarrito = document.getElementById("tablaCarrito")
const cajaPedidos = document.getElementById("caja-pedidos")
const cajaItems = document.getElementById("caja-items")
const labelTotal = document.getElementById("total")
const botonAgregarPedido = document.getElementById("botonAgregarPedido")
const inputDireccion = document.getElementById("direccion")
const botonLimpiar = document.getElementById("botonLimpiar")
const subtitulo = document.getElementById("subtitulo")
const cajaCargador = document.getElementById("caja-cargador")
const subtituloPedidos = document.getElementById("subtituloPedidos")

function mostrarError(mensaje){
    Toastify({
        text: mensaje,
        avatar: "imagenes/error.png",
        style: {            
            color: "#FFFFFF",
            background: "#F51D0C",
            duration: 2000,
            stopOnFocus: true,
        }
      }).showToast()
}

function mostrarConfirmacion(mensaje){
    Toastify({
        text: mensaje,
        avatar: "imagenes/ok.png",
        style: {
            color: "#FFFFFF",
            background: "#4D9C3B",
            duration: 2000,
            stopOnFocus: true,
        }
      }).showToast()
}