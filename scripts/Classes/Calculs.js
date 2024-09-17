// calculMoyenne.js
export class Calculs {
    constructor(){

    }
    calculerMoyenne() {
        let notes = document.querySelectorAll(".note");
        let coefs = document.querySelectorAll(".coef");
    
        let sommeNotes = 0;
        let sommeCoefficients = 0;
        
        for (let i = 0; i < notes.length; i++) {
            let note = parseFloat(notes[i].value);
            let coef = parseInt(coefs[i].value);
            
            if (note < 0 || note > 20){
                alert("Veuillez entrer des valeurs valides pour toutes les notes (entre 0 et 20) et coefficients.");
                return;
            }
            // Vérifie que les valeurs sont valides
            else if (isNaN(note) || isNaN(coef)) {
                
            }
            else {
            sommeNotes += note * coef;
            sommeCoefficients += coef;
            }
        }
        
        // Calcul de la moyenne pondérée
        let moyenne = sommeNotes / sommeCoefficients;
        
        // Affiche le résultat
        document.getElementById("resultat").textContent = "Moyenne: " + moyenne.toFixed(2);
    }
    setNotes (liste){
        // Pour chaque matière dans la liste
        liste.forEach((note, index) => {
            this.creerNoteCoef(index +3, index +3)
            
        });
    }

    creerNoteCoef(idNombre, idCoef) {
        // Création du conteneur <div>
        const divNoteCoef = document.createElement('div');
        divNoteCoef.className = 'note_coef';

        // Création du champ de saisie pour le nombre
        const inputNombre = document.createElement('input');
        inputNombre.type = 'number';
        inputNombre.id = `nombre${idNombre}`;
        inputNombre.className = 'note';
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
        
}