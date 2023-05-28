const pokemons = document.getElementById('pokemons')
const input = document.getElementById('search')
const resultat = document.querySelector('ul')
const pokemonCard = document.querySelector('card')
let search = ''
input.addEventListener('input', trouverPokemon)
const btn = document.getElementsByClassName('btn-top')

function trouverPokemon() {
    search = this.value
    console.log(search)
    filtrerPokemon()
}

// recherche des pokemons par nom ou id

function filtrerPokemon() {
    Array.from(pokemons.children).forEach(pokemon => {
        const id = pokemon.querySelector('h3').innerText
        const name = pokemon.querySelector('h2').innerText
        if (name.includes(search) || id == Number(search)) {
            pokemon.style.display = 'flex'
        } else {
            pokemon.style.display = 'none'
        }
    })
}

// affichage par ordre des id

function trierParId() {
    const pokemonList = Array.from(pokemons.children);
    pokemonList.sort((a, b) => {
        const idA = parseInt(a.querySelector('h3').innerText);
        const idB = parseInt(b.querySelector('h3').innerText);
        return idA - idB;
    })
    pokemonList.forEach(pokemon => {
        pokemons.appendChild(pokemon)
    })
}

// Appel de l'api pour les 151 pokemons

fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(data => {
        const result = data.results
        console.log(result)
        result.forEach((pokemon, index) => {
            fetch(pokemon.url)
                .then(res => res.json())
                .then(currentPokemon => {
                    let image = document.createElement('img')
                    let name = document.createElement('h2')
                    let id = document.createElement('h3')
                    let type = document.createElement('h3')
                    let div = document.createElement('div')
                    image.src = currentPokemon.sprites.front_default
                    name.innerText = currentPokemon.name
                    id.innerText = currentPokemon.id
                    let types = currentPokemon.types
                    let typeValue = ''
                    types.map((typePokemon, index) => {
                        let span = document.createElement('span')
                        if (typePokemon.slot == 1) {
                            div.className = 'card ' + typePokemon.type.name
                            typeValue = typeValue + typePokemon.type.name
                        } else {
                            typeValue += ' ,' + typePokemon.type.name
                        }
                        span.innerText = typePokemon.type.name
                        type.append(span)
                        type.append(document.createElement('br'))
                    })
                    let abilities = currentPokemon.abilities
                    let abilityValue = ''
                    abilities.map((abilityPokemon, index) => {
                        if (abilityPokemon.slot == 1) {
                            abilityValue = abilityValue + abilityPokemon.ability.name
                        } else {
                            abilityValue = abilityValue + ' ,' + abilityPokemon.ability.name
                        }
                    })
                    div.append(name)
                    div.append(image)
                    div.append(id)
                    div.append(type)
                    div.addEventListener('click', (e) => {
                        document.getElementById('pokename').innerText = currentPokemon.name
                        document.getElementById('front').src = currentPokemon.sprites.front_default
                        document.getElementById('back').src = currentPokemon.sprites.back_default
                        document.getElementById('pokeid').value = '#ID : ' + currentPokemon.id
                        document.getElementById('poketype').value = 'Types : ' + typeValue
                        document.getElementById('pokeweight').value = 'Poids : ' + currentPokemon.weight + 'Kg'
                        document.getElementById('pokeheight').value = 'Taille : ' + currentPokemon.height + '0cm'
                        document.getElementById('abilities').value = 'Capacités : ' + abilityValue
                        drawChart(currentPokemon)
                    })
                    pokemons.append(div);
                })
        })
    })

// Appel de l'api pour les types de pokemons

fetch('https://pokeapi.co/api/v2/type')
    .then(response => response.json())
    .then(data => {
        const types = data.results;

        types.forEach(type => {
            let option = document.createElement('option')
            option.text = type.name;
            document.getElementById('searchbytype').appendChild(option)
        })
    })

// Recuperation des cookies

document.getElementById('trainerForm').addEventListener('submit', function(event) {
    event.preventDefault()
  
// Recuperation des valeur du dresseur

    const name = document.getElementById('name').value
    const age = document.getElementById('age').value
  
// Création du dresseur

    const trainer = { name, age }
  
// Stockage du dresseur dans les cookies

    Cookies.set('trainer', JSON.stringify(trainer))
  
// Message de confirmation

    alert('Dresseur créé avec succès !')

// Reset formaulaire

    document.getElementById('trainerForm').reset()
  });
  
  const trainerData = Cookies.get('trainer')

if (trainerData) {
  const trainer = JSON.parse(trainerData)

  // Affichage dans la console

  console.log('Nom du dresseur :', trainer.name)
  console.log('Âge du dresseur :', trainer.age)
}






