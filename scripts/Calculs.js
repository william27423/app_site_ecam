export class Calculs {
    constructor() {}

    calculerMoyenne() {
        let UEs = document.querySelectorAll(".UE");
        this.k = 0;
        for (let r = 0; r < UEs.length; r++) {
            let sommemoyenne = 0;   
            let sommeDesPoids = 0;
            let matieres = UEs[r].querySelectorAll(".matiere");
            for (let i = 0; i < matieres.length; i++) {
                let poid = parseFloat(matieres[i].querySelector(".poid").value);
                if (!poid){
                    poid = parseFloat(matieres[i].querySelector(".poid").getAttribute("value"));
                }
                let notes = matieres[i].querySelectorAll(".note");
                let coefs = matieres[i].querySelectorAll(".coef");
                let sommeNotes = 0;
                let sommeCoefficients = 0;

                for (let j = 0; j < notes.length; j++) {
                    let note = parseFloat(notes[j].value);
                    let coef = parseFloat(coefs[j].value);
                    if (note < 0 || note > 20) {
                        alert("Veuillez entrer des valeurs valides pour toutes les notes (entre 0 et 20) et coefficients.");
                        return;
                    } else if (!isNaN(note) && !isNaN(coef)) {
                        sommeNotes += note * coef;
                        sommeCoefficients += coef;
                    }
                }

                let moyenne = sommeNotes / sommeCoefficients;

                let matiereId = `matiere${this.k}`;
                this.k = this.k + 1;
                const matiere = document.getElementById(matiereId);
                let matiereMoyenneSpan = matiere.querySelector(".resultat_matiere");

                if (!matiereMoyenneSpan) {
                    if (!isNaN(moyenne.toFixed(2))) {
                        matiereMoyenneSpan = document.createElement("span");
                        matiereMoyenneSpan.className = "resultat_matiere";
                        matiere.appendChild(matiereMoyenneSpan);
                        matiereMoyenneSpan.textContent = "Moyenne EC: " + moyenne.toFixed(2);
                    }
                }
                else{
                    if (!isNaN(moyenne.toFixed(2))){
                        matiereMoyenneSpan.textContent = "Moyenne EC: " + moyenne.toFixed(2);
                    }
                    else{
                        matiereMoyenneSpan.remove()
                    }
                }
                sommemoyenne += moyenne * poid;
                sommeDesPoids += poid;
            }

            let moyenneUE = sommemoyenne;

            let blockid = `block${r}`;
            let block = document.getElementById(blockid);
            if (!block) {
                block = document.getElementById('block-1')
            }
            let UEMoyenneSpan = block.querySelector(".resultat_UE");
            console.log(UEMoyenneSpan)
            if (!UEMoyenneSpan) {
                if (!isNaN(moyenneUE.toFixed(2))) {
                    UEMoyenneSpan = document.createElement("span");
                    UEMoyenneSpan.className = "resultat_UE";
                    UEMoyenneSpan.id = `resultat_UE${r}`
                    block.appendChild(UEMoyenneSpan);
                    UEMoyenneSpan.textContent = "Moyenne UE: " + moyenneUE.toFixed(2);
                }
            }
            else{
                if (!isNaN(moyenneUE.toFixed(2))){
                    UEMoyenneSpan.textContent = "Moyenne UE: " + moyenneUE.toFixed(2);
                }
                else{
                    UEMoyenneSpan.remove()
                }
            }
        }
    }

    setUE(Promotion) {
        const container = document.getElementById('container');
        container.innerHTML = ''; // Vider le conteneur existant
        const PromotionDiv = document.createElement('div');
        PromotionDiv.className = 'Promotion';
        PromotionDiv.id = 'Promotion'; // Ajouter l'ID

        const nomPromotion = document.createElement('span');
        nomPromotion.className = 'nom_Promotion';
        nomPromotion.textContent = Promotion.nom;

        this.m = 0;
        PromotionDiv.appendChild(nomPromotion);
        container.appendChild(PromotionDiv);

        Promotion.liste_UE.forEach((UE, index) => {
            this.setMatieres(index, UE);
        });
    }

    setMatieres(id, UE) {
        const Promotion = document.getElementById('Promotion');
        const UEDiv = document.createElement('div');
        UEDiv.className = 'UE';
        UEDiv.id = `UE${id}`; // Ajouter l'ID
        const UEinfo = document.createElement('div');
        UEinfo.className = 'nom_UE-container';
        const blockUE = document.createElement('div');
        blockUE.className = 'block';
        blockUE.id = `block${id}`;
        const nomUE = document.createElement('span');
        nomUE.className = 'nom_UE';
        nomUE.textContent = `UE: ${UE.nom}`;
        nomUE.role = 'button'
        const fleche = document.createElement('button');
        fleche.className = 'toggle-button';
        fleche.id = `toggleUE${id}`;
        fleche.innerHTML = '&#9654;';

        const eventToggle = () => {
            // Sélectionner toutes les matières dans l'UE (associée au bouton de toggle)
            const matieresDivs = document.querySelectorAll(`#UE${id} .block`);
        
            // Parcourir chaque div de matière et appliquer le toggle
            matieresDivs.forEach(matiereDiv => {
                if (matiereDiv.style.display === 'none' || matiereDiv.style.display === '') {
                    matiereDiv.style.display = 'block';  // Affiche la matière
                    fleche.classList.add('rotated');     // Ajoute la rotation de la flèche
                } else {
                    matiereDiv.style.display = 'none';   // Masque la matière
                    fleche.classList.remove('rotated');  // Retire la rotation de la flèche
                }
            });
        };

        fleche.addEventListener('click', eventToggle);
        nomUE.addEventListener('click',eventToggle)

        UEinfo.appendChild(nomUE);
        UEinfo.appendChild(fleche);
        UEDiv.appendChild(UEinfo);
        UEDiv.appendChild(blockUE);
        Promotion.appendChild(UEDiv);
        UE.liste_matieres.forEach((matiere) => {
            this.setTypes(id, matiere);
        });
    }

    setTypes(UEid, matiere) {
        const blockUEs = document.getElementById(`block${UEid}`);
        const matiereDiv = document.createElement('div');
        matiereDiv.className = 'matiere';
        matiereDiv.id = `matiere${this.m}`;
        const matiere_info = document.createElement('div');
        matiere_info.className = 'matiere_info';

        const nomMatiere = document.createElement('span');
        nomMatiere.className = 'nom_matiere';
        nomMatiere.textContent = `EC: ${matiere.nom}`;

        const inputPoidMatiere = document.createElement('span');
        inputPoidMatiere.className = 'poid';
        inputPoidMatiere.value = matiere.poid_matiere
        inputPoidMatiere.textContent = `pourcentage de l'UE: ${matiere.poid_matiere * 100}%`;

        matiere_info.appendChild(nomMatiere);
        matiere_info.appendChild(inputPoidMatiere);
        matiereDiv.appendChild(matiere_info);
        blockUEs.appendChild(matiereDiv);

        matiere.liste_types_evaluation.forEach((typeEvaluation, index) => {
            this.creerNoteCoef(matiereDiv.id, typeEvaluation, index);
        });

        this.m = this.m + 1;
    }

    creerNoteCoef(matiereId, typeEvaluation, index) {
        const matiere = document.getElementById(matiereId);
        for (let i = 0; i < typeEvaluation.nombre_de_notes; i++) {
            const divNoteCoef = document.createElement('div');
            divNoteCoef.className = 'note_coef';

            const inputNombre = document.createElement('input');
            inputNombre.type = 'number';
            inputNombre.id = `nombre_${matiereId}_${index}_${i}`; // Unique ID
            inputNombre.className = 'note';
            inputNombre.placeholder = `note ${typeEvaluation.nom} ...`;
            inputNombre.min = 0;
            inputNombre.max = 20;
            inputNombre.step = 0.5;

            const inputCoef = document.createElement('input');
            inputCoef.type = 'number';
            inputCoef.id = `coef_${matiereId}_${index}_${i}`; // Unique ID
            inputCoef.className = 'coef';
            inputCoef.placeholder = 'coef';
            inputCoef.min = 0;
            inputCoef.max = 10;
            inputCoef.value = typeEvaluation.coef;

            divNoteCoef.appendChild(inputNombre);
            divNoteCoef.appendChild(inputCoef);
            matiere.appendChild(divNoteCoef);
        }
    }
}
