const template =
`
<style>
    ::-webkit-scrollbar { width: 0; }
    :host {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-size: 1vw;
    }
    .wrapper {
        width: 23vw;
        max-width: 400px;
        height: 40vw;
        padding: 0 1rem 0;
        border-width: .5em;
        border-style: solid;
        border-image: linear-gradient(45deg, #ff0, #f0f);
        border-image-slice: 1;
        overflow-y: auto;
    }
    .name {
        margin: .2rem 0;
    }
    .release {
        font-weight: 700;
    }

    @media (max-width: 1500px) {
    :host {
        font-size: 1.6vw;
    }
    .wrapper {
        max-width: 550px;
        width: 37vw;
        height: 68vw;
    }
    @media (max-width: 1000px) {
    :host {
        font-size: 3vw;
    }
    .wrapper {
        max-width: 740px;
        width: 74vw;
        height: 135vw;
    }
}
</style>
    <div class="wrapper">
        <h2 class="name"></h2>
        <p class="overview"></p>
        <p class="release"></p>
    </div>
`;

export default class Kino extends HTMLElement
{
    connectedCallback()
    {
        this.shadow_root = this.attachShadow({ mode: 'open' });
        this.shadow_root.innerHTML = template;

        const
            name = this.shadow_root.querySelector('.name'),
            overview = this.shadow_root.querySelector('.overview'),
            release = this.shadow_root.querySelector('.release');

        name.innerHTML = this.name;
        overview.innerHTML = this.overview;
        release.innerHTML = this.release;
        console.log(this.name, this.overview, this.release);
    }

    setDesc(name, overview, release)
    {
        this.name = name;
        this.overview = overview;
        this.release = release;
    }
}