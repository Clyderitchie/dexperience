// JS TODO List: 
// Global Variables 
const catUrl = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random'; // Chuck Norris API
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        'X-RapidAPI-Key': '868927087amsh65a6ffffa5b7c46p19dcadjsn7079a2a63238',
        'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
    }
};
let pokeUrl = 'https://pokeapi.co/api/v2/pokemon/bulbasaur'; //Pokemon API
//var apiKey =  '868927087amsh65a6ffffa5b7c46p19dcadjsn7079a2a63238';


let quoteSection = document.querySelector('#quote');
let main = document.querySelector('main');


// Chuck Norris API Section
fetch(catUrl, options)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        document.querySelector('#quote').innerHTML = data.value
        console.log(data);

        //testing to see if we can replace chuck norris' name
        let cnQuote = data.value;
        console.log(cnQuote);
        let pkmnQuote = cnQuote.replaceAll('Chuck Norris', 'Bulbasaur');
        console.log(pkmnQuote);

        //only problem is if chuck norris' name is used in possessive because of how apostrophe works.
        //need if statement to achieve this.
    })






// Pokemon API Section
// POKEMON FETCH
// so if using pokemon name with chuck norris fact, take user's input as name and .replace chuck norris

// getPokemonName();

// function getPokemonName() {
//     let inputBox = document.createElement('input');
//     main.append(inputBox);
//     let submitBtn = document.createElement('button');



//this endpoint simply lists all pokemon
//https://pokeapi.co/api/v2/pokemon/{name} would pull up details on that specific pokemon
//would need function to pass in the name of particular pokemon

fetch(pokeUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        // console.log(data.results[0].url);
    })

// };


// Example of the API Object's
//var example = {
//     "categories": [],
//     "created_at": "2020-01-05 13:42:29.569033",
//     "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
//     "id": "uSeGCOlOQaORN_f4wtsLNg",
//     "updated_at": "2020-01-05 13:42:29.569033",
//     "url": "https://api.chucknorris.io/jokes/uSeGCOlOQaORN_f4wtsLNg",
//     "value": "The color brown exists because Chuck Norris scared the shit out of while."
// }