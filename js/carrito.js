mostrarCarrito();

function mostrarCarrito(){
    if(localStorage.getItem("items") != null){
        listaCarrito.innerHTML = "";
        _items = JSON.parse(localStorage.getItem("items"));

        for(let i = 0; i < _items.length; i++){
            item = _items[i]
            listaCarrito.innerHTML +=   "<li>" +
                                            "<div class='producto-carrito'> " + 
                                                "<p id='carrito-producto'>" + item.producto.descripcion + "</p>" +
                                            "</div>" + 
                                            "<div class='cantidad'>" + 
                                                "<input id= " + i + " type='number' placeholder='Cantidad' " + 
                                                "onblur='calcularImporte(" + i + ")' min='1' max='9999'>" +
                                            "</div>" + 
                                            "<div class='importe'>" +
                                                "<p id='importe-" + i + "'>Importe: $</p>" +
                                            "</div>" +
                                        "</li>"
        }
    }
    else
        listaCarrito.innerHTML = "No tienes productos cargados al carrito.";
}

function calcularImporte(id){
    txtCantidad = document.getElementById(id);
    
    if(isNaN(txtCantidad.value) || txtCantidad.value.trim() == ""){
        mostrarError("Ingrese una cantidad válida");
        txtCantidad.focus();
        return;
    }
    else{
        labelImporte = document.getElementById("importe-" + id.toString());
        labelImporte.innerHTML = "Importe: $" + _items[id].producto.precio * txtCantidad.value;

        _items[id].cantidad = txtCantidad.value;
        localStorage.setItem("items", JSON.stringify(_items));
    }
}

botonAgregarPedido.onclick = () =>{
    if(isNaN(txtCantidad.value) || txtCantidad.value.trim() == "" || txtDireccion.value.trim() == ""){
        mostrarError("Por favor, ingrese los datos requeridos");
        return;
    }
    else{
        
        if(localStorage.getItem("contadorPedido") != null)
            contadorPedido = parseInt(localStorage.getItem("contadorPedido"));
        
            total = 0;

        for(item of _items){
            total += item.producto.precio * item.cantidad;
        }

        pedido = {items: JSON.parse(localStorage.getItem("items")), direccion: txtDireccion.value, total: total}
        _pedidos.push(pedido);

        localStorage.setItem("pedidos", JSON.stringify(_pedidos));
        
        limpiar();
        mostrarAlerta("success", "Pedido ingresado con éxito", true, 2500, "Importe total: $" + pedido.total + ". Se entregará en: " + pedido.direccion)
    }
}

botonLimpiar.onclick = () =>{
    limpiar();
    mostrarAlerta("success", "Vaciaste tu carrito de compras!", "true", 2500, "");
}

botonProductos.onclick = () =>{
    location.pathname = "/paginas/index.html";
}

botonPedidos.onclick = () =>{
    location.pathname = "/paginas/pedidos.html"
}

function limpiar(){
    if(localStorage.getItem("items") != null){
        localStorage.removeItem("items");
        listaCarrito.innerHTML = "No tienes productos cargados al carrito.";
        total = 0;
    }
    else
        mostrarAlerta("error", "Tu carrito de compras ya está vacío", "false", 2500, "");
}

