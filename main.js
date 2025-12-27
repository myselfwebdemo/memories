const d = document;

function windowScroll(enableScroll) {
    document.body.style.overflow = enableScroll ? 'visible' : 'hidden';
}

const percent = document.querySelector('.loader');
const openingText = d.querySelector('.opening span');
let p = 0;

const loader = setInterval(() => {
    p += Math.random() * 4;

    if (p >= 100) {
        p = 100;
        clearInterval(loader);
        setTimeout(() => {
            d.body.style.overflow = 'visible';
            d.querySelector('.loader').style.display = 'none';
            
            openingText.addEventListener('animationend', () => {
                d.querySelector('.opening').style.display = 'none';
            })
            openingText.style.animation = 'appear 4s ease-in-out';
            openingText.style.animationFillMode = 'both';
        }, 300);
    }

    percent.textContent = `${Math.floor(p)}%`;
}, 60);

const aboutBtn = d.querySelector('.about');

aboutBtn.addEventListener('click', () => {
    d.querySelector('header div').style.display = d.querySelector('header div').style.display === 'block' ? 'none' : 'block';
    d.querySelector('header button').innerHTML = d.querySelector('header div').style.display === 'block' ? `<img src="assets/cross.png"></img>` : 'About';
})

const view = d.querySelector('.fs.view');
const aside = d.querySelector('aside');
const goFs = d.querySelector('.fullscreen-prev');
const memories = d.querySelector('.memories');
const readAreaSwitch = d.querySelector('.co-memory-read-area');
const memoriesWrapper = d.querySelector('.memories-inner-wrapper');

const lazyImgs = document.querySelectorAll('img.mem');
const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const img = entry.target;
        
        if (entry.isIntersecting) {
            img.src = img.dataset.src;
            img.onload = () => img.style.opacity = '.5';
            img.onmouseover = () => img.style.opacity = '1';
            img.onmouseout = () => img.style.opacity = '.5';
        } else {
            img.style.opacity = '0';
        };
    });
}, { threshold: 1 });

lazyImgs.forEach(img => io.observe(img));

readAreaSwitch.addEventListener('click', () => {
    const isOpen = readAreaSwitch.classList.contains('mra-opened');

    if (isOpen) {
        readAreaSwitch.classList.remove('mra-opened');
        readAreaSwitch.classList.add('mra-closed');
        aside.style.transform = 'translatex(-30vw)';
        goFs.style.display = 'none';
    } else {
        readAreaSwitch.classList.remove('mra-closed');
        readAreaSwitch.classList.add('mra-opened');
        aside.style.transform = 'none';
        goFs.style.display = 'block';
    }
});
goFs.addEventListener('click', () => {
    view.style.display = 'flex';
    windowScroll(false);
})

memories.addEventListener('click', (e) => {
    const tar = e.target;
    const parent = tar.closest('.memory-wrap');
    if (!parent) return;

    const asideContent = aside.children[0];
    readAreaSwitch.classList.remove('mra-closed');
    readAreaSwitch.classList.add('mra-opened');

    asideContent.children[0].src = tar.src;
    view.children[0].src = tar.src
    asideContent.children[1].textContent = tar.dataset.title;
    asideContent.children[2].textContent = tar.dataset.info;
    asideContent.children[3].textContent = 'Where: ' + tar.dataset.loc;
    aside.children[1].textContent = tar.dataset.date;
    
    aside.style.transform = 'translate(0)';
    goFs.style.display = 'block';
});

const angle = 19.3 * Math.PI / 180;
const baseX = window.innerWidth * 0.35;
const baseY = window.innerHeight * 0.40;
const speed = 0.2;

window.addEventListener('DOMContentLoaded', () => {
    let c = 1;
    memoriesWrapper.childNodes.forEach(entry => {
        if (entry instanceof HTMLElement) {
            entry.style.setProperty('--n',`${c}`);
            c++
        }
    })
})

memories.style.paddingBottom = `${25 * memoriesWrapper.children.length}vh`;

const actionHelp = d.querySelector('.action-help');

window.addEventListener('scroll', () => {
    const s = window.scrollY * speed;

    const x = Math.cos(angle) * s;
    const y = Math.sin(angle) * s;

    memoriesWrapper.style.transform = `
        translate(
            ${baseX - x}px,
            ${baseY - y}px
        )
    `;
});