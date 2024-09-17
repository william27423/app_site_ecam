import { Note } from './Classes/Note.js';
import { Calculs } from './Classes/Calculs.js';

const app = new Calculs();
console.log('aaaaaaaa');
    // Attacher l'événement de calcul de la moyenne
const boutonCalcul = document.getElementById("boutonCalcul");
boutonCalcul.addEventListener('click', app.calculerMoyenne);


let liste = [new Note('tp',12,1), new Note('ds',10,2), new Note('tp',12,1), new Note('ds',10,2)]


const boutonAM3 = document.getElementById("boutonAM3");
boutonAM3.addEventListener('click', () => app.setNotes(liste));
