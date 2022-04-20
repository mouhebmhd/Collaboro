
function launchSprint(event)
{
   let id=(event.currentTarget.id);
   $.ajax({
       'url':'/api/sprint/launch/'+$.param({id}),
       'method': 'PUT'
   })
   .done(function(response){
    location.reload();
   });
}