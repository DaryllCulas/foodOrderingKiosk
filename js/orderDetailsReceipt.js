// Function to generate and download order receipt PDF
function generateAndDownloadOrderReceipt(orderDetails) {
  console.log('Order Details Receipt script loaded.');
  // Create a new instance of jsPDF
  const pdfDoc = new jsPDF();

  // Add content to the PDF
  pdfDoc.text('Order Receipt', 20, 20);
  pdfDoc.text(`Date: ${orderDetails.date}`, 20, 30);
  pdfDoc.text(`Order Number: ${orderDetails.orderNumber}`, 20, 40);
  pdfDoc.text('--------------------------------------------', 20, 50);

  // Add order details to the PDF
  let yPos = 60;
  orderDetails.orderItems.forEach((item) => {
    pdfDoc.text(`Item: ${item.name}`, 20, yPos);
    pdfDoc.text(`Quantity: ${item.quantity}`, 20, yPos + 10);
    pdfDoc.text(`Price: ₱${item.price.toFixed(2)}`, 20, yPos + 20);
    pdfDoc.text('--------------------------------------------', 20, yPos + 30);
    yPos += 40;
  });

  // Add total, VAT, and service charge details
  pdfDoc.text(`Subtotal: ₱${orderDetails.subtotal.toFixed(2)}`, 20, yPos);
  pdfDoc.text(`VAT (12%): ₱${orderDetails.totalVat.toFixed(2)}`, 20, yPos + 10);
  pdfDoc.text(`Service Charge (5%): ₱${orderDetails.totalServiceCharge.toFixed(2)}`, 20, yPos + 20);
  pdfDoc.text('--------------------------------------------', 20, yPos + 30);
  pdfDoc.text(`Total: ₱${orderDetails.total.toFixed(2)}`, 20, yPos + 40);
  pdfDoc.text(`Payment: ₱${orderDetails.paymentAmount.toFixed(2)}`, 20, yPos + 50);
  pdfDoc.text(`Change: ₱${orderDetails.change.toFixed(2)}`, 20, yPos + 60);

  // Save the PDF as a Blob
  const pdfBlob = pdfDoc.output('blob');

  // Create a download link
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(pdfBlob);
  downloadLink.download = `OrderReceipt_${orderDetails.orderNumber}.pdf`;

  // Append the link to the document
  document.body.appendChild(downloadLink);

  // Trigger the click event of the link
  downloadLink.click();

  // Remove the link from the document
  document.body.removeChild(downloadLink);
}

// Listen for the "Confirm" button click
document.addEventListener('DOMContentLoaded', () => {
  let confirmButton = document.getElementById('confirmationSuccessBtn');
  if (confirmButton) {
    confirmButton.addEventListener('click', () => {
      // Prepare order details for PDF receipt
      let orderDetails = {
        date: new Date().toLocaleDateString(),
        orderNumber: generateOrderNumber(), // You need to implement this function
        orderItems: listCards.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal: totalCost,
        totalVat: totalCost * 0.12,
        totalServiceCharge: totalCost * 0.05,
        total: totalCost + totalCost * 0.12 + totalCost * 0.05,
        paymentAmount: paymentAmount,
        change: paymentAmount - (totalCost + totalCost * 0.12 + totalCost * 0.05),
      };

      // Call the function to generate and download the PDF receipt
      generateAndDownloadOrderReceipt(orderDetails);
    });
  }
});

// Helper function to generate a unique order number (you may implement your own logic)
function generateOrderNumber() {
  return Math.floor(Math.random() * 1000000) + 1;
}
