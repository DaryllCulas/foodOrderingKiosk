let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let totalElement = document.querySelector('.total');



openShopping.addEventListener('click', () => {
	body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
	body.classList.remove('active');
})

let products = [{
		id: 1,
		name: 'Manok na pinakurat',
		image: 'manokNaPinakurat.png',
		price: 285
	},
	{
		id: 2,
		name: 'Menudo',
		image: 'menudo.png',
		price: 353
	},
	{
		id: 3,
		name: 'Nigerian Roasted Chicken',
		image: 'RoastedNigerianChicken.png',
		price: 457
	},
	{
		id: 4,
		name: 'Chicken Masala Pizza',
		image: 'chickenMasalaPizza.png',
		price: 323
	},
	{
		id: 5,
		name: 'Afritada',
		image: 'afritada.png',
		price: 249
	},
	{
		id: 6,
		name: '3-star Chicken Wellington',
		image: 'chickenWellington.png',
		price: 2850
	},
	{
		id: 7,
		name: 'Pinatayong Manok',
		image: 'pinatayongManok.png',
		price: 346
	},
	{
		id: 8,
		name: 'Kanto Fingershots Chicken',
		image: 'kantoHotshots.png',
		price: 89
	},
	{
		id: 9,
		name: 'Gin Shembot',
		image: 'ginBulag.png',
		price: 123
	},
	{
		id: 10,
		name: 'Coca Cola',
		image: 'cocacola.jpeg',
		price: 116
	},
	{
		id: 11,
		name: 'Gorio\'s Mineral Water',
		image: 'goriomineralwater.png',
		price: 137
	},
];
let listCards = [];

function initApp() {
	products.forEach((value, key) => {
		let newDiv = document.createElement('div');
		newDiv.classList.add('item');
		newDiv.innerHTML = `
             <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">₱${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">SELECT</button>`;
		list.appendChild(newDiv);
	})
}
initApp();

function addToCard(key) {
	if (listCards[key] == null) {
		// copy product form list to list card
		listCards[key] = JSON.parse(JSON.stringify(products[key]));
		listCards[key].quantity = 1;
	}
	reloadCard();
}

function reloadCard() {
	listCard.innerHTML = '';
	let count = 0;
	let subTotal = 0;

	listCards.forEach((value, key) => {
		subTotal = subTotal + value.price;
		count = count + value.quantity;
	});

	// Calculate total cost with VAT (12%) and service charge (5%)
	let vat = 0.12; // 12%
	let serviceCharge = 0.05; // 5%
	let totalVat = subTotal * vat;
	let totalServiceCharge = subTotal * serviceCharge;
	let totalPrice = subTotal + totalVat + totalServiceCharge;

	listCards.forEach((value, key) => {
		if (value != null) {
			let newDiv = document.createElement('li');
			newDiv.innerHTML = `
                  <div><img src="image/${value.image}"/></div>
                  <div>${value.name}</div>
                  <div>${value.price.toLocaleString()}</div>
                  <div>
                      <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                      <div class="count">${value.quantity}</div>
                      <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                  </div>`;
			listCard.appendChild(newDiv);
		}
	});

	total.innerText = totalPrice.toLocaleString();
	quantity.innerText = count;
}

function changeQuantity(key, quantity) {
	if (quantity == 0) {
		delete listCards[key];
	} else {
		listCards[key].quantity = quantity;
		listCards[key].price = quantity * products[key].price;
	}
	reloadCard();
}


