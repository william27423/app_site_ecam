import { Note } from './Classes/Note.js';
import { Calculs } from './Classes/Calculs.js';
import { Matiere } from './Classes/Matiere.js';
import { Promotion } from './Classes/Promotion.js';
import { UE } from './Classes/UE.js';
import { TypeEvaluation } from './Classes/TypeEvaluation.js';

const app = new Calculs();
console.log('aaaaaaaa');
    // Attacher l'événement de calcul de la moyenne
const boutonCalcul = document.getElementById("boutonCalcul");
boutonCalcul.addEventListener('click', app.calculerMoyenne);

let AM3 = new Promotion('AM3', [new UE('Matériaux', [new Matiere('pratique du calcul des structures', [new TypeEvaluation('DS', 1, 2.0), new TypeEvaluation('TP', 1, 1.0)]), new Matiere('Matériaux', [new TypeEvaluation('DS1', 1, 1.0), new TypeEvaluation('DS2', 1, 2.0), new TypeEvaluation('TP', 1, 1.0)])]), new UE('Conception', [new Matiere('conception', [new TypeEvaluation('projet1', 1, 1.0), new TypeEvaluation('projet2', 1, 1.0)])])])
let liste = [new UE('conception',[new Matiere('structure',[new TypeEvaluation('TP', 2, 1),new TypeEvaluation('DS', 1, 2)]), new Matiere('matérieaux',[new TypeEvaluation('TP', 2, 1),new TypeEvaluation('DS', 1, 2)])], 2), new UE('conception',[new Matiere('structure',[new TypeEvaluation('TP', 2, 1),new TypeEvaluation('DS', 1, 2)]), new Matiere('matérieaux',[new TypeEvaluation('TP', 2, 1),new TypeEvaluation('DS', 1, 2)])], 2)];

const boutonAM3 = document.getElementById("boutonAM3");
boutonAM3.addEventListener('click', () => app.setUE(liste));
