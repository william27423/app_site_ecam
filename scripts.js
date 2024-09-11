function calculerMoyenne() {
    // Récupère les valeurs des champs de saisie
    let nombre1 = parseFloat(document.getElementById("nombre1").value);
    let nombre2 = parseFloat(document.getElementById("nombre2").value);

    // Vérifie que les deux valeurs sont bien des nombres et dans la plage de 0 à 20
    if (isNaN(nombre1) || isNaN(nombre2) || nombre1 < 0 || nombre1 > 20 || nombre2 < 0 || nombre2 > 20) {
        alert("Veuillez entrer deux nombres valides entre 0 et 20.");
        return;
    }

    // Calcule la moyenne
    let moyenne = (nombre1 + nombre2) / 2;

    // Affiche la moyenne dans le paragraphe avec l'id "resultat"
    document.getElementById("resultat").innerHTML = "La moyenne est : " + moyenne;
}
