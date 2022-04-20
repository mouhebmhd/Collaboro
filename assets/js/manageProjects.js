
    document.querySelectorAll(".deleteMember").forEach(elem=>{
        elem.addEventListener("click",function(event){
            var idMember=this.id.substr(0,this.id.indexOf('&'));
            var idProjet=this.id.substr(this.id.indexOf('&')+1);
            $.ajax({
                'url':'/api/devTeam/delete/'+$.param({idMember,idProjet}),
                'method':'delete'
            }).done(function(response){
                location.reload();
            })
        })
    })
  
    document.querySelectorAll(".updateMember").forEach(elem=>{
        elem.addEventListener("click",function(event){
        this.classList.add("d-none");
        this.parentNode.parentNode.querySelector(".modification").classList.remove("d-none");
        this.parentNode.querySelector(".saveUpdateMember").classList.remove("d-none");
        this.parentNode.parentNode.querySelector(".memberOldRole").classList.add("d-none");
        })
    })
    document.querySelectorAll(".saveUpdateMember").forEach(elem=>{
        elem.addEventListener("click",function(event){
        let NewRole=this.parentNode.parentNode.querySelector(".memberNewRole").value;
        var idMember=this.id.substr(0,this.id.indexOf('&'));
        var idProjet=this.id.substr(this.id.indexOf('&')+1);
        $.ajax({
            'url':'/api/devTeam/update/'+$.param({idMember,idProjet,NewRole}),
            'method':'put'
        }).done(function(response){
            location.reload();
        })
        })
    })
    let techlead;
    function makeTechLead(event)
    {
        techlead=event.currentTarget.id;
        event.currentTarget.childNodes[0].classList.replace("bi-star","bi-star-fill");
        let others=document.getElementsByClassName("makeTechLead");
        for(var i=0;i<others.length;i++)
        {
            if(others[i].id!=techlead)
            {
             others[i].childNodes[0].classList.replace("bi-star-fill","bi-star");
            }
        }
        var idMember=techlead.substr(0,techlead.indexOf('&'));
        var idProjet=techlead.substr(techlead.indexOf('&')+1);
        $.ajax({
            'url':'/api/devTeam/nameAsTechLEad/'+$.param({idMember,idProjet}),
            'method':'put'
        }).done(function(response){
            if(response=='named')
            {
                location.reload();
            }
            else
            {
                location.assign(response);
            }
            
        })
    }