const form = document.getElementById('signupForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

form.addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent form submission for validation

    validateInputs();
});

function validateInputs() {
    // Clear errors
    clearErrors();

    // Validate each field
    validateUsername();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
}

function validateUsername() {
    const usernameValue = username.value.trim();

    if (usernameValue === '') {
        setError(username, 'Username is required');
    } else if (usernameValue.length < 3) {
        setError(username, 'Username must be at least 3 characters');
    } else {
        setSuccess(username);
    }
}

function validateEmail() {
    const emailValue = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === '') {
        setError(email, 'Email is required');
    } else if (!emailRegex.test(emailValue)) {
        setError(email, 'Enter a valid email');
    } else {
        setSuccess(email);
    }
}

function validatePassword() {
    const passwordValue = password.value.trim();

    if (passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 6) {
        setError(password, 'Password must be at least 6 characters');
    } else {
        setSuccess(password);
    }
}

function validateConfirmPassword() {
    const confirmPasswordValue = confirmPassword.value.trim();
    const passwordValue = password.value.trim();

    if (confirmPasswordValue === '') {
        setError(confirmPassword, 'Confirm Password is required');
    } else if (confirmPasswordValue !== passwordValue) {
        setError(confirmPassword, 'Passwords do not match');
    } else {
        setSuccess(confirmPassword);
    }
}

function setError(input, message) {
    const inputGroup = input.parentElement;
    const small = inputGroup.querySelector('small');
    small.innerText = message;
    small.style.visibility = 'visible';
    input.style.borderColor = 'red';
}

function setSuccess(input) {
    const inputGroup = input.parentElement;
    const small = inputGroup.querySelector('small');
    small.style.visibility = 'hidden';
    input.style.borderColor = 'green';
}

function clearErrors() {
    const inputs = document.querySelectorAll('.input-group input');
    inputs.forEach(input => {
        input.style.borderColor = '#ccc';
    });

    const errors = document.querySelectorAll('small');
    errors.forEach(error => {
        error.style.visibility = 'hidden';
    });
}
