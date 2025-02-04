// Geluiden instellen
const clickSound = new Audio("sounds/click.mp3");
const resultSound = new Audio("sounds/result.mp3");
const oofSound = new Audio("sounds/sad.mp3");
const jippieSound = new Audio("sounds/jippie.mp3");

// Achtergrondmuziek
const backgroundMusic = new Audio("sounds/background-music.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;
backgroundMusic.play();

// Functie voor random percentage
function getRandomLovePercentage() {
    return Math.floor(Math.random() * 101); // 0 t/m 100%
}

// Functie voor bijpassend bericht
function getLoveMessage(percentage) {
    if (percentage > 90) return "Jullie zijn een match made in heaven! 💕";
    if (percentage > 75) return "Jullie zijn een geweldig stel! 😍";
    if (percentage > 50) return "Er is zeker chemie! 🔥";
    if (percentage > 30) return "Misschien een leuke vriendschap? 😊";
    return "Jullie zijn beter als vrienden... 💔";
}

// Functie om de test op te slaan
function saveLoveResult(birth1, birth2, percentage, message) {
    const resultData = { birth1, birth2, percentage, message };
    localStorage.setItem("loveResult", JSON.stringify(resultData));
}

// Functie om laatste test op te halen
function loadLastResult() {
    const savedResult = localStorage.getItem("loveResult");
    if (savedResult) {
        const { birth1, birth2, percentage, message } = JSON.parse(savedResult);
        document.getElementById("resultDiv").innerHTML = `
            <h2>${birth1} ❤️ ${birth2}</h2>
            <h3>${percentage}%</h3>
            <p>${message}</p>
        `;
    }
}

// Eventlistener voor de knop
document.getElementById("matchButton").addEventListener("click", function () {
    event.preventDefault();

    const birth1 = document.getElementById("birth1").value;
    const birth2 = document.getElementById("birth2").value;

    if (!birth1 || !birth2) {
        alert("Vul beide geboortedata in!");
        return;
    }

    const percentage = getRandomLovePercentage();
    const message = getLoveMessage(percentage);

    clickSound.play();

    document.getElementById("resultDiv").innerHTML = `
        <h2>${birth1} ❤️ ${birth2}</h2>
        <h3>${percentage}%</h3>
        <p>${message}</p>
    `;

    setTimeout(() => resultSound.play(), 500);

    if (percentage < 40) {
        oofSound.play();
    } else {
        jippieSound.play();
    }

    saveLoveResult(birth1, birth2, percentage, message);
});

// Laad laatste resultaat bij pagina-opstart
window.onload = loadLastResult;
