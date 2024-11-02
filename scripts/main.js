import { Calculs } from './Calculs.js';
import { Promotion,UE,Matiere,TypeEvaluation } from './Classe.js';
import { ENG2_1S,ENG2_2S,AM3 } from './Instance.js'

const app = new Calculs();
    // Attacher l'événement de calcul de la moyenne
const boutonCalcul = document.getElementById("boutonCalcul");
boutonCalcul.addEventListener('click', app.calculerMoyenne);


let liste = new Promotion('AM3',[new UE('conception',[new Matiere('structure',[new TypeEvaluation('TP', 2, 1),new TypeEvaluation('DS', 1, 2)]), new Matiere('matérieaux',[new TypeEvaluation('TP', 2, 1),new TypeEvaluation('DS', 1, 2)])], 2), new UE('conception',[new Matiere('structure',[new TypeEvaluation('TP', 2, 1),new TypeEvaluation('DS', 1, 2)]), new Matiere('matérieaux',[new TypeEvaluation('TP', 2, 1),new TypeEvaluation('DS', 1, 2)])], 2)]);

const boutonAM3 = document.getElementById("boutonAM3");
boutonAM3.addEventListener('click', () => app.setUE(AM3));

const boutonENG2_1s = document.getElementById("boutonENG2-1s");
boutonENG2_1s.addEventListener('click', () => app.setUE(ENG2_1S));

const boutonENG2_2s = document.getElementById("boutonENG2-2s");
boutonENG2_2s.addEventListener('click', () => app.setUE(ENG2_2S));
