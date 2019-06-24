import Kino from './components/kino.js';

customElements.define('view-kino', Kino);

const init = () => {

    // doc connect
    const
        searchform = document.querySelector('.search-form'),
        movie = document.querySelector('.movies');

    // functions
    const show = str => {
        const urlPoster = `https://image.tmdb.org/t/p/w500/`;
        while (movie.firstChild) {
            movie.removeChild(movie.firstChild);
        }
        console.log(str.results);
        str.results.forEach( item => {
            const kino = document.createElement('view-kino');
            kino.setDesc(
                item.name || item.title,
                item.overview,
                item.first_air_date || item.release_date,
                urlPoster + item.poster_path,
                );
            movie.appendChild(kino);
        });
    };
    const apiSearch = searchText => {
        const url = `https://api.themoviedb.org/3/search/multi?api_key=6e32fa26fb5f401e54d8a84c649d1e8f&language=ru&query=${searchText}`;

        fetch(url)
            .then(response => response.json())
            .then(str => show(str))
            .catch(reason => {
                console.log(reason);
            });
    };

    searchform.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {   
            let searchText = searchform.value;
            searchText = searchText.trim();
            if (!searchText) {
                while (movie.firstChild) {
                    movie.removeChild(movie.firstChild);
                }
                const kino = document.createElement('view-kino');
                movie.appendChild(kino);
            } else {
                apiSearch(searchText);
            }
        }
    });
}
document.addEventListener('DOMContentLoaded', init);