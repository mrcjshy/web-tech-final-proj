const USERS_KEY = "tm_users";

// WAIT FOR DOM TO BE FULLY LOADED
document.addEventListener('DOMContentLoaded', function() {
    console.log("Register script loaded");
    
    var form = document.getElementById("registerForm");
    var feedback = document.getElementById("feedback");
    var passwordInput = document.getElementById("password");
    var passwordToggle = document.getElementById("passwordToggle");
    var toggleIcon = document.getElementById("toggleIcon");

    // CHECK IF REQUIRED ELEMENTS EXIST
    if (!form) {
        console.error("Register form not found!");
        return;
    }
    
    if (!feedback) {
        console.error("Feedback element not found!");
        return;
    }

    console.log("Form and feedback elements found");

    function getUsers() {
        var storedUsers = localStorage.getItem(USERS_KEY);
        if (!storedUsers) {
            return [];
        }

        try {
            return JSON.parse(storedUsers);
        } catch (error) {
            console.error("Error parsing users:", error);
            return [];
        }
    }

    function saveUsers(list) {
        try {
            localStorage.setItem(USERS_KEY, JSON.stringify(list));
            console.log("Users saved to localStorage");
        } catch (error) {
            console.error("Error saving users:", error);
        }
    }

    function clearMessage() {
        if (feedback) {
            feedback.textContent = "";
            feedback.className = "feedback";
        }
    }

    function showError(message) {
        if (feedback) {
            feedback.textContent = message;
            feedback.className = "feedback error";
            feedback.style.display = "block";
            console.log("Error shown:", message);
        }
    }

    function showSuccess(message) {
        if (feedback) {
            feedback.textContent = message;
            feedback.className = "feedback success";
            feedback.style.display = "block";
            console.log("Success shown:", message);
        }
    }

    // PASSWORD TOGGLE FUNCTIONALITY (ONLY IF ELEMENTS EXIST)
    if (passwordToggle && passwordInput && toggleIcon) {
        passwordToggle.addEventListener("click", function() {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                toggleIcon.classList.remove("fa-eye");
                toggleIcon.classList.add("fa-eye-slash");
            } else {
                passwordInput.type = "password";
                toggleIcon.classList.remove("fa-eye-slash");
                toggleIcon.classList.add("fa-eye");
            }
        });
        console.log("Password toggle attached");
    }

    // ATTACH SUBMIT EVENT LISTENER
    form.addEventListener("submit", function (event) {
        console.log("Form submitted");
        event.preventDefault();
        event.stopPropagation();
        
        clearMessage();

        var usernameInput = form.querySelector('input[name="username"]') || form.querySelector('#username');
        var emailInput = form.querySelector('input[name="email"]') || form.querySelector('#email');
        var passwordInputField = form.querySelector('input[name="password"]') || form.querySelector('#password');

        if (!usernameInput || !emailInput || !passwordInputField) {
            showError("Form inputs not found. Please refresh the page.");
            return false;
        }

        var username = usernameInput.value.trim();
        var email = emailInput.value.trim().toLowerCase();
        var password = passwordInputField.value;

        console.log("Username:", username, "Email:", email, "Password length:", password.length);

        // VALIDATION: CHECK IF FIELDS ARE EMPTY
        if (!username || !email || !password) {
            showError("Please complete all fields.");
            return false;
        }

        // VALIDATION: CHECK USERNAME LENGTH
        if (username.length < 3) {
            showError("Username must be at least 3 characters long.");
            return false;
        }

        // VALIDATION: CHECK EMAIL FORMAT
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showError("Please enter a valid email address.");
            return false;
        }

        // VALIDATION: CHECK PASSWORD LENGTH
        if (password.length < 6) {
            showError("Password must be at least 6 characters long.");
            return false;
        }

        var users = getUsers();
        console.log("Existing users:", users.length);
        
        var hasDuplicate = users.some(function (user) {
            return (
                user.email === email ||
                user.username.toLowerCase() === username.toLowerCase()
            );
        });

        if (hasDuplicate) {
            showError("That email or username is already taken. Please use different credentials.");
            return false;
        }

        // SUCCESS: CREATE ACCOUNT
        users.push({
            username: username,
            email: email,
            password: password
        });

        saveUsers(users);
        
        console.log("Account created successfully");
        
        // SHOW SUCCESS MESSAGE
        showSuccess("Account created successfully! Redirecting to login page...");
        
        // REDIRECT TO LOGIN.HTML AFTER SHOWING SUCCESS MESSAGE
        setTimeout(function() {
            console.log("Redirecting to login.html");
            window.location.href = "login.html";
        }, 1500);
        
        return false;
    });
    
    console.log("Register form event listener attached");
});
