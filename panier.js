
const panier = document.querySelector('.mes_produits');
const sommeTotal = document.querySelector('.total');
const nomsPokemon = JSON.parse(localStorage.getItem('nomsPokemon')) || []


const prixPokemons = []
if(nomsPokemon.length >= 1) {
    nomsPokemon.forEach(nomPokemon => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${nomPokemon}`)
            .then(response => response.json())
            .then(data => {

                // console.log(data)
                const baseExperience = data.base_experience
                const prixPokemon = calculerPrix(baseExperience)

                // Créez l'élément HTML pour chaque Pokémon
                const produitElement = document.createElement('div')

                produitElement.setAttribute('class', 'un_produitAuPanier')
                produitElement.setAttribute('data-data', JSON.stringify(data)) 
                produitElement.innerHTML = `
                    <button data-nom = "${data.name}" data-data= ${JSON.stringify(data)} class="supprimer"><i class="fa-solid fa-xmark"></i></button>
                    <img src="${data.sprites.front_default}" alt="image de ${data.name}"/>
                    <h2>${data.name}</h2> 
                    <p> ${prixPokemon} euros</p>`
                panier.appendChild(produitElement)
                prixPokemons.push(prixPokemon) 
                //utilisation de forEach pour chaque carte du panier
                const modal = document.querySelector('.fond_flou')
                const cartes_panier = document.querySelectorAll('.un_produitAuPanier')
                cartes_panier.forEach(carte => { 
                    carte.addEventListener('click', (e) => {
                        console.log('click')
                        console.log('click2')
                        const modal_infos = document.createElement('div')
                        console.log('click3')
                        modal_infos.setAttribute('class', 'modal_infos')
                        console.log('click4')
                        const donnees = e.target.dataset.data
                        console.log('click5')
                        modal_infos.innerHTML = `
                            <div class="modal">
                                <div class="modal_content">
                                    <div class="pokemon">
                                        <img class= 'img_pop_up' src="${data.sprites.front_default}" alt="image de ${data.name}"/>
                                        <h2>${data.name}</h2>
                                    </div>
                                    <div class="infos">
                                        <p>height : ${data.height}  </p>
                                        <p>weight : ${data.weight}  </p>
                                        <p>base_experience : ${data.base_experience}  </p>
                                        <p> types : ${data.types[0].type.name}  </p>
                                    </div>
                                </div>
                                <button class="fermer">Fermer</button>
                            </div>`
                        console.log('click6')
                        modal.appendChild(modal_infos)
                        modal.style.display = 'flex'
                        console.log('click7')
                        const btn_fermer = document.querySelector('.fermer')
                            btn_fermer.addEventListener('click', () => {
                                modal.style.display = 'none'
                            })
                        
                    })

                })
                const totalPrixPokemons = calculerTotal(prixPokemons) 
                sommeTotal.textContent = `Total ${totalPrixPokemons} euros` // Afficher le prix total du panier

                const boutons_supprimer = document.querySelectorAll('.supprimer')
                boutons_supprimer.forEach(bouton => {   
                    bouton.addEventListener('click', (e) => { 
                        const nomsPokemon = JSON.parse(localStorage.getItem('nomsPokemon')) || []
                        const data_nom = e.target.dataset.nom
                        nomsPokemon.splice(nomsPokemon.indexOf(data_nom), 1)
                        localStorage.setItem('nomsPokemon', JSON.stringify(nomsPokemon))
                        window.location.reload()
                    })
                })


            })
            .catch(error => console.error('Erreur lors de la récupération des données du Pokémon :', error))
    });
} else{
    const btn_payer = document.querySelector('.payer')
    const divPanier = document.querySelector('.panier')
    const panierVide = document.createElement('div')
    panierVide.setAttribute('class', 'panier_vide') 
    divPanier.innerHTML = `
        <h2 style="text-align:center; width:100%"> Oupps ! Votre panier est vide </h2>
        <i style="width:52px; height: 100px; color:#decb35" class="fa-solid fa-cart-arrow-down"></i>
        `
    panier.appendChild(panierVide)
    btn_payer.style.display = 'none'
    sommeTotal.style.display = 'none'
}

// Afficher le prix total du panier
console.log(prixPokemons)

function calculerTotal(prixPokemons) {
    
    let somme = 0
    for (let i = 0; i < prixPokemons.length; i++) {
        if (prixPokemons.length === 0) {
            somme=  0 
        } else if (prixPokemons.length === 1) {  
            somme = prixPokemons[0]
        }
        else {
          somme += prixPokemons[i]
        }
    // let sommeArrondie = somme.toFixed(2)
    // return parseFloat(sommeArrondie)
  }
  return somme;
}




function calculerPrix(baseExperience) {
   
    const prixMinimum = 10
    const prixMaximum = 50

    const experienceMinimum = 0
    const experienceMaximum = 255

    const ratio = (baseExperience - experienceMinimum) / (experienceMaximum - experienceMinimum);
    const prix = prixMinimum + ratio * (prixMaximum - prixMinimum);

    // Retourner le prix arrondi à deux décimales
    return Math.round(prix * 100) / 100;
}

