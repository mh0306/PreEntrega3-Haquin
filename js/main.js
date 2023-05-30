document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Disco Solido Ssd 500 Gb',
            precio: 8500,
            imagen: '../img/SSD.webp'
        },
        {
            id: 2,
            nombre: 'Memoria RAM Viper Steel',
            precio: 30000,
            imagen: '../img/RAM.webp'
        },
        {
            id: 3,
            nombre: 'Tableta gráfica XP-Pen Artist 22 Pro black',
            precio: 90000,
            imagen: '../img/XPPen.webp'
        },
        {
            id: 4,
            nombre: 'Gabinete Pc Gamer Sate K381',
            precio: 50000,
            imagen: '../img/SateK381.webp'
        },
        {
            id: 5,
            nombre: 'Mouse inalámbrico Logitech M280',
            precio: 2000,
            imagen: '../img/M280.webp',
        },
        {
            id: 6,
            nombre: 'Teclado Genius KB-125',
            precio: 3000,
            imagen: '../img/KB125.webp',
        },
        {
            id: 7,
            nombre: 'Auriculares Spica Sp-420',
            precio: 15000,
            imagen: '../img/SP420.webp'
        },
        {
            id: 8,
            nombre: 'Silla de escritorio Vonne SV-G0',
            precio: 50000,
            imagen: '../img/SVG0.webp'
        },
        {
            id: 9,
            nombre: 'Monitor Philips Led 24',
            precio: 52000,
            imagen: '../img/Phillips24.webp'
        }


    ];

    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');

    // funciones

    /*productos a partir de la base de datos*/
    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
// Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
// Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
// Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
// Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
// Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}${divisa}`;
            
// Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            
// Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    /**añadir un producto al carrito de la compra*/
    function anyadirProductoAlCarrito(evento) {
        carrito.push(evento.target.getAttribute('marcador'))
        renderizarCarrito();
    }

    /*accesorios en el carrito*/
    function renderizarCarrito() {
        DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach((item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);


            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;

            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);

            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });

    DOMtotal.textContent = calcularTotal();
    }

    /*borrar un elemento del carrito*/
    function borrarItemCarrito(evento) {
        const id = evento.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        renderizarCarrito();
    }

    /*precio total*/
    function calcularTotal() {
        return carrito.reduce((total, item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    /*vacia el carrito*/
    function vaciarCarrito() {
        carrito = [];
        renderizarCarrito();
    }

    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    renderizarProductos();
    renderizarCarrito();
});