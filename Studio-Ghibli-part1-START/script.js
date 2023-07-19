const mainElement = document.querySelector("main");
let myFilms = [];

async function getFilms(){
    const filmPromise = await fetch("https://ghibliapi.vercel.app/films");
    const films = await filmPromise.json();
    myFilms = films;

    resort(myFilms);
    document.getElementById('sortorder').removeAttribute('disabled');
}
getFilms();

function resort(myFilms) {
    setSort(myFilms);

    myFilms.forEach(filmData => {
        createCard(filmData);
    });
}

document.getElementById('sortorder').addEventListener('change', function () {
    mainElement.innerHTML = '';
    resort(myFilms);
});

function setSort(array) {
    const sortOrder = document.getElementById('sortorder').value;
    switch (sortOrder) {
        case 'title': array.sort((a, b) => (a.title > b.title) ? 1 : -1); break;
        case 'release_date': array.sort((a, b) => (a.release_date > b.release_date) ? 1 : -1); break;
        case 'rt_score': array.sort((a, b) => (parseInt(a.rt_score) > parseInt(b.rt_score)) ? -1 : 1); break;
    }
}

function createCard(data) {
    const card = document.createElement('article');

    const movieTitle = document.createElement('h2');
    const movieTitleTxt = document.createTextNode(data.title);
    movieTitle.appendChild(movieTitleTxt);

    const director = document.createElement('p');
    const directorTxt = document.createTextNode(`Director: ${data.director}`);
    director.appendChild(directorTxt);

    const year = document.createElement('p');
    const yearTxt = document.createTextNode(`Released: ${data.release_date}`);
    year.appendChild(yearTxt);

    const description = document.createElement('p');
    const descriptionTxt = document.createTextNode(data.description);
    description.appendChild(descriptionTxt);

    const rating = document.createElement('p');
    const ratingTxt = document.createTextNode(`Rotten Tomato Score: ${data.rt_score}`);
    rating.appendChild(ratingTxt);

    card.appendChild(movieTitle);
    card.appendChild(director);
    card.appendChild(year);
    card.appendChild(description);
    card.appendChild(rating);
    
    mainElement.appendChild(card);
}