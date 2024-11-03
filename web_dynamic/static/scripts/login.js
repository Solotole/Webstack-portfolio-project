const loginForm = document.getElementById('loginForm');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent form submission

    validateLoginInputs();
});

function validateLoginInputs() {
    clearErrors();
    validateLoginEmail();
    validateLoginPassword();
}

function validateLoginEmail() {
    const emailValue = loginEmail.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === '') {
        setError(loginEmail, 'Email is required');
    } else if (!emailRegex.test(emailValue)) {
        setError(loginEmail, 'Enter a valid email');
    } else {
        setSuccess(loginEmail);
    }
}

function validateLoginPassword() {
    const passwordValue = loginPassword.value.trim();

    if (passwordValue === '') {
        setError(loginPassword, 'Password is required');
    } else if (passwordValue.length < 6) {
        setError(loginPassword, 'Password must be at least 6 characters');
    } else {
        setSuccess(loginPassword);
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
