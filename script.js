document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        document.querySelector('.login-container').innerHTML = "<h2>Logging in...</h2>";

        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Login failed. Please try again.');
        })
        .then(data => {
            // Store the username and userId in local storage on successful login
            localStorage.setItem('username', username); // Store username
            localStorage.setItem('userId', data.userId); // Store userId
            alert(data.message);
            window.location.href = 'home.html'; // Redirect on successful login
        })
        .catch(error => {
            alert(error.message);
            document.querySelector('.login-container').innerHTML = `
                <h1>Welcome to Rasoda</h1>
                <form id="login-form">
                    <input type="text" id="username" placeholder="UserName*" required>
                    <div class="password-container">
                        <input type="password" id="password" placeholder="Password*" required>
                        <i class="fas fa-eye" id="toggle-password" onclick="togglePassword()"></i>
                    </div>
                    <button type="submit">Login</button>
                </form>`;
        });
    });

    // Toggle password visibility function
    window.togglePassword = function() {
        const passwordInput = document.getElementById('password');
        const toggleIcon = document.getElementById('toggle-password');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.classList.remove('fa-eye');
            toggleIcon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            toggleIcon.classList.remove('fa-eye-slash');
            toggleIcon.classList.add('fa-eye');
        }
    }
});
