const companyInput = document.getElementById("input")
const searchButton = document.getElementById("button")
const companyResults = document.getElementById("searchResults")


searchButton.addEventListener("click",()=> {
    const companyQuery = companyInput.value.trim().toLowerCase()

    //Si la valeur est vide on arrête la fonction
    if(!companyQuery) return

    companyResults.innerHTML = ""
    
fetch(`https://recherche-entreprises.api.gouv.fr/search?q=${encodeURIComponent(companyQuery)}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur HTTP :" + response.status)
        }
        return response.json()})
    .then(data => {
        
        if (data.results.length === 0) {
        companyResults.textContent  = "Aucun résultat trouvé"
        return 
    }

        data.results.forEach(e => {


            const div = document.createElement("div")
            
            //Si siege existe, on lit siret, sinon c’est undefined. 
            //Et si la valeur est null ou undefined, on affiche "Non disponible"

            div.innerHTML =  `
                <strong>Nom : ${e.nom_raison_sociale ?? "Non disponible"}</strong> <br> 
                SIRET : ${e.siege?.siret ?? "Non disponible"} <br>
                Adresse:${e.siege?.adresse ?? "Non disponible"} <br>
                Activité : ${e.activite_principale ?? "Non renseignée"} <br>            
            `
            companyResults.appendChild(div)
            
        });

        })

    .catch(error => {
        console.error("Erreur: ", error)
    }) 
})

