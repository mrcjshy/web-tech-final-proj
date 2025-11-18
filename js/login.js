// LOGIN.JS - ULTRA-SIMPLE DIRECT APPROACH

(function() {
    'use strict';
    
    const USERS_KEY = "tm_users";
    const LOGGED_IN_KEY = "tm_logged_in_user";

    function init() {
        console.log("LOGIN.JS: Starting initialization...");
        
        var form = document.getElementById("loginForm");
        var feedback = document.getElementById("feedback");
        var emailInput = document.getElementById("email");
        var passwordInput = document.getElementById("password");
        var submitBtn = document.getElementById("loginSubmitBtn");

        if (!form) {
            console.error("LOGIN.JS: Form not found!");
            return;
        }
        if (!feedback) {
            console.error("LOGIN.JS: Feedback not found!");
            return;
        }
        if (!emailInput || !passwordInput) {
            console.error("LOGIN.JS: Inputs not found!");
            return;
        }

        console.log("LOGIN.JS: All elements found!");

        function showError(msg) {
            feedback.innerHTML = msg;
            feedback.className = "feedback error";
            feedback.style.cssText = "display:block; visibility:visible; color:#c0392b; margin-top:8px;";
            console.log("LOGIN.JS ERROR:", msg);
        }

        function showSuccess(msg) {
            feedback.innerHTML = msg;
            feedback.className = "feedback success";
            feedback.style.cssText = "display:block; visibility:visible; color:#1b7a3d; margin-top:8px;";
            console.log("LOGIN.JS SUCCESS:", msg);
        }

        function handleSubmit(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            console.log("LOGIN.JS: Form submitted!");

            var email = emailInput.value.trim().toLowerCase();
            var password = passwordInput.value;

            console.log("LOGIN.JS: Email =", email);
            console.log("LOGIN.JS: Password length =", password.length);

            // VALIDATE
            if (!email || !password) {
                showError("Please enter both email and password.");
                return false;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showError("Please enter a valid email address.");
                return false;
            }

            // GET USERS
            var usersStr = localStorage.getItem(USERS_KEY);
            var users = [];
            if (usersStr) {
                try {
                    users = JSON.parse(usersStr);
                } catch (err) {
                    console.error("LOGIN.JS: Parse error", err);
                }
            }

            console.log("LOGIN.JS: Found", users.length, "users");

            if (users.length === 0) {
                showError("No account found. Please register first.");
                return false;
            }

            // FIND MATCH
            var found = false;
            var matchedUser = null;
            for (var i = 0; i < users.length; i++) {
                if (users[i].email === email && users[i].password === password) {
                    found = true;
                    matchedUser = users[i];
                    break;
                }
            }

            if (!found) {
                showError("Invalid email or password.");
                return false;
            }

            console.log("LOGIN.JS: Login successful for", matchedUser.username);

            // SAVE SESSION
            localStorage.setItem(LOGGED_IN_KEY, JSON.stringify({
                username: matchedUser.username,
                email: matchedUser.email
            }));

            showSuccess("Login successful! Redirecting...");

            // REDIRECT
            setTimeout(function() {
                window.location.href = "index.html";
            }, 1000);

            return false;
        }

        // ATTACH HANDLERS
        form.addEventListener("submit", handleSubmit);
        if (submitBtn) {
            submitBtn.addEventListener("click", handleSubmit);
        }

        console.log("LOGIN.JS: Handlers attached successfully!");
    }

    // INITIALIZE WHEN READY
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(init, 1);
    } else {
        document.addEventListener('DOMContentLoaded', init);
        window.addEventListener('load', init);
    }

    // ALSO TRY IMMEDIATE INIT
    setTimeout(init, 100);
})();
