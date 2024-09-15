// calculMoyenne.js

export function calculerMoyenne() {
    let nombre1 = parseFloat(document.getElementById("nombre1").value);
    let coef1 = parseInt(document.getElementById("coef1").value);
    let nombre2 = parseFloat(document.getElementById("nombre2").value);
    let coef2 = parseInt(document.getElementById("coef2").value);

    if (isNaN(nombre1) || isNaN(nombre2) || nombre1 < 0 || nombre1 > 20 || nombre2 < 0 || nombre2 > 20) {
        alert("Veuillez entrer deux nombres valides entre 0 et 20.");
        return;
    }

    let sommeNotes = nombre1 * coef1 + nombre2 * coef2;
    let sommeCoefficients = coef1 + coef2;
    let moyenne = sommeNotes / sommeCoefficients;

    document.getElementById("resultat").textContent = "La moyenne est : " + moyenne.toFixed(2);
}
