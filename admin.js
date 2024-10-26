const quizForm = document.getElementById('quizForm');
const successMessage = document.getElementById('successMessage');

quizForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (validateInputs()) {
        addQuestionToDatabase();
        clearForm();
        displaySuccessMessage("Question added successfully!");
    }
});

function validateInputs() {
    let isValid = true;

    const question = document.getElementById('question').value.trim();
    if (question === '') {
        setError(document.getElementById('question'), "Question is required");
        isValid = false;
    } else {
        setSuccess(document.getElementById('question'));
    }

    for (let i = 1; i <= 4; i++) {
        const answer = document.getElementById(`answer${i}`).value.trim();
        if (answer === '') {
            setError(document.getElementById(`answer${i}`), `Answer ${i} is required`);
            isValid = false;
        } else {
            setSuccess(document.getElementById(`answer${i}`));
        }
    }

    return isValid;
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

function addQuestionToDatabase() {
    const question = document.getElementById('question').value;
    const answers = [
        document.getElementById('answer1').value,
        document.getElementById('answer2').value,
        document.getElementById('answer3').value,
        document.getElementById('answer4').value
    ];
    const correctAnswer = document.getElementById('correctAnswer').value;

    // Make a call to your backend here, passing question, answers, and correctAnswer
    console.log({ question, answers, correctAnswer });  // Placeholder for backend integration
}

function clearForm() {
    quizForm.reset();
    document.querySelectorAll('.input-group input').forEach(input => {
        input.style.borderColor = '#ccc';
    });
}

function displaySuccessMessage(message) {
    successMessage.innerText = message;
    successMessage.style.color = "green";
    setTimeout(() => {
        successMessage.innerText = '';
    }, 3000);
}
