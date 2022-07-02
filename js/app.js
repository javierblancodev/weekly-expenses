// Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const listadoGasto = document.querySelector('#gastos ul');

// Eventos
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    document.addEventListener('submit', agregarGasto)
}

// Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
}

class UI {
    insertarPresupuesto(presuObj) {
        const { presupuesto, restante } = presuObj;
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center');
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-danger');
        }

        divMensaje.textContent = mensaje;
        
        document.querySelector('.primario').insertBefore(divMensaje, formulario);
        setTimeout(() => {
            divMensaje.remove();
        }, 3000)
    }
}

// Instanciar
const ui = new UI()
let presupuesto;

// Funciones
function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('What is your weekly budget?')
    
    if (!presupuestoUsuario || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }

    presupuesto = new Presupuesto(presupuestoUsuario);

    ui.insertarPresupuesto(presupuesto)
}

function agregarGasto(e) {
    e.preventDefault();

    const nombre = document.querySelector('#gasto').value;
    const cantidad = document.querySelector('#cantidad').value;
    
    if(nombre === "" || cantidad === "") {
        ui.imprimirAlerta('Both fields are mandatory', 'error');
    }
    
}