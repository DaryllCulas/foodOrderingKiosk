let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let totalElement = document.querySelector('.total');



openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 2,
        name: 'Manok na pinakurat',
        image: 'manokNaPinakurat.png',
        price: 280
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
        id: 14, 
        name: 'Kanto Fingershots Chicken',
        image: 'kantoHotshots.png',
        price: 80
    },
    {
        id: 16,
        name: 'Gin Shembot',
        image: 'ginBulag.png',
        price: 100
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
        id: 25,
        name: 'Gorio\'s Mineral Water',
        image: 'goriomineralwater.png',
        price: 130
    },
];
let listCards  = [];
function initApp(){
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



    // Function to show the confirmation modal
    function showConfirmationModal() {
      // Create a modal element
      let modal = document.createElement('div');
      modal.classList.add('modal', 'fade');
      modal.id = 'confirmationModal';
      modal.setAttribute('tabindex', '-1');
      modal.setAttribute('aria-hidden', 'true');
  
      // Modal content
      modal.innerHTML = `
          <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title">Confirm Purchase</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                      <p>Are you certain you wish to proceed with these orders?</p>
                      <b>Total Cost: ₱${total.innerText}</b>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" class="btn btn-primary" id="confirmPurchase">Confirm Purchase</button>
                  </div>
              </div>
          </div>
      `;
  
      // Append the modal to the body
      document.body.appendChild(modal);
  
      // Activate the Bootstrap modal
      let bootstrapModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
      bootstrapModal.show(); 
      // Handle the "Confirm Purchase" button click

      /*************************************************************************/
      let confirmPurchaseButton = document.getElementById('confirmPurchase');
      confirmPurchaseButton.addEventListener('click', () => {


        // Create a sub-modal for payment method selection
            let paymentMethodModal = document.createElement('div');
            paymentMethodModal.classList.add('modal', 'fade');
            paymentMethodModal.id = 'paymentMethodModal';
            paymentMethodModal.setAttribute('tabindex', '-1');
            paymentMethodModal.setAttribute('aria-hidden', 'true');

        // Sub-modal content for payment method selection
    paymentMethodModal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Select Payment Method</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="paymentMethodForm">
                    <div class="mb-3">
                        <input type="radio" id="cashMethod" name="paymentMethod" value="cash">
                        <label for="cashMethod"><img src="/image/Cash.png" alt="Cash" width="50" height="40"> <b>Cash (Peso & Dollars)</b></label>
                    </div>
                    <div class="mb-3">
                        <input type="radio" id="eCashMethod" name="paymentMethod" value="eCash">
                        <label for="eCashMethod"><img src="/image/PayMaya_Logo.png" alt="E-Cash" width="50" height ="40"> <img src="/image/eCash.png" alt="E-Cash" width="50" height ="40"> &nbsp;<b>E-Cash (Paymaya, Gcash)</b></label>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="confirmPaymentMethod">Confirm Payment</button>
            </div>
        </div>
    </div>
`;

  // Append the payment method modal to the body
  document.body.appendChild(paymentMethodModal);

  // Activate the Bootstrap modal for payment method selection
  let bootstrapPaymentMethodModal = new bootstrap.Modal(document.getElementById('paymentMethodModal'));
  bootstrapPaymentMethodModal.show();

  // Handle the "Confirm Payment" button click in payment method modal
  let confirmPaymentMethodButton = document.getElementById('confirmPaymentMethod');
  if (confirmPaymentMethodButton) {
    confirmPaymentMethodButton.addEventListener('click', () => {
      // Get the selected payment method
      let paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');

      if (paymentMethod) {
        // Perform actions when the user confirms the payment method
        alert(`Payment confirmed with ${paymentMethod.value}`);
        bootstrapPaymentMethodModal.hide(); // Close the sub-modal
        bootstrapModal.hide(); // Close the main modal
      } else {
        alert('Please select a payment method.');
      }
    });
  } else {
    console.error("Element with id 'confirmPaymentMethod' not found");
  }
   // Cleanup: Remove the payment method modal from the DOM when it's hidden
   paymentMethodModal.addEventListener('hidden.bs.modal', () => {
    paymentMethodModal.remove();
  });



        // Perform actions when the user confirms the purchase
        // alert('Thank you for your purchase!');
        bootstrapModal.hide(); // Close the modal

      });
  

      /**********************************************************************/
      // Cleanup: Remove the modal from the DOM when it's hidden
      modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
      });
    }
    // Add a click event listener to the total element
    totalElement.addEventListener('click', showConfirmationModal);