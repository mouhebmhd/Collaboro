function deleteNotification(event)
{
$.ajax({
    "url" : `/api/notifications/delete/${event.target.id}`,
    method : 'delete'
}).done(function(response){
    location.reload();
})}