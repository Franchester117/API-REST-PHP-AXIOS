const url = "../backend/api/api-usuarios.php";
var usuarios = [];
var idUsuario = 0;

/*Valida los inputs del formulario
*/
function validar(){    
    var forms = document.querySelectorAll('.needs-validation');
    document.getElementById("formulario").reset();    
    Array.prototype.slice.call(forms)
    .forEach(function (form) {
    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        form.classList.add('was-validated');         
    }, false)
    });
    
}

/*Realiza una petición al servidor
y obtiene los usuarios*/
function obtenerUsuarios(){
    axios({
        method:"GET",
        url:url,
        responseType:"json"        
    }).then(response => {        
        this.usuarios = response.data;
        llenarTabla();
    }).catch(error =>{
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Ha ocurrido un error',
            showConfirmButton: false,
            timer: 1500
        });
        console.error(error);
    });
}
obtenerUsuarios();

/*Realiza una petición al servidor
y envia los datos para guardar un nuevo usuario*/
function guardarUsuario(){
    
    let form = document.getElementById("formulario");
    form.onsubmit = function(event){ event.preventDefault();}
    let nombre = document.getElementById("nombreTxt").value;
    let apellido = document.getElementById("apellidosTxt").value;
    let genero = document.getElementById("generoSelect").value;
    let fechaNacimiento = document.getElementById("fechaNacimientoTxt").value;
    let pais = document.getElementById("paisTxt").value;

    if(nombre=="" || apellido=="" || genero=="" || fechaNacimiento=="" || pais==""){
    }else{
        document.getElementById("guardar-btn").disable = true;
        document.getElementById("btns").style.display="none";
        document.getElementById("carga").style.display="inline";

        let usuarioData = {
            "nombre" : nombre,
            "apellido" : apellido,
            "genero" : genero,
            "fechaNacimiento" : fechaNacimiento,
            "pais" : pais
        }
        axios({
            method:"POST",
            url:url,
            responseType:"json",
            data:usuarioData      
        }).then(response => {        
            this.usuarios = response.data;
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Registro guardado',
                showConfirmButton: false,
                timer: 1500
            });
           obtenerUsuarios();                   
        }).catch(error =>{
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Ha ocurrido un error',
                showConfirmButton: false,
                timer: 1500
            });
            console.error(error);
        }).finally(()=>{            
            document.getElementById("guardar-btn").disable = false;
            document.getElementById("btns").style.display="block";
            document.getElementById("carga").style.display="none"; 
        });             
    }
}

/*Resetea el formulario*/
function nuevo(){   
   document.getElementById("nombreTxt").value="";
   document.getElementById("apellidosTxt").value="";
   document.getElementById("generoSelect").value="";
   document.getElementById("fechaNacimientoTxt").value="";
   document.getElementById("paisTxt").value="";
   document.getElementById("actualizar-btn").style.display="none";
   document.getElementById("guardar-btn").style.display="inline";
}

/*Llena la tabla de usuarios*/
function llenarTabla(){
    let tabla = document.querySelector("table tbody");    
    tabla.innerHTML="";
    for (let index = 0; index < usuarios.length; index++) {
        tabla.innerHTML+=`
            <tr>
                <td>${usuarios[index].nombre}</td>
                <td>${usuarios[index].apellido}</td>
                <td>${usuarios[index].genero}</td>
                <td>${usuarios[index].fechaNacimiento}</td>
                <td>${usuarios[index].pais}</td>
                <td class="btn-group">                    
                    <button class="btn btn-warning" onclick="seleccionar(${index})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminar(${index})">Eliminar</button>
                </td>
            </tr>
        `;      
    }    
}

/*Realiza una petición al servidor enviando el
id del usuario y obteniendo los datos del usuario*/
function seleccionar(index){
    idUsuario = index;
    console.log(idUsuario);
    axios({
        method:"GET",
        url:url + `?id=${index}`,
        responseType:"json",        
    }).then(response => {        
        this.usuarios = response.data;
        
        document.getElementById("nombreTxt").value=response.data.nombre;
        document.getElementById("apellidosTxt").value=response.data.apellido;
        document.getElementById("generoSelect").value=response.data.genero;
        document.getElementById("fechaNacimientoTxt").value=response.data.fechaNacimiento;
        document.getElementById("paisTxt").value=response.data.pais;
        document.getElementById("actualizar-btn").style.display="inline";
        document.getElementById("guardar-btn").style.display="none";

    }).catch(error =>{
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Ha ocurrido un error',
            showConfirmButton: false,
            timer: 1500
        });
        console.error(error);
    });
}

/*Realiza una petición al servidor
y envia los datos para actualizar un usuario*/
function actualizarUsuario(){    
    let form = document.getElementById("formulario");
    form.onsubmit = function(event){ event.preventDefault();}
    let nombre = document.getElementById("nombreTxt").value;
    let apellido = document.getElementById("apellidosTxt").value;
    let genero = document.getElementById("generoSelect").value;
    let fechaNacimiento = document.getElementById("fechaNacimientoTxt").value;
    let pais = document.getElementById("paisTxt").value;

    if(nombre=="" || apellido=="" || genero=="" || fechaNacimiento=="" || pais==""){
    }else{
        document.getElementById("actualizar-btn").disable = true;
        document.getElementById("btns").style.display="none";
        document.getElementById("carga").style.display="inline";  

        let usuarioData = {
            "nombre" : nombre,
            "apellido" : apellido,
            "genero" : genero,
            "fechaNacimiento" : fechaNacimiento,
            "pais" : pais
        }
        axios({
            method:"PUT",
            url:url + `?id=${idUsuario}`,
            responseType:"json",
            data:usuarioData      
        }).then(response => {        
            this.usuarios = response.data;
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Registro actualizado',
                showConfirmButton: false,
                timer: 1500
            });
           obtenerUsuarios();                                
        }).catch(error =>{
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Ha ocurrido un error',
                showConfirmButton: false,
                timer: 1500
            });
            console.error(error);
        }).finally(()=>{
            document.getElementById("actualizar-btn").disable = false;
            document.getElementById("btns").style.display="block";
            document.getElementById("carga").style.display="none"; 
        });              
    }
}

/*Realiza una petición al servidor
y envia el id del usuario para eliminarlo*/
function eliminar(index){

    Swal.fire({
        title: '¿Estas seguro?',
        text: "No recuperas este registro",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar registro',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {           
            axios({
                method:"DELETE",
                url:url + `?id=${index}`,
                responseType:"json",        
            }).then(response => {        
                this.usuarios = response.data;
                obtenerUsuarios();
            }).catch(error =>{
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Ha ocurrido un error',
                    showConfirmButton: false,
                    timer: 1500
                });
                console.error(error);
            });
        }
    });    
}