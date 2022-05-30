mostrarCargador()

//simulador de carga de productos 
setTimeout(() => {
    ocultarCargador()
    cargarPedidos()
}, 2000)

function cargarPedidos(){
    ocultarCargador()
    fetch("../json/pedidos.json")
        .then(respuesta => respuesta.json())
        .then(datos => listarPedidos(datos))
}

function listarPedidos(datos){
    cajaPedidos.classList.add('caja-pedidos')
    let contenedorTitulo = document.createElement("div")
    contenedorTitulo.classList.add('contenedor-titulo')
    let tablaTitulo = document.createElement("table")

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

    if(localStorage.getItem("pedidos") != null){
        _pedidosStorage = (JSON.parse(localStorage.getItem("pedidos")))
        _pedidos = _pedidos.concat(_pedidosStorage)
    }

    tablaTitulo.innerHTML = ""
    tablaTitulo.innerHTML = "<tr>" +
                                "<th class='tabla-width-5'>NÚMERO</th>" +
                                "<th class='tabla-width-55'>DIRECCIÓN DE ENRTEGA</th>" +
                                "<th class='tabla-width-20'>ENTREGADO</th>" +
                                "<th class='tabla-width-5'>TOTAL</th>" +
                                "<th class='tabla-width-15'></th>" +
                            "</tr>"
    
    contenedorTitulo.appendChild(tablaTitulo)
    cajaPedidos.appendChild(contenedorTitulo)

    for(pedido of _pedidos){
        let contenedorPedido = document.createElement("div")
        contenedorPedido.classList.add("contenedor-pedido")
        let contenedorInfoPedido = document.createElement("div")
        contenedorInfoPedido.classList.add("contenedor-info")
        let tablaInfoPedido = document.createElement("table")
        tablaInfoPedido.classList.add("tabla")
        let contenedorDetallePedido = document.createElement("div")
        contenedorDetallePedido.classList.add('contenedor-detalle')
        let tablaDetallePedido = document.createElement("table")
        tablaDetallePedido.classList.add("tabla")
        
        tablaInfoPedido.innerHTML += "<tr>" + 
                                        "<td class='tabla-width-5'>" + pedido.id + "</td>" +
                                        "<td class='tabla-width-55'>" + pedido.direccion + "</td>" +
                                        "<td class='tabla-width-20'>" + (pedido.entregado != null ? pedido.entregado : "No entregado") + "</td>" +
                                        "<td class='tabla-width-5'>$ " + pedido.importe + "</td>" + 
                                        "<td class='tabla-width-15'>" +
                                            "<input id='boton_" + pedido.id + "' type='submit' value='VER DETALLE' class='boton-tabla'></div>" +
                                        "</td>" +
                                    "</tr>"
        
        contenedorInfoPedido.appendChild(tablaInfoPedido)

        tablaDetallePedido.innerHTML = ""
        tablaDetallePedido.innerHTML = "<tr>" +                                     
                                            "<td class='tabla-width-40 cabecera-oculta'>Producto</td>" +
                                            "<td class='tabla-width-40 cabecera-oculta'>Precio</td>" +
                                            "<td class='tabla-width-5 cabecera-oculta'>Cantidad</td>" +
                                            "<td class='tabla-width-15 cabecera-oculta'>Importe</td>" +
                                        "</tr>"

        for(x of pedido._items){
            tablaDetallePedido.innerHTML += "<tr>" + 
                                                "<td>" + x.producto.descripcion + "</td>" + 
                                                "<td>$ " + x.producto.precio + "</td>" + 
                                                "<td>" + x.cantidad + "</td>" + 
                                                "<td>$ " + x.cantidad * x.producto.precio + "</td>" + 
                                            "</tr>"

            contenedorDetallePedido.appendChild(tablaDetallePedido)
        }

        contenedorPedido.appendChild(contenedorInfoPedido)
        contenedorPedido.appendChild(contenedorDetallePedido)        

        cajaPedidos.appendChild(contenedorPedido)
    }

    let boton = document.querySelectorAll('.boton-tabla')
    let caja = document.querySelectorAll('.contenedor-detalle')

    boton.forEach((cadaBoton, i) =>{
        boton[i].addEventListener('click', () =>{
            if(boton[i].getAttribute('value') == "VER DETALLE"){
                caja.forEach((cadaCaja, i) =>{
                    caja[i].classList.remove('caja-visible')
                    boton[i].setAttribute('value', 'VER DETALLE')
                })
                caja[i].classList.add('caja-visible')
                boton[i].setAttribute('value', 'OCULTAR DETALLE')
            } 
            else{
                caja[i].classList.remove('caja-visible')
                boton[i].setAttribute('value', 'VER DETALLE')
            }
        })
    })
}

function ocultarCargador(){
    cajaCargador.innerHTML = ""
    subtituloPedidos.innerHTML = "Listado de pedidos"
}

function mostrarCargador(){
    cajaCargador.innerHTML = "<div class='cargador'></div>"
    subtituloPedidos.innerHTML = "Cargando pedidos..."
}