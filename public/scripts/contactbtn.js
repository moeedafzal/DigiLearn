const contactBtn = document.getElementById('contactBtn');
const loginPopup = document.getElementById('loginPopup');
const closeBtn = document.getElementById('closeBtn');

contactBtn.addEventListener('click', () => {
    loginPopup.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    loginPopup.style.display = 'none';
    console.log("close")
});
