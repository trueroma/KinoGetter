import Kino from './components/kino.js';

customElements.define('view-kino', Kino);

const init = () => {

    // doc connect
    const
        searchform = document.querySelector('.search-form'),
        movie = document.querySelector('.movies');

    // functions
    const apiSearch = () => {
            const
                searchText = searchform.value,
                server = `https://api.themoviedb.org/3/search/multi?api_key=6e32fa26fb5f401e54d8a84c649d1e8f&language=ru&query=${searchText}`;
            requestApi(server);
        };

    const requestApi = url => {

        const request = new XMLHttpRequest;
        request.open('GET', url);
        request.send();

        request.addEventListener('readystatechange', () => {
            if (request.readyState != 4) return;
            if (request.status != 200) {
                console.log(`error: ${request.status}`);
                return;
            }

            while (movie.firstChild) {
                movie.removeChild(movie.firstChild);
            }

            const output = JSON.parse(request.responseText);

            let content = '';

            output.results.forEach( item => {
                const kino = document.createElement('view-kino');
                kino.setDesc(item.name || item.title, item.overview, item.first_air_date || item.release_date);
                movie.appendChild(kino);
            });
        });
    }

    searchform.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') apiSearch();
    });
}
document.addEventListener('DOMContentLoaded', init);