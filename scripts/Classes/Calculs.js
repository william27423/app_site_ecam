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
        liste.forEach((note_index, index) => {
            this.creerNoteCoef(index, note_index.coef)
            
        });
    }

    setMatieres(liste_matiere){    
        const container = document.getElementById('container');
        container.innerHTML = '';

        const UE = document.createElement('div');
        UE.className = 'UE';
        UE.id = 'UE'; // Ajouter l'ID ici

        const nom_UE = document.createElement('span');
        nom_UE.className = 'nom_UE';
        nom_UE.textContent = 'ouiiii';

        container.appendChild(UE);

        liste_matiere.forEach((matiere_index, index) => {
            this.setTypes(matiere_index, index);
        });
    }

    setTypes(matiere_0, id) {
        const UE = document.getElementById('UE');

        const matiere = document.createElement('div');
        matiere.className = 'matiere';
        matiere.id = `matiere${id}`; // Ajouter l'ID ici

        const nom_matiere = document.createElement('span');
        nom_matiere.className = 'nom_matiere';
        nom_matiere.textContent = matiere_0.nom;

        matiere.appendChild(nom_matiere);
        UE.appendChild(matiere);
        let liste_types_evaluation = matiere_0.liste_types_evaluation
        console.log(liste_types_evaluation);

        liste_types_evaluation.forEach((type_evaluation_index, index) => {
            this.creerNoteCoef(index, matiere.id ,type_evaluation_index);
        });
    }
    
    creerNoteCoef(id, matiere_id, type_evaluation) {
        for (let i = 0; i < type_evaluation.nombre_de_notes ; i++) {
            const divNoteCoef = document.createElement('div');
            divNoteCoef.className = 'note_coef';

            const inputNombre = document.createElement('input');
            inputNombre.type = 'number';
            inputNombre.id = `nombre${id}`;
            inputNombre.className = 'note';
            inputNombre.placeholder = 'Entrez le nombre';
            inputNombre.min = 0;
            inputNombre.max = 20;
            inputNombre.step = 0.5;

            const inputCoef = document.createElement('input');
            inputCoef.type = 'number';
            inputCoef.id = `coef${id}`;
            inputCoef.className = 'coef';
            inputCoef.placeholder = 'coef';
            inputCoef.min = 0;  
            inputCoef.max = 10;
            inputCoef.value = type_evaluation.coef;

            divNoteCoef.appendChild(inputNombre);
            divNoteCoef.appendChild(inputCoef);

            const matiere = document.getElementById(matiere_id);
            matiere.appendChild(divNoteCoef);
        }
    } 
}