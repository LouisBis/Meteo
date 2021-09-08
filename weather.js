function tempChange(city){ //On envoie une requete ajax a l'api pour obtenir la temp de city et on l'affiche
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid=c7c8b5706d5c9090ddaf2b10dea45605';
    $.ajax({
        url : url,
        type : 'GET',
        dataType : 'json',
        success : (data)=> {
            $('#temp').text(Math.round(data.main.temp*10)/10);
            $('h2').text(city);
        },
        error : ()=> alert('Un problème est intervenu, merci de revenir plus tard.')
    })
}

function darkTheme(){
    "use strict"
    if ($('h1').hasClass('dark')){
        //si la balise h1 possède une classe dark c'est que le theme sombre est activé
        //alors on modifie nos classe pour passer en theme clair
        $('body').css('backgroundColor','white');
        $('h1, h2, p, button#cityChange, button#darkMode').removeClass('dark');
        $('h1, h2, p, button#cityChange, button#darkMode').addClass('light');
        $('button#darkMode').text('☽');
        localStorage.setItem('theme', 'light');
        //et on enregistre ce choix dans nos localStorage
    }
    else{
        //sinon on passe en thème sombre 
        $('body').css('backgroundColor','#112F41');
        $('h1, h2, p, button#cityChange, button#darkMode').removeClass('light');
        $('h1, h2, p, button#cityChange, button#darkMode').addClass('dark');
        $('button#darkMode').text('☀');
        localStorage.setItem('theme', 'sombre');
        //et on enregistre ce choix dans nos localStorage

        // la boucle for in crée une erreure silencieuse
    }
    console.log(localStorage);
}

if ('geolocation' in navigator){
    navigator.geolocation.watchPosition((position)=>{ //on utilise watchPosition et non get pour suivre le mouvement
        const urlGeoloc = 'https://api.openweathermap.org/data/2.5/weather?lon='+position.coords.longitude+'&lat='+position.coords.latitude+'&units=metric&appid=c7c8b5706d5c9090ddaf2b10dea45605';
        $.ajax({
            url : urlGeoloc,
            type : 'GET',
            dataType : 'json',
            success : (data)=> {
                $('#temp').text(Math.round(data.main.temp*10)/10);
                $('h2').text(data.name);
            },
            error : ()=> alert('Un problème est intervenu, merci de revenir plus tard.')
        })
    },tempChange('Paris'), {enableHighAccuracy : true})
    //Si la géolocalisation est refusé alors on affiche paris 

}
else {
    tempChange('Paris')
}

//tempChange("Paris"); // on défini un ville au chargement de la page
$('#cityChange').click(()=> tempChange(prompt('De quelle ville souhaitez vous avoir la météo ?')));
// on mets un écouteur sur le click de cityButton qui lancera tempChange avec un prompt en parametre

$('#darkMode').click(darkTheme);
// on mets un écouteur sur le click de darkButton qui lancera darkTheme, qui selon le mode actuelle s'adaptera

if (localStorage.getItem('theme') == 'sombre'){
    darkTheme(); //si notre theme est déja dans le localStorage alors on appel darkTheme
}