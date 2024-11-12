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

// Sauvegarder l'URL de la dernière page visitée à chaque navigation
window.addEventListener('beforeunload', () => {
  const currentPage = window.location.href; // URL de la page actuelle
  localStorage.setItem('lastVisitedPage', currentPage); // Sauvegarde dans localStorage
});

// Restaurer l'URL de la dernière page visitée au chargement du site
window.addEventListener('load', () => {
  const lastVisitedPage = localStorage.getItem('lastVisitedPage');
  if (lastVisitedPage && lastVisitedPage !== window.location.href) {
    window.location.href = lastVisitedPage; // Rediriger vers la dernière page visitée
  }
});

// Fonction pour sauvegarder les notes et autres données dans le localStorage
export function saveData() {
  const notes = [];
  document.querySelectorAll('.note_coef').forEach((noteCoef) => {
    const note = noteCoef.querySelector('.note');
    const coef = noteCoef.querySelector('.coef').value;
    const notage = note.value;
    const ids = note.id;
    notes.push({ ids, notage, coef });
  });
  console.log('Saving data:', notes); // Afficher les données sauvegardées dans la console
  localStorage.setItem('userNotes', JSON.stringify(notes)); // Sauvegarder dans le localStorage
}

// Fonction pour charger les notes depuis le localStorage
function loadData() {
  const savedNotes = JSON.parse(localStorage.getItem('userNotes'));
  console.log('Loading data:', savedNotes);  // Ligne de test
  if (savedNotes) {
    savedNotes.forEach((item) => {
      const note = document.getElementById(item.ids);
      const parentDiv = note.parentElement;
      const coef = parentDiv.children[1];
      console.log(coef)
      if (note) {
        note.value = item.notage;
        coef.value = item.coef;
      }
    });
  }
}

// Appel des fonctions pour sauvegarder à chaque modification et charger lors du chargement de la page
document.querySelectorAll('.note, .coef').forEach((input) => {
  input.addEventListener('input', saveData);
});

// Charger les données lors du chargement de la page
window.addEventListener('load', loadData);
