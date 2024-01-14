
const contenaire_produit = document.querySelectorAll('.un_produit')
console.log(contenaire_produit, 'contenaire_produit') 
console.log('oooovghbjjb')
for (const produit of contenaire_produit) {
    produit.addEventListener('mouseover', () => { 
        this.classList.add('scale');
    });

    produit.addEventListener('mouseout', () => { 
        this.classList.remove('scale');
    });
}

const contenairePokemonPanier = document.querySelectorAll('.un_produitAuPanier')
console.log(contenairePokemonPanier, 'contenairePokemonPanier')

contenairePokemonPanier.forEach(function(pokemon){
    
    console.log('oooo')
    pokemon.addEventListener('mouseover', () => { 
        this.classList.add('rotation');
    });

    pokemonPanier.addEventListener('mouseout', () => { 
        this.classList.remove('rotation');
    });
})
