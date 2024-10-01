document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.toggle-button');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const matiereDiv = toggle.parentNode.querySelector('.matiere');
            if (matiereDiv.style.display === 'none' || matiereDiv.style.display === '') {
                matiereDiv.style.display = 'block';
                toggle.classList.add('rotated');  // Ajoute une classe pour faire pivoter la flèche
            } else {
                matiereDiv.style.display = 'none';
                toggle.classList.remove('rotated');  // Supprime la classe pour remettre la flèche à sa position initiale
            }
        });
    });
});
