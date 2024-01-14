// Sélectionnez l'élément qui contiendra les produits dans le panier
const produitsPanier = document.querySelector('.mes_produits');
const contenant_produit = document.querySelector('.produits');





const updateStoredData = (nomsPokemon) => {
    localStorage.setItem('nomsPokemon', JSON.stringify(nomsPokemon))
};

// Chargez les données depuis l'API PokeAPI
fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
    .then(response => response.json())
    .then(data => {
        let nomsPokemon = JSON.parse(localStorage.getItem('nomsPokemon')) || [];
        data.results.forEach((pokemon) => {
            const url = pokemon.url;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const baseExperience = data.base_experience

                    const prixPokemon = calculerPrix(baseExperience)

                    const produitElement = document.createElement('div');
                    produitElement.classList.add('un_produit');
                    produitElement.setAttribute('class', 'un_produit') 
                    produitElement.innerHTML = `
                        <img src="${data.sprites.front_default}" alt="image de ${pokemon.name}"/>
                        <h2>${pokemon.name}</h2>
                        <p> ${prixPokemon} euros</p>
                        <button class="btn" id = "btn" data-data= ${JSON.stringify(data)} data-image="${data.sprites.front_default}" data-nom="${pokemon.name}" data-prix="${prixPokemon}">Ajouter au panier</button>`;
                    contenant_produit.appendChild(produitElement);
                    const btns = document.querySelectorAll('.btn')
                
         
                btns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                const nomPokemon = e.target.dataset.nom
                const imagePokemon = e.target.dataset.image
                const data = JSON.parse(e.target.dataset.data)
                const prixPokemon = e.target.dataset.prix
                console.log(data)   
                const pop_up = document.querySelector('.pop_up')
                pop_up.innerHTML = `
                <div class = "pop_up_centrer "> 
                    <div class= "pop_up_infos">
                        <div class="pokemon">
                            <img class= 'img_pop_up' src="${imagePokemon}" alt="image de ${nomPokemon}"/>
                            <h2>${nomPokemon}</h2>
                        </div>
                        <div class="infos">
                            <p>height : ${data.height}  </p>
                            <p>weight : ${data.weight}  </p>
                            <p>base_experience : ${data.base_experience}  </p>
                            <p> types : ${data.types[0].type.name}  </p>
                        </div>
                    </div>
                    <p> ${prixPokemon} euros</p>
                    <div class="btns">
                        <button class="btn_fermer">Fermer</button>
                        <button class="btn_ajouter">Ajouter au panier</button>
                    </div>
                    
                </div>`

                pop_up.style.display = 'flex'
                const btn_fermer = document.querySelector('.btn_fermer')
                const btn_ajouter = document.querySelector('.btn_ajouter')

                btn_ajouter.addEventListener('click', () => {
                    if (!nomsPokemon.includes(nomPokemon)) {
                        nomsPokemon.push(nomPokemon)
                        console.log(nomsPokemon)
                        localStorage.setItem('nomsPokemon', JSON.stringify(nomsPokemon))
                        updateStoredData(nomsPokemon)
                        pop_up.style.display = 'none'
                        window.location.href = "panier.html"
                    } else {
                    
                        console.log(`Le nom ${nomPokemon} est déjà dans le tableau.`)
                    }
                })

                btn_fermer.addEventListener('click', () => {
                    pop_up.style.display = 'none'
                })

            })
        })
                })
                .catch(error => console.error('Erreur lors de la récupération des données Pokémon :', error));
        });

        
        
        

    })
    .catch(error => console.error('Erreur lors de la récupération de la liste des Pokémon :', error));


    function calculerPrix(baseExperience) {
        // Échelle de prix
        const prixMinimum = 10;
        const prixMaximum = 50;
    
        // Échelle de base d'expérience (à ajuster en fonction des valeurs réelles que vous attendez)
        const experienceMinimum = 0;
        const experienceMaximum = 255;
    
        // Calcul du prix en fonction de la base d'expérience
        const ratio = (baseExperience - experienceMinimum) / (experienceMaximum - experienceMinimum);
        const prix = prixMinimum + ratio * (prixMaximum - prixMinimum);
    
        // Retourner le prix arrondi à deux décimales
        return Math.round(prix * 100) / 100;

    }

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase()
    filtrerPokemons(searchTerm)
});
function filtrerPokemons(searchTerm) {
    const pokemonElements = document.querySelectorAll('.un_produit')
    pokemonElements.forEach((pokemonElement) => {
        const pokemonName = pokemonElement.querySelector('h2').textContent.toLowerCase()
        const displayStyle = pokemonName.includes(searchTerm) ? 'block' : 'none'
        pokemonElement.style.display = displayStyle
    });
}




