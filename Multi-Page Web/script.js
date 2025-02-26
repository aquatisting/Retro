document.addEventListener('DOMContentLoaded', function() {
    const pageContent = document.querySelector('.page-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const homeLink = document.querySelector('.home-link'); // Home link
    const aboutLink = document.querySelector('.about-link'); // About Me link
    const imageWrapper = document.querySelector('.image-wrapper'); //For index.html
    const cameraImage = document.querySelector('.camera-image'); //For index.html
    const leftArrow = document.querySelector('.left-arrow'); //For index.html
    const rightArrow = document.querySelector('.right-arrow'); //For index.html
    const images = [ //For index.html
        './images/camera.png', // Original image
        './images/camera1.jpg', // Image 2
        './images/camera2.jpg',  // Image 3
        // Additional images can be added here
    ];
    let currentImageIndex = 0;

    // --- Page Transition Logic ---
    // Fade in on page load.
    if (pageContent) {
        pageContent.classList.add('fade-in');
    }

    // Navigation link click handler. Transition to the next page with fade-out.
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link navigation

            const href = this.getAttribute('href');
            // Add fade-out effect
            if (pageContent) {
                pageContent.classList.add('fade-out');
            }

            // Wait for fade-out to complete, then navigate.
            setTimeout(() => {
                window.location.href = href;
            }, 500); // Match the fade-out duration.
        });
    });

    // --- Active Link Logic ---
    function setActiveLink() {
        const currentPath = window.location.pathname;

        navLinks.forEach(link => {
            let href = link.getAttribute('href');
            if (href.startsWith('/')) {
                href = '.' + href; // Normalize relative paths
            }

            const linkPath = new URL(href, window.location.origin).pathname;

            if (currentPath.endsWith(linkPath) || currentPath === linkPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setActiveLink(); // Initialize active links on page load.

    // --- Image Slideshow Logic ---
    function changeImage(direction) {
        currentImageIndex += direction;
        if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        } else if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        }

        // Set a default image if the current image is missing
        cameraImage.onerror = function() {
            this.src = 'https://via.placeholder.com/600x400'; // Default placeholder
            this.onerror = null; // Prevent infinite fallback
        };

        cameraImage.src = images[currentImageIndex];
    }

    // Event listener for left and right arrows to navigate images
    if (leftArrow) {
        leftArrow.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation(); // Prevent click from bubbling
            changeImage(-1); // Go to the previous image
        });
    }

    if (rightArrow) {
        rightArrow.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            changeImage(1); // Go to the next image
        });
    }

    // Image click event to cycle images
    if (imageWrapper) {
        imageWrapper.addEventListener('click', function() {
            changeImage(1); // Cycle to next image
        });
    }
});
