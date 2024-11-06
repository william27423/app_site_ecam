export class Promotion{
    constructor (nom, liste_UE, liste_Spe){
        this.nom = nom;
        this.liste_UE = liste_UE;
        this.liste_Spe = liste_Spe
    }
}

export class UE {
    constructor(nom, liste_matieres, credits) {
        this.nom = nom;
        this.liste_matieres = liste_matieres;  // Initialise un tableau pour stocker les matières
        this.credits = credits;
    }
}

export class Matiere {
    constructor(nom, poid_matiere ,liste_types_evaluation) {
        this.nom = nom;
        this.poid_matiere = poid_matiere;
        this.liste_types_evaluation = liste_types_evaluation;
    }
}

export class TypeEvaluation {
    constructor(nom, coef, nombre_de_notes) {
        this.nom = nom; // La note obtenue
        this.coef = coef; // Le coefficient associé à la note
        this.nombre_de_notes = nombre_de_notes
    }
}
