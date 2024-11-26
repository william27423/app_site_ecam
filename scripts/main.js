import { saveData, saveHtmlPromo } from './app.js';
import { Calculs } from './Calculs.js';
import { ENG2_1S,ENG2_2S,ENG3_1S,ENG3_2S,AM3_1S,AM3_2S,AM4, ENG4_1S} from './Instance.js';

const app = new Calculs();
    // Attacher l'événement de calcul de la moyenne


const boutonAcceuil = document.querySelector(".accueil");
console.log(boutonAcceuil)
boutonAcceuil.addEventListener('click',() =>{
    console.log(boutonAcceuil)

    const dropdown = document.getElementById("dropdown-button")
    if("Choisir une promotion" != dropdown.textContent.replace("▼", "")){
        app.createacceuil();
        app.mettrefleche("Choisir une promotion");
        saveHtmlPromo(-1, -1);

    }
});


let liste = [AM3_1S,AM3_2S,AM4,ENG2_1S,ENG2_2S,ENG3_1S,ENG3_2S, ENG4_1S]
const dropdown_items = document.querySelectorAll('.dropdown-item');

dropdown_items.forEach(dropdown_item => {
    dropdown_item.addEventListener('click', () => {
        let index = Array.from(dropdown_items).indexOf(dropdown_item);
        const dropdown = document.getElementById("dropdown-button")

        if(dropdown_item.textContent != dropdown.textContent.replace("▼", "")){
            app.setUE(liste[index]);
            app.mettrefleche(dropdown_item);
            saveHtmlPromo(index, dropdown_item.textContent);

        }
    });
});



const boutonCalcul = document.getElementById("boutonCalcul");
boutonCalcul.addEventListener('click', app.calculerMoyenne);