<?php
  include('database.php');
  $query="SELECT * FROM registro";
  $result=mysqli_query($connection,$query);
  if (!$result) {
    die('Query Error '.mysqli_error($connection));    
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
?>