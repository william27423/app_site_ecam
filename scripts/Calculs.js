import { TypeEvaluation } from './Classe.js';
import { saveData, saveHtmlContent } from './app.js'; // Assurez-vous que le chemin est correct


export class Calculs {
    constructor() {}

    mettrefleche(boutonClasse){
        const dropdown_button = document.getElementById("dropdown-button");
        const textContent = boutonClasse.textContent ? boutonClasse.textContent : boutonClasse;

        dropdown_button.textContent = textContent;
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
        body.insertBefore(dropdown, body.children[4]);
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
                    this.setUE(UEs.length, liste_spe[index], 1);
                    this.mettreflecheColoration(item)
                }
                else if ((Coloration_nom != null) && !(Coloration_nom.textContent.includes(liste_spe[index].nom))){
                    Coloration.remove()
                    this.setUE(UEs.length, liste_spe[index], 1);
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

    setPromotion(Promotion) {
        const container = document.getElementById('container');
        container.innerHTML = ''; // Vider le conteneur existant
        const PromotionDiv = document.createElement('div');
        PromotionDiv.className = 'Promotion';
        PromotionDiv.id = Promotion.nom; // Ajouter l'ID

        const nomPromotion = document.createElement('span');
        nomPromotion.className = 'nom_Promotion';
        nomPromotion.textContent = Promotion.nom;

        const blockmatiere = document.createElement("div")
        blockmatiere.className = "blockmatiere"

        const nomMatiere = document.createElement('span');
        nomMatiere.className = 'nom_Matiere';
        nomMatiere.textContent = "Liste de matieres:"


        this.m = 0;
        PromotionDiv.appendChild(nomPromotion);
        blockmatiere.appendChild(nomMatiere);
        container.appendChild(PromotionDiv);
        container.appendChild(blockmatiere);


        Promotion.liste_UE.forEach((UE, index) => {
            this.setUE(index, UE, 0);
        });
        if (Promotion.liste_Spe != undefined){
            this.ajouter_dropdown_spe();
            this.ajouter_item_spe(Promotion.liste_Spe)
        }
        else{
            this.enlever_dropdown_spe();

        }
    }

    setUE(id, UE, nb) {

        const container1 = document.getElementById("container1");
        const Promotion = document.querySelector(".Promotion");
        const UEDiv = document.createElement('div');
        UEDiv.className = 'UE';
        if (nb == 1){
            UEDiv.id = "Coloration"; // Ajouter l'ID
        }
        else{
            UEDiv.id = `UE${id}`; // Ajouter l'ID

        }
        const UEinfo = document.createElement('button');
        UEinfo.className = 'nom_UE-container';
        UEinfo.textContent = `UE: ${UE.nom}`;
        
        UEDiv.appendChild(UEinfo);
        Promotion.appendChild(UEDiv);

        UEinfo.addEventListener('click', () => {
            
            const UEs = document.querySelectorAll('.UE')
            console.log(UEs)
            if (UEinfo.style.backgroundColor == '') {   
                UEs.forEach((UEe) => {
                    let Uecolor = UEe.children[0].style.backgroundColor;

                    if (Uecolor != ''){
                        console.log(Uecolor)

                        UEe.children[0].style.backgroundColor = '';

                        console.log(Uecolor)

                    }
                })
                UEinfo.style.backgroundColor = '#525cb8'; 


                const matieres = document.querySelectorAll('.matiere');
                matieres.forEach(matiere => matiere.remove());

                const UEsn = document.querySelectorAll('.c-UEname');
                UEsn.forEach(UEn => UEn.remove());
                
                const matieresn = document.querySelectorAll('.c-Matierename');
                matieresn.forEach(matieren => matieren.remove());

                const notes = document.querySelectorAll('.note_coef');
                notes.forEach(note => note.remove());

                const c_UEname = document.createElement('span');
                c_UEname.className = 'c-UEname';
                c_UEname.textContent = `UE: ${UE.nom}`;

                container1.appendChild(c_UEname)


                UE.liste_matieres.forEach((matiere, index) => {
                    this.setMatieres(index, matiere, 0);
                });

            }
        });
    }

    setMatieres(UEid, matiere) {

        const container1 = document.getElementById("container1");

        const block_mat = document.querySelector('.blockmatiere');
        const matierediv = document.createElement('div');
        matierediv.className = 'matiere';
        matierediv.id = `matiere${this.m}`;

        const matiere_info = document.createElement('button');
        matiere_info.className = 'nom_matiere-container';
        matiere_info.textContent = `EC: ${matiere.nom}`;

        
        matierediv.appendChild(matiere_info);
        block_mat.appendChild(matierediv);

        matiere_info.addEventListener('click', () => {
            
            const Matieres = document.querySelectorAll('.matiere')
            console.log(Matieres)
            if (matiere_info.style.backgroundColor == '') {   
                
                matiere_info.style.backgroundColor = '#525cb8'; 

                

                const c_Matierename = document.createElement('span');
                c_Matierename.className = 'c-Matierename';
                c_Matierename.id = matiere.nom
                c_Matierename.textContent = `EC: ${matiere.nom}`;

                container1.appendChild(c_Matierename)


                matiere.liste_types_evaluation.forEach((typeEvaluation, index) => {
                    this.creerNoteCoef(matiere.nom, typeEvaluation, index);
                });
            }
            else{
                matiere_info.style.backgroundColor = ''; 

                const matieresn = document.querySelectorAll('.c-Matierename');
                matieresn.forEach(matieren => {
                    if (matieren.id == matiere.nom)
                    matieren.remove()
                });

                const notes = document.querySelectorAll('.note_coef');
                notes.forEach(note => note.remove());
            }
        });



        /*const inputPoidMatiere = document.createElement('span');
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


        matiereDiv.appendChild(aditional_div);
        aditional_button.addEventListener('click',() => {
            this.creerNoteCoef(matiereDiv.id,new TypeEvaluation('nouvelle note',1,1),matiereDiv.children.length-2);
            const len = matiereDiv.children.length;

            saveHtmlContent(matiereDiv.children[len-2]);
        });
        blockUEs.appendChild(matiereDiv);

        
        */
        
        this.m = this.m + 1;

    }

    creerNoteCoef(matiereid ,typeEvaluation, index) {
        const container1 = document.getElementById("container1");
        const matiere = document.getElementById(matiereid);

        const Promotionid = "1"
        const len = matiere.children.length;
        for (let i = 0; i < typeEvaluation.nombre_de_notes; i++) {
            const divNoteCoef = document.createElement('div');
            divNoteCoef.className = 'note_coef';

            const inputNombre = document.createElement('input');
            //inputNombre.type = 'number';
            inputNombre.id = `n${Promotionid}_${index}_${i}`; // Unique ID
            inputNombre.className = 'note';
            inputNombre.placeholder = `note ${typeEvaluation.nom} ...`;
            inputNombre.min = 0;
            inputNombre.max = 20;
            inputNombre.step = 0.5;

            const inputCoef = document.createElement('input');
            //inputCoef.type = 'number';
            inputCoef.id = `c${Promotionid}_${index}_${i}`; // Unique ID
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
                matiere.insertBefore(divNoteCoef, matiere.children[len]);
                
            }
            else{
                matiere.appendChild(divNoteCoef);
            }
        }
    }

    createacceuil() {
        const dropdownSpe = document.getElementById("dropdown-spe");
        if (dropdownSpe){
            dropdownSpe.remove()
        }

        const container = document.getElementById("container")
        console.log(container)
        container.innerHTML = ''; // Vider le conteneur existant
        console.log(container)

        const promotionDiv = document.createElement("div");
        promotionDiv.className = "Promotion";
        promotionDiv.id = "Exemple";

        const promotionNameSpan = document.createElement("span");
        promotionNameSpan.className = "nom_Promotion";
        promotionNameSpan.textContent = "Exemple";
        promotionDiv.appendChild(promotionNameSpan);

        const ueDiv = document.createElement("div");
        ueDiv.className = "UE";
        ueDiv.id = "UE0";

        const ueNameContainerDiv = document.createElement("div");
        ueNameContainerDiv.className = "nom_UE-container";

        const ueNameSpan = document.createElement("span");
        ueNameSpan.className = "nom_UE";
        ueNameSpan.textContent = "Nom de l'UE";
        ueNameContainerDiv.appendChild(ueNameSpan);

        const toggleButton = document.createElement("button");
        toggleButton.className = "toggle-button";
        toggleButton.id = "toggleUE0";
        toggleButton.innerHTML = "&#9654;"; // Flèche
        ueNameContainerDiv.appendChild(toggleButton);

        ueDiv.appendChild(ueNameContainerDiv);

        const blockDiv = document.createElement("div");
        blockDiv.className = "bloc";
        blockDiv.id = "block-1";

        const matiereDiv = document.createElement("div");
        matiereDiv.className = "matiere";
        matiereDiv.id = "matiere0";

        const matiereInfoDiv = document.createElement("div");
        matiereInfoDiv.className = "matiere_info";

        const matiereNameSpan = document.createElement("span");
        matiereNameSpan.className = "nom_matiere";
        matiereNameSpan.textContent = "Nom de l'EC";
        matiereInfoDiv.appendChild(matiereNameSpan);

        const poidSpan = document.createElement("span");
        poidSpan.className = "poid";
        poidSpan.setAttribute("value", "1");
        poidSpan.textContent = "pourcentage de l'UE: 100%";
        matiereInfoDiv.appendChild(poidSpan);

        matiereDiv.appendChild(matiereInfoDiv);

        // Fonction pour créer un couple note/coef
        function createNoteCoef(id) {
            const noteCoefDiv = document.createElement("div");
            noteCoefDiv.className = "note_coef";

            const noteInput = document.createElement("input");
            noteInput.type = "number";
            noteInput.id = `nombre${id}`;
            noteInput.className = "note";
            noteInput.placeholder = "Entrez le nombre";
            noteInput.min = "0";
            noteInput.max = "20";
            noteInput.step = "0.5";

            const coefInput = document.createElement("input");
            coefInput.type = "number";
            coefInput.id = `coef${id}`;
            coefInput.className = "coef";
            coefInput.placeholder = "coef";
            coefInput.min = "0";
            coefInput.max = "10";
            coefInput.value = "1";

            noteCoefDiv.appendChild(noteInput);
            noteCoefDiv.appendChild(coefInput);

            return noteCoefDiv;
        }

        // Ajouter plusieurs couples note/coef
        for (let i = 0; i < 3; i++) {
            matiereDiv.appendChild(createNoteCoef(i));
        }

        const additionalDiv = document.createElement("div");
        additionalDiv.className = "aditional_div";

        const additionalButton = document.createElement("button");
        additionalButton.className = "aditional_button";
        additionalButton.id = "aditional_button-1";
        additionalButton.textContent = "+";

        additionalDiv.appendChild(additionalButton);
        matiereDiv.appendChild(additionalDiv);

        blockDiv.appendChild(matiereDiv);
        ueDiv.appendChild(blockDiv);
        promotionDiv.appendChild(ueDiv);
        container.appendChild(promotionDiv)

    }
}