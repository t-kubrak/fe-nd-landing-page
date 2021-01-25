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
const sectionNodes = document.getElementsByTagName('section');
const navbarList = document.querySelector('#navbar__list');
const scrollButton = document.querySelector('.scroll-top');
const mainElement = document.querySelector('main');
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

function buildSectionWithNumber(number) {
    const fragment = document.createDocumentFragment();

    let section = document.createElement('section');
    section.setAttribute('id', `section${number}`);
    section.dataset.nav = `Section ${number}`;

    let landingContainer = document.createElement('div');
    landingContainer.classList.add('landing__container');

    let h2 = document.createElement('h2');
    h2.textContent = `Section ${number}`;

    let p1 = document.createElement('p');
    p1.textContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consectetur consequuntur enim eos est et eum eveniet inventore laboriosam mollitia odio odit, perferendis quaerat quidem quos rem sit tempora totam?';

    let p2 = document.createElement('p');
    p2.textContent = 'Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.';

    fragment.appendChild(section);
    section.appendChild(landingContainer);
    landingContainer.appendChild(h2);
    landingContainer.appendChild(p1);
    landingContainer.appendChild(p2);
    mainElement.appendChild(fragment);
}

buildSectionWithNumber(4);

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

let setActiveSection = (sectionNode) => sectionNode.classList.add('active');

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

