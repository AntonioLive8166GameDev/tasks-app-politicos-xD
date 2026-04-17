<?php
  include('database.php');
  if (isset($_POST['entidad'], $_POST['appat'], $_POST['apmat'], $_POST['nombre'], $_POST['fregis'])) {
    $entidad = $_POST['entidad'];
    $appat = $_POST['appat'];
    $apmat = $_POST['apmat'];
    $nombre = $_POST['nombre'];
    $fregis = $_POST['fregis'];

    // TODO: Check if registro is valid instead of
    // registro(headers).
    $query = "INSERT INTO registro(entidad, appat, apmat, nombre, fregis) VALUES ('$entidad','$appat', '$apmat', '$nombre', '$fregis')";
    $result = mysqli_query($connection, $query);
    if (!$result){
      die('Query Failed.');
    }
    echo 'Tarea agregada exitosamente';  
  } else {
    echo 'Tarea no agregada: Hay campos obligatorios vacíos.';
  }
?>