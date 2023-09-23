// Variable global para almacenar las películas
let films;

// Consumo de la API de SWAPI para obtener películas
async function getFilmsFromApi() {
  try {
    const response = await fetch('https://swapi.dev/api/films/');
    if (!response.ok) {
      throw new Error(`Error: ${response.status}, message: ${response.statusText}`);
    }
    const filmsData = await response.json();
    return filmsData.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para mostrar la lista de películas
async function displayFilms() {
  try {
    const filmList = document.getElementById('film-list');
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';

    films = await getFilmsFromApi();

    filmList.innerHTML = '';
    films.forEach((film, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = film.title;
      listItem.classList.add('clickable');
      listItem.addEventListener('click', () => {
        setFilmInfoInView(index);
        setFilmCharactersInView(films[index].characters);
        
    
      });
      filmList.appendChild(listItem);
    });

    spinner.style.display = 'none';
  } catch (error) {
    console.error(error);
  }
}

// Función para mostrar información detallada de una película
function setFilmInfoInView(index) {
  const film = films[index];
  const modal = document.getElementById('film-modal');
  const modalTitle = document.getElementById('title');
  const modalEpisode = document.getElementById('episode');
  const modalDirector = document.getElementById('director');
  const modalReleaseDate = document.getElementById('release_date');
  const modalOpeningCrawl = document.getElementById('opening_crawl');

  modalTitle.innerText = film.title;
  modalEpisode.innerText = `Episode ${film.episode_id}`;
  modalDirector.innerText = `Director: ${film.director}`;
  modalReleaseDate.innerText = `Release Date: ${film.release_date}`;
  modalOpeningCrawl.innerText = film.opening_crawl;
  const planetsUrls = film.planets;

  // Llamar a la función para mostrar los planetas en la vista
  setFilmPlanetsInView(planetsUrls);
  modal.style.display = 'block';
}

// Evento para cerrar el modal
const closeModal = document.getElementById('close-modal');
closeModal.addEventListener('click', () => {
  const modal = document.getElementById('film-modal');
  modal.style.display = 'none';
  
});

// Función para obtener datos de la API de personajes
async function getCharacterFromApi(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
      
    }
    const character = await response.json();
    return character;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para mostrar información de personajes en la vista
async function setFilmCharactersInView(charactersUrl) {
  const charactersList = document.getElementById("characters-list");
  charactersList.innerHTML = "";

  for (const characterUrl of charactersUrl) {
    try {
      const character = await getCharacterFromApi(characterUrl);

      const listItem = document.createElement("li");
      listItem.classList.add("clickable");
      listItem.innerHTML = `
        <i class="fab fa-galactic-senate"></i> ${character.name}
      `;
      listItem.addEventListener("click", () => {
        setCharacterInfoInView(character);
      });

      charactersList.appendChild(listItem);
    } catch (error) {
      console.error(error);
    }
  }
}

// Función para mostrar información detallada de un personaje
async function setCharacterInfoInView(character) {
  document.getElementById("character-name").innerText = character.name;
  document.getElementById("character-height").innerText = character.height;
  document.getElementById("character-mass").innerText = character.mass;
  document.getElementById("character-hair").innerText = character.hair_color;
  document.getElementById("character-skin").innerText = character.skin_color;
  document.getElementById("character-eyes").innerText = character.eye_color;
  document.getElementById("character-birth-year").innerText = character.birth_year;
  document.getElementById("character-gender").innerText = character.gender;

  const characterInfoContainer = document.getElementById("character-info-container");
  characterInfoContainer.classList.add("hidden-animation");
  characterInfoContainer.classList.remove("hidden");
}

// Función para obtener información de planetas desde la API SWAPI
async function getPlanetFromApi(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const planet = await response.json();
    return planet;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para mostrar información de planetas en la vista
async function setFilmPlanetsInView(planetsUrl) {
  const planetsList = document.getElementById("planets-list");
  planetsList.innerHTML = "";

  for (const planetUrl of planetsUrl) {
    try {
      const planet = await getPlanetFromApi(planetUrl);

      const listItem = document.createElement("li");
      listItem.classList.add("clickable");
      listItem.innerHTML = `
        <i class="fas fa-globe"></i> ${planet.name}
      `;
      listItem.addEventListener("click", () => {
        setPlanetInfoInView(planet);
      });

      planetsList.appendChild(listItem);
    } catch (error) {
      console.error(error);
    }
  }
}
// Función para mostrar información detallada de un planeta
function setPlanetInfoInView(planet) {
  document.getElementById("planet-name").innerText = planet.name;
  document.getElementById("planet-rotation-period").innerText = `Rotation Period: ${planet.rotation_period}`;
  document.getElementById("planet-orbital-period").innerText = `Orbital Period: ${planet.orbital_period}`;
  document.getElementById("planet-diameter").innerText = `Diameter: ${planet.diameter}`;
  document.getElementById("planet-climate").innerText = `Climate: ${planet.climate}`;
  document.getElementById("planet-terrain").innerText = `Terrain: ${planet.terrain}`;
  document.getElementById("planet-population").innerText = `Population: ${planet.population}`;

  const planetInfoContainer = document.getElementById("planet-info-container");
  planetInfoContainer.classList.add("hidden-animation");
  planetInfoContainer.classList.remove("hidden");
}






// Llama a la función para mostrar las películas cuando la página se carga
window.addEventListener('load', displayFilms);
