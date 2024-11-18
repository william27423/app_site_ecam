import { TypeEvaluation } from './Classe.js';
import { saveData, saveHtmlContent } from './app.js'; // Assurez-vous que le chemin est correct


export class Calculs {
    constructor() {}

    mettrefleche(boutonClasse){
        const dropdown_button = document.getElementById("dropdown-button");

        dropdown_button.textContent = boutonClasse.textContent
        const arrowSpan = document.createElement("span");
        arrowSpan.className = "arrow";
        arrowSpan.textContent = "▼";

        dropdown_button.appendChild(arrowSpan);
    }

    mettreflecheColoration(boutonClasse){
        const dropdown_button = document.getElementById("dropdown-button-spe");

        dropdown_button.textContent = boutonClasse.textContent
        const arrowSpan = document.createElement("span");
        arrowSpan.className = "arrow";
        arrowSpan.textContent = "▼";

        dropdown_button.appendChild(arrowSpan);
    }
    
    ajouter_dropdown_spe(){
        const dropdown_t = document.getElementById("dropdown-spe")
        if (dropdown_t != null){
            dropdown_t.remove()
        }


        const body = document.body;

        const dropdown = document.createElement("div")
        dropdown.className ="dropdown"
        dropdown.id="dropdown-spe"

        //const  = document.getElementById("dropdown-button");
        const dropdown_button_spe = document.createElement("button")
        dropdown_button_spe.className = "dropdown-button"
        dropdown_button_spe.id = "dropdown-button-spe"
        dropdown_button_spe.textContent = "Choisir une coloration"
        const arrowSpan = document.createElement("span");
        arrowSpan.className = "arrow";
        arrowSpan.textContent = "▼";

        dropdown_button_spe.appendChild(arrowSpan);
        dropdown.appendChild(dropdown_button_spe);
        body.insertBefore(dropdown, body.children[3]);
    }
    enlever_dropdown_spe(){
        const dropdown_t = document.getElementById("dropdown-spe")
        if (dropdown_t != null){
            dropdown_t.remove()
        }
    }

    ajouter_item_spe(liste_spe){
        const drop_down = document.getElementById("dropdown-spe")
        //const  = document.getElementById("dropdown-button");
        const dropdown_content = document.createElement("div")
        dropdown_content.className = "dropdown-content"
        dropdown_content.id = "dropdown-content-spe"
        liste_spe.forEach((Spe) => {
            const dropdown_item = document.createElement("button")
            dropdown_item.className = "dropdown-item";
            dropdown_item.id = `Bouton${Spe.nom}`;
            dropdown_item.textContent = Spe.nom;
            dropdown_content.appendChild(dropdown_item);
        });
        drop_down.appendChild(dropdown_content);
        const dropdownButton = document.querySelector('#dropdown-button');
        const dropdownButtonSpe = document.querySelector('#dropdown-button-spe');
        const dropdown = document.querySelector('#dropdown-spe');
        const dropdownItems = document.querySelectorAll('#dropdown-content-spe .dropdown-item'); // Sélection des éléments du dropdown
        
        dropdownButton.addEventListener('click', function() {
            dropdown.classList.remove('show');
        });

        // Afficher/cacher le dropdown lorsque le bouton est cliqué
        dropdownButtonSpe.addEventListener('click', function() {
            dropdown.classList.toggle('show');
        });
        
        // Cacher le dropdown si on clique en dehors
        window.addEventListener('click', function(event) {
            if (!event.target.matches('.dropdown-button') && !dropdown.contains(event.target)) {
                dropdown.classList.remove('show');
            }
        });
        const UEs = document.querySelectorAll(".UE")
        // Cacher le dropdown lorsqu'on clique sur un élément du dropdown
        dropdownItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const Coloration = document.querySelector("#Coloration")
                const Coloration_nom = document.querySelector("#Coloration .nom_UE")
                dropdown.classList.remove('show');
                if (Coloration_nom == null) {
                    this.setMatieres(UEs.length, liste_spe[index], 1);
                    this.mettreflecheColoration(item)
                }
                else if ((Coloration_nom != null) && !(Coloration_nom.textContent.includes(liste_spe[index].nom))){
                    Coloration.remove()
                    this.setMatieres(UEs.length, liste_spe[index], 1);
                    this.mettreflecheColoration(item)

                }
                 
            });
        });
    }

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
                if(!isNaN(moyenne) ){
                    
                    sommemoyenne += moyenne * poid;
                    sommeDesPoids += poid;
                }
            }
            let moyenneUE = sommemoyenne/sommeDesPoids;
            let blockid = `block${r}`;
            let block = document.getElementById(blockid);
            if (!block) {
                block = document.getElementById('block-1')
            }
            let UEMoyenneSpan = block.querySelector(".resultat_UE");
            if (!UEMoyenneSpan) {
                if (moyenneUE.toFixed(2) != 0.00) {
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
        PromotionDiv.id = Promotion.nom; // Ajouter l'ID

        const nomPromotion = document.createElement('span');
        nomPromotion.className = 'nom_Promotion';
        nomPromotion.textContent = Promotion.nom;

        this.m = 0;
        PromotionDiv.appendChild(nomPromotion);
        container.appendChild(PromotionDiv);

        Promotion.liste_UE.forEach((UE, index) => {
            this.setMatieres(index, UE, 0);
        });
        if (Promotion.liste_Spe != undefined){
            this.ajouter_dropdown_spe();
            this.ajouter_item_spe(Promotion.liste_Spe)
        }
        else{
            this.enlever_dropdown_spe();

        }
    }

    setMatieres(id, UE, nb) {

        const Promotion = document.querySelector(".Promotion");
        const UEDiv = document.createElement('div');
        UEDiv.className = 'UE';
        if (nb == 1){
            UEDiv.id = "Coloration"; // Ajouter l'ID
        }
        else{
            UEDiv.id = `UE${id}`; // Ajouter l'ID

        }
        const UEinfo = document.createElement('div');
        UEinfo.className = 'nom_UE-container';
        const blockUE = document.createElement('div');
        blockUE.className = 'block';
        blockUE.id = `block${id}`;
        const nomUE = document.createElement('span');
        nomUE.className = 'nom_UE';
        nomUE.textContent = `UE: ${UE.nom}`;
        nomUE.role = 'button'
        if (nb == 1){
            nomUE.id = "Colorations"; // Ajouter l'ID pour le css
        }
        const fleche = document.createElement('button');
        fleche.className = 'toggle-button';
        fleche.id = `toggleUE${id}`;
        fleche.innerHTML = '&#9654;';

        const eventToggle = () => {
            if (blockUE.style.display === 'none' || blockUE.style.display === '') {
                blockUE.style.display = 'block';  // Affiche la matière
                fleche.classList.add('rotated');     // Ajoute la rotation de la flèche
            } else {
                blockUE.style.display = 'none';   // Masque la matière
                fleche.classList.remove('rotated');  // Retire la rotation de la flèche
            }
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

        const aditional_div = document.createElement('div')
        aditional_div.className = "aditional_div";
        aditional_div.id = `aditional_div${this.m}`;
        const aditional_button = document.createElement('button')
        aditional_button.className="aditional_button"
        aditional_button.id = `${this.m}`;
        aditional_button.textContent = "+"
        aditional_div.appendChild(aditional_button)

        matiere_info.appendChild(nomMatiere);
        matiere_info.appendChild(inputPoidMatiere);
        matiereDiv.appendChild(matiere_info);
        matiereDiv.appendChild(aditional_div);
        aditional_button.addEventListener('click',() => {
            this.creerNoteCoef(matiereDiv.id,new TypeEvaluation('nouvelle note',1,1),matiereDiv.children.length-2);
            const len = matiereDiv.children.length;

            saveHtmlContent(matiereDiv.children[len-2]);
        });
        blockUEs.appendChild(matiereDiv);

        matiere.liste_types_evaluation.forEach((typeEvaluation, index) => {
            this.creerNoteCoef(matiereDiv.id, typeEvaluation, index);
        });

        
        //this.creerNoteCoef(matiereDiv.id,new TypeEvaluation('new_note',1,1),9)
        this.m = this.m + 1;

    }

    creerNoteCoef(matiereId, typeEvaluation, index) {
        const matiere = document.getElementById(matiereId);
        const Promotion = matiere.parentElement.parentElement.parentElement;
        const Promotionid = Promotion.id;
        const len = matiere.children.length;
        for (let i = 0; i < typeEvaluation.nombre_de_notes; i++) {
            const divNoteCoef = document.createElement('div');
            divNoteCoef.className = 'note_coef';

            const inputNombre = document.createElement('input');
            inputNombre.type = 'number';
            inputNombre.id = `n${Promotionid}_${matiereId}_${index}_${i}`; // Unique ID
            inputNombre.className = 'note';
            inputNombre.placeholder = `note ${typeEvaluation.nom} ...`;
            inputNombre.min = 0;
            inputNombre.max = 20;
            inputNombre.step = 0.5;

            const inputCoef = document.createElement('input');
            inputCoef.type = 'number';
            inputCoef.id = `c${Promotionid}_${matiereId}_${index}_${i}`; // Unique ID
            inputCoef.className = 'coef';
            inputCoef.placeholder = 'coef';
            inputCoef.min = 0;
            inputCoef.max = 10;
            inputCoef.value = typeEvaluation.coef;

            divNoteCoef.appendChild(inputNombre);
            divNoteCoef.appendChild(inputCoef);

            inputNombre.addEventListener('input', () => saveData(inputNombre,inputCoef));
            inputCoef.addEventListener('input', () => saveData(inputNombre,inputCoef));

            if (len>0 && matiere.lastElementChild.classList.contains('resultat_matiere')){
                matiere.insertBefore(divNoteCoef, matiere.children[len-2])

            }
            else if (len > 0 && !(matiere.lastElementChild.classList.contains('resultat_matiere'))){
                matiere.insertBefore(divNoteCoef, matiere.children[len-1]);
                
            }
            else{
                matiere.appendChild(divNoteCoef);
            }
        }
    }
}
