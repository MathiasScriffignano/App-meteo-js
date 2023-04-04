import tabJourEnOrdre from './utilitaire/gestion-temp.js';
const CLEAPI = '645628fd6da978e210955784361f7d91'
let resultatsAPi;
const temps = document.querySelector('.temp');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const JoursTemp = document.querySelectorAll('.jour-prevision-temp')
const imgIcone = document.querySelector('.logo-meteo')
const chargementContainer = document.querySelector('.overlay-icone-chargement');
// on active la géolocalisation 
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
        // console.log(position);
        // on extrait la longitude et la latitude 
        let long = position.coords.longitude;
        let lat = position.coords.latitude;

        // On stock no valeur dans la fonction créer plus bas 
        appelAPI(long,lat)
    }, () => {
        // on affiche un message d'alerte si l'utilisateur refuse la localisation 
        alert("Vous avez refusé la géolocalisation, l'application ne peut fonctionner, veuillez l'activer !");
    })
}
// On créer une fonction pour afficher les valeur 
function appelAPI(long,lat){
    // console.log(long,lat);
    // ON fait une fonction fetch pour récuperer les donner http
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEAPI}`)
    // on recup la réponse dnas le json pour la lire 
    .then((reponse)=> {
        return reponse.json();
    })
    .then((data) => {
         console.log(data)
        resultatsAPi = data ;
        // On recup les données pour les injecter dans le html temp
        temps.innerText = resultatsAPi.current.weather[0].description;
        // on fait la même chose pour la temp
        temperature.innerText = ` ${Math.trunc(resultatsAPi.current.temp)}°`
  
        
        // afficher les heures par tranche de 3
        // on recup l'heure actuel
        let heureActuel = new Date().getHours();
        // console.log(heureActuel);
        for(let i=0 ; i<heure.length; i++){
            // i = 0 puis on va faire +3h
            let heureIncr = heureActuel + i*3;
            // on affiche sur le site
            // on fait un if pour passer la journer a 24h
            if(heureIncr > 24){
                heure[i].innerText = `${heureIncr - 24}h`}
                else if ( heureIncr === 24){
                    heure[i].innerText = '00 h'}
                else{
                    heure[i].innerText = `${heureIncr}h`
                }
        }
        // temp pour 3h
        for (let j= 0 ; j < tempPourH.length; j++){
            tempPourH[j].innerText = `${Math.trunc(resultatsAPi.hourly[j*3].temp)}°`
           } 
    
        // 3 premiere lettre des jours
        for (let k = 0; k < tabJourEnOrdre.length; k++){
            joursDiv[k].innerText = tabJourEnOrdre[k].slice(0,3);
        }
        // temp par jour 
    for(let m=0; m<7 ; m++ ){
        JoursTemp[m].innerText = `${Math.trunc(resultatsAPi.daily[m+1].temp.day)}°`;
    } 
    //icone dynamique

    if(heureActuel>= 6 && heureActuel <21 ){
        imgIcone.src = `ressources/jour/${resultatsAPi.current.weather[0].icon}.svg`
    } else{
        imgIcone.src = `ressources/nuit/${resultatsAPi.current.weather[0].icon}.svg`
    }

    chargementContainer.classList.add('disparition');
    })
}
