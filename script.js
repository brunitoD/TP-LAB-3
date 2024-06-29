const productocargado = document.getElementById('productForm').addEventListener('submit', function (event) {
    event.preventDefault(); // esto evita el envio del formulario por defecto

    // obtenemos los valores del formulario
    const titulo = document.getElementById('titulo').value;
    const precioPeso = document.getElementById('precioPeso').value;
    const precioDolar = document.getElementById('precioDolar').value;
    const fecha = document.getElementById('fecha').value;

    // aca creamos el objeto con los datos del producto que guardamos uno a uno en variables
    const nuevoProducto = {
        titulo: titulo,
        precioPeso: precioPeso,
        precioDolar: precioDolar,
        fecha: fecha
    };

    // Enviar la solicitud POST a la API para agregar un producto
    fetch('https://api.yumserver.com/16780/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoProducto)

    }).then(response => response.text())
      .then(data => {console.log(data);
      alert("Producto cargado con exito")
    }
    ).catch(error => {console.error('Error:', error)
        alert("Error en la carga del producto!" + error)
    });

    document.getElementById('productForm').reset();
});

function cargarProductos() {
    fetch('https://api.yumserver.com/16780/products')
        .then(response => response.json())
        .then(data => mostrarProductos(data))
        .catch(error => console.error('Error:', error));
}

function mostrarProductos(productos) {
    const tablaBody = document.getElementById('productosEnTabla');
    tablaBody.innerHTML = ''; // Limpiar tabla antes de llenar

    productos.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th>${producto.idcod}</th>
            <th>${producto.titulo}</th>
            <th>${producto.precioPeso}</th>
            <th>${producto.precioDolar}</th>
            <th>${producto.fecha}</th>
            <th>
                <button class="btn-eliminar" onclick="eliminarProducto('${producto.idcod}')">Eliminar</button>
                <button class="btn-modificar" onclick="mostrarFormularioModificar('${producto.idcod}', '${producto.titulo}', ${producto.precioPeso}, ${producto.precioDolar}, '${producto.fecha}')">Modificar</button>
            </th>    
        `;
        tablaBody.appendChild(row);
    });
}

function eliminarProducto(idcod) {
    // Confirmar la eliminación
    if (!confirm(`¿Estás seguro de eliminar el producto con ID ${idcod}?`)) {
        return; // Si el usuario cancela, no hacer nada
    }

    // Realizar la solicitud DELETE a la API
    fetch(`https://api.yumserver.com/16780/products`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "idcod": idcod
        })
    }).then(response => {response.json()})
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

function mostrarFormularioModificar(idcod, titulo, precioPeso, precioDolar, fecha) {
    // Llenar el formulario con los datos actuales del producto para ver que modificamos!
    document.getElementById('idcod').value = idcod;
    document.getElementById('tituloMod').value = titulo;
    document.getElementById('precioPesoMod').value = precioPeso;
    document.getElementById('precioDolarMod').value = precioDolar;
    document.getElementById('fechaMod').value = fecha;

    // Mostrar el formulario modificando su clase asi aparece y desaparece
    var formulario = document.getElementById('contenedor-modificar');
    formulario.classList.add('active');
}

function modificarProducto() {

    const idcod = document.getElementById('idcod').value;
    const titulo = document.getElementById('tituloMod').value;
    const precioPeso = parseFloat(document.getElementById('precioPesoMod').value);
    const precioDolar = parseFloat(document.getElementById('precioDolarMod').value);
    const fecha = document.getElementById('fechaMod').value;

    fetch(`https://api.yumserver.com/16780/products`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "idcod": idcod,
            "titulo": titulo,
            "precioPeso": precioPeso,
            "precioDolar": precioDolar,
            "fecha": fecha
        })
    }).then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error))
}




