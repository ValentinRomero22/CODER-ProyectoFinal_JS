mostrarCargador()

//simulador de carga de productos
setTimeout(() => {
    ocultarCargador()
    cargarPedidos()
}, 2000)

function cargarPedidos(){
    ocultarCargador()
    fetch("/json/pedidos.json")
        .then(respuesta => respuesta.json())
        .then(datos => listarPedidos(datos))

}

function listarPedidos(datos){
    _pedidos = []
    tablaPedidos.innerHTML = ""
    tablaPedidos.innerHTML += "<tr>" +
                                "<th class='tabla-width-5'>NÚMERO</th>" +
                                "<th class='tabla-width-55'>DIRECCIÓN DE ENRTEGA</th>" +
                                "<th class='tabla-width-20'>ENTREGADO</th>" +
                                "<th class='tabla-width-5'>TOTAL</th>" +
                                "<th class='tabla-width-15'></th>" +
                            "</tr>"

    for(dato of datos){
        for(linea of dato.lineas){
            let {producto, cantidad} = linea
            item = {producto, cantidad}
            _items.push(item)
        }

        let {id, direccion, entregado, importe} = dato
        pedido = {id, direccion, entregado, _items, importe}
        _pedidos.push(pedido)
        _items = []
    }

    //si tengo pedidos nuevos, los sumo a os que tengo en el pedidos.json
    if(localStorage.getItem("pedidos") != null){
        _pedidosStorage = (JSON.parse(localStorage.getItem("pedidos")))
        _pedidos = _pedidos.concat(_pedidosStorage)
    }

    for(pedido of _pedidos){
        tablaPedidos.innerHTML += "<tr class='borde-tr'>" + 
                                    "<td>" + pedido.id + "</td>" +
                                    "<td>" + pedido.direccion + "</td>" +
                                    "<td>" + (pedido.entregado != null ? pedido.entregado : "No entregado") + "</td>" +
                                    "<td>$ " + pedido.importe + "</td>" + 
                                    "<td>" +
                                        "<input id='boton_" + pedido.id + "' onclick='verDetalle(" + pedido.id + ")' type='submit' value='VER DETALLE' class='boton-tabla'></div>" +
                                    "</td>" +
                                "</tr>" + 
                                "<tr>" + 
                                    "<td colspan='5' style='padding: 0px 0px'>" +
                                        "<table id='tabla_" + pedido.id + "' class='tabla-detalle'>" + 
                                        "</table>" + 
                                    "</td>" +
                                "</tr>"
    }
}

function verDetalle(id){
    botonDetalle = document.getElementById("boton_" + id)
    tablaDetalle = document.getElementById("tabla_" + id)

    if(botonDetalle.value == "VER DETALLE"){
        botonDetalle.value = "OCULTAR DETALLE"

        tablaDetalle.innerHTML = ""
        tablaDetalle.innerHTML += "<tr class='cabecera-oculta'>" +                                     
                                        "<td class='tabla-width-40 cabecera-oculta'>Producto</td>" +
                                        "<td class='tabla-width-40 cabecera-oculta'>Precio</td>" +
                                        "<td class='tabla-width-5 cabecera-oculta'>Cantidad</td>" +
                                        "<td class='tabla-width-15 cabecera-oculta'>Importe</td>" +
                                    "</tr>"

        p = _pedidos[id - 1]

        for(x of p._items){
            tablaDetalle.innerHTML += "<tr>" + 
                                            "<td>" + x.producto.descripcion + "</td>" + 
                                            "<td>$ " + x.producto.precio + "</td>" + 
                                            "<td>" + x.cantidad + "</td>" + 
                                            "<td>$ " + x.cantidad * x.producto.precio + "</td>" + 
                                        "</tr>"
        } 
    }
    else{
        botonDetalle.value = "VER DETALLE"
        tablaDetalle.innerHTML = ""
    }
}

botonCarrito.onclick = () =>{
    location.pathname = "/paginas/carrito.html"
}

botonProductos.onclick = () =>{
    location.pathname = "../index.html"
}

function ocultarCargador(){
    cajaCargador.innerHTML = ""
    subtituloPedidos.innerHTML = "Historial de pedidos"
}

function mostrarCargador(){
    cajaCargador.innerHTML = "<div class='cargador'></div>"
    subtituloPedidos.innerHTML = "Cargando pedidos..."
}