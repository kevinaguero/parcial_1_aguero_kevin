const ventanaNuevaVianda = document.getElementById('nuevaVianda');
const botonNuevaVianda = document.getElementById('botonNuevaVianda');
const botonSolicitarVianda = document.getElementById('botonSolicitarVianda');
const frecuencia = document.getElementById('selectFrecuencia');
const check1 = document.getElementById('check1');
const check2 = document.getElementById('check2');
const check3 = document.getElementById('check3');
const fechaInicio = document.getElementById('fechaInicio');
const cantidadViandas = document.getElementById('cantidadViandas');

botonSolicitarVianda.addEventListener('click',crearFila);

let id=1;

let arrayViandas = [];

class Vianda{
    constructor(idV,frecuencia,tipoMenu,itemsIncluir,fechaInicio,cantidad){
        this.idV = idV;
        this.frecuencia = frecuencia;
        this.tipoMenu = tipoMenu;
        this.itemsIncluir = itemsIncluir;
        this.fechaInicio = fechaInicio;
        this.cantidad = cantidad;
    }
}

function mostrarFormulario(){
    ventanaNuevaVianda.classList.remove('d-none');
}

function validacion(){

    let fechaActual = new Date();
    let mes = (fechaActual.getMonth()+1).toString()
    if(mes.length<= 1){
        mes = "0"+ mes;
    }
    let dia = fechaActual.getDate().toString();
    if(dia.length<= 1){
        dia = "0"+ dia;
    }

    let fechaActualComparar = fechaActual.getFullYear() + "-" + mes + "-" +dia;


    if(check1.checked || check2.checked || check3.checked){
    }else{
        alert('Al menos una opcion debe seleccionar en Items A Incluir');

        return false;
    }

    if(cantidadViandas.value>=1){
        
    }else{
        alert('La cantidad de viandas debe ser mayor o igual a 1');
        return false;
    }

    return true;
}

function crearFila(){

    if(validacion()){
        let tipoMenu = document.querySelector('input[name="tipomenu"]:checked')
        let itemsAIncluir = document.querySelectorAll('input[name="itemsincluir"]:checked')
        var frecSelect = frecuencia.options[frecuencia.selectedIndex].text;


        var itemsString;

        itemsAIncluir.forEach(item =>{
            itemsString += item.value + ", "
        })

        arrayViandas.push(new Vianda(id,frecSelect,tipoMenu.value,itemsAIncluir,fechaInicio.value,cantidadViandas.value));

        const tabla = document.createElement('tr');
        tabla.innerHTML = `
            <td scope="row">${id}</th>
            <td>${frecSelect}</td>
            <td>${tipoMenu.value}</td>
            <td>${itemsString}</td>
            <td>${fechaInicio.value}</td>
            <td>${cantidadViandas.value}</td>
            <td>Pendiente</td>
            <td><a class="btn btn-danger bg-gradient" id="eliminar${id}">X</a></td>
        `

        contenedorTabla.appendChild(tabla);

        const boton = document.getElementById(`eliminar${id}`);
        boton.addEventListener('click', (event) =>{
            var opcion = confirm("Desea eliminar realmente?")
            if(opcion == true){
                event.target.parentNode.parentNode.remove();
                arrayViandas = arrayViandas.filter(vianda => vianda.idV != id);
            }
        })

        ventanaNuevaVianda.classList.add('d-none');

        id++;
    }
}

botonNuevaVianda.addEventListener('click',mostrarFormulario);