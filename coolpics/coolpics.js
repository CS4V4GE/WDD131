const menuButton = document.getElementById('menu-button');
const navLinks = document.getElementById('nav-links');

menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('hide');
});

function handleResize() {
    if (window.innerWidth > 1000) {
        navLinks.classList.remove('hide');
    } else {
        navLinks.classList.add('hide');
    }
}

window.addEventListener('resize', handleResize);
handleResize();

const gallery = document.querySelector('.gallery');
const modal = document.createElement('dialog');
modal.classList.add('modal');
document.body.appendChild(modal);

gallery.addEventListener('click', (event) => {
    const img = event.target.closest('img');
    if (!img) return;

    const fullSrc = img.src.split('-')[0] + '-full.jpeg';
    const altText = img.alt;

    modal.innerHTML = `
        <img src="${fullSrc}" alt="${altText}">
        <button class="close-viewer">X</button>
    `;

    modal.showModal();

    modal.querySelector('.close-viewer').addEventListener('click', () => {
        modal.close();
    });
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
});
