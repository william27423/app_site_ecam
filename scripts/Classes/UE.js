//Classe UE
export class UE{
    constructor(nom, matière){
        this.nom = nom;
        this.matière = matière;
    }

    setUE(){
        if (this.matière instanceof Matière) {
            this.matière.push(this.matière);  // Ajouter seulement si l'objet est une instance de la classe UE
        } else {
            console.error("L'objet ajouté n'est pas une instance de la classe Matière.");
        }
    }

    getUE(){
        return this.matière;
    }
}