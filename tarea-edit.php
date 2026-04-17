<?php
  include('database.php');

  if (isset($_POST['id'], $_POST['entidad'], $_POST['appat'], $_POST['apmat'], $_POST['nombre'], $_POST['fregis'])) {
    $id = $_POST['id'];
    $entidad = $_POST['entidad'];
    $appat = $_POST['appat'];
    $apmat = $_POST['apmat'];
    $nombre = $_POST['nombre'];
    $fregis = $_POST['fregis'];
    
    $query = "UPDATE registro SET entidad = '$entidad', appat = '$appat', apmat = '$apmat', nombre = '$nombre', fregis = '$fregis' WHERE id = '$id'";
    $result=mysqli_query($connection,$query);
    if (!$result) {
      die('Query Failed.');
    }
    echo 'Tarea actualizada con exito';
  }
?>