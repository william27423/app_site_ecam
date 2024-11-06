import { Calculs } from './Calculs.js';
import { ENG2_1S,ENG2_2S,ENG3_1S,ENG3_2S,AM3_1S,AM3_2S,AM4} from './Instance.js'

const app = new Calculs();
    // Attacher l'événement de calcul de la moyenne


let liste = [AM3_1S,AM3_2S,AM4,ENG2_1S,ENG2_2S,ENG3_1S,ENG3_2S]
const dropdown_items = document.querySelectorAll('.dropdown-item');

dropdown_items.forEach(dropdown_item => {
    dropdown_item.addEventListener('click', () => {
        let index = Array.from(dropdown_items).indexOf(dropdown_item);
        const dropdown = document.getElementById("dropdown-button")

        if(dropdown_item.textContent != dropdown.textContent.replace("▼", "")){
            app.setUE(liste[index]);
            app.mettrefleche(dropdown_item)
        }
    });
});

const boutonCalcul = document.getElementById("boutonCalcul");
boutonCalcul.addEventListener('click', app.calculerMoyenne);