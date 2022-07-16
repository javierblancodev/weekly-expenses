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

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante() {
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        
        this.restante = this.presupuesto - gastado;
    }

    eliminarGasto(id) {
        this.gastos = this.gastos.filter( gasto => gasto.id !== id);
        ui.mostrarGastos(this.gastos);
        this.calcularRestante();
        ui.actualizarRestante(this.restante);
        ui.comprobarPresupuesto(presupuesto);
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
            divMensaje.classList.add('alert-success');
        }

        divMensaje.textContent = mensaje;
        
        document.querySelector('.primario').insertBefore(divMensaje, formulario);
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    mostrarGastos(gastos) {
        
        this.limpiarHTML();

        gastos.forEach(gasto => {
            
            const { id, nombre, cantidad } = gasto;
            
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;

            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill">$${cantidad}</span>`;

            const btnBorrar = document.createElement('button');
            btnBorrar.innerHTML = 'Delete &times'
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.onclick = () => {
                presupuesto.eliminarGasto(id);
            }

            nuevoGasto.appendChild(btnBorrar);

            listadoGasto.appendChild(nuevoGasto);
        });
    }

    limpiarHTML() {
        while( listadoGasto.firstChild ) {
            listadoGasto.removeChild(listadoGasto.firstChild);
        }
    }

    actualizarRestante(restante) {
        document.querySelector('#restante').textContent = restante;
    };

    comprobarPresupuesto(presuObj) {
        const { presupuesto, restante } = presuObj;
        const restanteDiv = document.querySelector('.restante')
        if ((presupuesto / 4) > restante) {
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');
        } else if ((presupuesto/2) > restante) {
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning', 'alert-danger');
        }

        if (restante <= 0) {
            ui.imprimirAlerta('No more funds available', 'error');
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
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
    const cantidad = +document.querySelector('#cantidad').value;
    
    if(nombre === "" || cantidad === "") {
        ui.imprimirAlerta('Both fields are mandatory', 'error');
        return;
    } else if(cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Please, enter a valid quantity', 'error')
        return;
    }
    
    // Agregar gasto
    const gasto = { nombre, cantidad, id: Date.now() } // Object literal enhancement

    ui.imprimirAlerta('Expense successfully added');

    presupuesto.nuevoGasto(gasto);
    const { gastos, restante } = presupuesto;
    ui.mostrarGastos(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);

    formulario.reset();
}