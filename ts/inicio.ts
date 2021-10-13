import { Region } from './Region'
import { Comuna } from './Comuna'
import { Estudiante } from './Estudiante';
import { NotasEstudiante } from './NotasEstudiante';
import jquery = require("jquery");
const $:JQueryStatic = jquery;

let ListaRegiones = Array<Region>();
let ListaComunas = Array<Comuna>();
let DatosEstudiante = Array<Estudiante>();
let EstudianteNotas = Array<NotasEstudiante>();

ListaRegiones = [
    {
        "id":1, "nombre":"Valparaíso",
    },{
        "id":2, "nombre":"Coquimbo",
    }
];

ListaComunas = [
    {
        "id":1, "nombre":"Quillota", "idRegion":1,
    },{
        "id":2, "nombre":"Limache", "idRegion":1,
    },{
        "id":3, "nombre":"Viña del Mar", "idRegion":1,
    },{
        "id":3, "nombre":"La Serena", "idRegion":2,
    },{
        "id":3, "nombre":"Los Vilos", "idRegion":2,
    },{
        "id":3, "nombre":"Vicuña", "idRegion":2
    }
];

DatosEstudiante = [
    {
        "nombre":"María Pérez",
        "rut":"11111111-1",
        "telefono":111111111,
        "correo":"maria.perez@gmail.com",
        "acudiente":"Ninguno",
        "fechaN":"2016-05-16",
        "curso":"4 primaria",
        "region":1,
        "comuna":1,
        "direccion":"calle",
    }
];

EstudianteNotas = [
    {
        "id":1, "asignatura":"Matemáticas", "objetivo":"Comprensión", "nota":6.3,
    },{
        "id":2, "asignatura":"Física", "objetivo":"Lógica", "nota":7.0,
    },{
        "id":3, "asignatura":"Español", "objetivo":"Gramática", "nota":7.0,
    }
];

(function () {
    'use strict'
  
    let rut:any = document.getElementById("rut");
    let telefono:any = document.getElementById("telefono");
    let correo:any = document.getElementById("correo");
    let acudiente:any = document.getElementById("acudiente");
    let fechaN:any = document.getElementById("fechaNacimiento");
    let curso:any = document.getElementById("curso");
    let region:any = document.getElementById("regiones");
    let comuna:any = document.getElementById("comunas");
    let direccion:any = document.getElementById("direccion");
    let nombre:any = document.getElementById("nombreEstudiante");
  
    rut.pattern = "^[0-9]{8}-[0-9Kk]{1}$";
    telefono.maxLength = "9";
    nombre.textContent = DatosEstudiante[0].nombre;
    $("#formulario").hide();
    $("#formularioNotas").hide();
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
    .forEach(function (form) {
        form.addEventListener('submit', function (event:any) {
            let flag = false;
        
            if(rut.value == "" && validarRut(rut.value)>1) {
                flag = true;
            }
        
            if (!form.checkValidity()) {
                flag = true;
            }
            
            if(flag == true) {
                event.preventDefault()
                event.stopPropagation()
            }
            else {
                DatosEstudiante[0].rut = rut.value;
                console.log(DatosEstudiante[0].rut);
                DatosEstudiante[0].telefono = telefono.value;
                DatosEstudiante[0].correo = correo.value;
                DatosEstudiante[0].acudiente = acudiente.value;
                DatosEstudiante[0].fechaN = fechaN.value;
                DatosEstudiante[0].curso = curso.value;
                DatosEstudiante[0].region = region.value;
                DatosEstudiante[0].comuna = comuna.value;
                DatosEstudiante[0].direccion = direccion.value;
                $("#formulario").trigger("reset");
                $("#formulario").hide();
                $("#informacion").show();
                actualizar();
                event.preventDefault()
            }
            
            form.classList.add('was-validated')
        }, false)
      })
  })()

function mostrarComunas() {
    let regiones:any = document.getElementById("regiones");
    let comunas:any = document.getElementById("comunas");
    regiones.addEventListener("change", cargarCategorias);
    
    let i:number;
    for(i=0; i<ListaRegiones.length; i++) {
        let opcion:any = document.createElement("option");
        opcion.value = ListaRegiones[i].id;
        opcion.text = ListaRegiones[i].nombre;
        regiones.add(opcion);
    }
    
    function cargarCategorias() {
        comunas.options.length = 1;
        let i:number;
        for(i=0; i<ListaComunas.length; i++) {
            if(ListaComunas[i].idRegion == regiones.value) {
                let opcion:any = document.createElement("option");
                opcion.value = ListaComunas[i].id;
                opcion.text = ListaComunas[i].nombre;
                comunas.add(opcion);
            }
        }
    }
}

function validarRut(valor:any) {
    let partes = valor.split("-");
    let numeros = partes[0];
    let digito = partes[1];
    
    if(digito=="K") {
        digito = "k";
    }
    
    let M=0, S=1;
    for(;numeros;numeros=Math.floor(numeros/10))
        S=(S+numeros%10*(9-M++%6))%11;
        
    return S?S-1:'k';
}

function buscarRegion(valor:any) {
    let i:number;
    for(i=0; i<ListaRegiones.length; i++) {
        if(ListaRegiones[i].id == valor) {
            return ListaRegiones[i].nombre;
        }
    }
    return -1;
}

function buscarComuna(valor:any) {
    let i:number;
    for(i=0; i<ListaComunas.length; i++) {
        if(ListaComunas[i].id == valor) {
            return ListaComunas[i].nombre;
        }
    }
    return -1;
}

function actualizar() {
    let p1:any = document.getElementById("campoRut");
    let p2:any = document.getElementById("campoTelefono");
    let p3:any = document.getElementById("campoCorreo");
    let p4:any = document.getElementById("campoAcudiente");
    let p5:any = document.getElementById("campoFecha");
    let p6:any = document.getElementById("campoCurso");
    let p7:any = document.getElementById("campoRegion");
    let p8:any = document.getElementById("campoComuna");
    let p9:any = document.getElementById("campoDireccion");
        
    p1.textContent = "RUT: " + DatosEstudiante[0].rut;
    p2.textContent = "Teléfono: " + DatosEstudiante[0].telefono;
    p3.textContent = "Correo electrónico: " + DatosEstudiante[0].correo;
    p4.textContent = "Acudientes: " + DatosEstudiante[0].acudiente;
    p5.textContent = "Fecha de nacimiento: " + DatosEstudiante[0].fechaN;
    p6.textContent = "Curso: " + DatosEstudiante[0].curso;
    p7.textContent = "Región: " + buscarRegion(DatosEstudiante[0].region);
    p8.textContent = "Comuna: " + buscarComuna(DatosEstudiante[0].comuna);
    p9.textContent = "Dirección: " + DatosEstudiante[0].direccion;
}


$('#botonEditar').click(function() {
    $("#informacion").hide();
    $("#formulario").show();
})

function mostrarListaAsignaturas() {
    let lista:any = document.getElementById("listaAsignaturas");
    let i:number;
    for(i=0; i<EstudianteNotas.length; i++) {
        let tr:any = document.createElement("tr");
        tr.setAttribute("name", "fila"+EstudianteNotas[i].id)
        lista.appendChild(tr);
        
        let th:any = document.createElement("th");
        th.setAttribute("scope", "row");
        th.setAttribute("name", "fila"+EstudianteNotas[i].id)
        tr.appendChild(th).textContent = `${EstudianteNotas[i].id}`;
        
        let td1:any = document.createElement("td");
        td1.setAttribute("name", "fila"+EstudianteNotas[i].id)
        tr.appendChild(td1).textContent = `${EstudianteNotas[i].asignatura}`;
        
        let td2:any = document.createElement("td");
        td2.setAttribute("name", "fila"+EstudianteNotas[i].id)
        tr.appendChild(td2).textContent = `${EstudianteNotas[i].objetivo}`;
        
        let td3:any = document.createElement("td");
        td3.setAttribute("name", "fila"+EstudianteNotas[i].id)
        tr.appendChild(td3).textContent = `${EstudianteNotas[i].nota}`;
        
        let td4:any = document.createElement("td");
        td4.setAttribute("name", "fila"+EstudianteNotas[i].id)
        tr.appendChild(td4).innerHTML = `<ion-icon name="trash-outline" id="boton${EstudianteNotas[i].id}"></ion-icon>`;
    }
}

$("#iconoPlus").click(function agregarNota() {
    $("#formularioNotas").show();
    $("#botonAgregar").click(function() {
        let id:any = document.getElementById("idNota");
        let asignatura:any = document.getElementById("asignatura");
        let objetivo:any = document.getElementById("objetivo");
        let nota:any = document.getElementById("nota");
        let lista:any = document.getElementById("listaAsignaturas");
        
        let tr:any = document.createElement("tr");
        tr.setAttribute("name", "fila"+id.value);
        lista.appendChild(tr);
        
        let th:any = document.createElement("th");
        th.setAttribute("scope", "row");
        th.setAttribute("name", "fila"+id.value);
        tr.appendChild(th).textContent = id.value;
        
        let td1:any = document.createElement("td");
        td1.setAttribute("name", "fila"+id.value);
        tr.appendChild(td1).textContent = asignatura.value;
        
        let td2:any = document.createElement("td");
        td2.setAttribute("name", "fila"+id.value);
        tr.appendChild(td2).textContent = objetivo.value;
        
        let td3:any = document.createElement("td");
        td3.setAttribute("name", "fila"+id.value);
        tr.appendChild(td3).textContent = nota.value;
        
        let td4:any = document.createElement("td");
        td4.setAttribute("name", "fila"+id.value);
        tr.appendChild(td4).innerHTML = `<ion-icon name="trash-outline" id="boton${id.value}"></ion-icon>`;
                
        $("#formularioNotas").hide();
    })
    $("#formularioNotas").trigger("reset");
});


window.addEventListener("load", mostrarListaAsignaturas);
window.addEventListener("load", actualizar);
window.addEventListener("load", mostrarComunas);