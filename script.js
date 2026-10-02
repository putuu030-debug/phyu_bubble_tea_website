const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle?.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const spinBtn = document.getElementById('spinBtn');
const referral = document.getElementById('referral');
const wheel = document.getElementById('wheel');
const result = document.getElementById('spinResult');

const prizes = ['10% Off', 'Free Topping', 'Free Snack', '5% Off', 'Try Again', 'Free Boba'];

// Only these 6 referral codes are allowed
const validCodes = ['PHYU818', 'ZENIN818', 'YOIJG188', 'FHJJH199', 'VYJK199', 'KHJI929'];

let spinning = false;
let rotation = 0;

// Check if this device has already spun on page load
const savedPrize = localStorage.getItem('phyu_won_prize');
if (savedPrize) {
  result.textContent = `🎉 You already spun and won: ${savedPrize}! Show this screen at Phyu's.`;
  spinBtn.disabled = true;
  spinBtn.style.opacity = '.6';
}

spinBtn.addEventListener('click', () => {
  if (spinning) return;

  // Rule 1: Check if this device has already used a code
  if (localStorage.getItem('phyu_has_spun')) {
    result.textContent = '⚠️ This device has already used a referral code to spin!';
    return;
  }

  const enteredCode = referral.value.trim().toUpperCase();

  // Rule 2: Check if input is empty
  if (!enteredCode) {
    result.textContent = 'Please enter a referral code first 💖';
    referral.focus();
    return;
  }

  // Rule 3: Check if the entered code is one of the 6 allowed codes
  if (!validCodes.includes(enteredCode)) {
    result.textContent = '❌ Invalid code! Only official referral codes are allowed.';
    referral.focus();
    return;
  }

  // Lock the device immediately so it cannot be used again
  localStorage.setItem('phyu_has_spun', 'true');
  localStorage.setItem('phyu_used_code', enteredCode);

  spinning = true;
  spinBtn.disabled = true;
  spinBtn.style.opacity = '.6';

  const index = Math.floor(Math.random() * prizes.length);
  const extra = 1440 + Math.floor(Math.random() * 720);
  rotation += extra + (360 - (index * 60 + 30));
  wheel.style.transform = `rotate(${rotation}deg)`;
  result.textContent = 'Spinning… good luck! 🎡';

  setTimeout(() => {
    const prizeWon = prizes[index];
    // Save prize to device memory so refreshing won't reset it
    localStorage.setItem('phyu_won_prize', prizeWon);
    result.textContent = `🎉 You won: ${prizeWon}! Show this screen at Phyu's.`;
    spinning = false;
  }, 4100);
});
