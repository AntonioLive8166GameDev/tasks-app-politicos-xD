<?php
include('database.php');
if (isset($_POST['nom']))
 {
 $nom= $_POST['nom'];
 $des= $_POST['des'];
 $query = "INSERT into tareas(nom,des) VALUES ('$nom','$des')";
 $result=mysqli_query($connection,$query);
 if (!$result){
   die('Query Failed.');
   }
 echo 'Tarea agregada exitosamente';  
 }
?>