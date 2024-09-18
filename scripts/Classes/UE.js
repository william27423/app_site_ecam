// Classe UE
export class UE {
    constructor(nom, liste_matieres, credits) {
        this.nom = nom;
        this.liste_matiere = liste_matieres;  // Initialise un tableau pour stocker les matières
        this.credits = credits;
    }

    // Méthode pour ajouter une matière à l'UE
    setMatiere(matiere) {
        if (matiere instanceof Matiere) {
            this.matieres.push(matiere);  // Ajoute la matière au tableau
        } else {
            console.error("L'objet ajouté n'est pas une instance de la classe Matiere.");
        }
    }

    // Méthode pour obtenir la liste des matières
    getMatieres() {
        return this.matieres;
    }

    setCredits(credits){
        this.credits = credits;
    }

    getCredits(){
        return this.credits;
    }

    // Méthode pour afficher toutes les matières de l'UE
    afficherMatieres() {
        this.matieres.forEach(matiere => {
            console.log(`Matière: ${matiere.nom}`);  // Accède à la propriété nom de l'instance Matiere
        });
    }

    afficherCredits(){
        console.log(this.credits);
    }
}
