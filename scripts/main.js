import { Calculs } from './Classes/Calculs.js';
import { Matiere } from './Classes/Matiere.js';
import { Promotion } from './Classes/Promotion.js';
import { UE } from './Classes/UE.js';
import { TypeEvaluation } from './Classes/TypeEvaluation.js';

const app = new Calculs();
    // Attacher l'événement de calcul de la moyenne
const boutonCalcul = document.getElementById("boutonCalcul");
boutonCalcul.addEventListener('click', app.calculerMoyenne);

let AM3 = new Promotion('AM3', [
    new UE('Matériaux et Structures : Applications', [
        new Matiere('Pratique du Calcul des Structures', 0.4, [
            new TypeEvaluation('Devoir écrit', 2, 1),
            new TypeEvaluation('TP', 1, 1),
        ]),
        new Matiere("Matériaux pour le bureau d'études", 0.6, [
            new TypeEvaluation('Devoir écrit 1', 1, 1),
            new TypeEvaluation('Devoir écrit 2', 2, 1),
            new TypeEvaluation('TP', 1, 1),
        ]),
    ], 7),
    new UE('Conception et Management Industriel', [
        new Matiere('Santé, Sécurité et Environnement', 0.1875, [
            new TypeEvaluation('Contrôle continu', 1, 1),
        ]),
        new Matiere('Méthode 2', 0.25, [
            new TypeEvaluation('Projet', 1, 1),
        ]),
        new Matiere('Organisation Industrielle 2', 0.3125, [
            new TypeEvaluation('Devoir écrit', 1, 1),
        ]),
        new Matiere('Compléments de CAO', 0.25, [
            new TypeEvaluation('Projet', 1, 1),
        ]),
    ], 3),
    new UE('Programmation et Base de données', [
        new Matiere('Développement Logiciel', 0.8, [
            new TypeEvaluation('Projet', 1, 1),
        ]),
        new Matiere('Bases de Données', 0.2, [
            new TypeEvaluation('TP', 1, 1),
        ]),
    ], 2),
    new UE('Système Automatisés et Traitement de Données', [
        new Matiere('Statistique', 0.5, [
            new TypeEvaluation('Devoir écrit', 1, 1),
            new TypeEvaluation('TP', 1, 1),
        ]),
        new Matiere('Automatique Discontinue', 0.5, [
            new TypeEvaluation('Devoir écrit', 2, 1),
            new TypeEvaluation('TP', 1, 1),
        ]),
    ], 3),
    new UE('Energétique 2', [
        new Matiere('Machines Electrique', 0.5, [
            new TypeEvaluation('Devoir écrit', 2, 1),
            new TypeEvaluation('TP', 1, 1),
        ]),
        new Matiere('Thermodynamique appliqué', 0.5, [
            new TypeEvaluation('Devoir écrit', 2, 1),
            new TypeEvaluation('TP', 1, 1),
        ]),
    ], 4),
    new UE('Langues Vivantes 2', [
        new Matiere('Anglais 1', 1, [
            new TypeEvaluation('Tutorats', 1, 1),
            new TypeEvaluation('Examen Oral', 1, 1),
            new TypeEvaluation('Contrôle continu', 1, 1),
        ]),
    ], 3),
    new UE('Formation Humaine 2', [
        new Matiere('Ouverture au Monde 2', 1, [
            new TypeEvaluation('Contrôle continu', 1, 1),
        ]),
        new Matiere('Connaissance de Soi 1', 1, [
            new TypeEvaluation('Contrôle continu', 1, 1),
        ]),
        new Matiere('Employabilité', 1, [
            new TypeEvaluation('Contrôle continu', 1, 1),
        ]),
    ], 2),
    new UE('Avant Projet Léonard', [
        new Matiere('Intraprenariat / Entreprenariat 1 Communication', 0.5, [   
            new TypeEvaluation('Contrôle continu', 1, 1),
            new TypeEvaluation('pitch', 0.5, 1),
        ]),
        new Matiere('Intraprenariat / Entreprenariat 1 Validation', 0, [
            new TypeEvaluation('Validation', 1, 1),
        ]),
        new Matiere('Recherche Bibliographique', 0.2, [
            new TypeEvaluation('Projet', 1, 1),
        ]),
        new Matiere('Créativité / Définition du Sujet', 0.3, [
            new TypeEvaluation('Projet', 1, 1),
        ]),
    ], 2),
    new UE('Coloration Transition Energétique 1', [
        new Matiere("Elément de Base sur l'Energie", 0.25, [
            new TypeEvaluation('Devoir écrit', 1, 1),
        ]),
        new Matiere('Thermodynamique avancé', 0.5, [
            new TypeEvaluation('Devoir écrit', 2, 1),
            new TypeEvaluation('TP', 1, 1),
        ]),
        new Matiere('Conception et Design des Machines Electrique', 0.25, [     
            new TypeEvaluation('Devoir écrit', 1, 1),
            new TypeEvaluation('TP', 1, 1),
        ]),
    ], 4),
]);

let liste = new Promotion('AM3',[new UE('conception',[new Matiere('structure',[new TypeEvaluation('TP', 2, 1),new TypeEvaluation('DS', 1, 2)]), new Matiere('matérieaux',[new TypeEvaluation('TP', 2, 1),new TypeEvaluation('DS', 1, 2)])], 2), new UE('conception',[new Matiere('structure',[new TypeEvaluation('TP', 2, 1),new TypeEvaluation('DS', 1, 2)]), new Matiere('matérieaux',[new TypeEvaluation('TP', 2, 1),new TypeEvaluation('DS', 1, 2)])], 2)]);

const boutonAM3 = document.getElementById("boutonAM3");
boutonAM3.addEventListener('click', () => app.setUE(AM3));

