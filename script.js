const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('open');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const themeButton = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') document.documentElement.dataset.theme = 'dark';
const syncThemeButton = () => {
  const isDark = document.documentElement.dataset.theme === 'dark';
  themeButton.setAttribute('aria-pressed', String(isDark));
  themeButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  themeButton.textContent = isDark ? String.fromCharCode(9728) : String.fromCharCode(9782);
};
syncThemeButton();
themeButton.addEventListener('click', () => {
  const isDark = document.documentElement.dataset.theme !== 'dark';
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  syncThemeButton();
});

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = new FormData(event.currentTarget);
  const body = [
    `Name: ${fields.get('name')}`,
    `Email: ${fields.get('email')}`,
    `Phone: ${fields.get('phone') || 'Not provided'}`,
    '',
    String(fields.get('message'))
  ].join('\n');
  window.location.href = `mailto:vanthalasimhadribabu@gamil.com?subject=${encodeURIComponent('Portfolio contact')}&body=${encodeURIComponent(body)}`;
});

// Discourage casual saving of the displayed portrait. This cannot prevent
// screenshots or access through browser developer tools.
document.querySelectorAll('.portrait-placeholder img').forEach((image) => {
  image.draggable = false;
  image.addEventListener('contextmenu', (event) => event.preventDefault());
  image.addEventListener('dragstart', (event) => event.preventDefault());
});

