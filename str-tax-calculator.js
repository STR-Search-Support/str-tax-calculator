
function waitForElement(selector, callback) {
  const el = document.querySelector(selector);
  if (el) {
    callback(el);
  } else {
    setTimeout(() => waitForElement(selector, callback), 100);
  }
}

function launchEmojiConfetti() {
  const container = document.getElementById("emoji-confetti-container");
  const emojis = ["💵", "💸"];
  const count = 30;
  for (let i = 0; i < count; i++) {
    const emoji = document.createElement("div");
    emoji.classList.add("emoji-confetti");
    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = `${Math.random() * 100}%`;
    container.appendChild(emoji);
    setTimeout(() => emoji.remove(), 3000);
  }
}

function animateSavings(target, value) {
  let start = 0;
  const duration = 1200;
  const startTime = performance.now();
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const formatted = Math.round(value * progress).toLocaleString();
    target.innerText = `$${formatted}`;
    if (progress < 1) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

function showCTAButton() {
  const cta = document.getElementById("cta-button");
  const currentParams = window.location.search;
  const baseURL = "https://strsearch.com/calc-booking";
  cta.href = `${baseURL}${currentParams}`;
  document.getElementById("cta-container").classList.add("reveal-callout");
}

waitForElement('#calculateBtn', function () {
  document.getElementById('calculateBtn').addEventListener('click', function () {
    const taxRate = parseFloat(document.getElementById('taxRate').value) / 100;
    const improvementBasisRaw = document.getElementById('improvementBasis').value.replace(/[$,]/g, '');
    const improvementBasis = parseFloat(improvementBasisRaw);
    const bonusAmount = parseFloat(document.getElementById('bonusAmount').value) / 100;

    if (isNaN(taxRate) || isNaN(improvementBasis) || isNaN(bonusAmount)) {
      alert("Please ensure all input fields are valid.");
      return;
    }

    const sla = improvementBasis * 0.30;
    const year1Loss = sla * bonusAmount;
    const taxSavings = year1Loss * taxRate;

    document.getElementById('improvementBasis').value = improvementBasis.toLocaleString();
    document.getElementById('sla').value = sla.toLocaleString(undefined, { maximumFractionDigits: 0 });
    document.getElementById('loss').value = year1Loss.toLocaleString(undefined, { maximumFractionDigits: 0 });

    const savingsEl = document.getElementById('savings-big');
    const savingsCard = document.getElementById('savings-callout');
    animateSavings(savingsEl, taxSavings);
    savingsCard.classList.remove('hidden-callout');
    savingsCard.classList.add('reveal-callout');

    document.getElementById('resultFields').classList.remove('hidden');
    document.getElementById('resultFields').classList.add('fade-in');
    launchEmojiConfetti();

    setTimeout(showCTAButton, 800);
  });
});
