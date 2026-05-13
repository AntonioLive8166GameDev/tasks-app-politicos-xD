$(document).ready(function()
  {
  // Comienza el cuerpo de ready...
  console.log('JQuerry is working');
  let edit = false;
  // Variables para paginación.
  let currentPage = 1;
  let totalPages = 1;
  
  $('#tarea-result').hide();
  TraerTareas();
  
  $('#busx').keyup(function(e) {
    console.log($('#busx').val());
    
    if($('#busx').val()) {
      let busx = $('#busx').val();
      $.ajax({
        url:'tarea-buscar.php',
        type:'POST',
        data: {busx},
        success: function(response) {
        //console.log(response);
          let tasks = JSON.parse(response);
          let template = '';
          tasks.forEach(
            task => {template += `
              <tr tareaId="${task.id}">
                <td >${task.id}</td>
                <td>${task.appat}</td>
                <td>${task.apmat}</td>
                <td><a href='#' class="task-item">${task.nombre}</a></td>
              </tr>
            `;}
          );
          $('#contenedor').html(template);
          $('#tarea-result').show();
        }
      })
    } else {
      $('#tarea-result').hide();
    }
  })
  
  // Agregar o editar tareas.
  $('#tareas-forma').submit(function(e){
    const postData = {
      id: $('#tareaId').val(),
      entidad: $('#entidad').val(),
      appat: $('#appat').val(),
      apmat: $('#apmat').val(),
      nombre: $('#nombre').val(),
      fregis: $('#fregis').val()
    };

    let url = edit === false ? 'tareas-agregar.php' : 'tarea-edit.php';
    console.log(url);

    $.post(url, postData, function (response) {
      console.log(response);
      TraerTareas();
      $('#tareas-forma').trigger('reset');
      edit = false;
    });
    e.preventDefault(); 
  });

 // Borar tareas 
  $(document).on('click','.task-delete',function (){
    let element=$(this)[0].parentElement.parentElement;
    let id=$(element).attr("tareaId");
    $.post('tarea-borrar.php',{id},function(response){
      TraerTareas();
    })
  });
 
  // Dar clic en alguna de las tareas
  $(document).on('click','.task-item',function (){
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr("tareaId");
    
    $.post('tarea-simple.php',{id},function(response){
      const task = JSON.parse(response);
      $('#tareaId').val(task[0].id);
      $('#entidad').val(task[0].entidad);
      $('#appat').val(task[0].appat);
      $('#apmat').val(task[0].apmat);
      $('#nombre').val(task[0].nombre);
      $('#fregis').val(task[0].fregis);
      edit = true;
    })
  });

 
 //////////////////////////////////////////////////////////
  function TraerTareas(){
    $.ajax({
      url:'tarea-list.php',
      // Camnbiar tipo de petición y enviar página actual.
      type: 'POST',
      data: {page: currentPage},
      success: function (response){
        // Procesar respuesta con metadatos.
        let data = JSON.parse(response);
        let tasks = data.registros;
        totalPages = data.totalPages;
        
        // Actualizar mostrador de página dinámicamente.
        $('#page').html(`<center><button id="prev-page">Anterior</button> Pag. ${data.currentPage}/${data.totalPages} <button id="next-page">Siguiente</button></center>`);
        
        // Deshabilitar botón anterior si estamos en página 1.
        if (data.currentPage === 1) {
          $('#prev-page').prop('disabled', true);
        } else {
          $('#prev-page').prop('disabled', false);
        }
        
        // Deshabilitar botón siguiente si estamos en última página.
        if (data.currentPage === data.totalPages) {
          $('#next-page').prop('disabled', true);
        } else {
          $('#next-page').prop('disabled', false);
        }
        
        let template = '';
        tasks.forEach(task => {
          template +=`
            <tr tareaId="${task.id}">
              <td >${task.id}</td>
              <td>${task.entidad}</td>
              <td>${task.appat}</td>
              <td>${task.apmat}</td>
              <td><a href='#' class="task-item">${task.nombre}</a></td>
              <td>${task.fregis}</td>
              <td>
                <button class="task-delete">
                  Eliminar
                </button>
              </td>
            </tr>
          `
        });
        $('#tareas').html(template);
      }
    })
  }
  // Aqui termina la funcion TraerTareas() ///////////////////
  
  // Manejadores de paginación
  $(document).on('click', '#prev-page', function() {
    if (currentPage > 1) {
      currentPage--;
      TraerTareas();
    }
  });
  
  $(document).on('click', '#next-page', function() {
    if (currentPage < totalPages) {
      currentPage++;
      TraerTareas();
    }
  });
  
}); // Termina el cuerpo de ready...
