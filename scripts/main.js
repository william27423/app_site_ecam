
import { calculerMoyenne } from './calculMoyenne.js';

    // Attacher l'événement de calcul de la moyenne
const boutonCalcul = document.getElementById("boutonCalcul");
boutonCalcul.addEventListener('click', calculerMoyenne);

