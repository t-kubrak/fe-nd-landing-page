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

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(navbarList, sectionNodes) {
    const fragment = document.createDocumentFragment();

    for (sectionNode of sectionNodes) {
        let listItem = document.createElement('li');
        listItem.textContent = sectionNode.dataset.nav;
        listItem.classList.add('menu__link');
        fragment.appendChild(listItem);
    }

    navbarList.appendChild(fragment);
}

buildNav(navbarList, sectionNodes);

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


