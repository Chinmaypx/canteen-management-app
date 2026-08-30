document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get('amount');

    if (amount) {
        document.getElementById('amount').value = amount; // Set the amount in the input field
    }

    const paymentMethodSelect = document.getElementById('paymentMethod');
    const upiLabel = document.getElementById('upiLabel');
    const upiIdInput = document.getElementById('upiId');
    const upiPinLabel = document.getElementById('upiPinLabel');
    const upiPinInput = document.getElementById('upiPin');
    const submitPaymentButton = document.getElementById('submitPayment');

    paymentMethodSelect.addEventListener('change', function () {
        const selectedMethod = this.value;
        if (selectedMethod === "UPI") {
            upiLabel.classList.remove('hidden');
            upiIdInput.classList.remove('hidden');
            upiPinLabel.classList.remove('hidden');
            upiPinInput.classList.remove('hidden');
        } else {
            upiLabel.classList.add('hidden');
            upiIdInput.classList.add('hidden');
            upiPinLabel.classList.add('hidden');
            upiPinInput.classList.add('hidden');
        }
    });

    submitPaymentButton.onclick = function () {
        const method = paymentMethodSelect.value;
        const amount = document.getElementById('amount').value;
        const upiId = document.getElementById('upiId').value;
        const upiPin = document.getElementById('upiPin').value;

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        if (method === "UPI" && (!upiId || !upiPin)) {
            alert("Please enter your UPI ID and PIN.");
            return;
        }

        const paymentData = {
            payment_method: method,
            amount: amount
        };

        fetch('http://localhost:3000/api/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.message || 'Payment failed.');
                });
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);

            // Retrieve username for saving order history
            const username = localStorage.getItem('username');
            const orderHistory = {
                username: username,
                orderDate: new Date().toISOString(),
                amount: amount,
                paymentMethod: method === "COD" ? "Cash on Delivery" : "UPI"
            };

            // Save order to localStorage for order history
            localStorage.setItem(`order_${username}_${Date.now()}`, JSON.stringify(orderHistory));

            // Redirect to profile page after payment
            window.location.href = '';

            // Clear input fields
            document.getElementById('amount').value = '';
            document.getElementById('upiId').value = '';
            document.getElementById('upiPin').value = '';
        })
        .catch(error => {
            console.error('Error:', error);
            alert(`Payment failed: ${error.message}`);
        });
    };
});
