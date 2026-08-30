document.addEventListener('DOMContentLoaded', () => {
    console.log('user.js loaded'); // Check if this logs
    const username = localStorage.getItem('username');
    
    if (!username) {
        console.error('No username found in localStorage');
        return; // Exit if username is not found
    }

    // Display the username in the profile section
    const usernameDisplay = document.getElementById('username');
    usernameDisplay.textContent = username;

    // Handle the contact form submission
    const supportForm = document.getElementById('supportForm');
    supportForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // You can add form handling logic here (e.g., sending data to a server)

        // Show alert after sending the message
        alert('Message sent successfully!');

        // Optionally, clear the form
        supportForm.reset();
    });
});
