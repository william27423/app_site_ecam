import csv
import re


class Promotion:
    def __init__ (self, nom, liste_UE):
        self.nom = nom
        self.liste_UE = liste_UE
    
    
class UE:
    def __init__(self, nom, liste_matieres, credits):
        self.nom = nom
        self.liste_matieres = liste_matieres
        self.credits = credits
    

class Matiere:
    def __init__(self, nom, poid_matiere ,liste_types_evaluation):
        self.nom = nom
        self.poid_matiere = poid_matiere
        self.liste_types_evaluation = liste_types_evaluation

class TypeEvaluation:
   def  __init__(self, nom, coef, nombre_de_notes):
        self.nom = nom 
        self.coef = coef 
        self.nombre_de_notes = nombre_de_notes



def contient_plus_de_deux_majuscules(cellule):
    # Expression régulière pour trouver 3 lettres majuscules ou plus consécutives
    return bool(re.search(r'[A-Z]{3,}', cellule))

listeUE =[]
with open("NOTES_EU_S6.csv", 'r') as file:
    csv_file = list(csv.reader(file, delimiter=';'))
a =len(csv_file)
oui = csv_file[a-1][2]
for i in range (1, len(csv_file)):
    if contient_plus_de_deux_majuscules(csv_file[i][0]):
        k = i
        f = len(listeUE)
        listeUE[f-1].append(k-j+1)
    elif csv_file[i][0] == '':
        pass
    else:
        uE = [csv_file[i][0],i]
        listeUE.append(uE)
        j = i 
r = 0
for ue in listeUE:
    listemat =[]
    nm = 0

    for ligne in  range (ue[2]):
        num = ue[1]+ligne
        if csv_file[num][2] != '':
            t = 1
            matiere = [csv_file[num][2],1,csv_file[num][5]]
            listemat.append(matiere)
            nm =nm +1
            

        else:
            t = t +1
            listemat[nm-1][1] = t
    listeUE[r].append(listemat)
    r =r+1
listeUEs = []
for UEs in listeUE:
    e = 0
    listeEC = []
    for matiere in UEs[3]:
        listetypen = []
        for typen in range (matiere[1]):
            nom = csv_file[UEs[1]+e][3]
            coef = csv_file[UEs[1]+e][4]
            typenote = TypeEvaluation(nom,coef,1)
            listetypen.append(typenote)
            e = e + 1
        nommat = matiere[0]
        poidmat = matiere[2]
        eC = Matiere(nommat, poidmat, listetypen)
        listeEC.append(eC)
    nomue = UEs[0]
    crd = csv_file[UEs[1]][1]
    uEu = UE(nomue, listeEC, crd)
    listeUEs.append(uEu)
promotion = Promotion('AM3', listeUEs)

text = f"let {promotion.nom} = new Promotion('{promotion.nom}', [\n"

for ue in promotion.liste_UE:
    text += f"    new UE('{ue.nom}', [\n"
    
    for matiere in ue.liste_matieres:
        text += f"        new Matiere('{matiere.nom}', {matiere.poid_matiere.replace(',','.')}, [\n"
        
        for evaluation in matiere.liste_types_evaluation:
            text += f"            new TypeEvaluation('{evaluation.nom}', {evaluation.coef.replace(',','.')}, {evaluation.nombre_de_notes}),\n"
        
        text += "        ]),\n"
    
    text += "    ], {}),\n".format(ue.credits)

text += "]);"

print(text)

