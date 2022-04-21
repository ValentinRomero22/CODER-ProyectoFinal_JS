cargarPedidos();

function cargarPedidos(){
    fetch("/json/pedidos.json")
        .then(respuesta => respuesta.json())
        .then(datos => listarPedidos(datos))

}

function listarPedidos(datos){
    for(dato of datos){
        //tengo que levantar los pedidos y sus líneas :/ 
        console.table(dato)
        
        for(linea of dato.lineas){
            console.log(linea.idProducto)
        }

        /* let{id, direccion, entregado} = pedido
        pedido.items = _items */

        /*let {id, descripcion, detalle, precio, imagen} = dato;
        
         producto = {id: id, descripcion: descripcion, detalle: detalle, precio: precio, imagen: imagen};
        _productos.push(producto);
        
        catalogo.innerHTML +=   "<article class='producto'>" +
                                    "<img class='imagen-producto' src='" + imagen + "'alt='Imagen'></img>" +
                                    "<div class='info-producto'>" + 
                                        "<input type='submit' id='comprar' onclick='agregarItem(" + id + ")' class='comprar' value='Agregar al carrito'>" +
                                        "<div class='nombre-producto'>" +
                                            "<h3>" + descripcion + "</h3>" +
                                        "</div>" + 
                                        "<div class='precio-producto'> " + 
                                            "<p>$" + precio + "</p>" + 
                                        "</div>" +
                                        "<div class='detalle-producto'>" + 
                                            "<p>" + detalle +" </p>" + 
                                        "</div>" +
                                    "</div>" +
                                "</article>" */
                            
    }
}

botonCarrito.onclick = () =>{
    location.pathname = "/paginas/carrito.html";
}

botonProductos.onclick = () =>{
    location.pathname = "/paginas/index.html";
}