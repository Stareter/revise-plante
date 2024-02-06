var plantes = [
    { scientifique: "Sorbus torminalis", commun: "Alisier torminal" },
    { scientifique: "Carpinus betulus", commun: "Charme" },
    { scientifique: "Castanea sativa", commun: "Châtaignier" },
    { scientifique: "Sorbus domestica", commun: "Sorbier" },
    { scientifique: "Ulmus lutèce", commun: "Orme lutèce" },
    { scientifique: "Pyrus pyraster", commun: "Poirier sauvage" },
    { scientifique: "Malus sylvestris", commun: "Pommier sauvage" },
    { scientifique: "Tilia cordata", commun: "Tilleul à petites feuilles" },
    { scientifique: "Quercus robur", commun: "Chêne pédonculé" },
    { scientifique: "Juglans régia", commun: "Noyer" },
    { scientifique: "Prunus avium", commun: "Merisier" },
    { scientifique: "Acer campestre", commun: "Erable champêtre" },
    { scientifique: "Acer platanoïdes", commun: "Erable plane" },
    { scientifique: "Acer pseudoplatanus", commun: "Erable sycomore" },
    { scientifique: "Mespilus germanica", commun: "Néflier" },
    { scientifique: "Cornus sanguinea", commun: "Cornouiller sanguin" },
    { scientifique: "Euonymus europaeus", commun: "Fusain d'Europe" },
    { scientifique: "Syringa vulgaris", commun: "Lilas commun" },
    { scientifique: "Rosa canina", commun: "Rosier des chiens" },
    { scientifique: "Corylus avellana", commun: "Noisetier" },
    { scientifique: "Prunus spinosa", commun: "Prunellier" },
    { scientifique: "Sambucus nigra", commun: "Sureau noir" },
    { scientifique: "Ligustrum vulgare", commun: "Troène commun" },
    { scientifique: "Viburnum opulus", commun: "Viorne obier" },
    { scientifique: "Salix atrocinera", commun: "Saule roux" },
    { scientifique: "Crataegus monogyna", commun: "Aubépine monogyne" }
  ];

  // Mélangez la liste des plantes
  shuffleArray(plantes);

var isGameOver = false;
var currentPlantIndex = 0;
var score = 0;
var incorrectCount = 0;

function startGame() {
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("questionContainer").style.display = "block";
    displayNextPlant();
}

function displayNextPlant() {
    if (currentPlantIndex < plantes.length) {
        document.getElementById("question").innerHTML = "Nom scientifique de la plante : " + plantes[currentPlantIndex].scientifique;
        document.getElementById("inputField").value = "";
        document.getElementById("result").innerHTML = "";
        document.getElementById("continueBtn").style.display = "none";
    } else {
        endGame();
    }
}

function normalizeString(str) {
    return str.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "");
}

function checkAnswer() {
    if (isGameOver) return;

    var userAnswer = normalizeString(document.getElementById("inputField").value.trim());
    var currentAnswer = normalizeString(plantes[currentPlantIndex].commun);
    var resultElement = document.getElementById("result");
    var continueBtn = document.getElementById("continueBtn");

    if (userAnswer === currentAnswer) {
        resultElement.innerHTML = "Bonne réponse ! Cliquez sur Continuer.";
        resultElement.className = "correct";
        score++;
        continueBtn.style.display = "inline-block";
    } else {
        resultElement.innerHTML = "Mauvaise réponse. La réponse correcte est : " + plantes[currentPlantIndex].commun;
        resultElement.className = "incorrect";
        continueBtn.style.display = "inline-block";
        incorrectCount++;
    }

    continueBtn.onclick = function () {
        currentPlantIndex++;
        continueBtn.style.display = "none";
        displayNextPlant();
    };

    if (currentPlantIndex === plantes.length) {
        endGame();
    }
}

function endGame() {
    isGameOver = true;
    document.getElementById("questionContainer").style.display = "none";
    document.getElementById("scoreContainer").style.display = "block";

    var successPercentage = ((score / plantes.length) * 100).toFixed(2) + "%";
    document.getElementById("successPercentage").innerHTML = successPercentage;
    document.getElementById("errorCount").innerHTML = incorrectCount;
}

function restartGame() {
    isGameOver = false;
    currentPlantIndex = 0;
    score = 0;
    incorrectCount = 0;

    document.getElementById("startBtn").style.display = "inline-block";
    document.getElementById("scoreContainer").style.display = "none";

    shuffleArray(plantes);
    displayNextPlant();
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
