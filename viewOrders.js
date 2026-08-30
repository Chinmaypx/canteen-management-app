// viewOrders.js

// Function to fetch and display orders
async function fetchOrders() {
    try {
        const response = await fetch('/api/orders');
        const orders = await response.json();

        const ordersList = document.getElementById('orders-list');
        ordersList.innerHTML = ''; // Clear any existing rows

        orders.forEach(order => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.customer_name}</td>
                <td>${order.item_name}</td>
                <td>${order.price}</td>
                <td>${order.quantity}</td>
                <td>$${order.total_price}</td>
                <td>${new Date(order.order_date).toLocaleString()}</td>
            `;

            ordersList.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
}

// Load orders when the page is loaded
document.addEventListener('DOMContentLoaded', fetchOrders);
