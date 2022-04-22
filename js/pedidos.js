cargarPedidos();

function cargarPedidos(){
    fetch("/json/pedidos.json")
        .then(respuesta => respuesta.json())
        .then(datos => listarPedidos(datos))

}

function listarPedidos(datos){
    _pedidos = []
    tablaPedidos.innerHTML = ""
    tablaPedidos.innerHTML += "<tr>" +
                                "<th class='numero-tabla'>NÚMERO</th>" +
                                "<th class='direccion-tabla'>DIRECCIÓN DE ENRTEGA</th>" +
                                "<th class='entregado-tabla'>ENTREGADO</th>" +
                                "<th class='total-tabla'>TOTAL</th>" +
                                "<th class='detalle-tabla'></th>" +
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

    if(localStorage.getItem("pedidos") != null)
        _pedidos += JSON.parse(localStorage.getItem("pedidos"))

    for(pedido of _pedidos){
        tablaPedidos.innerHTML += "<tr class='borde-tr'>" + 
                                    "<td>" + pedido.id + "</td>" +
                                    "<td>" + pedido.direccion + "</td>" +
                                    "<td>" + (pedido.entregado != null ? pedido.entregado : "No entregado") + "</td>" +
                                    "<td>$ " + pedido.importe + "</td>" + 
                                    "<td>" +
                                    "<input id=" + pedido.id + " onclick='botonEntregar(" + pedido.id + ")' type='submit' value='VER DETALLE' class='boton-detalle'></div>" +
                                    "</td>" +
                                "</tr>"
    }
}

botonCarrito.onclick = () =>{
    location.pathname = "/paginas/carrito.html"
}

botonProductos.onclick = () =>{
    location.pathname = "/paginas/index.html"
}

function botonEntregar(id){
    window.open("https://javascript.info")
}