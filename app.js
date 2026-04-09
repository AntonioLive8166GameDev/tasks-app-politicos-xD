$(document).ready(function()
  {
  // Comienza el cuerpo de ready...
  console.log('JQuerry is working');
  let edit=false;
  
  $('#tarea-result').hide();
  TraerTareas();
  
  $('#busx').keyup(function(e)
    {
    console.log($('#busx').val());
    
    if($('#busx').val()){
      let busx = $('#busx').val();
      $.ajax({
        url:'tarea-buscar.php',
        type:'POST',
        data: {busx},
        success: function(response){
        //console.log(response);
          
          let tasks=JSON.parse(response);
          let template = '';
          tasks.forEach(task=>{
              template +=`<tr><td> ${task.nom}</td></tr>`;
            });
            $('#contenedor').html(template);
            $('#tarea-result').show();
          }
        })
        }
    })
  
 $('#tareas-forma').submit(function(e){
  const postData = {
        nom: $('#nom').val(),
        des: $('#des').val(),
        id: $('#tareaId').val()
        };
        let url= edit === false ? 'tareas-agregar.php' : 'tarea-edit.php';
         console.log(url);
        $.post(url, postData, function (response) {
          console.log(response);
            TraerTareas();
            $('#tareas-forma').trigger('reset');
            edit= false;
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
    
     let element=$(this)[0].parentElement.parentElement;
      let id=$(element).attr("tareaId");
      
    
      $.post('tarea-simple.php',{id},function(response){
        const task = JSON.parse(response);
        $('#tareaId').val(task[0].id);
        $('#nom').val(task[0].nom);
        $('#des').val(task[0].des);
        edit=true;
         })
        });

 
 //////////////////////////////////////////////////////////
function TraerTareas(){
    $.ajax({
        url:'tarea-list.php',
        type: 'GET',
        success: function (response){
        //console.log(response);
        let tasks = JSON.parse(response);
        let template = '';
        tasks.forEach(task => {
            template +=`
            <tr tareaId="${task.id}">
               <td >${task.id}</td>
               <td>
               <a href='#' class="task-item">${task.nom}  </a>
               </td>
               <td>${task.des}</td>
               <td>
                  <button class="task-delete">
                   Borrar
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
  
  }); // Termina el cuerpo de ready...
