const pokemons = document.getElementById('pokemons')
const input = document.getElementById('search')
const resultat = document.querySelector('ul')
const pokemonCard = document.querySelector('card')
let search = ''
input.addEventListener('input', trouverPokemon)

function trouverPokemon() {
    search = this.value
    console.log(search)
    filtrerPokemon()
}

function filtrerPokemon() {
    Array.from(pokemons.children).forEach(pokemon => {
        const id = pokemon.querySelector('h3').innerText
        const name = pokemon.querySelector('h2').innerText
        if (name.includes(search) || id == Number(search)) {
            pokemon.style.display = 'flex'
        } else {
            pokemon.style.display = 'none'
        }
    });
}

fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
    .then(response => response.json())
    .then(data => {
        const result = data.results;
        console.log(result);
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
                    types.map((typePokemon, index) => {
                        let span = document.createElement('span')
                        if (typePokemon.slot == 1) {
                            div.className = 'card ' + typePokemon.type.name
                        }
                        span.innerText = typePokemon.type.name
                        type.append(span)
                        type.append(document.createElement('br'))
                    })
                    div.append(name)
                    div.append(image)
                    div.append(id)
                    div.append(type)
                    div.addEventListener('click', (e) => {
                        console.log(currentPokemon.weight)
                        document.getElementById('front').src = currentPokemon.sprites.front_default
                        document.getElementById('back').src = currentPokemon.sprites.back_default
                        document.getElementById('poketype').value = currentPokemon.typePokemon.types
                        document.getElementById('pokeweight').value = currentPokemon.weight
                        document.getElementById('pokeheight').value = currentPokemon.height
                    })
                    pokemons.append(div)
                    
                    
                })
        })
    })









