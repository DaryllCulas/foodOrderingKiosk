// Function to show the confirmation modal
function showConfirmationModal() {

  console.log('Modals script loaded.');
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


        /************** ***********************************************************/
        if (paymentMethod) {
          // Perform actions when the user confirms the payment method
          alert(`Payment confirmed with ${paymentMethod.value}`);

          // Create a modal element for payment amount input
          let paymentAmountModal = document.createElement('div');
          paymentAmountModal.classList.add('modal', 'fade');
          paymentAmountModal.id = 'paymentAmountModal';
          paymentAmountModal.setAttribute('tabindex', '-1');
          paymentAmountModal.setAttribute('aria-hidden', 'true');

          // Calculate subtotal
          let subTotal = 0;
          listCards.forEach((value) => {
            subTotal += value.price;
          });


          // Modal content for payment amount input
          paymentAmountModal.innerHTML = `
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Enter Payment Amount</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <label for="totalCost">Total: <b> ₱${total.innerText} </b></label>
                        <br/>
                        <br/>
                            <label for="paymentAmount">Amount to pay:</label>
                            <input type="number" id="paymentAmount" class="form-control" placeholder="Enter amount" required>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" id="confirmPaymentAmount">Confirm Payment</button>
                        </div>
                    </div>
                </div>
            `;

          // Append the payment amount modal to the body
          document.body.appendChild(paymentAmountModal);

          // Activate the Bootstrap modal for payment amount input
          let bootstrapPaymentAmountModal = new bootstrap.Modal(document.getElementById('paymentAmountModal'));
          bootstrapPaymentAmountModal.show();


          // Handle the "Confirm Payment" button click in payment amount modal
          let confirmPaymentAmountButton = document.getElementById('confirmPaymentAmount');
          if (confirmPaymentAmountButton) {
            confirmPaymentAmountButton.addEventListener('click', () => {
              // Get the entered payment amount
              let paymentAmountInput = document.getElementById('paymentAmount');
              let paymentAmount = parseFloat(paymentAmountInput.value);

              if (!isNaN(paymentAmount) && paymentAmount >= 0) {
                // Compare with the total cost
                let totalCost = parseFloat(total.innerText.replace('₱', '').replace(',', ''));

                if (paymentAmount >= totalCost) {
                  // Create a modal for successful payment
                  let paymentSuccessModal = document.createElement('div');
                  paymentSuccessModal.classList.add('modal', 'fade');
                  paymentSuccessModal.id = 'paymentSuccessModal';
                  paymentSuccessModal.setAttribute('tabindex', '-1');
                  paymentSuccessModal.setAttribute('aria-hidden', 'true');
              
                  // Modal content for successful payment
                  paymentSuccessModal.innerHTML = `
                      <div class="modal-dialog modal-dialog-centered">
                          <div class="modal-content">
                              <div class="modal-header" style="background-color: yellowgreen;">
                                  <h5 class="modal-title" style="background-color: transparent;">Payment Successful</h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body" style="text-align: center;">
                                  <p>Payment amount confirmed: ₱${paymentAmount.toFixed(2)} via ${paymentMethod.value}</p>
                                  <button type="button" id="successButton" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
                              </div>
                          </div>
                      </div>
                  `;
              
                  // Append the payment success modal to the body
                  document.body.appendChild(paymentSuccessModal);
              
                  // Activate the Bootstrap modal for payment success
                  let bootstrapPaymentSuccessModal = new bootstrap.Modal(document.getElementById('paymentSuccessModal'));
                  bootstrapPaymentSuccessModal.show();
                  bootstrapPaymentAmountModal.hide();
              
                  // Handle the "OK" button click
                  let successButton = document.getElementById('successButton');
                  if (successButton) {
                      successButton.addEventListener('click', () => {
                          // Prepare order details for confirmation
                          let orderConfirmationDetails = listCards.map((item) => ({
                              name: item.name,
                              quantity: item.quantity,
                              price: item.price,
                          }));
              
                          // Create a modal for order confirmation
                          let orderConfirmationModal = document.createElement('div');
                          orderConfirmationModal.classList.add('modal', 'fade');
                          orderConfirmationModal.id = 'orderConfirmationModal';
                          orderConfirmationModal.setAttribute('tabindex', '-1');
                          orderConfirmationModal.setAttribute('aria-hidden', 'true');
              
                          // Modal content for order confirmation
                          orderConfirmationModal.innerHTML = `
                              <div class="modal-dialog modal-dialog-centered">
                                  <div class="modal-content">
                                      <div class="modal-header" style="background-color: lightblue;">
                                          <h5 class="modal-title" style="background-color: transparent;">Order Confirmation</h5>
                                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                      </div>
                                      <div class="modal-body">
                                          <b>Is everything correct?</b>
                                          <br>
                                          <br>
                                          <ul>
                                              ${orderConfirmationDetails.map(item =>
                                                  `<li>${item.quantity} x ${item.name} - ₱${item.price.toFixed(2)}</li>`
                                              ).join('')}
                                          </ul>
                                          <p>Subtotal: ₱${totalCost.toFixed(2)}</p>
                                          <p>VAT (12%): ₱${(totalCost * 0.12).toFixed(2)}</p>
                                          <p>Service Charge (5%): ₱${(totalCost * 0.05).toFixed(2)}</p>
                                          <p>Mode of payment: ${paymentMethod.value}</p>
                                          <p>Payment: ₱${paymentAmount.toFixed(2)}</p>
                                          <br>
                                          <p>---------------------------------</p>
                                          <p><b>Grand Total:  ₱${totalCost.toFixed(2)}</b></p>
                                          <p>Change: ₱${(paymentAmount - totalCost).toFixed(2)}</p>
                                          <button type="button" id="confirmationSuccessBtn" onclick="generatePDF()"
                                           class="btn btn-primary" data-bs-dismiss="modal">Confirm</button>
                                      </div>
                                  </div>
                              </div>
                          `;
              
                          // Append the order confirmation modal to the body
                          document.body.appendChild(orderConfirmationModal);
              
                          // Activate the Bootstrap modal for order confirmation
                          let bootstrapOrderConfirmationModal = new bootstrap.Modal(document.getElementById('orderConfirmationModal'));
                          bootstrapOrderConfirmationModal.show();
              
                          // Cleanup: Remove the order confirmation modal from the DOM when it's hidden
                          orderConfirmationModal.addEventListener('hidden.bs.modal', () => {
                              orderConfirmationModal.remove();
                          });
                      });
                  }
              
                  // Cleanup: Remove the payment success modal from the DOM when it's hidden
                  paymentSuccessModal.addEventListener('hidden.bs.modal', () => {
                      paymentSuccessModal.remove();
                  });
              }
               else {
                  // Create a modal for insufficient payment
                  let insufficientPaymentModal = document.createElement('div');
                  insufficientPaymentModal.classList.add('modal', 'fade');
                  insufficientPaymentModal.id = 'insufficientPaymentModal';
                  insufficientPaymentModal.setAttribute('tabindex', '-1');
                  insufficientPaymentModal.setAttribute('aria-hidden', 'true');

                  // Modal content for insufficient payment
                  insufficientPaymentModal.innerHTML = `
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header" style="background-color: red;">
                <h5 class="modal-title" style="background-color: transparent;">Insufficient Payment</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p style="color: black;">Payment amount is less than the total cost. Please enter a valid amount.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
              </div>
            </div>
          </div>
        `;

                  // Append the insufficient payment modal to the body
                  document.body.appendChild(insufficientPaymentModal);

                  // Activate the Bootstrap modal for insufficient payment
                  let bootstrapInsufficientPaymentModal = new bootstrap.Modal(document.getElementById('insufficientPaymentModal'));
                  bootstrapInsufficientPaymentModal.show();
                }
              } else {
                // Create a modal for invalid payment amount
                let invalidPaymentModal = document.createElement('div');
                invalidPaymentModal.classList.add('modal', 'fade');
                invalidPaymentModal.id = 'invalidPaymentModal';
                invalidPaymentModal.setAttribute('tabindex', '-1');
                invalidPaymentModal.setAttribute('aria-hidden', 'true');

                // Modal content for invalid payment amount
                invalidPaymentModal.innerHTML = `
			<div class="modal-dialog">
				<div class="modal-content border-danger">
					<div class="modal-header bg-danger text-black">
						<h5 class="modal-title" style ="background-color: transparent;">Invalid Payment Amount</h5>
						<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<p class="text-danger">Please enter a valid payment amount.</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-danger" data-bs-dismiss="modal">OK</button>
					</div>
				</div>
			</div>
		`;

                // Append the invalid payment amount modal to the body
                document.body.appendChild(invalidPaymentModal);

                // Activate the Bootstrap modal for invalid payment amount
                let bootstrapInvalidPaymentModal = new bootstrap.Modal(document.getElementById('invalidPaymentModal'));
                bootstrapInvalidPaymentModal.show();
              }
            });
          } else {
            console.error("Element with id 'confirmPaymentAmount' not found");
          }

          // Cleanup: Remove the payment amount modal from the DOM when it's hidden
          paymentAmountModal.addEventListener('hidden.bs.modal', () => {
            paymentAmountModal.remove();
          });

          bootstrapPaymentMethodModal.hide(); // Close the sub-modal
          bootstrapModal.hide(); // Close the main modal
        } else {
          alert('Please select a payment method.');
        }
      });
    } else {
      console.error("Element with id 'confirmPaymentMethod' not found");
    }

    /************** ***********************************************************/

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

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Extract order details
  let orderConfirmationDetails = listCards.map((item, index) => ({
      id: index + 1,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
  }));

  // Calculate totals
  let subtotal = orderConfirmationDetails.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  let vat = subtotal * 0.12;
  let serviceCharge = subtotal * 0.05;
  let grandTotal = subtotal + vat + serviceCharge;

  doc.setFontSize(10);

  // Add title to the PDF
  doc.text("DACAC's OFFICIAL RECEIPT", 10, 10);
  doc.text("\"Walang Palpak sa Unang papak!\"", 10, 20);

  // Add order details to the PDF
  let y = 30; // Start position
  orderConfirmationDetails.forEach((item) => {
      doc.text(`ITEM NO: ${String(item.id)}`, 10, y);
      doc.text(`PRODUCT NAME: ${String(item.name)}`, 10, y + 10);
      doc.text(`QUANTITY: ${String(item.quantity)}`, 10, y + 20);
      doc.text(`PRICE: Php${String(item.price.toFixed(2))}`, 10, y + 30);
      y += 40; // Move down for the next item
      y += 5; // Create a line break after each set of order details
  });
  y += 6;
  // Add totals to the PDF
  

  doc.text("SUBTOTAL: Php" + String(subtotal.toFixed(2)), 10, y);
  doc.text("VAT (12%): Php" + String(vat.toFixed(2)), 10, y + 10);
  doc.text("SERVICE CHARGE (5%): Php" + String(serviceCharge.toFixed(2)), 10, y + 20);
  doc.text("AMOUNT OF PAYMENT: Php" + String(grandTotal.toFixed(2)), 10, y + 30);
  doc.text("MODE OF PAYMENT: eCash", 10, y + 40);
  doc.text("CHANGE: Php" + String((grandTotal - grandTotal).toFixed(2)), 10, y + 50);
  doc.text("------------------------------------------------------------", 10, y + 60);
  doc.text("GRAND TOTAL: Php" + String(grandTotal.toFixed(2)), 10, y + 70);

  // Save the PDF
  doc.save("OrderConfirmation.pdf");
}


