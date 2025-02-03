// Geluiden voor klikken, resultaat, oof, en jippie
const clickSound = new Audio("sounds/click.mp3");  // Klikgeluid
const resultSound = new Audio("sounds/result.mp3");  // Resultaatgeluid
const oofSound = new Audio("sounds/oof.mp3");  // Geluid voor lage score
const jippieSound = new Audio("sounds/jippie.mp3");  // Geluid voor hoge score

// Achtergrondmuziek die in een loop afspeelt
const backgroundMusic = new Audio("sounds/background-music.mp3"); // Laad de achtergrondmuziek
backgroundMusic.loop = true;  // Zet de muziek op herhalen (loop)
backgroundMusic.volume = 0.5; // Zet het volume naar 50% (je kunt dit aanpassen)

// Start de achtergrondmuziek direct bij het openen van de pagina
backgroundMusic.play();

// Functie om een willekeurig percentage tussen 10% en 100% te maken
function getRandomLovePercentage() {
    return Math.floor(Math.random() * 91) + 10; // 10 t/m 100%
}

// Functie om een passend bericht te geven bij de score
function getLoveMessage(percentage) {
    if (percentage > 90) return "Jullie zijn een match made in heaven! 💕";
    if (percentage > 75) return "Jullie zijn een geweldig stel! 😍";
    if (percentage > 50) return "Er is zeker chemie! 🔥";
    if (percentage > 30) return "Misschien een leuke vriendschap? 😊";
    return "Jullie zijn beter als vrienden... 💔";
}

// Functie om de test op te slaan in de browser (zodat je het later nog kunt zien)
function saveLoveResult(name1, name2, percentage, message) {
    const resultData = { name1, name2, percentage, message }; // Een object met de resultaten
    localStorage.setItem("loveResult", JSON.stringify(resultData)); // Opslaan in LocalStorage
}

// Functie om de laatste test op te halen (wanneer de pagina wordt geladen)
function loadLastResult() {
    const savedResult = localStorage.getItem("loveResult"); // Haalt de vorige test op
    if (savedResult) {
        const { name1, name2, percentage, message } = JSON.parse(savedResult); // Zet het om naar tekst
        resultDiv.innerHTML = `<h2>${name1} ❤️ ${name2}</h2>
                               <h3>Liefdespercentage: ${percentage}%</h3>
                               <p>${message}</p>`;
    }
}

// Functie die start als iemand op "Test onze liefde" klikt
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Voorkomt herladen van de pagina

    // Haal de namen van de gebruikers op
    const name1 = document.getElementById("name1").value;
    const name2 = document.getElementById("name2").value;

    // Genereer een willekeurig percentage en een passend bericht
    const percentage = getRandomLovePercentage();
    const message = getLoveMessage(percentage);

    // Speel klikgeluid af
    clickSound.play();

    // Toon het resultaat op de pagina
    resultDiv.innerHTML = `<h2>${name1} ❤️ ${name2}</h2>
                           <h3>${percentage}%</h3>
                           <p>${message}</p>`;

    // Speel resultaat-geluid af na 500ms (om vertraging toe te voegen)
    setTimeout(() => resultSound.play(), 500);

    // peel het juiste geluid af afhankelijk van het percentage
    if (percentage < 40) {
        oofSound.play();  // Speel het "oof"-geluid af voor lage percentages
    } else {
        jippieSound.play();  // Speel het "jippie"-geluid af voor hoge percentages
    }

    // Sla het resultaat op in de browser
    saveLoveResult(name1, name2, percentage, message);
});

// Laad het laatste resultaat als de pagina opent
window.onload = loadLastResult;
