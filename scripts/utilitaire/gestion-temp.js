// avoir un tableau avec le jour ou on est
const joursSemaine = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];

// on recup la date du jour
let ajd = new Date();
// variable qui vas nous servire pour la méthode pour avoir le jour actuel 
let options = {weekday: 'long'}
let jourActuel = ajd.toLocaleDateString('fr-FR',options);

// console.log(jourActuel, ajd);
// On mais la premiere lettre du jour en majuscul et on ajoute le reste du mot 
jourActuel = jourActuel.charAt(0).toUpperCase()+ jourActuel.slice(1);
//  fait repartire le jour a partir du jour ou en est ex (si on est vendredi samedi dimanche...)
// On découpe un morceau du tableau ( a partire de vendredi) on va concaténer a joursemaine.slice(on va couper le tableau qui nous manque pour complété le reste de la semaine )
let tabJourEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));
// console.log(tabJourEnOrdre);
// on export la fonction
export default tabJourEnOrdre ; 