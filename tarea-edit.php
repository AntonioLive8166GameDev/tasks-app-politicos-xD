<?php
include('database.php');

if (isset($_POST['id']))
 {
 $id= $_POST['id'];
 $nom= $_POST['nom'];
 $des= $_POST['des'];
 $query = "UPDATE tareas SET nom = '$nom', des='$des' WHERE id='$id'";
 $result=mysqli_query($connection,$query);
 if (!$result){
   die('Query Failed.');
   }
 echo 'Tarea actualizada con exito';
 }
?>