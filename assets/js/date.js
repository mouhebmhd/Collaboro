function alertDateTime() {
	var date = new Date();
	jj = date.getDay();
	var jour = "";
	var day = date.getDate();
	var mois = date.getMonth();
	var annee = date.getFullYear();
  var seconds,hours,minutes;
  seconds=date.getSeconds();
  hours=date.getHours();
  minutes=date.getMinutes();
  if(hours<10) hours="0"+hours.toString()
  if(minutes<10) minutes="0"+minutes.toString()
  if(seconds<10) seconds="0"+seconds.toString()
  if(day<10) day="0"+day.toString()
	switch (jj) {
		case 1: {
			jour = "Lun";
			break;
		}
		case 2: {
			jour = "Mar";
			break;
		}
		case 3: {
			jour = "Mer";
			break;
		}

		case 4: {
			jour = "Jeu";
			break;
		}
		case 5: {
			jour = "Ven";
			break;
		}
		case 6: {
			jour = "Sam";
			break;
		}
		case 7: {
			jour = "Dim";
			break;
		}

	}
	switch (mois) {
		case 0: {
			mois = "Janvier";
			break;
		}
		case 1: {
			mois = "Février ";
			break;
		}
		case 2: {
			mois = "Mars";
			break;
		}

		case 3: {
			mois = "Avril";
			break;
		}
		case 4: {
			mois = "Mai";
			break;
		}
		case 5: {
			mois = "Juin";
			break;
		}
		case 6: {
			mois = "Juillet";
			break;
		}
		case 7: {
			mois = "Aout";
			break;
		}
		case 8: {
			mois = "Septembre";
			break;
		}
		case 9: {
			mois = "Octobre";
			break;
		}
		case 10: {
			mois = "Novembre";
			break;
		}
		case 11: {
			mois = "Décembre";
			break;
		}

	}

	return ({d:jour + " " + day + " " + mois + " " + annee ,t: hours + ":" + minutes + ":" + seconds});
}
var d = document.getElementById("date");
var t = document.getElementById("heure");
 window.setInterval(function() {
	d.innerHTML=alertDateTime().d;
	t.innerHTML=alertDateTime().t;
}, 1000);