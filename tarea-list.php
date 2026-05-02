<?php
  include('database.php');
  
  // Obtener página actual (por defecto página 1).
  // intval() asegura que sea un número entero.
  $page = isset($_POST['page']) ? intval($_POST['page']) : 1;
  if ($page < 1) $page = 1;
  
  // Calcular OFFSET (desplazamiento).
  $recordsPerPage = 25;
  $offset = ($page - 1) * $recordsPerPage;
  
  // Contar total de registros.
  $countQuery = "SELECT COUNT(*) as total FROM registro";
  $countResult = mysqli_query($connection, $countQuery);
  if (!$countResult) {
    die('Query Error '.mysqli_error($connection));    
  }
  $countRow = mysqli_fetch_array($countResult);
  $totalRecords = $countRow['total'];
  
  // Obtener registros de la página actual.
  // LIMIT 25 devuelve máximo 25 registros.
  // OFFSET salta los registros anteriores.
  $query = "SELECT * FROM registro ORDER BY id LIMIT $recordsPerPage OFFSET $offset";
  $result = mysqli_query($connection, $query);
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
  
  // Retornar JSON con registros y metadatos de paginación para el frontend.
  $response = array(
    'registros' => $json,
    'totalRecords' => $totalRecords,
    // ceil() redondea fracciones hacia arriba.
    'totalPages' => ceil($totalRecords / $recordsPerPage),
    'currentPage' => $page,
    'recordsPerPage' => $recordsPerPage
  );
  
  echo json_encode($response);
?>