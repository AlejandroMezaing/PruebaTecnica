const formLocation = document.getElementById("locationForm"); //formulario
const charactersContainer = document.getElementById("characters"); //section en html

//evento boton
formLocation.addEventListener('submit', (e) => {
    e.preventDefault(); //comportamiento predeterminado 
    const locationId = document.getElementById("idLocation").value; //valor introducido en el input
    fetch(`https://rickandmortyapi.com/api/location/${locationId}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            getLocation(data); //funcion + parametro
        });
    changeColorIdLocation(locationId);
});

function ordenarAlfabeticamente(arr, key) {
    return arr.sort((a, b) => {
        const nameA = a[key].toLowerCase();
        const nameB = b[key].toLowerCase();
        return nameA.localeCompare(nameB);
    });
}

function getLocation(data) {
    const residents = data.residents.slice(0, 5); // 5 residentes 
    residents.forEach((residentUrl) => {
        fetch(residentUrl)
            .then(resp => resp.json())
            .then(residentData => {
                const article = document.createRange().createContextualFragment(`
                <article class="col-sm-8 col-md-4 rounded p-2 d-flex justify-content-center">
                    <div class="card bg-primary text-white" >
                        <div class="row mb-5 p-3" >
                            <div class="col-sm-12 col-md-4 align-self-center mx-auto">
                                <img
                                    src="${residentData.image}"  
                                    class="img-fluid character-image" >
                            </div>
                            <div class="col-sm-8 col-md-8">
                                <div class="card-body "> 
                                <h5 class="card-title">
                                ${residentData.name}
                                </h5>
                                <p>Status: ${residentData.status}</p>
                                <p>Species: ${residentData.species}</p>
                                <p>Origin: ${residentData.origin.name}</p>
                            </div>
                        </div>
                        <div class="card-body text-white">
                            <p>Episodios:</p>
                                <ul class="list-unstyled ">
                                    ${residentData.episode.slice(0, 3).map(episode => `<li>${episode}</li>`).join(" ")}
                                </ul> 
                        </div>       
                    </div>
                </article>
            `);
                //agregar al nodo 
                const section = document.querySelector("section");
                section.append(article);
            });
        charactersContainer.innerHTML = ''; // Limpiar 
    });
}

function changeColorIdLocation(locationId) {
    const divFondo = document.getElementById("fondo");
    if (locationId < 50) {
        divFondo.classList.add("bg-green");
        divFondo.classList.remove("bg-blue", "bg-red");
    } else if (locationId >= 50 && locationId < 80) {
        divFondo.classList.add("bg-blue");
        divFondo.classList.remove("bg-green", "bg-red");
    } else {
        divFondo.classList.add("bg-red");
        divFondo.classList.remove("bg-green", "bg-blue");
    }
}
