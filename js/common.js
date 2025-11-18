const LOGGED_IN_KEY = "tm_logged_in_user";

document.addEventListener('DOMContentLoaded', function() {
    // SET CURRENT YEAR IN FOOTER
    var currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // NAVIGATION TOGGLE FOR MOBILE
    var navToggle = document.querySelector('.nav-toggle');
    var mainNav = document.querySelector('.main-nav ul');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', mainNav.classList.contains('active'));
        });
    }

    // GET LOGGED-IN USER
    function getLoggedInUser() {
        var storedUser = localStorage.getItem(LOGGED_IN_KEY);
        if (!storedUser) {
            return null;
        }

        try {
            return JSON.parse(storedUser);
        } catch (error) {
            return null;
        }
    }

    // LOGIN/LOGOUT VISIBILITY AND USER NAME DISPLAY
    var loginButton = document.getElementById('login-button');
    var logoutButton = document.getElementById('logout-button');
    var registerButton = document.getElementById('register-button');
    var userNameElement = document.getElementById('user-name');
    var cartElement = document.getElementById('cart-element');

    var loggedInUser = getLoggedInUser();

    if (loggedInUser) {
        if (loginButton) loginButton.style.display = 'none';
        if (registerButton) registerButton.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'block';
        if (cartElement) cartElement.style.display = 'block';
        if (userNameElement) {
            userNameElement.style.display = 'block';
            userNameElement.textContent = loggedInUser.username || loggedInUser.email;
            userNameElement.style.cursor = 'default';
            userNameElement.style.pointerEvents = 'none';
        }
    } else {
        if (loginButton) loginButton.style.display = 'block';
        if (registerButton) registerButton.style.display = 'block';
        if (logoutButton) logoutButton.style.display = 'none';
        if (cartElement) cartElement.style.display = 'none';
        if (userNameElement) userNameElement.style.display = 'none';
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem(LOGGED_IN_KEY);
            window.location.href = 'login.html';
        });
    }
});
