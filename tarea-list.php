<?php
include('database.php');
$query="SELECT * FROM tareas";
$result=mysqli_query($connection,$query);
if (!$result)
    {
    die('Query Error '.mysqli_error($connection));    
    }
 $json = array();   
 while($row = mysqli_fetch_array($result)) {
   $json[] = array(
      'id'=> $row['id'],
      'nom'=> $row['nom'],
      'des'=> $row['des']
       );
   }
   $jsonstring = json_encode($json);
   echo $jsonstring;
?>