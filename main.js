import Kino from './components/kino.js';

customElements.define('view-kino', Kino);

const init = () => {

    // doc connect
    const
        searchform = document.querySelector('.search-form'),
        movie = document.querySelector('.movies'),
        refresh = document.querySelector('.refresh');

    // functions
    const show = str => {
        const urlPoster = `https://image.tmdb.org/t/p/w500/`;
        console.log(str.results);
        if (!str.results.length) {
            const kino = document.createElement('view-kino');
            const
                poster = '../content/KiT.jpg',
                name = 'Ничего не нашлось, но можете заценить котика',
                overview = 'Ну серьёзно, какой крутой кошак',
                date = 'Такой милаха';
            kino.setDesc(name, overview, date, poster);
            movie.appendChild(kino);
        }
        str.results.forEach( item => {
            if (item.media_type === 'person') return; // erase all humans
            const kino = document.createElement('view-kino');
            const poster = item.poster_path ? urlPoster + item.poster_path : '../content/KiT.jpg';
            const type = item.name ? 'tv' : 'movie';
            kino.setDesc(
                item.name || item.title,
                item.overview,
                item.first_air_date || item.release_date,
                poster,
                item.id,
                type
                );
            movie.appendChild(kino);
        });
    };
    const apiSearch = searchText => {
        const url = `https://api.themoviedb.org/3/search/multi?api_key=6e32fa26fb5f401e54d8a84c649d1e8f&language=ru&query=${searchText}`;

        while (movie.firstChild) {
            movie.removeChild(movie.firstChild);
        }
        const loading = document.createElement('div');
        loading.className = 'loading';
        movie.appendChild(loading);

        fetch(url)
            .then(response => response.json())
            .then(str => {
                while (movie.firstChild) { 
                    movie.removeChild(movie.firstChild);
                }
                show(str);
            })
            .catch(reason => console.log);
    };
    const showPopularOfWeek = () => {
        const url = 'https://api.themoviedb.org/3/trending/all/week?api_key=6e32fa26fb5f401e54d8a84c649d1e8f&language=ru';
        while (movie.firstChild) movie.removeChild(movie.firstChild);
        const popular = document.createElement('h2');
        popular.innerHTML = 'Популярное за неделю';
        movie.appendChild(popular);

        fetch(url)
            .then(response => response.json())
            .then(str => show(str))
            .catch(reason => console.log);
    };

    searchform.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {   
            if (!searchform.value.trim()) {
                while (movie.firstChild) {
                    movie.removeChild(movie.firstChild);
                }
                const kino = document.createElement('view-kino');
                movie.appendChild(kino);
            } else {
                apiSearch(searchform.value.trim());
            }
        }
    });
    refresh.addEventListener('click', showPopularOfWeek);
    showPopularOfWeek();
}
document.addEventListener('DOMContentLoaded', init);
// export const clear = () => {
//     while (movie.firstChild) {
//         movie.removeChild(movie.firstChild);
//     }
// };
// export const movies = docunemt.querySelector('.movies');