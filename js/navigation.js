const links = document.querySelectorAll('.nav a');

links.forEach(link => {
    // Vytvoříme URL z href odkazu a porovnáme pouze cestu
    const linkPath = new URL(link.href).pathname.replace(/\/$/, '');
    const currentPath = window.location.pathname.replace(/\/$/, '');

    if (linkPath === currentPath) {
      link.classList.add('active');
    }
});