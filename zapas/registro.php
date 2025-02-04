<?php
// Conexión a la base de datos
$host = "sql111.infinityfree.com";       // Servidor de la base de datos
$dbname = "if0_38148471_zenit";     // Nombre de la base de datos
$username = "if0_38148471";        // Usuario de la base de datos
$password = "jP9620tdNOkdqv ";            // Contraseña de la base de datos

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

// Procesar el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST["usuario"];
    $contraseña = password_hash($_POST["contraseña"], PASSWORD_DEFAULT); // Cifrar la contraseña

    // Insertar el usuario en la base de datos
    try {
        $sql = "INSERT INTO usuarios (usuario, contraseña) VALUES (:usuario, :contraseña)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":usuario", $usuario);
        $stmt->bindParam(":contraseña", $contraseña);
        $stmt->execute();

        echo "¡Registro exitoso!";
    } catch (PDOException $e) {
        echo "Error al registrar el usuario: " . $e->getMessage();
    }
}
?>