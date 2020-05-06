document.getElementById('gameoverScore').innerText = localStorage.getItem("finalScore");

let finalScoreV = localStorage.getItem("finalScore");

if (finalScoreV < 18) {
    document.getElementById('finalmsg').innerText = `'${finalScoreV}' Oops!! I'd personally try to not remain mediocre!☹️`;
} else if (finalScoreV >= 20  && finalScoreV < 40) {
    document.getElementById('finalmsg').innerText = `Nice try, but you should practice more to score better than your current '${finalScoreV}' score!😃`;
} else {
    document.getElementById('finalmsg').innerText = `'${finalScoreV}'! ✔✔✔ Now that's someone who studies!😃`;
}
