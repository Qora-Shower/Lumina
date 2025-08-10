document.addEventListener('DOMContentLoaded', () => {
    // Apply fade-in animation to the body
    document.body.classList.add('fade-in');

    // Set up footer navigation and home page buttons
    setupNavigation();
    setupActionButtons();
});

function setupNavigation() {
    const currentPagePath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.footer-nav .nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('data-href');

        // Add active class to the current page's link
        if (linkPath === currentPagePath) {
            link.classList.add('active');
        }

        // Add click event listener for navigation
        link.addEventListener('click', () => {
            // Prevent navigating to the same page
            if (linkPath !== currentPagePath) {
                window.location.href = linkPath;
            }
        });
    });
}

function setupActionButtons() {
    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const href = button.getAttribute('data-href');
            if (href && href !== '#') {
                window.location.href = href;
            } else if (href === '#') {
                alert('This feature is coming soon!');
            }
        });
    });
}
