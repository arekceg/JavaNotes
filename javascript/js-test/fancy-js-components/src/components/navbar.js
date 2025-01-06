function createNavbar() {
    const navbar = document.createElement('nav');
    navbar.className = 'navbar';

    const brand = document.createElement('a');
    brand.className = 'navbar-brand';
    brand.href = '#';
    brand.textContent = 'Fancy Navbar';

    const toggleButton = document.createElement('button');
    toggleButton.className = 'navbar-toggler';
    toggleButton.type = 'button';
    toggleButton.setAttribute('data-bs-toggle', 'collapse');
    toggleButton.setAttribute('data-bs-target', '#navbarContent');
    toggleButton.setAttribute('aria-controls', 'navbarContent');
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.setAttribute('aria-label', 'Toggle navigation');
    toggleButton.innerHTML = '<span class="navbar-toggler-icon"></span>';

    const collapseDiv = document.createElement('div');
    collapseDiv.className = 'collapse navbar-collapse';
    collapseDiv.id = 'navbarContent';

    const navList = document.createElement('ul');
    navList.className = 'navbar-nav';

    const navItem1 = document.createElement('li');
    navItem1.className = 'nav-item';
    const navLink1 = document.createElement('a');
    navLink1.className = 'nav-link';
    navLink1.href = '#';
    navLink1.textContent = 'Home';
    navItem1.appendChild(navLink1);

    const navItem2 = document.createElement('li');
    navItem2.className = 'nav-item';
    const navLink2 = document.createElement('a');
    navLink2.className = 'nav-link';
    navLink2.href = '#';
    navLink2.textContent = 'About';
    navItem2.appendChild(navLink2);

    navList.appendChild(navItem1);
    navList.appendChild(navItem2);
    collapseDiv.appendChild(navList);
    navbar.appendChild(brand);
    navbar.appendChild(toggleButton);
    navbar.appendChild(collapseDiv);

    document.body.appendChild(navbar);

    toggleButton.addEventListener('click', () => {
        collapseDiv.classList.toggle('show');
    });
}

export { createNavbar };