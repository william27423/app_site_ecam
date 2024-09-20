export class Promotion{
    constructor (nom, liste_UE){
        this.nom = nom;
        this.liste_UE = liste_UE;
    }
    set_UE(ue) {
        if (ue instanceof UE) {
            this.UE.push(ue);  // Ajouter seulement si l'objet est une instance de la classe UE
        } else {
            console.error("L'objet ajouté n'est pas une instance de la classe UE.");
        }
    }

    // Méthode pour obtenir la liste des UE de la promotion
    get_UE() {
        return this.UE;  // Renvoie le tableau des UE
    }

    
}