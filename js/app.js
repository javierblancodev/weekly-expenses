// Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const listadoGasto = document.querySelector('#gastos ul');

// Eventos

eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}

// Clases


// Funciones

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('What is your weekly budget?')
    
    if (!presupuestoUsuario || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }
}