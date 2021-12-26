<?php

    /*Recepción de peticiones y envío de respuestas.
    Interfaz de comunicación.
    @version v.1.1
    @author Frank Atencio
    */

    include_once "../clases/usuario.php";    
    header("Content-Type: application/json");    
    switch(  $_SERVER['REQUEST_METHOD']  ){
        
        case "POST":
            $data = json_decode(file_get_contents("php://input"),true);
            $usuario = new Usuario($data["nombre"],$data["apellido"],$data["genero"],$data["fechaNacimiento"],$data["pais"]);
            $usuario->guardarUsuario();
            $response["Response"] = "El usuario ha sido guardado";
            echo json_encode($response);
        break;
        
        case "GET":
            if(isset($_GET["id"])){
                Usuario::obtenerUsuario($_GET["id"]);
            }else{
                Usuario::obtenerUsuarios();               
            }
        break;        

        case "PUT":
            $data = json_decode(file_get_contents("php://input"),true);
            $usuario = new Usuario($data["nombre"],$data["apellido"],$data["genero"],$data["fechaNacimiento"],$data["pais"]);
            $usuario->actualizarUsuario($_GET["id"]);
            $response["Response"] = "El usuario ha sido actualizado";
            echo json_encode($response);
        break;

        case "DELETE":
            $data = json_decode(file_get_contents("php://input"),true);            
            Usuario::eliminarUsuario($_GET["id"]);
            $response["Response"] = "El usuario ha sido eliminado";
            echo json_encode($response);
        break;
    }

?>