<?php
// procesar_contacto.php

//CONFIG
$db_host = "sql306.infinityfree.com"; // Ejemplo: localhost, o el servidor que te proporcione tu hosting
$db_name = "if0_38954785_zenit"; // Ejemplo: mi_tienda_db
$db_user = "if0_38954785"; // Ejemplo: root, o el usuario de tu BD
$db_pass = "lolito412aA"; // La contraseña para ese usuario



$errors = [];
$success_message = 
l_FORMULARIO_CONTACTO_RESPONSE__ = []; // Para almacenar la respuesta para el front-end

// Verificar si el formulario fue enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger y sanitizar los datos del formulario
    $nombre = isset($_POST["nombre_contacto"]) ? htmlspecialchars(trim($_POST["nombre_contacto"])) : 
l_FORMULARIO_CONTACTO_RESPONSE__["nombre_contacto_value"] = $nombre;
    $email = isset($_POST["email_contacto"]) ? htmlspecialchars(trim($_POST["email_contacto"])) : 
l_FORMULARIO_CONTACTO_RESPONSE__["email_contacto_value"] = $email;
    $asunto = isset($_POST["asunto_contacto"]) ? htmlspecialchars(trim($_POST["asunto_contacto"])) : 
l_FORMULARIO_CONTACTO_RESPONSE__["asunto_contacto_value"] = $asunto;
    $mensaje = isset($_POST["mensaje_contacto"]) ? htmlspecialchars(trim($_POST["mensaje_contacto"])) : 
l_FORMULARIO_CONTACTO_RESPONSE__["mensaje_contacto_value"] = $mensaje;

    // Validación básica
    if (empty($nombre)) {
        $errors[] = "El nombre es obligatorio.";
    }
    if (empty($email)) {
        $errors[] = "El correo electrónico es obligatorio.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "El formato del correo electrónico no es válido.";
    }
    if (empty($asunto)) {
        $errors[] = "El asunto es obligatorio.";
    }
    if (empty($mensaje)) {
        $errors[] = "El mensaje es obligatorio.";
    }

    if (empty($errors)) {
        try {
            $conn = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            /*
            -- ESTRUCTURA EJEMPLO PARA LA TABLA 'mensajes_contacto' --
            CREATE TABLE IF NOT EXISTS mensajes_contacto (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                asunto VARCHAR(255) NOT NULL,
                mensaje TEXT NOT NULL,
                fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                leido BOOLEAN DEFAULT FALSE
            );
            */

            // --- INSERCIÓN EN LA BASE DE DATOS ---
            // Asegúrate de que la tabla 'mensajes_contacto' y sus columnas existan en tu base de datos.
            $sql = "INSERT INTO mensajes_contacto (nombre, email, asunto, mensaje) VALUES (:nombre, :email, :asunto, :mensaje)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':nombre', $nombre);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':asunto', $asunto);
            $stmt->bindParam(':mensaje', $mensaje);
            $stmt->execute();

            $success_message = "¡Mensaje enviado con éxito! Gracias por contactarnos.";
            // Limpiar los valores del formulario en caso de éxito para que no se repueblen
            $_POST = array(); // Limpia el POST para que los campos no se rellenen si se refresca
            $nombre = $email = $asunto = $mensaje = ''; // Limpia las variables locales
            $FORMULARIO_CONTACTO_RESPONSE__["success"] = true;
            $FORMULARIO_CONTACTO_RESPONSE__["message"] = $success_message;

        } catch (PDOException $e) {
            // error_log("Error de base de datos: " . $e->getMessage()); 
            $errors[] = "Error al procesar tu mensaje. Por favor, inténtalo de nuevo más tarde."; // Mensaje genérico para el usuario
            // $errors[] = "Error de BD: " . $e->getMessage(); // Para depuración, no mostrar en producción
            $FORMULARIO_CONTACTO_RESPONSE__["success"] = false;
            $FORMULARIO_CONTACTO_RESPONSE__["errors"] = $errors;
        } finally {
            $conn = null;
        }
    } else {
        $FORMULARIO_CONTACTO_RESPONSE__["success"] = false;
        $FORMULARIO_CONTACTO_RESPONSE__["errors"] = $errors;
    }
    
    // Guardar el estado en la sesión para mostrarlo después de la redirección
    session_start();
    $_SESSION['form_response'] = $FORMULARIO_CONTACTO_RESPONSE__;
    
    // Redirigir de vuelta a la página del formulario (index.html o la página que sea)
    // Añadimos un ancla para que el usuario vea el resultado directamente si es posible
    // Es importante que la página que contiene el formulario (index.html) tenga un elemento con id="contacto-resultado"
    // donde se puedan mostrar estos mensajes, o que el JavaScript maneje la variable de sesión.
    header('Location: ' . $_SERVER['HTTP_REFERER'] . '#contactModal'); // O una URL específica
    exit;
}

// Este script es solo para procesamiento. No debería mostrar HTML directamente si se accede por GET.
// Si se accede directamente a procesar_contacto.php sin un POST, redirigir o mostrar un error.
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    // echo "Acceso no permitido.";
    // O redirigir a la página de inicio
    // header('Location: index.html');
    // exit;
}
?>
