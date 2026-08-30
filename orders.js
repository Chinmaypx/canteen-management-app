document.addEventListener('DOMContentLoaded', () => {
    const itemsListDiv = document.getElementById('items-list');
    const totalPriceDiv = document.getElementById('total-price');

    // Retrieve stored order items and total price from localStorage
    const orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
    const totalPrice = localStorage.getItem('totalPrice');

    // Display order items
    orderItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.quantity} x ${item.itemName} - $${item.itemPrice.toFixed(2)}`;
        itemsListDiv.appendChild(itemDiv);
    });

    // Ensure total price is a valid number before displaying
    const totalPriceNum = parseFloat(totalPrice);
    if (!isNaN(totalPriceNum)) {
        totalPriceDiv.textContent = `Total Price: $${totalPriceNum.toFixed(2)}`;
    } else {
        totalPriceDiv.textContent = `Total Price: Invalid`;
    }

    // Handle order form submission
    document.getElementById('order-form').addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        // Get customer details from the form
        const customerName = document.getElementById('customer-name').value;
        const customerEmail = document.getElementById('customer-email').value;

        // Validate customer details
        if (!customerName || !customerEmail) {
            alert('Please provide both your name and email.');
            return;
        }

        // Ensure total price is a number before sending
        if (isNaN(totalPriceNum)) {
            alert('Invalid total price. Please check your order.');
            return;
        }

        // Send order to the server
        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customer_name: customerName,
                customer_email: customerEmail, // Include email if necessary
                item_name: orderItems.map(item => item.itemName), // Send as array
                quantity: orderItems.map(item => item.quantity), // Send as array
                total_price: totalPriceNum, // Ensure this is a valid number
            }),
        })
        .then(response => response.json())
        .then(data => {
            alert('Order submitted successfully!');
            // Clear stored order details
            localStorage.removeItem('orderItems');
            localStorage.removeItem('totalPrice');
            window.location.href = 'menu.html'; // Redirect back to the menu
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to submit the order. Please try again.');
        });
    });
});
