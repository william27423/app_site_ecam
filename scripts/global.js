// dropdown.js
document.addEventListener('DOMContentLoaded', function() {
    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdown = document.querySelector('.dropdown');

    dropdownButton.addEventListener('click', function() {
        dropdown.classList.toggle('show');
    });

    window.addEventListener('click', function(event) {
        if (!event.target.matches('.dropdown-button') && !dropdown.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });
});
