// Classe Matiere
export class Matiere {
    constructor(nom, coeffDS = 1, coeffTP = 1, coeffProjet = 1) {
        this.nom = nom;
        this.coeffDS = coeffDS;
        this.coeffTP = coeffTP;
        this.coeffProjet = coeffProjet;
        this.noteDS = 0;
        this.noteTP = 0;
        this.noteProjet = 0;
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
