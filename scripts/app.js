
// Enregistrement du Service Worker pour gérer le cache et la disponibilité hors ligne
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceWorker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// Fonction pour sauvegarder les notes et autres données dans le localStorage
export function saveData(note, coef) {
  console.log('Saving data: mode');

  // Récupérer les données existantes depuis localStorage
  let storedData = JSON.parse(localStorage.getItem('appData')) || { notes: [], savedHtml: [] };
  const notes = storedData.notes;

  const coefV = coef.value;
  const notage = note.value;
  const ids = note.id;

  let index;
  let idExiste = false;
  let elementTrouve = null;
  for (let i = 0; i < notes.length; i++) {
    const item = notes[i];
    if (item.ids === ids) {
      idExiste = true;
      elementTrouve = item;
      index = i;
      break;
    }
  }

  if (!idExiste) {
    notes.push({ ids, notage, coefV });
    console.log('Saving data:', notes);
  } else if (idExiste && (elementTrouve.notage !== notage || elementTrouve.coefV !== coefV)) {
    notes.splice(index, 1);
    notes.push({ ids, notage, coefV });
    console.log('Updating data:', notes);
  }

  // Mettre à jour la partie notes de `storedData` et sauvegarder
  storedData.notes = notes;
  localStorage.setItem('appData', JSON.stringify(storedData));
}

export function saveHtmlContent(htmldiv) {
  let storedData = JSON.parse(localStorage.getItem('appData')) || { notes: [], savedHtml: [] };
  const savedHtml = storedData.savedHtml;

  const Promotion = htmldiv.parentElement.parentElement.parentElement.parentElement;
  const Promotionid = Promotion.id;
  const matiereId = htmldiv.parentElement.id;
  const htmlContent = htmldiv.outerHTML; // Convertir en chaîne HTML
  
  const htmlid = htmldiv.children[0].id;

  const element = { Promotionid, matiereId, htmlContent, htmlid };
  savedHtml.push(element);

  // Mettre à jour la partie savedHtml de `storedData` et sauvegarder
  storedData.savedHtml = savedHtml;
  localStorage.setItem('appData', JSON.stringify(storedData));
  console.log("Contenu HTML sauvegardé :", savedHtml);
}

function loadHtmlContent() {
  const storedData = JSON.parse(localStorage.getItem('appData'));
  const savedHtml = storedData ? storedData.savedHtml : [];
  const PromotionDiv = document.querySelector(".Promotion");
  console.log("Contenu HTML chargé 0:", savedHtml);

  if (savedHtml) {
    savedHtml.forEach((item) => {
      console.log(item.Promotionid)
      console.log(PromotionDiv.id)
      if (item.Promotionid == PromotionDiv.id) {
        const matiereDiv = document.getElementById(item.matiereId);
        const newElement = document.createElement('div');
        newElement.innerHTML = item.htmlContent;
        matiereDiv.insertBefore(newElement.firstChild, matiereDiv.lastElementChild);
      }
    });
    console.log("Contenu HTML chargé :", savedHtml);
  } else {
    console.log("Aucun contenu HTML à charger.");
  }
}

// Fonction pour charger les notes depuis le localStorage
function loadData() {
  const storedData = JSON.parse(localStorage.getItem('appData'));
  const savedNotes = storedData ? storedData.notes : [];
  console.log('Loading data:', storedData);

  console.log('Loading data:', savedNotes);
  if (savedNotes) {
    savedNotes.forEach((item) => {
      const note = document.getElementById(item.ids);
      if (note) {
        console.log(note.id)
        const parentDiv = note.parentElement;
        const coef = parentDiv.children[1];
        note.value = item.notage;
        coef.value = item.coefV;
      }
    });
  }
}


function clear(){
  const storedData = JSON.parse(localStorage.getItem('appData'));
  let Promotionid = document.querySelector(".Promotion").id;
  const savedNotes = storedData ? storedData.notes : [];
  const savedHtml = storedData ? storedData.savedHtml : [];
  console.log(storedData);
  console.log(savedHtml);
  const partiel_list_n = []
  savedNotes.forEach((item, index) =>{
    const note = document.getElementById(item.ids);
    if (note) {
      console.log(note)
      console.log("Après :", note.input);
      note.value = '';
      console.log("Après :", note.input);


    }
    else{
      partiel_list_n.push(item);
    }
  });
  const partiel_list = []
  savedHtml.forEach((item, index) =>{
    console.log(item)
    if (item.Promotionid == Promotionid) {
      console.log(item.htmlid)
      const htmldiv = document.getElementById(item.htmlid).parentElement;
      htmldiv.remove();
    }
    else{
      partiel_list.push(item)
    }
  });
  console.log(partiel_list_n)
  storedData.notes = partiel_list_n;
  storedData.savedHtml = partiel_list;
  localStorage.setItem('appData', JSON.stringify(storedData));
  console.log("Contenu HTML clear :", Promotionid);

  
}

 


const classes = document.querySelectorAll('.dropdown-item')
classes.forEach((item) => {
  item.addEventListener('click', () => {
    setTimeout(() => {
      loadHtmlContent();
      console.log("Cela se produit après 0.1 secondes");
      loadData();
    }, 100); 
  })
});

// Appel des fonctions pour sauvegarder à chaque modification et charger lors du chargement de la page
document.querySelectorAll('.note, .coef').forEach((input) => {
  const noteCoef = input.parentElement;
  const note = noteCoef.children[0];
  const coef = noteCoef.children[1];

  note.addEventListener('input',() => saveData(note, coef));
  coef.addEventListener('input',() => saveData(note, coef));
});

const buttonClear = document.querySelector(".clear")
buttonClear.addEventListener('click', ()=>{
  clear();
});

// Charger les données lors du chargement de la page
window.addEventListener('load', ()=>{
  loadHtmlContent();
  loadData();
});