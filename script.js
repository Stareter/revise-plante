// Liste des plantes pour le premier jour
var plantesJour1 = [
    { scientifique: "Acer davidii", commun: "Erable du Père David" },
    { scientifique: "Albizia julibrissin", commun: "Arbre à soie" },
    { scientifique: "Betula pubescens", commun: "Bouleau pubescent" },
    { scientifique: "Cercis siliquastrum", commun: "Arbre de Judée" },
    { scientifique: "Cupressus sempervirens", commun: "Cyprès totem" },
    { scientifique: "Eriobotrya japonica", commun: "Néflier du Japon" },
    { scientifique: "Lagerstroemia indica", commun: "Lilas des Indes" },
    { scientifique: "Prunus lusitanica", commun: "Laurier du Portugal" },
    { scientifique: "Robinia pseudoacacia 'Frisia'", commun: "Robinier faux acacia doré" },
    { scientifique: "Robinia pseudoacacia 'Lace Lady'", commun: "Robinier Twisty Baby" }
];

// Liste des plantes pour le deuxième jour
var plantesJour2 = [
    { scientifique: "Acer palmatum", commun: "Erable japonais" },
    { scientifique: "Acer palmatum 'Garnet'", commun: "Erable japonais Garnet" },
    { scientifique: "Acer pseudoplatanus 'Astropurpureum'", commun: "Erable sycomore Atropurpureum" },
    { scientifique: "Arbutus unedo", commun: "Arbousier" },
    { scientifique: "Carpinus betulus 'Fastigiata'", commun: "Charme fastigié" },
    { scientifique: "Cedrus atlantica 'Glauca'", commun: "Cèdre bleu de l'Atlas" },
    { scientifique: "Cornus controversa 'Variegata'", commun: "Cornouiller des pagodes variegata" },
    { scientifique: "Cupressus arizonica", commun: "Cyprès de l'Arizona" },
    { scientifique: "Eleagnus angustifolia", commun: "Olivier de Bohême" },
    { scientifique: "Salix babylonica 'Tortuosa'", commun: "Saule de Babylone tortueux" },
    { scientifique: "Taxus baccata 'Fastigiata'", commun: "Ifs communs fastigiata" },
    { scientifique: "Thuja occidentalis", commun: "Thuya d'Occident" }
];

// Variable pour stocker la liste sélectionnée
var plantesActuelles = [];
var isGameOver = false;
var currentPlantIndex = 0;
var score = 0;
var incorrectCount = 0;

// Fonction pour choisir la liste du jour et démarrer le jeu
function choisirListeJour(jour) {
    if (jour === 1) {
        plantesActuelles = plantesJour1;
    } else if (jour === 2) {
        plantesActuelles = plantesJour2;
    }

    // Mélanger la liste et démarrer le jeu
    shuffleArray(plantesActuelles);
    startGame();
}

// Fonction pour mélanger un tableau (utilisée pour mélanger la liste des plantes)
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


// Fonction pour démarrer le jeu
function startGame() {
    // Masquer les boutons de sélection de la liste et le texte d'instructions
    document.getElementById("startBtnJour1").style.display = "none";
    document.getElementById("startBtnJour2").style.display = "none";
    document.getElementById("instructionText").style.display = "none";  // Masquer la phrase d'instructions

    // Afficher le conteneur des questions
    document.getElementById("questionContainer").style.display = "block";
    displayNextPlant();
}

// Afficher la plante suivante dans le jeu
function displayNextPlant() {
    if (currentPlantIndex < plantesActuelles.length) {
        document.getElementById("question").innerHTML = "Nom scientifique de la plante : " + plantesActuelles[currentPlantIndex].scientifique;
        document.getElementById("inputField").value = "";
        document.getElementById("result").innerHTML = "";
        document.getElementById("continueBtn").style.display = "none";
    } else {
        endGame();
    }
}

// Normaliser une chaîne de caractères (supprimer les accents, etc.)
function normalizeString(str) {
    return str.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "");
}

// Vérifier la réponse de l'utilisateur
function checkAnswer() {
    if (isGameOver) return;

    var userAnswer = normalizeString(document.getElementById("inputField").value.trim());
    var currentAnswer = normalizeString(plantesActuelles[currentPlantIndex].commun);
    var resultElement = document.getElementById("result");
    var continueBtn = document.getElementById("continueBtn");

    if (userAnswer === currentAnswer) {
        resultElement.innerHTML = "Bonne réponse ! Cliquez sur Continuer.";
        resultElement.className = "correct";
        score++;
        continueBtn.style.display = "inline-block";
    } else {
        resultElement.innerHTML = "Mauvaise réponse. La réponse correcte est : " + plantesActuelles[currentPlantIndex].commun;
        resultElement.className = "incorrect";
        continueBtn.style.display = "inline-block";
        incorrectCount++;
    }

    continueBtn.onclick = function () {
        currentPlantIndex++;
        continueBtn.style.display = "none";
        displayNextPlant();
    };

    if (currentPlantIndex === plantesActuelles.length) {
        endGame();
    }
}

// Fonction pour terminer le jeu
function endGame() {
    isGameOver = true;
    document.getElementById("questionContainer").style.display = "none";
    document.getElementById("scoreContainer").style.display = "block";

    var successPercentage = ((score / plantesActuelles.length) * 100).toFixed(2) + "%";
    document.getElementById("successPercentage").innerHTML = successPercentage;
    document.getElementById("errorCount").innerHTML = incorrectCount;
    document.getElementById("totalQuestions").innerHTML = plantesActuelles.length;
}

// Redémarrer le jeu
function restartGame() {
    isGameOver = false;
    currentPlantIndex = 0;
    score = 0;
    incorrectCount = 0;

    document.getElementById("questionContainer").style.display = "none";
    document.getElementById("scoreContainer").style.display = "none";
    document.getElementById("startBtnJour1").style.display = "inline-block";
    document.getElementById("startBtnJour2").style.display = "inline-block";
    document.getElementById("instructionText").style.display = "block"; // Réafficher le texte d'instruction
}
/// Fonction pour revenir au menu principal
function backToMenu() {
    isGameOver = false;
    currentPlantIndex = 0;
    score = 0;
    incorrectCount = 0;

    // Réinitialiser l'affichage
    document.getElementById("questionContainer").style.display = "none";  // Masquer les questions
    document.getElementById("scoreContainer").style.display = "none";     // Masquer le score
    document.getElementById("startBtnJour1").style.display = "inline-block";  // Réafficher le bouton pour jour 1
    document.getElementById("startBtnJour2").style.display = "inline-block";  // Réafficher le bouton pour jour 2
    document.getElementById("instructionText").style.display = "block";   // Réafficher le texte d'instruction
}

