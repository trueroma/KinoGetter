// import {clear, movies} from '../main.js';

const template =
`
<style>
    ::-webkit-scrollbar { width: 0; }
    :host {
        padding: 0;
        margin: 0;
        font-size: 1vw;
    }
    a {
        color: #fff;
        text-decoration: none;
        background-color: #00f;
        padding: 1rem;
        border-radius: 1.3rem;
    }
    .wrapper {
        width: 80vw;
        // height: 30vw;
        box-sizing: border-box;
        border-width: .5em;
        border-style: solid;
        border-image: linear-gradient(45deg, #ff0, #f0f);
        border-image-slice: 1;
        display: flex;
        margin: 0 0 1vw 0;
        overflow: hidden;
        cursor: pointer;
    }
    .wrapper:hover {
        border-image: linear-gradient(45deg, #f00, #00f);
        border-image-slice: 1;
        border-style: solid;
    }
    .content {
        box-sizing: border-box;
        padding: 1rem 2rem 0;
        height: 30vw;
        overflow-y: scroll;
    }
    .name {
        margin: .2rem 0;
    }
    .release {
        font-weight: 700;
    }
    
    .img {
        width: 20vw;
        height: 100%;
    }
    img {
        width: 20vw;
    }
    .homepage, .imdb {
        margin-top: 2rem;
    }

    @media (max-width: 1500px) {
    :host {
        font-size: 1.6vw;
    }
    // .wrapper {
    //     max-width: 550px;
    //     width: 37vw;
    //     height: 68vw;
    // }
    @media (max-width: 1000px) {
    :host {
        font-size: 3vw;
    }
    .wrapper {
        display: block;
        max-width: 740px;
        width: 78vw;
        height: auto;
        max-height: 300vw;
        overflow-y: scroll;
    }
    .img {
        // position: relative;
        // top: 115vw;
        width: 100%;
        height: auto;
    }
    img {
        height: auto;
        width: 100%;
    }
    .content {
        display: none;
        max-height: 100vw;
        width: 80vw;
        padding: 0;
    }
}
</style>
    <div class="wrapper">
        <div class="img"></div>
        <div class="content">
            <h2 class="name"></h2>
            <p class="overview"></p>
            <p class="release"></p>
            <div class="homepage"></div>
            <div class="imdb"></div>
        </div>
    </div>
`;

export default class Kino extends HTMLElement
{
    constructor() {
        super();

        this.name = "Вы шота не ввели";
        this.overview = "Тут могло быть описание, но вы шота не ввели";
        this.release = "Тут могла быть дата, но вы шота не ввели";
        this.img = "../content/KiT.jpg";
        this.identificator = 0;
        this.type = 'hmmm';
    }

    connectedCallback()
    {
        this.shadow_root = this.attachShadow({ mode: 'open' });
        this.shadow_root.innerHTML = template;

        const
            name = this.shadow_root.querySelector('.name'),
            overview = this.shadow_root.querySelector('.overview'),
            release = this.shadow_root.querySelector('.release'),
            img = this.shadow_root.querySelector('.img'),
            wrapper = this.shadow_root.querySelector('.wrapper'),
            content = this.shadow_root.querySelector('.content'),
            homepage = this.shadow_root.querySelector('.homepage'),
            imdb = this.shadow_root.querySelector('.imdb');
        const show = str => {
            homepage.innerHTML = `<a href="${str.homepage}" target="_blank">Официальная страница</a>`;
            imdb.innerHTML = `<a href="https://www.imdb.com/title/${str.imdb_id}" target="_blank">Страница IMDB</a>`;
            homepage.style.height = imdb.style.height = '3rem';
            console.log(str);
            if (str.status === 'Ended') release.innerHTML = `
                <p>${this.release.replace(/-/g, '.')}  -  ${str.last_air_date.replace(/-/g, '.')}</p>
            `;
            if (this.type === 'tv') release.innerHTML += `
                <p style="font-weight: 400">Количество сезонов: ${str.number_of_seasons}</p>
                <p style="font-weight: 400">Количество эпизодов: ${str.number_of_episodes}</p>
            `;
        };
        const evince = () => {
            wrapper.removeEventListener('click', evince);
            console.log(this.identificator + ' ' + this.type);
            while (this.parentNode.children.length > 1) {
                if (this.parentNode.firstChild !== this) this.parentNode.removeChild(this.parentNode.firstChild);
                if (this.parentNode.lastChild !== this) this.parentNode.removeChild(this.parentNode.lastChild);
            }
            wrapper.style.border = 'none';
            wrapper.style.cursor = 'default';
            wrapper.style.height = 'auto';
            content.style.display = 'block';
            content.style.height = 'auto';
            content.style.paddingTop = '0';
            console.log(url);
            fetch(url)
            .then(response => response.json()) 
            .then(str => show(str))
            .catch(reason => console.log);
            window.scrollTo(0, 0);
        };
        const
            url = `https://api.themoviedb.org/3/${this.type}/${this.identificator}?api_key=6e32fa26fb5f401e54d8a84c649d1e8f&language=ru`;

        if (this.identificator) wrapper.addEventListener('click', evince);
        name.innerHTML = this.name;
        overview.innerHTML = this.overview;
        release.innerHTML = this.release;
        img.innerHTML = `<img src="${this.img}" alt="" />`;
        console.log(this.name, this.overview, this.release);
    }

    setDesc(name, overview, release, img, identificator, type)
    {
        this.name = name;
        this.overview = overview;
        this.release = release;
        this.img = img;
        this.identificator = identificator;
        this.type = type;
    }

}