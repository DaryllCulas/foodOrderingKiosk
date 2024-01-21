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


        /************** ***********************************************************/
        if (paymentMethod) {
          // Perform actions when the user confirms the payment method
          alert(`Payment confirmed with ${paymentMethod.value}`);

          // Code for another modal function for input payment amount
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

          // Calculate VAT (12%) and service charge (5%)
          let vat = 0.12; // 12%
          let serviceCharge = 0.05; // 5%
          let totalVat = subTotal * vat;
          let totalServiceCharge = subTotal * serviceCharge;

          // Modal content for payment amount input
          paymentAmountModal.innerHTML = `
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Enter Payment Amount</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
              <label for="vat">Value Added Tax (12%): ₱${totalVat.toFixed(2)}</label>
              <br/>
              <label for="serviceCharge">Service Charge (5%): ₱${totalServiceCharge.toFixed(2)}</label>
              <br/>
              <label for="separator"> ------------------------------- </label>
              <br>

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
              <div class="modal-body">
                <p>Payment amount confirmed: ₱${paymentAmount.toFixed(2)} via ${paymentMethod.value}</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
              </div>
            </div>
          </div>
        `;

                  // Append the payment success modal to the body
                  document.body.appendChild(paymentSuccessModal);

                  // Activate the Bootstrap modal for payment success
                  let bootstrapPaymentSuccessModal = new bootstrap.Modal(document.getElementById('paymentSuccessModal'));
                  bootstrapPaymentSuccessModal.show();

                  bootstrapPaymentAmountModal.hide(); // Close the payment amount modal
                } else {
                  // Create a modal for insufficient payment
                  let insufficientPaymentModal = document.createElement('div');
                  insufficientPaymentModal.classList.add('modal', 'fade');
                  insufficientPaymentModal.id = 'insufficientPaymentModal';
                  insufficientPaymentModal.setAttribute('tabindex', '-1');
                  insufficientPaymentModal.setAttribute('aria-hidden', 'true');

                  // Modal content for insufficient payment
                  insufficientPaymentModal.innerHTML = `
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Insufficient Payment</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>Payment amount is less than the total cost. Please enter a valid amount.</p>
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
			<div class="modal-dialog modal-dialog-centered">
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