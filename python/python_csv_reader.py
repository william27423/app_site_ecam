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

def augmenter(listef):
    min_val = min(listef)  # Trouve la valeur minimale dans la liste
    if min_val > 0.0 and min_val < 1.0:
        resultat = []
        for x in listef:
            # Diviser x par la valeur minimale et stocker le résultat
            valeur_rehaussee = round(x / min_val,3)
            # Ajouter la valeur obtenue dans la liste resultat
            resultat.append(valeur_rehaussee)
    else:
        resultat = listef
    # Retourner la liste resultat
    return resultat


def arrondir(nb):
    numerateur, denominateur = map(int, nb.split('/'))  # Convertit chaque partie en entier
    resultat = numerateur / denominateur               # Effectue la division
    resultat_arrondi = round(resultat, 5)              # Arrondit à trois décimales
    return resultat_arrondi  

def contient_plus_de_deux_majuscules(cellule):
    # Expression régulière pour trouver 3 lettres majuscules ou plus consécutives
    return bool(re.search(r'[A-Z]{3,}', cellule))

def csv1(csv_name):
    listeUE =[]
    with open(csv_name, mode="r", encoding="utf-8") as file:
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
    return promotion




def csv2(csv_name, mode="r", encoding="utf-8"):
    listeUE =[]
    with open(csv_name, 'r') as file:
        csv_file = list(csv.reader(file, delimiter=';'))
    j=0
    k =0 
    for i in range (2, len(csv_file)):
        if csv_file[i][0] != '':
            listeUE.append([i, csv_file[i][0]])
            b = len(csv_file)-i
            for j in range(1, len(csv_file)-i+1):
                try:
                    if csv_file[i+j][0] != '':
                        listeUE[k].append(j)
                        break
                except:
                    listeUE[k].append(j)
            k = k+1    
    listeUEs = []
    for UEs in listeUE:
        listeEC = []
        for nb_matiere in range(UEs[2]):
            listetypen = [TypeEvaluation('Midterm1','1',1),TypeEvaluation('Midterm2','1',1),TypeEvaluation('Final','1',1),TypeEvaluation('continuous monitoring','1',1)]
            if csv_file[UEs[0]+nb_matiere][1] != '':
                poidmat = float(csv_file[UEs[0]+nb_matiere][1])/100.0
                nommat = csv_file[UEs[0]+nb_matiere][2]
                eC = Matiere(nommat, poidmat, listetypen)
                listeEC.append(eC)
        nomue = UEs[1]
        crd = 0
        uEu = UE(nomue, listeEC, crd)
        listeUEs.append(uEu)
    promotion = Promotion('Engineering 2 - Second Semestre', listeUEs)
    return promotion

def csv3(csv_name):
    listeUE =[]
    with open(csv_name, 'r', encoding='utf-8') as file:
        csv_file = list(csv.reader(file, delimiter=';'))
    j=0
    k =0 
    for i in range (3, len(csv_file)):
        if csv_file[i][2] != '':
            listeUE.append([csv_file[i][2], i])
            b = len(csv_file)-i
            for j in range(1, len(csv_file)-i+1):
                try:
                    if csv_file[i+j][2] != '':
                        listeUE[k].append(j)
                        break
                except:
                    listeUE[k].append(j)
            k = k+1
    r = 0
    for ue in listeUE:
        listemat =[]
        nm = 0

        for ligne in  range (ue[2]):
            num = ue[1]+ligne
            if csv_file[num][4] != '':
                t = 1
                matiere = [csv_file[num][4],1,csv_file[num][8]]
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
        f = 0
        listeEC = []
        for matiere in UEs[3]:
            listetypen = []
            list_coef = []
            for typen in range (matiere[1]):
                coef = csv_file[UEs[1]+e][7].replace(",",".")
                if "/" in coef:
                    coef = arrondir(coef)
                else:
                    coef = float(coef)
                list_coef.append(coef)
                e = e + 1
            list_a_coef = augmenter(list_coef)
            for typem in range(matiere[1]):
                nom = csv_file[UEs[1]+f][6]
                coef = list_a_coef[typem]
                typenote = TypeEvaluation(nom,coef,1)
                listetypen.append(typenote)
                f = f+1
            nommat = matiere[0]
            poidmat = float(matiere[2].strip('%'))/100.0
            eC = Matiere(nommat, poidmat, listetypen)
            listeEC.append(eC)
        nomue = UEs[0]
        crd = csv_file[UEs[1]][3]
        uEu = UE(nomue, listeEC, crd)
        listeUEs.append(uEu)
    lg = len(csv_name)
    index = csv_name.find('csv/')
    promotion_name = csv_name[index+4:lg-4]
    promotion = Promotion(promotion_name, listeUEs)
    return promotion



def python_too_js(promotion):
    text = f"export const {promotion.nom} = new Promotion('{promotion.nom}', [\n"

    for ue in promotion.liste_UE:
        text += f"    new UE('{ue.nom.split('\n')[0].replace("'", r"\'")}', [\n"
        
        for matiere in ue.liste_matieres:
            try:
                text += f"        new Matiere('{matiere.nom.replace("'", r"\'")}', {matiere.poid_matiere}, [\n"
            except:
                text += f"        new Matiere('{matiere.nom.replace("'", r"\'")}', {matiere.poid_matiere.replace(',','.')}, [\n"
            
            for evaluation in matiere.liste_types_evaluation:
                try:
                    text += f"            new TypeEvaluation('{evaluation.nom.replace("'", r"\'")}', {evaluation.coef.replace(',','.')}, {evaluation.nombre_de_notes}),\n"
                except:
                    text += f"            new TypeEvaluation('{evaluation.nom.replace("'", r"\'")}', {evaluation.coef}, {evaluation.nombre_de_notes}),\n"

            text += "        ]),\n"
        
        text += "    ], {}),\n".format(ue.credits)

    text += "]);"

    print(text)       

        
#promotion = csv1('C:/Users/William Ghibaudo/Desktop/projet william/web_project/app_site_ecam/z-classe csv/NOTES_EU_S6.csv')
promotion = csv3('C:/Users/william/Desktop/app_site_ecam/ENG4.csv')
python_too_js(promotion)
        