<?php
  include('database.php');
  if (isset($_POST['id'])) {
    $id= $_POST['id'];
    $query = "SELECT * FROM registro WHERE id = $id";
    $result=mysqli_query($connection,$query);
    if (!$result){
      die('Query Failed.');
    }
    
    $json = array();
    while($row = mysqli_fetch_array($result)) {
      $json[] = array(
        'id'=> $row['id'],
        'entidad'=> $row['entidad'],
        'appat'=> $row['appat'],
        'apmat'=> $row['apmat'],
        'nombre'=> $row['nombre'],
        'fregis'=> $row['fregis'],
      );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
  }
?>