// This file serves as the entry point of the application. It imports the components and initializes them on the page, setting up event listeners and rendering the components.

import { createNavbar } from './components/navbar.js';
import { createCarousel } from './components/carousel.js';
import { createModal } from './components/modal.js';

document.addEventListener('DOMContentLoaded', () => {
    const navbar = createNavbar();
    const carousel = createCarousel();
    const modal = createModal();

    document.body.appendChild(navbar);
    document.body.appendChild(carousel);
    document.body.appendChild(modal);
});