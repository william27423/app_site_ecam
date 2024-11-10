

document.addEventListener('DOMContentLoaded', function() {
    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdown = document.querySelector('.dropdown');
    const dropdownItems = document.querySelectorAll('.dropdown-item'); // Sélection des éléments du dropdown
    const aditional_buttons = document.querySelectorAll(".aditional_button")

    document.querySelector('.nom_UE').addEventListener('click', function() {
        alert('Vous avez cliqué sur le span!');
    });
    

    aditional_buttons.forEach(aditional_button =>{
        aditional_button.addEventListener('click', ()=>{
            let matierediv = aditional_button.parentElement.parentElement;
            console.log(matierediv)
            console.log('ca marche')
            app.creerNoteCoef(matierediv.id,new TypeEvaluation('new_note',1,1),1)
        });
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
