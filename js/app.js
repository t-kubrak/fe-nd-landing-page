/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sectionNodes = document.querySelectorAll('section');
const navbarList = document.querySelector('#navbar__list');
const scrollButton = document.querySelector('.scroll-top');
let scrollTimeout;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function toggleScrollButton() {
    if (window.pageYOffset < window.innerHeight) {
        scrollButton.classList.add('hidden');
        return;
    }

    scrollButton.classList.remove('hidden');
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(navbarList, sectionNodes) {
    const fragment = document.createDocumentFragment();

    for (sectionNode of sectionNodes) {
        let link = document.createElement('a');
        link.setAttribute('href', `#${sectionNode.getAttribute('id')}`);
        link.textContent = sectionNode.dataset.nav;

        let listItem = document.createElement('li');
        listItem.classList.add('menu__link');
        listItem.appendChild(link);

        fragment.appendChild(listItem);
    }

    navbarList.appendChild(fragment);
}

buildNav(navbarList, sectionNodes);

// Add class 'active' to section when near top of viewport
function activateVisibleSection() {
    // Find distances from the top of the sections to the top of the viewport
    let offsetDifferences = [];

    for (sectionNode of sectionNodes) {
        if (sectionNode.classList.contains('active')) {
            sectionNode.classList.remove('active');
        }

        offsetDifferences.push(Math.abs(sectionNode.offsetTop - window.pageYOffset));
    }

    const min = Math.min(...offsetDifferences);

    // Find a section with a lowest distance and set it as active
    for (sectionNode of sectionNodes) {
        if (min === Math.abs(sectionNode.offsetTop - window.pageYOffset)) {
            setActiveSection(sectionNode);
        }
    }
}

function setActiveSection(sectionNode) {
    sectionNode.classList.add('active');
}


// Scroll to anchor ID using scrollTO event
function scrollToElementId(id) {
    const sectionElement = document.querySelector(id);
    window.scrollTo({
        top: sectionElement.offsetTop,
        behavior: 'smooth'
    });

    setActiveSection(sectionElement);
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click
navbarList.addEventListener('click', (e) => {
    if (e.target.nodeName === 'A') {
        e.preventDefault();
        scrollToElementId(e.target.getAttribute('href'));
    }
});

// Set sections as active
window.addEventListener('scroll', () => {
    activateVisibleSection();
    navbarList.classList.remove('hidden');
    toggleScrollButton();

    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
        navbarList.classList.add('hidden');
    }, 1200);
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

