
const burger = document.getElementById('header_burger');
const menu = document.getElementById('header_menu_mob');
const closeMenu = document.getElementById('close_menu');

// Открытие меню
burger.addEventListener('click', () => {
  menu.classList.add('active');
});

// Закрытие по крестику
closeMenu.addEventListener('click', () => {
  menu.classList.remove('active');
});

// Закрытие при клике вне меню
document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && !burger.contains(e.target)) {
    menu.classList.remove('active');
  }
});

// Закрытие при выборе пункта меню
const menuLinks = menu.querySelectorAll('a'); // или добавь класс, напр. .menu-item

menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('active');
  });
});