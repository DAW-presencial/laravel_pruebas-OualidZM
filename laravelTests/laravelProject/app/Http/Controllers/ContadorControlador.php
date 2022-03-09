<?php

namespace App\Http\Controllers;


class ContadorControlador extends Controller{
    function __invoke($contador=0){
        if($contador == 0){
            if(isset($_COOKIE['name_cookie'])){
                $_COOKIE['name_cookie'] += 1;
                setcookie('name_cookie',$_COOKIE['name_cookie']);
                echo "Contador Cookie:" . $_COOKIE['name_cookie'];

            }
            else{
                setcookie('name_cookie',1);
                echo "No cookie was found, now it has been created reload to show the results";
            }
        }else{
            $cookie_val = $contador;
            $cookie_val + 1;
            setcookie('name_cookie',$cookie_val,time());
            echo  "Cookie value: $cookie_val";          
            
        }
    }
}


?>