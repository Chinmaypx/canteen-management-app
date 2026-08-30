// Clear localStorage (uncomment this line if you want to start fresh every time)
// localStorage.clear();

// Function to load menu data from localStorage
function loadMenuData() {
    const storedData = localStorage.getItem('menuData');
    return storedData ? JSON.parse(storedData) : { breakfast: [], lunch: [] };
}

// Initialize menu data from localStorage
const menuData = loadMenuData();

// Function to create rows for the view menu
function populateViewMenu() {
    const breakfastViewList = document.getElementById('breakfast-view-list');
    const lunchViewList = document.getElementById('lunch-view-list');

    // Clear current lists before populating
    breakfastViewList.innerHTML = '';
    lunchViewList.innerHTML = '';

    if (menuData.breakfast.length === 0 && menuData.lunch.length === 0) {
        breakfastViewList.innerHTML = '<tr><td colspan="2">No items available.</td></tr>';
        lunchViewList.innerHTML = '<tr><td colspan="2">No items available.</td></tr>';
    } else {
        menuData.breakfast.forEach(({ item, price }) => {
            const row = `<tr><td>${item}</td><td>$${parseFloat(price).toFixed(2)}</td></tr>`;
            breakfastViewList.innerHTML += row;
        });

        menuData.lunch.forEach(({ item, price }) => {
            const row = `<tr><td>${item}</td><td>$${parseFloat(price).toFixed(2)}</td></tr>`;
            lunchViewList.innerHTML += row;
        });
    }
}

// Function to create rows for the select menu with quantity input
function populateSelectMenu() {
    const breakfastSelectList = document.getElementById('breakfast-select-list');
    const lunchSelectList = document.getElementById('lunch-select-list');

    breakfastSelectList.innerHTML = '';
    lunchSelectList.innerHTML = '';

    if (menuData.breakfast.length > 0) {
        menuData.breakfast.forEach(({ item, price }) => {
            const row = `<tr>
                            <td>${item}</td>
                            <td>$${parseFloat(price).toFixed(2)}</td>
                            <td><input type="number" min="0" max="10" value="0" data-item="$${item}" data-price="${price}"></td>
                        </tr>`;
            breakfastSelectList.innerHTML += row;
        });
    }

    if (menuData.lunch.length > 0) {
        menuData.lunch.forEach(({ item, price }) => {
            const row = `<tr>
                            <td>${item}</td>
                            <td>$${parseFloat(price).toFixed(2)}</td>
                            <td><input type="number" min="0" max="10" value="0" data-item="${item}" data-price="${price}"></td>
                        </tr>`;
            lunchSelectList.innerHTML += row;
        });
    }
}

// Updated function to submit the order
function submitOrder() {
    const breakfastInputs = document.querySelectorAll('#breakfast-select-list input[type="number"]');
    const lunchInputs = document.querySelectorAll('#lunch-select-list input[type="number"]');
    const order = [];
    let totalPrice = 0;

    // Collecting breakfast order items
    breakfastInputs.forEach(input => {
        const quantity = parseInt(input.value);
        if (quantity > 0) {
            const item = input.getAttribute('data-item');
            const price = parseFloat(input.getAttribute('data-price'));
            order.push({ itemName: item, quantity, totalPrice: price * quantity });
            totalPrice += price * quantity;
        }
    });

    // Collecting lunch order items
    lunchInputs.forEach(input => {
        const quantity = parseInt(input.value);
        if (quantity > 0) {
            const item = input.getAttribute('data-item');
            const price = parseFloat(input.getAttribute('data-price'));
            order.push({ itemName: item, quantity, totalPrice: price * quantity });
            totalPrice += price * quantity;
        }
    });

    // Displaying order summary
    const orderSummaryDiv = document.getElementById('order-summary');
    const orderSummaryList = document.getElementById('order-summary-list');
    orderSummaryList.innerHTML = '';

    order.forEach(item => {
        const row = `<tr>
                        <td>${item.itemName}</td>
                        <td>$${item.totalPrice.toFixed(2)}</td>
                        <td>${item.quantity}</td>
                    </tr>`;
        orderSummaryList.innerHTML += row;
    });

    orderSummaryDiv.style.display = 'block';
    const totalPriceDiv = document.getElementById('total-price');
    totalPriceDiv.textContent = `Total Price: $${totalPrice.toFixed(2)}`;

    // Fetching username and userId from localStorage
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage

    // Creating order data object to save
    const orderData = {
        username,
        userId, // Adding userId to order data
        orderDate: new Date().toISOString(),
        items: order,
        totalPrice: totalPrice
    };

    // Save order data to the server for history
    fetch('http://localhost:3000/api/order-history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Order history saved:', data);
        // Enable pay button
        const payButton = document.getElementById('payButton');
        payButton.style.display = 'block';
    })
    .catch(error => {
        console.error('Error saving order history:', error);
    });
}

// Function to add new items to the menu
function addMenuItem(event) {
    event.preventDefault(); // Prevent form submission

    const newItem = document.getElementById('new-item').value;
    const newPrice = parseFloat(document.getElementById('new-price').value).toFixed(2);
    const mealType = document.getElementById('meal-type').value;

    if (!newItem || isNaN(newPrice)) {
        alert('Please enter both item name and price.');
        return;
    }

    menuData[mealType].push({ item: newItem, price: newPrice });

    localStorage.setItem('menuData', JSON.stringify(menuData));

    document.getElementById('new-item').value = '';
    document.getElementById('new-price').value = '';

    populateViewMenu();
    populateSelectMenu();

    alert('Item added successfully!');
}

// Initialize both menus on load
document.addEventListener('DOMContentLoaded', () => {
    populateViewMenu();
    populateSelectMenu();

    const orderButton = document.getElementById('submit-order-button');
    orderButton.onclick = submitOrder;

    const addItemButton = document.getElementById('add-item-button');
    addItemButton.onclick = addMenuItem;

    const payButton = document.getElementById('payButton');
    payButton.onclick = function() {
        const totalPrice = parseFloat(document.getElementById('total-price').textContent.replace(/[^0-9.]/g, ''));
        window.location.href = `payment.html?amount=${totalPrice.toFixed(2)}`;
    };
});
