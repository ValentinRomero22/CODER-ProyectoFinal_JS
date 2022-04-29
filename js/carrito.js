mostrarCarrito()

function mostrarCarrito(){
    if(localStorage.getItem("items") != null){

        _items = JSON.parse(localStorage.getItem("items"))

        if(_items.length != 0){
            botonAgregarPedido.removeAttribute("hidden")
            inputDireccion.removeAttribute("hidden")
            botonLimpiar.removeAttribute("hidden")

            tablaCarrito.innerHTML = ""
            tablaCarrito.innerHTML += "<tr>" +
                                        "<th class='tabla-width-40'>PRODUCTO</th>" + 
                                        "<th class='tabla-width-20'>CANTIDAD</th>" + 
                                        "<th class='tabla-width-20'>IMPORTE</th>" + 
                                        "<th class='tabla-width-20'></th>" + 
                                    "</tr>"

            _items = JSON.parse(localStorage.getItem("items"))
            for(let i = 0; i < _items.length; i++){
                item = _items[i]
                tablaCarrito.innerHTML += "<tr class='borde-tr'>" + 
                                            "<td>" + item.producto.descripcion + "</td>" + 
                                            "<td><input id= " + i + " class='cantidad-tabla' type='number' onblur='calcularImporte(" + i + ")' min='1' max='9999'>" +
                                            "<td><p id='importe-" + i + "'>Importe: $</p></td>" +
                                            "<td>" +
                                                "<input id=" + i + " onclick='eliminarItem(" + i + ")' type='submit' value='QUITAR' class='boton-tabla'></div>" + 
                                            "</td>" +
                                        "</tr>"
            }
        }
        else{
            carritoVacio()
        }
    }
    else{
        carritoVacio()
    }
}

function eliminarItem(i){
    let x = _items[i]
    let z = _totales[i]

    _auxiliar = _items.filter(function(i){
        return i != x
    })

    _items = _auxiliar

    //reseteo totales y la variable que almacena e imprime el total
    _totales = []
    importesTotales = 0
    labelTotal.innerHTML = ""

    localStorage.setItem("items", JSON.stringify(_items))
    mostrarCarrito()
    mostrarConfirmacion("Producto eliminado con éxito")
}

function calcularImporte(id){
    txtCantidad = document.getElementById(id)
    
    if(isNaN(txtCantidad.value) || txtCantidad.value.trim() == ""){
        mostrarError("Ingrese una cantidad válida")
        txtCantidad.focus()
        return
    }
    else{
        labelImporte = document.getElementById("importe-" + id.toString())
        importe = _items[id].producto.precio * txtCantidad.value
        labelImporte.innerHTML = "Importe: $" + importe

        _totales[id] = importe
        importesTotales = 0

        for(t of _totales){
            if(!isNaN(t))
                importesTotales += t
        }

        labelTotal.innerHTML = "Total: $ " + importesTotales
    }
}

botonAgregarPedido.onclick = () =>{
    banderaCantidad = false

    //tomo las cantidadades desde el input que hay en la tabla
    for(let i = 1, fila; fila = tablaCarrito.rows[i]; i++){
        let inputCantidad = document.getElementById(i - 1)
        if(inputCantidad.value != ""){
            cantidadTabla = parseInt(inputCantidad.value)
            _items[i - 1].cantidad = cantidadTabla
        }
        else{
            banderaCantidad = true
            break
        }
    }

    if(inputDireccion.value.trim() == "" || banderaCantidad == true){
        mostrarError("Por favor, ingrese los datos requeridos")
        return
    }
    else{        
        total = 0
        for(item of _items){
            total += item.producto.precio * item.cantidad
        }

        if(localStorage.getItem("contadorPedido") != null){
            contadorPedido = JSON.parse(localStorage.getItem("contadorPedido"))
        }
        else{
            contadorPedido = 6
        }
        
        pedido = {id: contadorPedido, direccion: inputDireccion.value, _items, importe: total}

        if(localStorage.getItem("pedidos") != null)
            _pedidosStorage = JSON.parse(localStorage.getItem("pedidos"))

        _pedidosStorage.push(pedido)
        localStorage.setItem("pedidos", JSON.stringify(_pedidosStorage))
        
        contadorPedido ++
        localStorage.setItem("contadorPedido", JSON.stringify(contadorPedido))        
        
        limpiar()
        mostrarConfirmacion("Pedido realizado con éxito!")
    }
}

botonLimpiar.onclick = () =>{
    limpiar()
    carritoVacio()
    mostrarConfirmacion("Ha vaciado su carrito de compras")
}

function carritoVacio(){
    subtitulo.innerHTML = "No tienes productos cargados al carrito."
    botonAgregarPedido.setAttribute("hidden", "")
    inputDireccion.setAttribute("hidden", "")
    botonLimpiar.setAttribute("hidden", "")
    tablaCarrito.innerHTML = ""
    labelTotal.innerHTML = ""
}

botonProductos.onclick = () =>{
    location.pathname = "../index.html"
}

botonPedidos.onclick = () =>{
    location.pathname = "/paginas/pedidos.html"
}

function limpiar(){
    if(localStorage.getItem("items") != null){
        localStorage.removeItem("items")
        carritoVacio()
        total = 0
    }
}

