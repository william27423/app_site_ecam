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
    setUE (liste){
        const container = document.getElementById('container');
        container.innerHTML = ''; // Vider le conteneur existant
        // Pour chaque matière dans la liste
        this.m = 0

        liste.forEach((UE, index) => {
            this.setMatieres(index, UE)
            
        });
    }
    
    // Méthode principale pour afficher les matières
    setMatieres(id, UE) {    


        const UEDiv = document.createElement('div');
        UEDiv.className = 'UE';
        UEDiv.id = `UE${id}`; // Ajouter l'ID
        console.log(UEDiv.id)
        const nomUE = document.createElement('span');
        nomUE.className = 'nom_UE';
        nomUE.textContent = UE.nom;

        UEDiv.appendChild(nomUE);
        container.appendChild(UEDiv);
        // Pour chaque matière dans la liste
        UE.liste_matieres.forEach((matiere, index) => {
            this.setTypes(index, UEDiv.id ,matiere);
        });
    }

    // Méthode pour créer et ajouter les types de matières
    setTypes(id, UEid, matiere) {
        const UE = document.getElementById(UEid);

        const matiereDiv = document.createElement('div');
        matiereDiv.className = 'matiere';
        matiereDiv.id = `matiere${this.m}`; // Ajouter l'ID ici
        this.m = this.m + 1
        const nomMatiere = document.createElement('span');
        nomMatiere.className = 'nom_matiere';
        nomMatiere.textContent = matiere.nom;

        matiereDiv.appendChild(nomMatiere);
        UE.appendChild(matiereDiv);
        this.j = 0
        // Pour chaque type d'évaluation, créer les notes et coefficients
        matiere.liste_types_evaluation.forEach((typeEvaluation, index) => {
            this.creerNoteCoef(index, matiereDiv.id, typeEvaluation);
        });
    }

    // Méthode pour créer les inputs de notes et coefficients
    creerNoteCoef(id, matiereId, typeEvaluation) {
        const matiere = document.getElementById(matiereId);
        // Créer des inputs pour chaque note et coefficient
        for (let i = 0; i < typeEvaluation.nombre_de_notes; i++) {
            const divNoteCoef = document.createElement('div');
            divNoteCoef.className = 'note_coef';

            // Création de l'input pour le nombre de notes
            const inputNombre = document.createElement('input');
            inputNombre.type = 'number';
            inputNombre.id = `nombre${this.j}`;
            inputNombre.className = 'note';
            inputNombre.placeholder = 'Entrez le nombre';
            inputNombre.min = 0;
            inputNombre.max = 20;
            inputNombre.step = 0.5;

            // Création de l'input pour le coefficient
            const inputCoef = document.createElement('input');
            inputCoef.type = 'number';
            inputCoef.id = `coef${this.j}`;
            inputCoef.className = 'coef';
            inputCoef.placeholder = 'coef';
            inputCoef.min = 0;
            inputCoef.max = 10;
            inputCoef.value = typeEvaluation.coef;

            // Ajout des inputs au div principal
            divNoteCoef.appendChild(inputNombre);
            divNoteCoef.appendChild(inputCoef);

            // Ajouter l'ensemble au div de la matière
            matiere.appendChild(divNoteCoef);

            this.j = this.j +  1
        }
    }
}