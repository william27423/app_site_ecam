import { Note } from './classe.js';
import { calculerMoyenne, setNotes } from './fonction.js';


console.log('aaaaaaaa')
    // Attacher l'événement de calcul de la moyenne
const boutonCalcul = document.getElementById("boutonCalcul");
boutonCalcul.addEventListener('click', calculerMoyenne);


let liste = [new Note('tp',12,1), new Note('ds',10,2)]


const boutonAM3 = document.getElementById("boutonAM3");
boutonAM3.addEventListener('click', () => setNotes(liste));
