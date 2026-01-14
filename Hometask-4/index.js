// const { createElement } = require("react");

console.log('Hometask-4');

const wrapper = document.querySelector('.wrapper');
const charWrapper = document.querySelector('.wrapper__char');
const current_page = document.querySelector('.current-page');
const previous = document.querySelector('.btn__prev');
const next = document.querySelector('.btn__next');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal__content');
const btnClose = document.querySelector('.modal__close');
const overlay = document.querySelector('.overlay');
const loading = document.querySelector('.loading');
// console.log(loading);

let isLoading = false;
let pageInfo = {};
let charList = [];

const url = 'https://rickandmortyapi.com/api/character';

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Fetch error');
    }
    const data = await response.json();
    console.log(data);
    return data;
}

const renderCharacters = async (url) => {

    loading.classList.add('showLoading')

    try {
        // await new Promise(r => setTimeout(r, 1000)); // 1 second delay
        const data = await fetchData(`${url}`);
        const { info, results } = data;
        loading.classList.remove('showLoading')

        pageInfo = info;
        charList.push(...results);
        console.log(charList);

        const characters = results.map((char) => {
            return `<div class='character' data-card_id=${char.id} data-event='click_card'>
                <img class='img' src='${char.image}'/>
                <div class="character__desc">
                <p><span class=" character__field">Name</span>: ${char.name}</p>
                <p><span class="character__field">Status</span>: ${char.status}</p>
                </div>
            </div>`
        }).join("");

        charWrapper.insertAdjacentHTML('beforeend', characters);

        info.prev ? previous.disabled = false : previous.disabled = true;
        info.next ? next.disabled = false : next.disabled = true;

        current_page.textContent = `${info.prev
            ? +info.prev.split('=')[1] + 1
            : +info.next.split('=')[1] - 1}`;

    } catch (error) {
        wrapper.innerHTML = 'Something went wrong';
        console.log('Error:' + error);
    }
}

const renderCharacter = async (id) => {

    try {
        const data = await fetchData(`${url}/${id}`);
        const { image, name, status } = data;

        modalContent.innerHTML = `
    <img class='modal__img' src='${image}'/>
    <div class="modal__desc">
    <p><span class=" modal__field">Name</span>: ${name}</p>
    <p><span class="modal__field">Status</span>: ${status}</p>
    </div>`
    } catch (error) {
        modalContent.innerHTML = 'Failed to load character';
        console.log('Error: ' + error);
    }
}

renderCharacters(url);

document.querySelector('body').addEventListener('click', (event) => {

    console.log(event.target);
    const action = event.target.dataset.event;

    if (action == 'pagination') {
        renderCharacters(pageInfo[event.target.dataset.page])
    }
    if (action == 'close' || event.target == overlay) {
        modal.classList.remove('show');
        overlay.classList.remove('show');
    }

});

charWrapper.addEventListener('click', (event) => {

    const character = e.target.closest('.character');
    if (!character) return;

    event.stopPropagation(); // подія не підіймається

    renderCharacter(character.dataset.card_id);
    modal.classList.add('show');
    overlay.classList.add('show');

})

const options = { root: null, threshold: 0.5 };

const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    if (isLoading) return;
    if (!pageInfo.next) return;

    isLoading = true;

    renderCharacters(pageInfo.next)
        .finally(() => {
            isLoading = false;
        });
}, options);

observer.observe(loading);











