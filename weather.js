function tempChange(city){ //On envoie une requete ajax a l'api pour obtenir la temp de city et on l'affiche
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid=c7c8b5706d5c9090ddaf2b10dea45605';
    const requete = new XMLHttpRequest();
    requete.open('GET', url);
    requete.responseType = 'json';
    requete.send();
    requete.onload = function (){
        if (requete.readyState === XMLHttpRequest.DONE){
            if (requete.status === 200){
                const reponse = requete.response;
                const temperature = Math.round(reponse.main.temp*10)/10;
                console.log(temperature);
                document.querySelector('#temp').textContent=temperature;
                document.querySelector('h2').textContent=city;
            }
        }
        else {
            alert('Un problème est intervenu, merci de revenir plus tard.');
        }
    }
}

tempChange("Paris");
const button = document.querySelector('button') 
button.addEventListener('click', ()=> tempChange(prompt('De quelle ville souhaitez vous avoir la météo ?')));
// on mets un écouteur sur le click sur button qui lancera tempChange avec city en parametre