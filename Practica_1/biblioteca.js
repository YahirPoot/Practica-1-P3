import { NodoLibro } from "./nodoLibro.js";

export class Biblioteca {
    constructor() {
        this.raiz = null;
    }

    agregarLibro(libro) {
        this.raiz = this.agregarLibroRecusivamente(this.raiz, libro)
    }

    agregarLibroRecusivamente(nodo, libro) {
        if (nodo === null) {
            return new NodoLibro(libro)
        }

        if (libro.isbn < nodo.libro.isbn) {
            nodo.izquierdo =  this.agregarLibroRecusivamente(nodo.izquierdo, libro);
        } else if (libro.isbn > nodo.libro.isbn) {
            nodo.derecho =  this.agregarLibroRecusivamente(nodo.derecho, libro);
        }

        return nodo;
    }
    
    buscarLibro(isbn) {
        return this._buscarRecursivo(this.raiz, isbn);
    }

    _buscarRecursivo(nodo, isbn) {
        if (nodo === null || nodo.libro.isbn === isbn) {
            return nodo ? nodo.libro : null;
        }

        if (isbn < nodo.libro.isbn) {
            return this._buscarRecursivo(nodo.izquierdo, isbn);
        } else {
            return this._buscarRecursivo(nodo.derecho, isbn);
        }
    }


    eliminarLibro(isbn) {
        this.raiz = this.eliminarRecursivamente(this.raiz, isbn);
    }

    eliminarRecursivamente(nodoActual, isbn) {
        if (nodoActual === null) {
            return null;
        }

        if (isbn === nodoActual.libro.isbn) {
            if (nodoActual.izquierdo === null && nodoActual.derecho === null) {
                return null;
            }

            if (nodoActual.izquierdo === null) {
                return nodoActual.derecho;
            }

            if (nodoActual.derecho === null) {
                return nodoActual.izquierdo;
            }

            const sucesor = this._encontrarMinimo(nodoActual.derecho);
            nodoActual.libro = sucesor.libro;
            nodoActual.derecho = this.eliminarNodo(nodoActual.derecho, sucesor.libro.isbn);
            return nodoActual;
        } else if (isbn < nodoActual.libro.isbn) {
            nodoActual.izquierdo = this.eliminarNodo(nodoActual.izquierdo, isbn);
            return nodoActual;
        } else {
            nodoActual.derecho = this.eliminarNodo(nodoActual.derecho, isbn);
            return nodoActual;
        }
    }

    _encontrarMinimo(nodo) {
        while (nodo.izquierda !== null) {
            nodo = nodo.izquierda;
        }
        return nodo;
    }

    inOrden() {
        const resultado = [];
        this._inOrdenRecursivo(this.raiz, resultado);
        return resultado;
    }

    _inOrdenRecursivo(nodo, resultado) {
        if (nodo !== null) {
            this._inOrdenRecursivo(nodo.izquierdo, resultado);
            resultado.push(nodo.libro);
            this._inOrdenRecursivo(nodo.derecho, resultado);
        }
    }
}

