document.addEventListener('DOMContentLoaded', function() {
    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdown = document.querySelector('.dropdown');
    const dropdownItems = document.querySelectorAll('.dropdown-item'); // Sélection des éléments du dropdown


    document.querySelector('.nom_UE').addEventListener('click', function() {
        alert('Vous avez cliqué sur le span!');
    });
    
    // Afficher/cacher le dropdown lorsque le bouton est cliqué
    dropdownButton.addEventListener('click', function() {
        dropdown.classList.toggle('show');
    });

    // Cacher le dropdown si on clique en dehors
    window.addEventListener('click', function(event) {
        if (!event.target.matches('.dropdown-button') && !dropdown.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });

    // Cacher le dropdown lorsqu'on clique sur un élément du dropdown
    dropdownItems.forEach(function(item) {
        item.addEventListener('click', function() {
            dropdown.classList.remove('show');
        });
    });
});
