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

function darkTheme(){
    if (document.querySelector('h1').classList.contains('dark')){
        //si la balise h1 possède une classe dark c'est que le theme sombre est activé
        //alors on modifie nos classe pour passer en theme clair
        document.body.style.backgroundColor = 'white';
        document.querySelector('h1').className = 'light';
        document.querySelector('h2').className = 'light';
        document.querySelector('p').className = 'light';
        document.querySelector('button#cityChange').className = 'light';
        document.querySelector('button#darkMode').className = 'light';
        document.querySelector('button#darkMode').textContent = '☽';
        localStorage.setItem('theme', 'light');
        //et on enregistre ce choix dans nos localStorage
    }
    else{
        //sinon on passe en thème sombre 
        document.body.style.backgroundColor = '#112F41';
        document.querySelector('h1').className = 'dark';
        document.querySelector('h2').className = 'dark';
        document.querySelector('p').className = 'dark';
        document.querySelector('button#cityChange').className = 'dark';
        document.querySelector('button#darkMode').className = 'dark';
        document.querySelector('button#darkMode').textContent = '☀';
        localStorage.setItem('theme', 'sombre');
        //et on enregistre ce choix dans nos localStorage
    }
    console.log(localStorage);
}


tempChange("Paris"); // on défini un ville au chargement de la page
const cityButton = document.querySelector('#cityChange');
cityButton.addEventListener('click', ()=> tempChange(prompt('De quelle ville souhaitez vous avoir la météo ?')));
// on mets un écouteur sur le click de cityButton qui lancera tempChange avec un prompt en parametre

const darkButton = document.querySelector('#darkMode');
darkButton.addEventListener('click', darkTheme);
// on mets un écouteur sur le click de darkButton qui lancera darkTheme, qui selon le mode actuelle s'adaptera

if (localStorage.getItem('theme') == 'sombre'){
    darkTheme(); //si notre theme est déja dans le localStorage alors on appel darkTheme
}
