<?php
    /*Clase Usuario define los atributos 
    y los metodos de manipulación de datos.
    @version v1.1
    @author Frank Atencio
    */

    class Usuario{
        /*Definición de atributos.
        @access private
        @var string
        */
        private $nombre;
        private $apellido;
        private $genero;
        private $fechaNacimiento;        
        private $pais;

        /*Método constructor, inicializa el objeto.
        @access public        
        @param string $nombre
        @param string $apellido
        @param string $genero
        @param string $fechaNacimiento
        @param string $pais
        @return void
        */
        public function __construct($nombre,$apellido,$genero,$fechaNacimiento,$pais){
            $this->nombre = $nombre;
            $this->apellido = $apellido;
            $this->genero = $genero;
            $this->fechaNacimiento = $fechaNacimiento;
            $this->pais = $pais;
        }

        /*Metodo getNombre.
        @access public
        @return string $nombre
        */
        public function getNombre(){
            return $this->nombre;
        }

        /*Metodo setNombre.
        @access public
        @param string $nombre
        @return void
        */
        public function setNombre(  $nombre  ){
            $this->nombre = $nombre;
        }

        /*Metodo getApellido.
        @access public
        @return string $apellido
        */
        public function getApellido(){
            return $this->apellido;
        }

        /*Metodo setApellido.
        @access public
        @param string $apellido
        @return void
        */
        public function setApellido(  $apellido  ){
            $this->apellido = $apellido;
        }

        /*Metodo getGenero.
        @access public        
        @return string $genero
        */
        public function getGenero(){
            return $this->genero;
        }

        /*Metodo setGenero.
        @access public
        @param string $genero
        @return void
        */
        public function setGenero(  $genero  ){
            $this->genero = $genero;
        }

        /*Metodo getFechaNacimiento.
        @access public        
        @return string $fechaNacimiento
        */
        public function getFechaNacimiento(){
            return $this->fechaNacimiento;
        }

        /*Metodo setFechaNacimiento.
        @access public
        @param string $fechaNacimiento
        @return void
        */
        public function setFechaNacimiento(  $fechaNacimiento  ){
            $this->fechaNacimiento = $fechaNacimiento;
        }

        /*Metodo getPais.
        @access public
        @return string pais
        */
        public function getPais(){
            return $this->pais;
        }

        /*Metodo setPais.
        @access public
        @param string $pais
        @return void
        */
        public function setPais(  $pais  ){
            $this->pais = $pais;
        }

        /*Metodo toString.
        @access public
        @param string $pais
        @return string
        */
        public function __toString(){
            return $this->nombre." ".$this->apellido.
            " ".$this->genero." ".$this->fechaNacimiento." ".$this->pais;
        }

        /*Metodo save.
        @access public        
        @return void
        */
        public function guardarUsuario(){                        
            $data = file_get_contents("../data/usuario.json");
            $usuarios = json_decode($data,true);
            $usuarios[] = array(
                "nombre" => $this->nombre,
                "apellido" => $this->apellido,
                "genero" => $this->genero,
                "fechaNacimiento" => $this->fechaNacimiento,
                "pais" => $this->pais
            );

            $archivo = fopen("../data/usuario.json","w");
            fwrite($archivo,json_encode($usuarios));
            fclose($archivo);
        }

        /*Metodo obtenerUsuarios.        
        @access public
        @static
        @param string $pais
        @return void
        */
        public static function obtenerUsuarios(){
            $data = file_get_contents("../data/usuario.json");
            echo $data;
        }

        /*Metodo obtenerUsuario.        
        @access public
        @static
        @param int $indice
        @return void
        */
        public static function obtenerUsuario(  $indice  ){
            $data = file_get_contents("../data/usuario.json");
            $usuarios = json_decode($data,true);           
            echo json_encode($usuarios[$indice]); 
        }

        /*Metodo actualizarUsuario.        
        @access public    
        @param int $indice
        @return void
        */
        public function actualizarUsuario(  $indice  ){
            $data = file_get_contents("../data/usuario.json");
            $usuarios = json_decode($data,true);            
            $usuario = array(
                "nombre" => $this->nombre,
                "apellido" => $this->apellido,
                "genero" => $this->genero,
                "fechaNacimiento" => $this->fechaNacimiento,
                "pais" => $this->pais
            );
            $usuarios[$indice] = $usuario;
            $archivo = fopen("../data/usuario.json","w");
            fwrite($archivo,json_encode($usuarios));
            fclose($archivo);
        }

        /*Metodo eliminarUsuario.        
        @access public
        @static   
        @param int $indice
        @return void
        */
        public static function eliminarUsuario(  $indice  ){
            $data = file_get_contents("../data/usuario.json");
            $usuarios = json_decode($data,true);
            array_splice($usuarios, $indice, 1);
            $archivo = fopen("../data/usuario.json","w");
            fwrite($archivo,json_encode($usuarios));
            fclose($archivo);
        }

    }
?>