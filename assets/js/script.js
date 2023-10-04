// JS TODO List: 
//  - need to save user input into local storage and render last three searches on page
//  - right side buttons: pokemon of the day, quiz, user journal entry
//  - captialize abilities and types

// Global Variables 
let quoteSection = document.querySelector('#quote');
let main = document.querySelector('main');
let searchBtn = document.querySelector('#search-button')
let norrisBox = document.querySelector('#norris-container')
let body = document.querySelector('body');
let pod = document.querySelector('#pod')
// event listener for clicking search button
searchBtn.addEventListener('click', function replaceName(event) {
    event.preventDefault();

    let input = document.querySelector('input').value.toLowerCase();

    renderPokemon(input);
});

// Pokemon API Section
function renderPokemon(name) {
    let pokeUrl = `https://pokeapi.co/api/v2/pokemon/${name}`; //Pokemon API

    fetch(pokeUrl)
        .then(function (response) {

            if (!response.ok) {
                body.setAttribute('style', 'background-image: url(./assets/images/city-landscapeglitch.webp);')
                let errorMsg =
                    `<p>Oak's words echoed... "There's a time and place for everything but not now!"</p>`;
                document.querySelector('#stat-page').setHTML(errorMsg);
                document.querySelector('img').src = './assets/images/MissingNo.1.webp';
                norrisBox.setAttribute('style', 'display:flex');
                document.querySelector('#norris-quote').textContent = 'That\'s not a Pokémon, LOL.';
                return;
            }
            document.querySelector('#norris-quote').textContent = '';
            body.setAttribute('style', 'background-image: url(./assets/images/city-landscape.webp);')
            return response.json();

        })
        .then(function (data) {

            // using localStorage to save user's searches
            let pkmnArr = JSON.parse(localStorage.getItem('pokemon')) || [];

            if (pkmnArr.includes(data.name)) {
                let index = pkmnArr.indexOf(data.name);
                pkmnArr.splice(index, 1);
            }
            pkmnArr.unshift(data.name);
            localStorage.setItem('pokemon', JSON.stringify(pkmnArr));

            //all the actions that happen once we get data

            statCard(data); // DISPLAY pokemon info
            pokemonImg(data); //DISPLAY IMAGE for current pokemon
            norrisBox.setAttribute('style', 'display:flex');//removes norris box from hiding
            norrisFact(name);//displays norris-pokemon fact

        })

    // Renders the Image for the current Pokemon
    function pokemonImg(data) {
        let image = document.querySelector('#pkmn-img');
        let imgUrl = data.sprites.front_default;
        image.setAttribute('src', imgUrl)
    }

    // Renders the abilities of the Pokemon
    function renderAbilities(abilitiesArr) {
        let HTML = '';
        for (let i = 0; i < abilitiesArr.length; i++) {
            HTML += `<span> ${abilitiesArr[i].ability.name}</span>`
        }
        return HTML;
    }

    // Renders the different types of the Pokemon
    function renderTypes(typesArr) {
        let HTML = '';
        for (let i = 0; i < typesArr.length; i++) {
            HTML += `<span> ${typesArr[i].type.name}</span>`
        }
        return HTML;
    }

    // Renders the base_stat and name for the Pokemon
    function renderBaseStat(baseStatArr) {
        let HTML = '';
        for (let i = 0; i < baseStatArr.length; i++) {
            HTML += `<li>${baseStatArr[i].stat.name}: ${baseStatArr[i].base_stat} </li>`
        }
        return HTML;
    }

    // Renders a dynamic stat card for a Pokemon 
    function statCard(data) {
        let statCardHTML = ''
        statCardHTML +=
            `<div class="stat-element">
                <p><strong>NAME:</strong> ${(data.name).charAt(0).toUpperCase() + (data.name).slice(1)}</p>
                <p><strong>HEIGHT:</strong> ${(((data.height * 0.1) * 39.4) / 12).toFixed(1)} ft</p>
                <p><strong>WEIGHT:</strong> ${((data.weight * 0.1) * 2.205).toFixed(1)} lbs</p>
               <p><strong>ABILITIES:</strong> ${renderAbilities(data.abilities)} </p>
               <p><strong>TYPES:</strong> ${renderTypes(data.types)}</p>
               <ul><strong>STATS:</strong> ${renderBaseStat(data.stats)}</ul>
            </div>`
        document.querySelector('#stat-page').setHTML(statCardHTML);
    }
};

// ===========================================

// Chuck Norris API Section
const getRandomCategory = () => ['animal', 'career', 'celebrity', 'dev', 'fashion', 'food', 'history', 'money', 'movie', 'music', 'science', 'sport', 'travel'][Math.floor(Math.random() * 13)];
function norrisFact(name) {

    let catUrl = `https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random?category=${getRandomCategory()}`; // Chuck Norris API
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-RapidAPI-Key': '868927087amsh65a6ffffa5b7c46p19dcadjsn7079a2a63238',
            'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
        }
    };
    fetch(catUrl, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let pokeName = `${name}`;
            console.log(pokeName);
            let cnQuote = data.value;
            let pkmnQuote = cnQuote.replaceAll(/Chuck Norris/ig, pokeName.trim().charAt(0).toUpperCase() + pokeName.slice(1));
            let pluralNorris = 'Chuck Norris\'';
            if (cnQuote.includes(pluralNorris)) {
                cnQuote.replaceAll('Chuck Norris\'', pokeName.trim().charAt(0).toUpperCase() + pokeName.slice(1) + `'s`);
            } else {
                document.querySelector('#norris-quote').textContent = pkmnQuote;
            }
        })

//only problem is if chuck norris' name is used in possessive because of how apostrophe works.
//need if statement to achieve this.

};
norrisFact();
function pokemon_of_the_day() {
    const today = dayjs().format("MM/DD/YYYY");
    console.log(today);

    let pokemon = localStorage.getItem(today);
    console .log (pokemon)
    pokemon = pokemon ? JSON.parse(pokemon) : null;

    if (pokemon === null) {
        console.log("Fetching new Pokemon...");
        const randomId = Math.floor(Math.random() * 200);
        const url = `https://pokeapi.co/api/v2/pokemon/${randomId}/`;
        
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                const pokemonData = {
                    name: data.name,
                    id: data.id
                };
                console.log(pokemonData);

                // Saving the Pokemon data to localStorage
                localStorage.setItem(today, JSON.stringify(pokemonData));
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    } else {
        console.log("Pokemon already created:", pokemon);
    }
}

pod.addEventListener("click", function(){
    const today = dayjs().format("MM/DD/YYYY");
    // console.log(today);

    let pokemon = JSON.parse(localStorage.getItem(today));
    // console .log (pokemon) 
    // console .log (pokemon.name) 
    renderPokemon (pokemon.name)
})
pokemon_of_the_day();
