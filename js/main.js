// слайдер
const slider = document.getElementById('slider');
const leftBtn = document.querySelector('.slider-btn.left');
const rightBtn = document.querySelector('.slider-btn.right');


const scrollStep = slider.clientWidth;
let autoScrollInterval;

// Ручная прокрутка
leftBtn.onclick = () => slider.scrollBy({ left: -scrollStep, behavior: 'smooth' });
rightBtn.onclick = () => slider.scrollBy({ left: scrollStep, behavior: 'smooth' });

// Автопрокрутка
function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
      slider.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: scrollStep, behavior: 'smooth' });
    }
  }, 3000);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Запускаем автопрокрутку при загрузке
window.addEventListener('DOMContentLoaded', startAutoScroll);

// Остановка автопрокрутки при наведении (на десктопе)
slider.addEventListener('mouseenter', stopAutoScroll);
slider.addEventListener('mouseleave', startAutoScroll);

// === 📱 Добавляем поддержку свайпа (touch-события) ===

let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  stopAutoScroll(); // остановим автопрокрутку на свайпе
}, { passive: true });

slider.addEventListener('touchmove', e => {
  touchEndX = e.touches[0].clientX;
}, { passive: true });

slider.addEventListener('touchend', () => {
  const deltaX = touchStartX - touchEndX;

  if (Math.abs(deltaX) > 50) {
    if (deltaX > 0) {
      // свайп влево
      slider.scrollBy({ left: scrollStep, behavior: 'smooth' });
    } else {
      // свайп вправо
      slider.scrollBy({ left: -scrollStep, behavior: 'smooth' });
    }
  }

  // Перезапускаем автопрокрутку через паузу
  setTimeout(startAutoScroll, 2000);
});

//стрелка слайдера, для листания влево

const arrowLeft = document.getElementById("arrowLeft");

arrowLeft.addEventListener("mousedown", () => {
  if (slider.scrollLeft > 0) {
    arrowLeft.classList.add("slider-click-left");
    // Листаем влево
    // slider.scrollBy({ left: -100, behavior: "smooth" });
  }
});

arrowLeft.addEventListener("mouseup", () => {
  arrowLeft.classList.remove("slider-click-left");
});

arrowLeft.addEventListener("mouseleave", () => {
  arrowLeft.classList.remove("slider-click-left");
});

//стрелка слайдера для листания вправо

const arrowRight = document.getElementById("arrowRight");

arrowRight.addEventListener("mousedown", () => {
  const canScrollRight = slider.scrollLeft < slider.scrollWidth - slider.clientWidth;

  if (canScrollRight) {
    arrowRight.classList.add("slider-click-right");
    // slider.scrollBy({ left: 200, behavior: "smooth" });
  }
});

arrowRight.addEventListener("mouseup", () => {
  arrowRight.classList.remove("slider-click-right");
});

arrowRight.addEventListener("mouseleave", () => {
  arrowRight.classList.remove("slider-click-right");
});



// второй слайдер 


const slider2 = document.getElementById('slider2');
const slides2 = slider2.querySelectorAll('.slide2');
const dotsContainer2 = document.getElementById('sliderDots2');

// Кнопки прокрутки
document.querySelector('.slider-btn2.left2').onclick = () =>
  slider2.scrollBy({ left: -150, behavior: 'smooth' });

document.querySelector('.slider-btn2.right2').onclick = () =>
  slider2.scrollBy({ left: 150, behavior: 'smooth' });

// Клики по слайдам
document.querySelectorAll('.slide2').forEach(slide2 => {
  slide2.addEventListener('click', () => {
    document.querySelectorAll('.slide2').forEach(s => s.classList.remove('active'));
    slide2.classList.add('active');
  });
});

// ==== Добавление свайпа ====
let touchStartX2 = 0;
let touchEndX2 = 0;

slider2.addEventListener('touchstart', (e) => {
  touchStartX2 = e.changedTouches[0].screenX;
});

slider2.addEventListener('touchend', (e) => {
  touchEndX2 = e.changedTouches[0].screenX;
  handleSwipe2();
});

function handleSwipe2() {
  const swipeThreshold = 50;
  const swipeDistance = touchEndX2 - touchStartX2;

  if (swipeDistance > swipeThreshold) {
    // свайп вправо
    slider2.scrollBy({ left: -150, behavior: 'smooth' });
  } else if (swipeDistance < -swipeThreshold) {
    // свайп влево
    slider2.scrollBy({ left: 150, behavior: 'smooth' });
  }
}

// Создание точек
slides2.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.classList.add('slider-dot2');
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    slider2.scrollTo({ left: slider2.clientWidth * index, behavior: 'smooth' });
  });
  dotsContainer2.appendChild(dot);
});

// Обновление активной точки при скролле
slider2.addEventListener('scroll', () => {
  const index = Math.round(slider2.scrollLeft / slider2.clientWidth);
  const allDots = dotsContainer2.querySelectorAll('.slider-dot2');
  allDots.forEach(dot => dot.classList.remove('active'));
  if (allDots[index]) allDots[index].classList.add('active');
});



//стрелка слайдера, для листания влево

const arrowLeft2 = document.getElementById("arrowLeft2");

arrowLeft2.addEventListener("mousedown", () => {
  if (slider2.scrollLeft > 0) {
    arrowLeft2.classList.add("slider-click-left2");
    // Листаем влево
    slider2.scrollBy({ left: -150, behavior: "smooth" });
  }
});

arrowLeft2.addEventListener("mouseup", () => {
  arrowLeft2.classList.remove("slider-click-left2");
});

arrowLeft2.addEventListener("mouseleave", () => {
  arrowLeft2.classList.remove("slider-click-left2");
});

//стрелка слайдера для листания вправо

const arrowRight2 = document.getElementById("arrowRight2");

arrowRight2.addEventListener("mousedown", () => {
  const canScrollRight2 = slider2.scrollLeft < slider2.scrollWidth - slider2.clientWidth;

  if (canScrollRight2) {
    arrowRight2.classList.add("slider-click-right2");
    slider.scrollBy({ left: 150, behavior: "smooth" });
  }
});

arrowRight2.addEventListener("mouseup", () => {
  arrowRight2.classList.remove("slider-click-right2");
});

arrowRight2.addEventListener("mouseleave", () => {
  arrowRight2.classList.remove("slider-click-right2");
});

//автоматический скролл

function startLoopingScroll2() {
  let scrollToEnd = true;

  setInterval(() => {
    if (scrollToEnd) {
      // Прокрутка в самый конец
      slider2.scrollTo({
        left: slider2.scrollWidth,
        behavior: 'smooth',
      });
    } else {
      // Прокрутка в начало
      slider2.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }

    scrollToEnd = !scrollToEnd;
  }, 5000); // каждые 3 секунды
}

window.addEventListener('DOMContentLoaded', () => {
  startLoopingScroll2();
});




//отправка формы

const nameInput = document.getElementById('name');
const nameInput3 = document.getElementById('name3');
const phoneInput = document.getElementById('phone');
const phoneInput2 = document.getElementById('phone2');
const phoneInput3 = document.getElementById('phone3');
const carInput = document.getElementById('car');

const problemInput = document.getElementById('problem');
const consentCheckbox = document.getElementById('consent');
const consentCheckbox2 = document.getElementById('consent2');
const consentCheckbox3 = document.getElementById('consent3');
const submitButton = document.getElementById('entry7');
const submitButton2 = document.getElementById('entry12');
const thanks = document.getElementById('thanks');
const requisition = document.getElementById('requisition');
const header = document.getElementById('header');

//клик на кнопку "Запиаться онлайн"

const btn1 = document.getElementById('entry');
const btn2 = document.getElementById('entry2');
const btn3 = document.getElementById('entry3');
const btn4 = document.getElementById('entry4');
const btn5 = document.getElementById('entry5');
const btn6 = document.getElementById('entry6');
const btn9 = document.getElementById('entry9');
const btn10 = document.getElementById('entry10');


const close = document.getElementById('close');
const wrapper = document.getElementById('telWrapper');


//ввод проблемы автомобиля

phoneInput.addEventListener('focus', () => {
  wrapper.classList.add('hide-after');
  document.getElementById('problem_top_text').style.opacity = "1";
  document.getElementById('problem_bottom_text').style.opacity = "1";
  phoneInput.classList.add("red");
});

phoneInput.addEventListener('input', () => {
  if (phoneInput.value.trim() !== '') {
    document.getElementById('problem_top_text').style.opacity = "0";
    document.getElementById('problem_bottom_text').style.opacity = "0";
    phoneInput.classList.remove("red");
    wrapper.classList.remove('hide-after');
  } else {
    document.getElementById('problem_top_text').style.opacity = "1";
    document.getElementById('problem_bottom_text').style.opacity = "1";
    phoneInput.classList.add("red");
  }
});


phoneInput.addEventListener('blur', () => {
  const isEmpty = phoneInput.value.trim() === '';

  if (isEmpty) {
    // Поле пустое — скрываем ::after и сбрасываем цвет
    document.getElementById('problem_top_text').style.opacity = "1";
    document.getElementById('problem_bottom_text').style.opacity = "1";
    wrapper.classList.remove('hide-after');
    phoneInput.style.color = "#000";
    wrapper.style.borderBottom = "1px solid #808080";
  } else {
    // Поле заполнено — красим в синий
    phoneInput.style.color = "#1A1EB2";
    phoneInput.style.borderBottom = "1px solid #1A1EB2";
    // wrapper.classList.add('hide-after'); // если надо скрыть placeholder
    document.getElementById('problem_top_text').style.opacity = "0";
    document.getElementById('problem_bottom_text').style.opacity = "0";
  }
});


btn1.addEventListener('click', function () {
  requisition.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

btn2.addEventListener('click', function () {
  requisition.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

btn3.addEventListener('click', function () {
  requisition.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

btn4.addEventListener('click', function () {
  requisition.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

btn6.addEventListener('click', function () {
  requisition.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

btn9.addEventListener('click', function () {
  requisition.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

btn10.addEventListener('click', function () {
  requisition.style.display = 'block';
  document.body.style.overflow = 'hidden';
});


close.addEventListener('click', function () {
  requisition.style.display = 'none';
  document.body.style.overflow = 'auto';
});



//маска для телефона

window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___)-___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});



//hover заливка

const icons = document.querySelectorAll('.renovation_section_bottom_icon_icon');
const parents = document.querySelectorAll('.renovation_section_bottom_icon');
const textBlocks = document.querySelectorAll('.renovation_section_bottom_icon_icon_text');

icons.forEach((icon, index) => {
  const parent = parents[index];
  icon.addEventListener('mouseenter', () => {
    parent.classList.add('hover-from-icon');
  });
  icon.addEventListener('mouseleave', () => {
    parent.classList.remove('hover-from-icon');
  });
});

textBlocks.forEach((text, index) => {
  const parent = parents[index];
  text.addEventListener('mouseenter', () => {
    parent.classList.add('hover-from-text');
  });
  text.addEventListener('mouseleave', () => {
    parent.classList.remove('hover-from-text');
  });
});

const header_contact_message = document.getElementById('header_contact_message');
const telegram = document.getElementById('telegram');
const whatsapp = document.getElementById('whatsapp');
const vk = document.getElementById('vk');


telegram.addEventListener('click', () => {
  telegram.style.backgroundColor = '#43D854';
  setTimeout(() => {
    telegram.style.backgroundColor = '#EDEDED'; // убрать цвет
  }, 300);
});

whatsapp.addEventListener('click', () => {
  whatsapp.style.backgroundColor = '#43D854';
  setTimeout(() => {
    whatsapp.style.backgroundColor = '#EDEDED'; // убрать цвет
  }, 300);
});

vk.addEventListener('click', () => {
  vk.style.backgroundColor = '#43D854';
  setTimeout(() => {
    vk.style.backgroundColor = '#EDEDED'; // убрать цвет
  }, 300);
});

header_contact_message.addEventListener('click', () => {
  header_contact_message.style.backgroundColor = '#43D854';
  setTimeout(() => {
    header_contact_message.style.backgroundColor = '#EDEDED'; // убрать цвет
  }, 300);
});


//бургер 

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

//плавная анимация

document.querySelectorAll('.renovation_section_bottom_icon').forEach(container => {
  const block = container.querySelector('.renovation_section_bottom_icon_block');

  // Создаем зону слева
  const trigger = document.createElement('div');
  trigger.classList.add('icon-hover-trigger');
  container.appendChild(trigger);

  let isOverTrigger = false;
  let isOverBlock = false;

  container.addEventListener('mousemove', e => {
    const triggerRect = trigger.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const cursorX = e.clientX;

    // В блоке
    isOverBlock = true;

    // Если курсор внутри иконки
    if (cursorX <= triggerRect.right) {
      block.classList.add('fill-icon');
      block.classList.remove('fill-all');
    } else {
      block.classList.remove('fill-icon');
      block.classList.add('fill-all');
    }
  });

  container.addEventListener('mouseleave', () => {
    isOverTrigger = false;
    isOverBlock = false;
    block.classList.remove('fill-icon');
    block.classList.remove('fill-all');
  });
});

//Закрытие попапов вне его содержимого 

const popupContent = document.querySelector('.requisition_container_info');

// Слушаем клики по фону попапа
requisition.addEventListener('click', function (e) {
  if (!popupContent.contains(e.target)) {
    requisition.style.display = 'none'; // скрыть попап
    document.body.style.overflow = 'auto';
  }
});


//модалки по услугам

const block_diagnostika = document.getElementById('block_diagnostika');
const block_zamena_masla = document.getElementById('block_zamena_masla');
const block_remont_akpp = document.getElementById('block_remont_akpp');
const block_remont_variator = document.getElementById('block_remont_variator');
const block_remont_korobok = document.getElementById('block_remont_korobok');
const block_remont_gdt = document.getElementById('block_remont_gdt');
const block_blokov = document.getElementById('block_blokov');
const block_remont_mostov = document.getElementById('block_remont_mostov');
const block_remont_r_korobok = document.getElementById('block_remont_r_korobok');

const pdr1 = document.getElementById('pdr1');
const pdr2 = document.getElementById('pdr2');


const diagnostika_akpp = document.getElementById('diagnostika_akpp');
const zamena_masla = document.getElementById('zamena_masla');
const remont_akpp = document.getElementById('remont_akpp');
const remont_variator = document.getElementById('remont_variator');
const remont_korobok = document.getElementById('remont_korobok');
const remont_gdt = document.getElementById('remont_gdt');
const remont_blokov = document.getElementById('remont_blokov');
const remont_mostov = document.getElementById('remont_mostov');
const remont_r_korobok = document.getElementById('remont_r_korobok');
const akz1 = document.getElementById('akz1');
const akz2 = document.getElementById('akz2');

const close2 = document.getElementById('close2');
const close3 = document.getElementById('close3');
const close4 = document.getElementById('close4');
const close5 = document.getElementById('close5');
const close6 = document.getElementById('close6');
const close7 = document.getElementById('close7');
const close8 = document.getElementById('close8');
const close9 = document.getElementById('close9');
const close10 = document.getElementById('close10');
const close11 = document.getElementById('close11');
const close12 = document.getElementById('close12');

// Слушаем клики по фону попапа

const popupContent2 = document.querySelector('.requisition_container_info2');

diagnostika_akpp.addEventListener('click', function (e) {
  if (!popupContent2.contains(e.target)) {
    diagnostika_akpp.style.display = 'none'; // скрыть попап
    document.body.style.overflow = 'auto';
  }
});

zamena_masla.addEventListener('click', function (e) {
  if (!popupContent2.contains(e.target)) {
    zamena_masla.style.display = 'none'; // скрыть попап
    document.body.style.overflow = 'auto';
  }
});

remont_akpp.addEventListener('click', function (e) {
  if (!popupContent2.contains(e.target)) {
    remont_akpp.style.display = 'none'; // скрыть попап
    document.body.style.overflow = 'auto';
  }
});

remont_variator.addEventListener('click', function (e) {
  if (!popupContent2.contains(e.target)) {
    remont_variator.style.display = 'none'; // скрыть попап
    document.body.style.overflow = 'auto';
  }
});

remont_korobok.addEventListener('click', function (e) {
  if (!popupContent2.contains(e.target)) {
    remont_korobok.style.display = 'none'; // скрыть попап
    document.body.style.overflow = 'auto';
  }
});

remont_gdt.addEventListener('click', function (e) {
  if (!popupContent2.contains(e.target)) {
    remont_gdt.style.display = 'none'; // скрыть попап
    document.body.style.overflow = 'auto';
  }
});

remont_blokov.addEventListener('click', function (e) {
  if (!popupContent2.contains(e.target)) {
    remont_blokov.style.display = 'none'; // скрыть попап
    document.body.style.overflow = 'auto';
  }
});

remont_mostov.addEventListener('click', function (e) {
  if (!popupContent2.contains(e.target)) {
    remont_mostov.style.display = 'none'; // скрыть попап
    document.body.style.overflow = 'auto';
  }
});

remont_r_korobok.addEventListener('click', function (e) {
  if (!popupContent2.contains(e.target)) {
    remont_r_korobok.style.display = 'none'; // скрыть попап
    document.body.style.overflow = 'auto';
  }
});

akz1.addEventListener('click', function (e) {
  if (!popupContent2.contains(e.target)) {
    akz1.style.display = 'none'; // скрыть попап
    document.body.style.overflow = 'auto';
  }
});

akz2.addEventListener('click', function (e) {
  if (!popupContent2.contains(e.target)) {
    akz2.style.display = 'none'; // скрыть попап
    document.body.style.overflow = 'auto';
  }
});

close2.addEventListener('click', function () {
  diagnostika_akpp.style.display = 'none';
  document.body.style.overflow = 'auto';
});

close3.addEventListener('click', function () {
  zamena_masla.style.display = 'none';
  document.body.style.overflow = 'auto';
});

close4.addEventListener('click', function () {
  remont_akpp.style.display = 'none';
  document.body.style.overflow = 'auto';
});
close5.addEventListener('click', function () {
  remont_variator.style.display = 'none';
  document.body.style.overflow = 'auto';
});
close6.addEventListener('click', function () {
  remont_korobok.style.display = 'none';
  document.body.style.overflow = 'auto';
});
close7.addEventListener('click', function () {
  remont_gdt.style.display = 'none';
  document.body.style.overflow = 'auto';
});
close8.addEventListener('click', function () {
  remont_blokov.style.display = 'none';
  document.body.style.overflow = 'auto';
});
close9.addEventListener('click', function () {
  remont_mostov.style.display = 'none';
  document.body.style.overflow = 'auto';
});
close10.addEventListener('click', function () {
  remont_r_korobok.style.display = 'none';
  document.body.style.overflow = 'auto';
});

close11.addEventListener('click', function () {
  akz1.style.display = 'none';
  document.body.style.overflow = 'auto';
});

close12.addEventListener('click', function () {
  akz2.style.display = 'none';
  document.body.style.overflow = 'auto';
});

block_diagnostika.addEventListener('click', function () {
  diagnostika_akpp.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

block_zamena_masla.addEventListener('click', function () {
  zamena_masla.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

block_remont_akpp.addEventListener('click', function () {
  remont_akpp.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

block_remont_variator.addEventListener('click', function () {
  remont_variator.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

block_remont_korobok.addEventListener('click', function () {
  remont_korobok.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

block_remont_gdt.addEventListener('click', function () {
  remont_gdt.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

block_blokov.addEventListener('click', function () {
  remont_blokov.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

block_remont_mostov.addEventListener('click', function () {
  remont_mostov.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

block_remont_r_korobok.addEventListener('click', function () {
  remont_r_korobok.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

pdr1.addEventListener('click', function () {
  akz1.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

pdr2.addEventListener('click', function () {
  akz2.style.display = 'block';
  document.body.style.overflow = 'hidden';
});


//переход с услуг на форму заказа

const btn_diagnostika_akpp = document.getElementById('btn_diagnostika_akpp');
const btn_zamena_masla = document.getElementById('btn_zamena_masla');
const btn_remont_akpp = document.getElementById('btn_remont_akpp');
const btn_remont_variator = document.getElementById('btn_remont_variator');
const btn_remont_korobok = document.getElementById('btn_remont_korobok');
const btn_remont_gdt = document.getElementById('btn_remont_gdt');
const btn_remont_blokov = document.getElementById('btn_remont_blokov');
const btn_remont_mostov = document.getElementById('btn_remont_mostov');
const btn_remont_r_korobok = document.getElementById('btn_remont_r_korobok');

const akz1_btn = document.getElementById('akz1_btn');
const akz2_btn = document.getElementById('akz2_btn');


btn_diagnostika_akpp.addEventListener('click', function () {
  diagnostika_akpp.style.display = 'none';
  requisition.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

btn_zamena_masla.addEventListener('click', function () {
  zamena_masla.style.display = 'none';
  requisition.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

btn_remont_akpp.addEventListener('click', function () {
  remont_akpp.style.display = 'none';
  requisition.style.display = 'block';
  document.body.style.overflow = 'hidden';
});
btn_remont_variator.addEventListener('click', function () {
  remont_variator.style.display = 'none';
  requisition.style.display = 'block';
  document.body.style.overflow = 'hidden';
});
btn_remont_korobok.addEventListener('click', function () {
  remont_korobok.style.display = 'none';
  requisition.style.display = 'block';
  document.body.style.overflow = 'hidden';
});
btn_remont_gdt.addEventListener('click', function () {
  remont_gdt.style.display = 'none';
  requisition.style.display = 'block';
  document.body.style.overflow = 'hidden';
});
btn_remont_blokov.addEventListener('click', function () {
  remont_blokov.style.display = 'none';
  requisition.style.display = 'block';
  document.body.style.overflow = 'hidden';
});
btn_remont_mostov.addEventListener('click', function () {
  remont_mostov.style.display = 'none';
  requisition.style.display = 'block';
  document.body.style.overflow = 'hidden';
});
btn_remont_r_korobok.addEventListener('click', function () {
  remont_r_korobok.style.display = 'none';
  requisition.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

akz1_btn.addEventListener('click', function () {
  akz1.style.display = 'none';
  requisition.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

akz2_btn.addEventListener('click', function () {
  akz2.style.display = 'none';
  requisition.style.display = 'block';
  document.body.style.overflow = 'hidden';
});



const telInput = document.getElementById('phone');
const parent = telInput.closest('.requisition_container_info_input_tel');

function toggleLabel() {
  const isFocused = document.activeElement === telInput;
  const hasValue = telInput.value.trim().length > 0;

  if (isFocused || hasValue) {
    parent.classList.add('show-label');
  } else {
    parent.classList.remove('show-label');
  }
}

// События
telInput.addEventListener('focus', toggleLabel);
telInput.addEventListener('input', toggleLabel);
telInput.addEventListener('blur', () => {
  // Небольшая задержка, чтобы успел обработаться input перед blur
  setTimeout(toggleLabel, 10);
});

// На случай автозаполнения при загрузке
window.addEventListener('DOMContentLoaded', toggleLabel);

const nameWrapper = document.getElementById('nameWrapper');

nameInput.addEventListener('focus', () => {
  nameWrapper.classList.add('show-label');
  nameInput.style.borderBottom = '1px solid #1A1EB2';
  nameInput.style.color = '#1A1EB2';
});

nameInput.addEventListener('input', () => {
  if (nameInput.value.trim() !== '') {
    nameWrapper.classList.add('show-label');
    nameInput.style.borderBottom = '1px solid #1A1EB2';
    nameInput.style.color = '#1A1EB2';
  }
});

nameInput.addEventListener('blur', () => {
  if (nameInput.value.trim() === '') {
    // Поле пустое — сбросить стили
    nameWrapper.classList.remove('show-label');
    nameInput.style.borderBottom = '1px solid #808080';
    nameInput.style.color = '#000';
  } else {
    // Оставить всё синим
    nameWrapper.classList.add('show-label');
    nameInput.style.borderBottom = '1px solid #1A1EB2';
    nameInput.style.color = '#1A1EB2';
  }
});




const carWrapper = document.getElementById('carWrapper');

carInput.addEventListener('focus', () => {
  carWrapper.classList.add('show-label');
  carInput.style.borderBottom = '1px solid #1A1EB2';
  carInput.style.color = '#1A1EB2';
});

carInput.addEventListener('input', () => {
  if (carInput.value.trim() !== '') {
    carWrapper.classList.add('show-label');
    carInput.style.borderBottom = '1px solid #1A1EB2';
    carInput.style.color = '#1A1EB2';
  }
});

carInput.addEventListener('blur', () => {
  if (carInput.value.trim() === '') {
    // Поле пустое — сбросить стили
    carWrapper.classList.remove('show-label');
    carInput.style.borderBottom = '1px solid #808080';
    carInput.style.color = '#000';
  } else {
    // Оставить всё синим
    carWrapper.classList.add('show-label');
    carInput.style.borderBottom = '1px solid #1A1EB2';
    carInput.style.color = '#1A1EB2';
  }
});

const textarea = document.querySelector('textarea');

textarea.addEventListener('input', () => {
  textarea.style.height = 'auto'; // сброс
  textarea.style.height = textarea.scrollHeight + 'px'; // подогнать под контент
});

const problemTextarea = document.getElementById('problem');

problemTextarea.addEventListener('input', () => {
  problemTextarea.style.height = 'auto';
  problemTextarea.style.height = problemTextarea.scrollHeight + 'px';
});



const problemWrapper = document.getElementById('problemWrapper');

function updateProblemState() {
  const hasText = problemTextarea.value.trim().length > 0;
  const isFocused = document.activeElement === problemTextarea;

  if (hasText || isFocused) {
    problemWrapper.classList.add('show-label');
    problemWrapper.style.borderBottom = '1px solid #1A1EB2';
    problemTextarea.style.color = '#1A1EB2';
  } else {
    problemWrapper.classList.remove('show-label');
    problemWrapper.style.borderBottom = '1px solid #808080';
    problemTextarea.style.color = '#505050';
  }
}

// События
problemTextarea.addEventListener('focus', updateProblemState);
problemTextarea.addEventListener('input', updateProblemState);
problemTextarea.addEventListener('blur', updateProblemState);

// при загрузке
window.addEventListener('DOMContentLoaded', updateProblemState);

const nameInput1 = document.getElementById('name');
const phoneInput1 = document.getElementById('phone');
const carInput1 = document.getElementById('car');
const problemTextarea1 = document.getElementById('problem');
const consentCheckbox1 = document.getElementById('consent');
const submitButton1 = document.getElementById('entry7');

// Функция проверки
function validateForm() {
  const isNameFilled = nameInput1.value.trim() !== '';
  const isPhoneFilled = phoneInput1.value.trim() !== '';
  const isCarFilled = carInput1.value.trim() !== '';
  const isProblemFilled = problemTextarea1.value.trim() !== '';
  const isConsentChecked = consentCheckbox1.checked;

  const isFormValid = isNameFilled && isPhoneFilled && isCarFilled && isProblemFilled && isConsentChecked;

  submitButton1.disabled = !isFormValid;

  submitButton1.style.backgroundColor = isFormValid ? '#1A1EB2' : '#808080';

  if (isFormValid) {
    submitButton1.classList.add('active-button');
  } else {
    submitButton1.classList.remove('active-button');
  }

  return isFormValid; // важно!
}

// Привязываем события
[nameInput1, phoneInput1, carInput1, problemTextarea1, consentCheckbox1].forEach(el => {
  el.addEventListener('input', validateForm);
  el.addEventListener('change', validateForm); // для checkbox
});

window.addEventListener('DOMContentLoaded', validateForm);

// Клик по кнопке — если всё валидно, выполняем действия
submitButton1.addEventListener('click', (e) => {
  e.preventDefault(); // чтобы не отправилась форма, если она в <form>

  if (validateForm()) {
    window.open('thanks.html', '_blank');
    if (requisition) requisition.style.display = 'none';
    if (header) header.classList.add('fixed');
  }
});


const name_mob = document.getElementById('name_mob');
const nameWrapper2 = document.getElementById('nameWrapper2');
const topText = document.getElementById('problem_top_text_name');
const bottomText = document.getElementById('problem_bottom_text_name');

name_mob.addEventListener('focus', () => {
  topText.classList.add('visible');
  bottomText.classList.add('visible');
  name_mob.classList.add('error');
  name_mob.style.borderBottom = '1px solid red';
  name_mob.classList.remove('default');

  // nameWrapper2.classList.add('active');
});

name_mob.addEventListener('input', () => {
  if (name_mob.value.trim() !== '') {
    name_mob.classList.remove('error');
    name_mob.classList.add('active');
    topText.classList.remove('visible');
    bottomText.classList.remove('visible');
    nameWrapper2.classList.add('active');
    name_mob.style.borderBottom = '1px solid #1A1EB2';
    name_mob.style.color = '#1A1EB2';
  } else {
    name_mob.classList.remove('active');
    name_mob.classList.add('default');
    nameWrapper2.classList.add('active');
  }
});

name_mob.addEventListener('blur', () => {

  if (name_mob.value.trim() === '') {
    name_mob.classList.remove('active');
    name_mob.classList.remove('error');
    nameWrapper2.classList.remove('active');
    topText.classList.remove('visible');
    bottomText.classList.remove('visible');
    name_mob.style.borderBottom = '1px solid #808080';
  } else {
    name_mob.classList.add('active');
    nameWrapper2.classList.add('active');
  }
});


//Мобильная форма

const nameInput_mob = document.getElementById('name_mob');
const phoneInput_mob = document.getElementById('phone');
const carInput_mob = document.getElementById('car');
const problemInput_mob = document.getElementById('problem');
const consentCheckbox_mob = document.getElementById('consent');
const submitButton_mob = document.getElementById('entry12');

const validateForm_mob = () => {
  const isValid_mob =
    nameInput_mob.value.trim() !== '' &&
    phoneInput_mob.value.trim() !== '' &&
    carInput_mob.value.trim() !== '' &&
    problemInput_mob.value.trim() !== '' &&
    consentCheckbox_mob.checked;

  submitButton_mob.disabled = !isValid_mob;

  // Кнопка станет синей (если CSS уже прописан — всё будет работать)
  if (isValid_mob) {
    submitButton_mob.classList.add('active-button');
  } else {
    submitButton_mob.classList.remove('active-button');
  }
  return isValid_mob;
};

// Проверяем на изменение всех полей
[nameInput_mob, phoneInput_mob, carInput_mob, problemInput_mob, consentCheckbox_mob].forEach(el => {
  el.addEventListener('input', validateForm_mob);
  el.addEventListener('change', validateForm_mob); // для чекбокса
});

// И сразу при загрузке
window.addEventListener('DOMContentLoaded', validateForm_mob);

// Клик по кнопке — если всё валидно, выполняем действия
submitButton_mob.addEventListener('click', (e) => {
  e.preventDefault(); // чтобы не отправилась форма, если она в <form>

  if (!submitButton_mob.disabled) {
    window.open('thanks.html', '_blank');

    if (requisition) requisition.style.display = 'none';
    if (header) header.classList.add('fixed');
  }
});


//Страница консультация 


const phoneInput_ = document.getElementById('phone2');
const topText_ = document.getElementById('problem_top_text_col');
const bottomText_ = document.getElementById('problem_bottom_text_col');
const floatingLabel_ = document.getElementById('phone2Label');

// При клике на поле
phoneInput_.addEventListener('focus', () => {
  const hasValue_ = phoneInput_.value.trim() !== '';
  if (!hasValue_) {
    phoneInput_.classList.add('red-border');
    phoneInput_.classList.remove('black-border', 'blue-border');
    topText_.style.opacity = '1';
    bottomText_.style.opacity = '1';
    floatingLabel_.classList.remove('show');
  }

});


// Ввод текста
phoneInput_.addEventListener('input', () => {
  const hasValue_ = phoneInput_.value.trim() !== '';

  if (hasValue_) {
    phoneInput_.classList.remove('red-border', 'black-border');
    phoneInput_.classList.add('blue-border');
    topText_.style.opacity = '0';
    bottomText_.style.opacity = '0';
    floatingLabel_.classList.add('show');
  } else {
    phoneInput_.classList.add('red-border');
    phoneInput_.classList.remove('blue-border', 'black-border');
    phoneInput_.style.color = ''; // сброс цвета текста
    floatingLabel_.classList.remove('show');
    topText_.style.opacity = '1';
    bottomText_.style.opacity = '1';
  }
});

phoneInput_.addEventListener('blur', () => {
  const hasValue_ = phoneInput_.value.trim() !== '';

  if (!hasValue_) {
    phoneInput_.classList.remove('red-border', 'blue-border', 'black-border');
    phoneInput_.style.color = ''; // сброс цвета текста
    topText_.style.opacity = '0';
    bottomText_.style.opacity = '0';
    floatingLabel_.classList.remove('show');
  }
});


//

const phoneInput_col = document.getElementById('phone2');
const consentCheckbox_col = document.getElementById('consent2');
const submitButton_col = document.getElementById('entry5');

function validateFormCol() {
  const phoneFilled_col = phoneInput_col.value.trim() !== '';
  const consentChecked_col = consentCheckbox_col.checked;

  if (phoneFilled_col && consentChecked_col) {
    submitButton_col.disabled = false;
    submitButton_col.classList.add('enabled');
  } else {
    submitButton_col.disabled = true;
    submitButton_col.classList.remove('enabled');
  }
}

phoneInput_col.addEventListener('input', validateFormCol);
consentCheckbox_col.addEventListener('change', validateFormCol);
window.addEventListener('DOMContentLoaded', validateFormCol);

// ✅ Переход на thanks.html при клике
submitButton_col.addEventListener('click', (e) => {
  e.preventDefault();
  if (!submitButton_col.disabled) {
    window.open('thanks.html', '_blank');
  }
});


//Мобильная консультация

const nameInput_2 = document.getElementById('name3');
const nameTopText = document.getElementById('problem_top_text_col2');
const nameBottomText = document.getElementById('problem_bottom_text_col2');
const nameLabel = document.getElementById('name3Label');

nameInput_2.addEventListener('focus', () => {
  if (nameInput_2.value.trim() === '') {
    nameInput_2.classList.add('red-border');
    nameInput_2.classList.remove('blue-border');
    nameTopText.style.opacity = '1';
    nameBottomText.style.opacity = '1';
    nameLabel.classList.remove('show');
  }
});

nameInput_2.addEventListener('input', () => {
  if (nameInput_2.value.trim() !== '') {
    nameInput_2.classList.remove('red-border');
    nameInput_2.classList.add('blue-border');
    nameTopText.style.opacity = '0';
    nameBottomText.style.opacity = '0';
    nameLabel.classList.add('show');
  } else {
    nameInput_2.classList.add('red-border');
    nameInput_2.classList.remove('blue-border');
    nameTopText.style.opacity = '1';
    nameBottomText.style.opacity = '1';
    nameLabel.classList.remove('show');
  }
});

nameInput_2.addEventListener('blur', () => {
  if (nameInput_2.value.trim() === '') {
    nameInput_2.classList.remove('red-border', 'blue-border');
    nameTopText.style.opacity = '0';
    nameBottomText.style.opacity = '0';
    nameLabel.classList.remove('show');
  }
});

//Поле телефон

const phoneInput_3 = document.getElementById('phone3');
const phoneTopText = document.getElementById('problem_top_text_col3');
const phoneBottomText = document.getElementById('problem_bottom_text_col3');
const phoneLabel = document.getElementById('phone3Label');

phoneInput_3.addEventListener('focus', () => {
  if (phoneInput_3.value.trim() === '') {
    phoneInput_3.classList.add('red-border');
    phoneInput_3.classList.remove('blue-border');
    phoneTopText.style.opacity = '1';
    phoneBottomText.style.opacity = '1';
    phoneLabel.classList.remove('show');
  }
});

phoneInput_3.addEventListener('input', () => {
  if (phoneInput_3.value.trim() !== '') {
    phoneInput_3.classList.remove('red-border');
    phoneInput_3.classList.add('blue-border');
    phoneTopText.style.opacity = '0';
    phoneBottomText.style.opacity = '0';
    phoneLabel.classList.add('show');
  } else {
    phoneInput_3.classList.add('red-border');
    phoneInput_3.classList.remove('blue-border');
    phoneTopText.style.opacity = '1';
    phoneBottomText.style.opacity = '1';
    phoneLabel.classList.remove('show');
  }
});

phoneInput_3.addEventListener('blur', () => {
  if (phoneInput_3.value.trim() === '') {
    phoneInput_3.classList.remove('red-border', 'blue-border');
    phoneTopText.style.opacity = '0';
    phoneBottomText.style.opacity = '0';
    phoneLabel.classList.remove('show');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('name3');
  const phoneInput = document.getElementById('phone3');
  const consentCheckbox = document.getElementById('consent3');
  const submitButton = document.getElementById('entry11');

  // === Проверка всех полей
  function validateForm() {
    const isNameFilled = nameInput.value.trim() !== '';
    const isPhoneFilled = phoneInput.value.trim() !== '';
    const isConsentChecked = consentCheckbox.checked;

    if (isNameFilled && isPhoneFilled && isConsentChecked) {
      submitButton.disabled = false;
      submitButton.classList.add('enabled2');
    } else {
      submitButton.disabled = true;
      submitButton.classList.remove('enabled2');
    }
  }

  // === События ввода/изменения
  nameInput.addEventListener('input', validateForm);
  phoneInput.addEventListener('input', validateForm);
  consentCheckbox.addEventListener('change', validateForm);

  // === Инициализация
  validateForm();

  // === Переход на thanks.html при активации
  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (!submitButton.disabled) {
      window.open('thanks.html', '_blank');
    }
  });
});


//смена лого при скролле



window.addEventListener('scroll', () => {
  if (window.innerWidth < 500) {
    const logo = document.getElementById('headerLogo');
    const header = document.getElementById('header');
    const header_contact_message = document.getElementById('header_contact_message');
    const nomer = document.getElementById('nomer');
    const svg = document.getElementById('svg');
    const header_contact_message_icon = document.getElementById('header_contact_message_icon');

    if (window.scrollY > 30) {
      // header.classList.add('shrink');
      logo.src = 'img/logo_mob.svg'; // путь к новому логотипу
      logo.style.height = '20px';
      logo.style.width = '20px'; // или, например, '120px'
      nomer.style.position = 'relative';
      nomer.style.left = '-42px';
      nomer.style.paddingRight = '48px';
      header_contact_message.style.display = 'block';
      header_contact_message.style.position = 'absolute';
      header_contact_message.style.right = '35px';
      header_contact_message.style.top = '0';
      header_contact_message.style.width = '35px';
      header_contact_message.style.height = '35px';
      header_contact_message.style.display = 'grid';
      header_contact_message_icon.style.padding = '6px';
      header_contact_message.style.placeItems = 'center';
      header_contact_message.style.borderRightStyle = '1px solid #BCBCBC';
      svg.style.width = '13px';
      svg.style.height = '13px';
      svg.style.paddingLeft = '4px';
      burger.style.borderLeft = '0.5px solid #BCBCBC';
    

    } else {
      logo.src = 'img/logo.svg'; // вернуть стандартный
      logo.style.height = '15px';
      logo.style.width = '95px'; // или, например, '120px'
      header_contact_message.style.display = 'none';
      burger.style.borderLeft = '0';
nomer.style.left = '-22px';
    }
  }
});