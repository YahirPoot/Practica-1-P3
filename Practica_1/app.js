import { Biblioteca } from "./biblioteca.js";
import { Libro } from "./libro.js";


    const biblioteca = new Biblioteca();


window.agregarBtn = function() {
    const isbn = document.getElementById("ISBN").value;
    const titulo = document.getElementById("titulo").value;
    if (isbn && titulo) {
        const nuevoLibro = new Libro(isbn, titulo);
        biblioteca.agregarLibro(nuevoLibro);
        actualizarCatalogo();
    } else {
        alert('Ingrese los datos correctos');
    }
}

window.buscarBtn = function() {
    const isbn = document.getElementById("ISBN").value;

    if (isbn) {
        const libroEncontrado = biblioteca.buscarLibro(isbn);
        if (libroEncontrado) {
            alert(`El libro es: ISBN: ${libroEncontrado.isbn} - Titulo: ${libroEncontrado.titulo}`)
        } else {
            alert("El libro no se encuentra");
        }
    }
}

window.eliminarBtn = function() {
    const isbn = document.getElementById("ISBN").value;
    const titulo = document.getElementById("titulo").value;
    
    if (isbn) {
        biblioteca.eliminarLibro(isbn);
        alert(`El libro eliminado es: ISBN: ${isbn} - Titulo ${titulo}`)
        actualizarCatalogo();
        
    } else {
        alert ('El librom no se encuentra');
    }
}


function actualizarCatalogo() {
    const catalogoLibros = document.getElementById('catalogoLibros');
    catalogoLibros.innerHTML = '';

    const librosOrdenados = biblioteca.inOrden();
    for (const libro of librosOrdenados) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `ISBN: ${libro.isbn} - Titulo: ${libro.titulo}`;
        catalogoLibros.appendChild(listItem);
    }   
}

