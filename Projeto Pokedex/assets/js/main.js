const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    const formattedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase();

    return `
        <li class="pokemon ${pokemon.type}">
            <a href="pokemon.html?id=${pokemon.number}">
                <span class="number">#${pokemon.number}</span>
                <div class="name-box">${formattedName}</div> <!-- Caixa para o nome -->
                <div class="type-box">
                    <ol class="types">
                        ${pokemon.types.map(type => type.charAt(0).toUpperCase() + type.slice(1)).map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div> <!-- Caixa para o tipo -->
                <img src="${pokemon.photo}" alt="${formattedName}">
            </a>
        </li>
    `;
}

async function loadPokemonItens(offset, limit) {
    const pokemons = await pokeApi.getPokemons(offset, limit);
    const newHtml = pokemons.map(convertPokemonToLi).join('')
    pokemonList.innerHTML += newHtml
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', async () => {
    offset += limit
    const qtdRecordsWithNextPage = offset + limit

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        await loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        await loadPokemonItens(offset, limit)
    }
})
