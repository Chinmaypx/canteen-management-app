const body = document.body;
body.style.margin = '0';
body.style.fontFamily = 'Arial, sans-serif';

// Clear the body to avoid any unwanted slides
while (body.firstChild) {
    body.removeChild(body.firstChild);
}

// Home Container
const homeContainer = document.createElement('div');
homeContainer.className = 'home-container';
homeContainer.style.display = 'flex';
homeContainer.style.flexDirection = 'column';
homeContainer.style.alignItems = 'center';
homeContainer.style.height = '100vh';
homeContainer.style.width = '100vw';
homeContainer.style.backgroundImage = "url('Background image.jpg')";
homeContainer.style.backgroundSize = 'cover';

// Title Box
const titleBox = document.createElement('div');
titleBox.style.backgroundColor = 'rgba(255, 215, 0, 0.8)'; // Semi-transparent background
titleBox.style.borderRadius = '10px'; // Rounded corners
titleBox.style.padding = '20px';
titleBox.style.textAlign = 'center';
titleBox.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.5)'; // Shadow for depth
titleBox.style.marginTop = '20px'; // Spacing from top

// Title
const title = document.createElement('h1');
title.textContent = 'RASODA';
title.style.color = '#000'; // Black color for contrast
title.style.fontSize = '48px'; // Font size
title.style.margin = '0'; // Remove default margin

titleBox.appendChild(title); // Add title to the box
homeContainer.appendChild(titleBox); // Add the box to the home container

// Decorative Section
const decorativeBox = document.createElement('div');
decorativeBox.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'; // Light background
decorativeBox.style.borderRadius = '10px';
decorativeBox.style.padding = '40px';
decorativeBox.style.marginTop = '30px'; // Spacing from title box
decorativeBox.style.textAlign = 'center';
decorativeBox.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.5)'; // Shadow for depth

const subtitle = document.createElement('h2');
subtitle.textContent = 'Welcome to the Kitchen of Flavors';
subtitle.style.color = '#333'; // Dark color for contrast
subtitle.style.fontSize = '24px'; // Subtitle size
subtitle.style.margin = '0'; // Remove default margin

decorativeBox.appendChild(subtitle); // Add subtitle to the decorative box
homeContainer.appendChild(decorativeBox); // Add the decorative box to the home container

// Navigation Bar
const navBar = document.createElement('div');
navBar.className = 'nav-bar';
navBar.style.display = 'flex';
navBar.style.justifyContent = 'space-around';
navBar.style.position = 'fixed';
navBar.style.bottom = '0';
navBar.style.width = '100%';
navBar.style.backgroundColor = 'rgba(255, 215, 0, 0.8)';
navBar.style.padding = '10px 0';

function createNavItem(icon, label, onClick) {
    const navItem = document.createElement('div');
    navItem.style.display = 'flex';
    navItem.style.flexDirection = 'column';
    navItem.style.alignItems = 'center';
    navItem.style.color = '#333';
    navItem.style.cursor = 'pointer';
    
    const navIcon = document.createElement('span');
    navIcon.textContent = icon;
    navIcon.style.fontSize = '24px';

    const navLabel = document.createElement('span');
    navLabel.textContent = label;
    navLabel.style.fontSize = '14px';

    navItem.appendChild(navIcon);
    navItem.appendChild(navLabel);
    navItem.onclick = onClick;
    return navItem;
}

// Function to navigate to the menu page
function goToMenu() {
    window.location.href = 'menu.html';
}

// Function to navigate to the payment page
function goToPayment() {
    window.location.href = 'payment.html';
}

// Function to navigate to user profile
function showUserSection() {
    window.location.href = 'user.html'; // Redirect to user.html
}

// Function to show settings options
function showSettings() {
    // Clear the homeContainer to load new content
    homeContainer.innerHTML = '';

    // Create a container for the settings table
    const settingsContainer = document.createElement('div');
    settingsContainer.style.display = 'flex';
    settingsContainer.style.justifyContent = 'center';
    settingsContainer.style.alignItems = 'center';
    settingsContainer.style.height = '100vh'; // Full height for centering
    settingsContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent background
    settingsContainer.style.borderRadius = '10px'; // Rounded corners
    settingsContainer.style.padding = '20px';

    // Create a table for the links
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    table.style.color = '#fff';
    table.style.textAlign = 'center';

    const tbody = document.createElement('tbody');

    // Create a row for Feedback
    const feedbackRow = document.createElement('tr');
    const feedbackCell = document.createElement('td');
    const feedbackLink = document.createElement('a');
    feedbackLink.href = 'feedback.html'; // Link to feedback page
    feedbackLink.textContent = 'Feedback';
    feedbackLink.style.color = '#fff';
    feedbackLink.style.textDecoration = 'none';
    feedbackLink.style.fontSize = '24px';
    feedbackCell.appendChild(feedbackLink);
    feedbackRow.appendChild(feedbackCell);
    tbody.appendChild(feedbackRow);

    // Create a row for Rate Us
    const rateUsRow = document.createElement('tr');
    const rateUsCell = document.createElement('td');
    const rateUsLink = document.createElement('a');
    rateUsLink.href = 'rateUs.html'; // Link to rate us page
    rateUsLink.textContent = 'Rate Us';
    rateUsLink.style.color = '#fff';
    rateUsLink.style.textDecoration = 'none';
    rateUsLink.style.fontSize = '24px';
    rateUsCell.appendChild(rateUsLink);
    rateUsRow.appendChild(rateUsCell);
    tbody.appendChild(rateUsRow);

    table.appendChild(tbody);
    settingsContainer.appendChild(table);
    homeContainer.appendChild(settingsContainer);

    // Recreate the navigation bar
    homeContainer.appendChild(navBar);
}

// Add navigation items
navBar.appendChild(createNavItem('🍔', 'Menu', goToMenu));
navBar.appendChild(createNavItem('📄', 'Pay', goToPayment));
navBar.appendChild(createNavItem('👥', 'User', showUserSection));
navBar.appendChild(createNavItem('⚙️', 'Settings', showSettings)); // Update to show settings interface

// Final append of home container and nav bar
homeContainer.appendChild(navBar);
body.appendChild(homeContainer);
