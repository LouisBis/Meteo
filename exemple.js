let city = "Tokyo";
let url  = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid=c7c8b5706d5c9090ddaf2b10dea45605';

function tempChange(){ //On envoie une requete ajax a l'api pour obtenir la temp de city et on l'affiche
    url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid=c7c8b5706d5c9090ddaf2b10dea45605';
    let requete = new XMLHttpRequest();
    requete.open('GET', url);
    requete.responseType = 'json';
    requete.send();
    requete.onload = function (){
        if (requete.readyState === XMLHttpRequest.DONE){
            if (requete.status === 200){
                let reponse = requete.response;
                let temperature = Math.round(reponse.main.temp*10)/10;
                console.log(temperature);
                document.querySelector('#temp').textContent=temperature;
                document.querySelector('h2').textContent=city;
            }
        }
    }
}


function cityChange (){ //On affiche un prompte demandant city et on appel la requete ajax
    city = prompt('De quelle city souhaitez vosu avoir la météo ?');
    tempChange();
}

tempChange();
let button = document.querySelector('button') 
button.addEventListener('click', cityChange);// on mets un écouteur sur le click sur button qui lancera cityChange
