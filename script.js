
const outcomes = [
  { type: "No Prize", image: "assets/no-prize.png", message: "No prize this time. Try again!", weight: 60 },
  { type: "1x Toy", image: "assets/fidget.png", message: "You won 1 Fidget or Squishy Toy!", weight: 20 },
  { type: "2x Toys", image: "assets/fidget.png", message: "You won 2 Fidgets or Squishies!", weight: 10 },
  { type: "3x Toys", image: "assets/fidget.png", message: "Jackpot! 3 Fidgets or Squishies!", weight: 6 },
  { type: "Bluey Game", image: "assets/bluey.png", message: "30 minutes of Bluey Game on iPad!", weight: 3 },
  { type: "Crumbl Cookie", image: "assets/cookie.png", message: "$10 Crumbl Cookie Gift Card!", weight: 1 }
];

const reels = [document.getElementById('reel1'), document.getElementById('reel2'), document.getElementById('reel3')];
const spinBtn = document.getElementById('spin');
const resultDiv = document.getElementById('result');
const spinSound = new Audio('assets/spin.mp3');

function weightedOutcome() {
  const totalWeight = outcomes.reduce((sum, o) => sum + o.weight, 0);
  let rand = Math.floor(Math.random() * totalWeight);
  for (let outcome of outcomes) {
    if (rand < outcome.weight) return outcome;
    rand -= outcome.weight;
  }
}

function simulateSpin(outcome) {
  reels.forEach((reel, i) => {
    reel.innerHTML = `<img src="${outcome.image}" alt="${outcome.type}" />`;
  });
  resultDiv.innerHTML = outcome.message;
}

spinBtn.addEventListener('click', () => {
  spinSound.play();
  resultDiv.textContent = "Spinning...";
  reels.forEach(reel => reel.innerHTML = "?");
  setTimeout(() => {
    const outcome = weightedOutcome();
    simulateSpin(outcome);
  }, 1000);
});
