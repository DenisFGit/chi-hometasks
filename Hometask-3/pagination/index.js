console.log('Hometask-3');
console.log('Pagination');

const wrapper = document.querySelector('.wrapper');
const current_page = document.querySelector('.current-page');
const previous = document.querySelector('.btn__prev');
const next = document.querySelector('.btn__next');

let pageInfo = {};

const url = 'https://rickandmortyapi.com/api/character';

async function fetchCharacters(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}

const renderCharacters = async (url) => {
    wrapper.innerHTML = '<div class="loading">Loading...</div>'
    try {
        const data = await fetchCharacters(`${url}`);
        const { info, results } = data;
        pageInfo = info;
        console.log(pageInfo);

        wrapper.innerHTML = results.map((char) => {
            return `<div class='character'>
                <img class='img' src='${char.image}'/>
                <div class="character__desc">
                <p><span class=" character__field">Name</span>: ${char.name}</p>
                <p><span class="character__field">Status</span>: ${char.status}</p>
                </div>
            </div>`
        }).join("");

        info.prev ? previous.disabled = false : previous.disabled = true;
        info.next ? next.disabled = false : next.disabled = true;

        current_page.textContent = `${info.prev
            ? +info.prev.split('=')[1] + 1
            : +info.next.split('=')[1] - 1}`;

    } catch (error) {
        wrapper.innerHTML = 'Something went wrong';
    }
}

renderCharacters(url);

next.addEventListener('click', () => {
    if (pageInfo.next) {
        renderCharacters(pageInfo.next);
    }
});

previous.addEventListener('click', () => {
    if (pageInfo.prev) {
        renderCharacters(pageInfo.prev);
    }
});




