const template =
`
<style>
    ::-webkit-scrollbar { width: 0; }
    :host {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-size: 1vw;
        transition: all .3s;
    }
    .wrapper {
        width: 80vw;
        // max-width: 400px;
        height: 20vw;
        // padding: 0 1rem 0;
        border-width: .5em;
        border-style: solid;
        border-image: linear-gradient(45deg, #ff0, #f0f);
        border-image-slice: 1;
        // overflow-y: auto;
        display: flex;
        margin: 0 0 1vw 0;
    }
    .content {
        margin: 1rem;
        overflow-y: auto;
    }
    .name {
        margin: .2rem 0;
    }
    .release {
        font-weight: 700;
    }
    .img {
        height: 20vw;
    }

    img {
        height: 100%;
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
        width: 74vw;
        height: 135vw;
        overflow-y: auto;
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
        // position: relative;
        // top: -20vw;
    }
}
</style>
    <div class="wrapper">
        <div class="img"></div>
        <div class="content">
            <h2 class="name"></h2>
            <p class="overview"></p>
            <p class="release"></p>
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
    }

    connectedCallback()
    {
        this.shadow_root = this.attachShadow({ mode: 'open' });
        this.shadow_root.innerHTML = template;

        const
            name = this.shadow_root.querySelector('.name'),
            overview = this.shadow_root.querySelector('.overview'),
            release = this.shadow_root.querySelector('.release'),
            img = this.shadow_root.querySelector('.img');

            if (this.img.includes('null')) this.img = '../content/KiT.jpg';

        name.innerHTML = this.name;
        overview.innerHTML = this.overview;
        release.innerHTML = this.release;
        img.innerHTML = `<img src="${this.img}" alt="" />`;
        console.log(this.name, this.overview, this.release);
    }

    setDesc(name, overview, release, img)
    {
        this.name = name;
        this.overview = overview;
        this.release = release;
        this.img = img;
    }
}