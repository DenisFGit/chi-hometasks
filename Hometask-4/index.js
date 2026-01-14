console.log('Hometask-4');

const wrapper = document.querySelector('.wrapper');
const charWrapper = document.querySelector('.wrapper__char');
const current_page = document.querySelector('.current-page');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal__content');
const btnClose = document.querySelector('.modal__close');
const overlay = document.querySelector('.overlay');
const loading = document.querySelector('.loading');

let isLoading = false;
let pageInfo = {};

const url = 'https://rickandmortyapi.com/api/character';

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Fetch data error');
    }
    const data = await response.json();
    return data;
}

const renderCharacters = async (url) => {

    loading.classList.add('showLoading')

    try {
        const data = await fetchData(`${url}`);
        const { info, results } = data;

        loading.classList.remove('showLoading')
        pageInfo = info;

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

        current_page.textContent = `${info.prev
            ? +info.prev.split('=')[1] + 1
            : +info.next.split('=')[1] - 1}`;

    } catch (error) {
        wrapper.innerHTML = 'Something went wrong';
        console.log('Error:' + error);
    }
}

const renderCharacter = async (id) => {
    modalContent.innerHTML = 'Loading...';

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

    const action = event.target.dataset.event;

    if (action == 'close' || event.target == overlay) {
        modal.classList.remove('show');
        overlay.classList.remove('show');
    }

});

charWrapper.addEventListener('click', (event) => {

    const character = event.target.closest('.character');
    if (!character) return;

    event.stopPropagation();

    renderCharacter(character.dataset.card_id);
    modal.classList.add('show');
    overlay.classList.add('show');

})

const options = { root: null, threshold: 0.1 };

const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    if (isLoading) return;
    if (!pageInfo || !pageInfo.next) return;

    isLoading = true;

    renderCharacters(pageInfo.next)
        .finally(() => {
            isLoading = false;
        });
}, options);

observer.observe(loading);











