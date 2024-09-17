// calculMoyenne.js

export function calculerMoyenne() {
    let nombre1 = parseFloat(document.getElementById("nombre1").value);
    let coef1 = parseInt(document.getElementById("coef1").value);
    let nombre2 = parseFloat(document.getElementById("nombre2").value);
    let coef2 = parseInt(document.getElementById("coef2").value);
    let nombre3 = parseFloat(document.getElementById("nombre3").value);
    let coef3 = parseInt(document.getElementById("coef3").value);
    let nombre4 = parseFloat(document.getElementById("nombre4").value);
    let coef4 = parseInt(document.getElementById("coef4").value);

    if (isNaN(nombre1) || isNaN(nombre2) || nombre1 < 0 || nombre1 > 20 || nombre2 < 0 || nombre2 > 20) {
        alert("Veuillez entrer deux nombres valides entre 0 et 20.");
        return;
    }

    let sommeNotes = nombre1 * coef1 + nombre2 * coef2;
    let sommeCoefficients = coef1 + coef2;
    let moyenne = sommeNotes / sommeCoefficients;

    document.getElementById("resultat").textContent = "La moyenne est : " + moyenne.toFixed(2);
}
export function setNotes (liste){
    // Pour chaque matière dans la liste
    liste.forEach((note, index) => {
        creerNoteCoef(index +3, index +3)
        
    });
}

function creerNoteCoef(idNombre, idCoef) {
    // Création du conteneur <div>
    const divNoteCoef = document.createElement('div');
    divNoteCoef.className = 'note_coef';

    // Création du champ de saisie pour le nombre
    const inputNombre = document.createElement('input');
    inputNombre.type = 'number';
    inputNombre.id = `nombre${idNombre}`;
    inputNombre.placeholder = 'Entrez le nombre';
    inputNombre.min = '0';
    inputNombre.max = '20';
    inputNombre.step = '0.5';

    // Création du champ de saisie pour le coefficient
    const inputCoef = document.createElement('input');
    inputCoef.type = 'number';
    inputCoef.id = `coef${idCoef}`;
    inputCoef.className = 'coef';
    inputCoef.placeholder = 'coef';
    inputCoef.min = '0';
    inputCoef.max = '10';
    inputCoef.value = '1';

    // Ajouter les champs de saisie au conteneur
    divNoteCoef.appendChild(inputNombre);
    divNoteCoef.appendChild(inputCoef);

    // Ajouter le conteneur à la page (ici on l'ajoute à un conteneur avec l'id 'container')
    const container = document.getElementById('container');
    container.appendChild(divNoteCoef);
}