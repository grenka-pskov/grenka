const menu = [
  {
    id: 'breakfast', title: 'Завтраки', image: 'assets/menu-breakfast-food.jpg',
    items: [
      ['Омлет с беконом', '180 г', 330],
      ['Ванильные сырники со сметаной', '150/30 г', 280],
      ['Драники картофельные с беконом и сметаной', '200/40 г', 350],
      ['Драники картофельные со сметаной', '170/40 г', 310],
      ['Драники из брокколи с лососем слабосолёным и яйцом пашот', '170/50/30 г', 410]
    ]
  },
  {
    id: 'toast', title: 'Гренки', image: 'assets/menu-breakfast-food.jpg',
    items: [
      ['Гренка с ветчиной, сыром и грибами', '200 г', 330],
      ['Гренка с курицей и грибами в сливках', '200 г', 330]
    ]
  },
  {
    id: 'pasta', title: 'Паста', image: 'assets/menu-pasta-food.jpg',
    items: [
      ['Паста «Карбонара»', '280 г', 550],
      ['Паста с курицей и грибами', '280 г', 550],
      ['Паста с лососем и брокколи', '320 г', 590],
      ['Паста орзо с креветками и овощами', '290 г', 580]
    ]
  },
  {
    id: 'sides', title: 'Гарниры', image: 'assets/menu-pasta-food.jpg',
    items: [
      ['Пюре картофельное', '200 г', 220],
      ['Картофель фри', '150 г', 240],
      ['Картофель по-деревенски', '200 г', 200],
      ['Картофель обжаренный с грибами', '250/30 г', 260],
      ['Картофель обжаренный с луком', '250/30 г', 260],
      ['Овощи гриль', '140 г', 340],
      ['Хлеб заварной', '1 кусочек', 9]
    ]
  },
  {
    id: 'rolls', title: 'Холодные роллы', image: 'assets/menu-rolls-food.jpg',
    items: [
      ['Калифорния-масаго (с крабом)', '220/55 г', 390],
      ['Филадельфия классик', '260/55 г', 650],
      ['Чикен ролл (с курицей)', '205/55 г', 370],
      ['Токио (с угрём)', '200/55 г', 420],
      ['Гурман (с лососем и креветками)', '220/55 г', 440],
      ['Сяке ролл (с лососем)', '200/55 г', 400],
      ['Чёрный самурай (с копчёным лососем)', '230/55 г', 430],
      ['Филадельфия в угре', '260/55 г', 650],
      ['Филадельфия мини', '210/55 г', 470],
      ['Филадельфия с креветками', '260/55 г', 670]
    ]
  },
  {
    id: 'pizza', title: 'Пицца', image: 'assets/menu-pizza-food.jpg',
    items: [
      ['Маргарита', '440 г', 520],
      ['Итальянская с вялеными томатами', '520 г', 620],
      ['Карбонара', '520 г', 640],
      ['Мясная', '520 г', 680],
      ['Пепперони', '520 г', 640],
      ['С курицей и ананасами', '520 г', 650],
      ['4 сыра с голубой плесенью', '420 г', 680],
      ['Барбекю', '520 г', 630],
      ['Баварская', '550 г', 640],
      ['Цезарь', '520 г', 660],
      ['Салями', '520 г', 610],
      ['С грушей и горгонзолой', '520 г', 620],
      ['С курицей и грибами', '520 г', 620]
    ]
  },
  {
    id: 'mocktails', title: 'Безалкогольные коктейли', image: 'assets/menu-mocktails-food.jpg',
    items: [
      ['Мохито', '230 мл', 260],
      ['Пина Колада', '230 мл', 270],
      ['Летний Шейк', '230 мл', 250],
      ['Сливочная малина', '230 мл', 280],
      ['Ягодный бум', '230 мл', 240]
    ]
  }
];

const tabsEl = document.getElementById('categoryTabs');
const gridEl = document.getElementById('menuGrid');
const searchEl = document.getElementById('menuSearch');
let activeCategory = 'all';
let searchTerm = '';

const categories = [{id:'all', title:'Всё меню'}, ...menu.map(({id,title}) => ({id,title}))];

tabsEl.innerHTML = categories.map(category =>
  `<button class="tab${category.id === 'all' ? ' active' : ''}" type="button" data-category="${category.id}" aria-pressed="${category.id === 'all'}">${category.title}</button>`
).join('');

function renderMenu() {
  const matching = menu.map(section => ({
    ...section,
    items: section.items.filter(item => item[0].toLocaleLowerCase('ru').includes(searchTerm))
  })).filter(section => section.items.length && (activeCategory === 'all' || section.id === activeCategory));

  if (!matching.length) {
    gridEl.innerHTML = '<div class="empty-state">Ничего не найдено. Попробуйте изменить запрос.</div>';
    return;
  }

  gridEl.innerHTML = matching.map(section => `
    <article class="menu-card">
      <img class="menu-card-image" src="${section.image}" alt="Раздел меню: ${section.title}" loading="lazy">
      <div class="menu-card-content">
        <h3>${section.title}</h3>
        <div class="menu-card-count">${section.items.length} ${pluralize(section.items.length, ['позиция','позиции','позиций'])}</div>
        <ul class="menu-items">
          ${section.items.map(([name, weight, price]) => `
            <li>
              <span class="item-name">${name}<span class="item-weight">${weight}</span></span>
              <span class="item-price">${price} ₽</span>
            </li>`).join('')}
        </ul>
      </div>
    </article>`).join('');
}

function pluralize(number, forms) {
  const n = Math.abs(number) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return forms[2];
  if (n1 > 1 && n1 < 5) return forms[1];
  if (n1 === 1) return forms[0];
  return forms[2];
}

tabsEl.addEventListener('click', event => {
  const button = event.target.closest('button[data-category]');
  if (!button) return;
  activeCategory = button.dataset.category;
  searchTerm = '';
  searchEl.value = '';
  tabsEl.querySelectorAll('.tab').forEach(tab => {
    const selected = tab === button;
    tab.classList.toggle('active', selected);
    tab.setAttribute('aria-pressed', String(selected));
  });
  renderMenu();
});

searchEl.addEventListener('input', event => {
  searchTerm = event.target.value.trim().toLocaleLowerCase('ru');
  if (searchTerm) {
    activeCategory = 'all';
    tabsEl.querySelectorAll('.tab').forEach(tab => {
      const selected = tab.dataset.category === 'all';
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-pressed', String(selected));
    });
  }
  renderMenu();
});

const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => {
  const opened = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(opened));
  navToggle.setAttribute('aria-label', opened ? 'Закрыть меню' : 'Открыть меню');
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Открыть меню');
}));

document.getElementById('year').textContent = new Date().getFullYear();
renderMenu();

const observer = new IntersectionObserver(entries => {entries.forEach(entry => {if (entry.isIntersecting) entry.target.classList.add('in-view');});}, {threshold:0.14});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
