class Coef:
    def __init__(self, type_control, nombre_control, coef):
        self.type_control = type_control
        self.nombre_control = nombre_control
        self.coef = coef

    def __repr__(self):
        return f"new Coef('{self.type_control}', {self.nombre_control}, {self.coef})"


class Matiere:
    def __init__(self, nom, coefs):
        self.nom = nom
        self.coefs = coefs

    def __repr__(self):
        return f"new Matiere('{self.nom}', {self.coefs})"


class UE:
    def __init__(self, nom, matieres):
        self.nom = nom
        self.matieres = matieres

    def __repr__(self):
        return f"new UE('{self.nom}', {self.matieres})"


class Promotion:
    def __init__(self, nom, ues):
        self.nom = nom
        self.ues = ues

    def __repr__(self):
        return f"let {self.nom} = new Promotion('{self.nom}', {self.ues});"


# Fonction pour saisir les informations de l'utilisateur
def creer_promotion():
    nom_promo = input("Entrez le nom de la promotion : ")
    nombre_ue = int(input("Entrez le nombre d'UEs : "))
    ues = []

    for i in range(nombre_ue):
        nom_ue = input(f"Entrez le nom de l'UE {i + 1} : ")
        try:
            nombre_matieres = int(input(f"Combien de matières pour l'UE '{nom_ue}' ? "))
        except:
            print(" il y a eu une erreur")
            nombre_matieres = int(input(f"Combien de matières pour l'UE '{nom_ue}' ? "))
        matieres = []

        for j in range(nombre_matieres):
            try:
                nom_matiere = input(f"Entrez le nom de la matière {j + 1} pour l'UE '{nom_ue}' : ")
            except:
                print(" il y a eu une erreur")
                nom_matiere = input(f"Entrez le nom de la matière {j + 1} pour l'UE '{nom_ue}' : ")
            try:
                nombre_types = int(input(f"Combien de types de contrôles pour la matière '{nom_matiere}' ? "))
            except:
                print(" il y a eu une erreur")
                nombre_types = int(input(f"Combien de types de contrôles pour la matière '{nom_matiere}' ? "))
            coefs = []

            for k in range(nombre_types):
                try:
                    type_control = input(f"Entrez le type de contrôle {k + 1} pour la matière '{nom_matiere}' : ")
                except:
                    print(" il y a eu une erreur")
                    type_control = input(f"Entrez le type de contrôle {k + 1} pour la matière '{nom_matiere}' : ")
                try:
                    nombre_control = int(input(f"Combien de contrôles pour le type '{type_control}' ? "))
                except:
                    print(" il y a eu une erreur")
                    nombre_control = int(input(f"Combien de contrôles pour le type '{type_control}' ? "))
                try:
                    coef = float(input(f"Entrez le coefficient pour le type '{type_control}' : "))
                except:
                    print(" il y a eu une erreur")
                    coef = float(input(f"Entrez le coefficient pour le type '{type_control}' : "))

                coefs.append(Coef(type_control, nombre_control, coef))

            matieres.append(Matiere(nom_matiere, coefs))

        ues.append(UE(nom_ue, matieres))

    return Promotion(nom_promo, ues)


# Création de la promotion
promotion = creer_promotion()

# Affichage de la promotion sous forme de chaîne de caractères
print(promotion)
