// calculMoyenne.js
export class Calculs {
    constructor(){

    }
    calculerMoyenne() {
        
        let matieres = document.querySelectorAll(".matiere")
        for (let i = 0; i < matieres.length; i++){
            let notes = matieres[i].querySelectorAll(".note")
            let coefs = matieres[i].querySelectorAll(".coef")
            let sommeNotes = 0;
            let sommeCoefficients = 0;
            
            for (let j = 0; j < notes.length; j++) {
                let note = parseFloat(notes[j].value);
                let coef = parseInt(coefs[j].value);
                
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
        let matiereId = `matiere${i}`
        const matiere = document.getElementById(matiereId)
        const moyenne_span = document.createElement("span");
        moyenne_span.textContent = "Moyenne: " + moyenne.toFixed(2);
        moyenne_span.id ="resulat";
        matiere.appendChild(moyenne_span);
        }
    }
    setUE (Promotion){
        const container = document.getElementById('container');
        container.innerHTML = ''; // Vider le conteneur existant
        // Pour chaque matière dans la liste
        const PromotionDiv = document.createElement('div');
        PromotionDiv.className = 'Promotion';
        PromotionDiv.id = 'Promotion'; // Ajouter l'ID

        const nomPromotion = document.createElement('span');
        nomPromotion.className = 'nom_Promotion';
        nomPromotion.textContent = Promotion.nom;
        
        this.m = 0
        PromotionDiv.appendChild(nomPromotion)
        container.appendChild(PromotionDiv);

        Promotion.liste_UE.forEach((UE, index) => {
            this.setMatieres(index, UE)
        });
    }
    // Méthode principale pour afficher les matières
    setMatieres(id, UE) {    
        const Promotion = document.getElementById('Promotion');

        const UEDiv = document.createElement('div');
        UEDiv.className = 'UE';
        UEDiv.id = `UE${id}`; // Ajouter l'ID
        const nomUE = document.createElement('span');
        nomUE.className = 'nom_UE';
        nomUE.textContent = UE.nom;

        UEDiv.appendChild(nomUE);
        Promotion.appendChild(UEDiv);
        // Pour chaque matière dans la liste
        UE.liste_matieres.forEach((matiere) => {
            this.setTypes(UEDiv.id ,matiere);
        });
    }

    // Méthode pour créer et ajouter les types de matières
    setTypes(UEid, matiere) {
        const UE = document.getElementById(UEid);

        const matiereDiv = document.createElement('div');
        matiereDiv.className = 'matiere';
        matiereDiv.id = `matiere${this.m}`; // Ajouter l'ID ici
        this.m = this.m + 1
        const matiere_info = document.createElement('div');
        matiere_info.className ='matiere_info'
        matiere_info.id = `matiere_info${this.m}`

        const nomMatiere = document.createElement('span');
        nomMatiere.className = 'nom_matiere';
        nomMatiere.textContent = matiere.nom;

        const inputPoidMatiere = document.createElement('input');
        inputPoidMatiere.type = 'number';
        inputPoidMatiere.id = `poid${this.m}`;
        inputPoidMatiere.className = 'poid';
        inputPoidMatiere.placeholder = 'poid';
        inputPoidMatiere.min = 0;
        inputPoidMatiere.max = 1;
        inputPoidMatiere.value = matiere.poid_matiere;
        inputPoidMatiere.step = 0.1;


        matiere_info.appendChild(nomMatiere)
        matiere_info.appendChild(inputPoidMatiere)
        matiereDiv.appendChild(matiere_info);
        UE.appendChild(matiereDiv);
        this.j = 0
        // Pour chaque type d'évaluation, créer les notes et coefficients
        matiere.liste_types_evaluation.forEach((typeEvaluation) => {
            this.creerNoteCoef(matiereDiv.id, typeEvaluation);
        });
    }

    // Méthode pour créer les inputs de notes et coefficients
    creerNoteCoef(matiereId, typeEvaluation) {
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