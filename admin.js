// Sample data storage (using local storage in this example)
const menuData = loadMenuData(); // Ensure this function is correctly defined

// Function to add a meal item
async function addMeal(event) {
    event.preventDefault(); // Prevent form submission

    const mealName = document.getElementById('meal-name').value;
    const mealPrice = parseFloat(document.getElementById('meal-price').value);
    const mealCategory = document.getElementById('meal-category').value.toLowerCase(); // Use lowercase for consistency

    // Validate inputs
    if (!mealName || isNaN(mealPrice)) {
        alert('Please enter a valid meal name and price.');
        return;
    }

    // Update menuData based on meal type
    menuData[mealCategory].push({ item: mealName, price: mealPrice });

    // Save updated menuData to localStorage
    localStorage.setItem('menuData', JSON.stringify(menuData));

    // Clear input fields
    document.getElementById('meal-name').value = '';
    document.getElementById('meal-price').value = '';

    // Refresh the view and selection menus
    populateViewMenu();
    populateSelectMenu();

    alert('Item added successfully!');
}

// Attach event listener to the form after the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const adminForm = document.getElementById('admin-form'); // Make sure this ID matches your HTML
    adminForm.addEventListener('submit', addMeal);
});
