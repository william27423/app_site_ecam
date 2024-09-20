// Classe Matiere
export class Matiere {
    constructor(nom, poid_matiere ,liste_types_evaluation) {
        this.nom = nom;
        this.poid_matiere = poid_matiere;
        this.liste_types_evaluation = liste_types_evaluation;
    }

    // Modifier les coefficients
    modifierCoeffDS(nouveauCoeff) {
        this.coeffDS = nouveauCoeff;
    }

    modifierCoeffTP(nouveauCoeff) {
        this.coeffTP = nouveauCoeff;
    }

    modifierCoeffProjet(nouveauCoeff) {
        this.coeffProjet = nouveauCoeff;
    }

    // Définir les notes
    setNotes(noteDS, noteTP, noteProjet) {
        this.noteDS = noteDS;
        this.noteTP = noteTP;
        this.noteProjet = noteProjet;
    }
}
