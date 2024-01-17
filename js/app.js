let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Chicken Biryani',
        image: 'chickenBiryani.png',
        price: 220
    },
    {
        id: 2,
        name: 'Manok na pinakurat',
        image: 'manokNaPinakurat.png',
        price: 280
    },
    {
        id: 3,
        name: 'Chicken Salad',
        image: 'chickenSalad.png',
        price: 120
    },
    {
        id: 4,
        name: 'Menudo',
        image: 'menudo.png',
        price: 300
    },
    {
        id: 5,
        name: 'Nigerian Roasted Chicken',
        image: 'RoastedNigerianChicken.png',
        price: 400
    },
    {
        id: 6,
        name: 'Chicken Masala Pizza',
        image: 'chickenMasalaPizza.png',
        price: 300
    },
    {
        id: 7,
        name: 'Afritada',
        image: 'afritada.png',
        price: 240
    },
    {
        id: 8,
        name: '3-star Chicken Wellington',
        image: 'chickenWellington.png',
        price: 2000
    },
    {
        id: 9,
        name:'Pinatayong Manok',
        image: 'pinatayongManok.png',
        price: 300
    }, 
    {
        id: 10,
        name: 'Pinalabong Atsara',
        image: 'atchara.jpeg',
        price: 50
    },
    {
        id: 11, 
        name: 'Chicken Masala Soup',
        image: 'chickenMasalaSoup.png',
        price: 180
    },
    {
        id: 12,
        name: 'Indian Kimchi',
        image: 'kimchi.jpeg',
        price: 100
    },
    {
        id: 13,
        name: 'Mashed Kamote',
        image: 'mashKamote.jpg',
        price: 100
    },
    {
        id: 14, 
        name: '10pcs Kanto Fingershots Chicken',
        image: 'kantoHotshots.png',
        price: 80
    },
    {
        id: 15,
        name: 'Korean Fried Chicken',
        image: 'koreanFriedChicken.png',
        price: 130
    },
    {
        id: 16,
        name: 'Gin Shembot',
        image: 'ginBulag.png',
        price: 100
    },
    {
        id: 17,
        name: 'Cuervo',
        image: 'cuervo.jpeg',
        price: 1400
    },
    {
        id: 18,
        name: 'Silver Patron',
        image: 'silverPatron.png',
        price: 3000
    },
    {
        id: 19,
        name: 'El Hombre',
        image: 'elhombre.jpg',
        price: 1200
    },
    {
        id: 20,
        name: 'Mountain Dew',
        image: 'mountainDew.jpeg',
        price: 100
    },
    {
        id: 21,
        name: 'Coca Cola',
        image: 'cocacola.jpeg',
        price: 100
    },
    {
        id: 22,
        name: 'Pepsi',
        image: 'pepsi.jpeg',
        price: 100
    },
    {
        id: 23,
        name: 'MUG Rootbeer',
        image: 'rootbeer.jpeg',
        price: 100
    },
    {
        id: 24,
        name: 'Sarsi',
        image: 'sarsi.png',
        price: 100
    },
    {
        id: 25,
        name: 'Gorio\'s Mineral Water',
        image: 'goriomineralwater.png',
        price: 130
    },
    {
        id: 26,
        name: 'Ice Tube',
        image: 'icetube.jpg',
        price: 0
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
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
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
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
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}