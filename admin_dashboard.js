let questions = [];
let editIndex = null;

function showAddQuestion() {
    document.getElementById('add-question').style.display = 'block';
    document.getElementById('manage-questions').style.display = 'none';
    document.getElementById('page-title').innerText = "Add New Quiz Question";
}

function showManageQuestions() {
    document.getElementById('add-question').style.display = 'none';
    document.getElementById('manage-questions').style.display = 'block';
    document.getElementById('page-title').innerText = "Manage Quiz Questions";
    displayQuestions();
}

document.getElementById('quizForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const category = document.getElementById('category').value.trim();
    const questionText = document.getElementById('question').value.trim();
    const answers = [
        document.getElementById('answer1').value.trim(),
        document.getElementById('answer2').value.trim(),
        document.getElementById('answer3').value.trim(),
        document.getElementById('answer4').value.trim(),
    ];
    const correctAnswer = parseInt(document.getElementById('correctAnswer').value);

    if (editIndex !== null) {
        // Update existing question
        questions[editIndex] = { category, question: questionText, answers, correctAnswer };
        editIndex = null;
    } else {
        // Add new question
        questions.push({ category, question: questionText, answers, correctAnswer });
    }

    clearForm();
    showManageQuestions();
});

function clearForm() {
    document.getElementById('quizForm').reset();
    document.getElementById('category').value = '';
}

function displayQuestions() {
    const questionsList = document.getElementById('questions-list');
    questionsList.innerHTML = '';
    questions.forEach((q, index) => {
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        questionItem.innerHTML = `
            <p><strong>Category:</strong> ${q.category}</p>
            <p><strong>Question:</strong> ${q.question}</p>
            <p><strong>Answers:</strong> ${q.answers.join(', ')}</p>
            <p><strong>Correct Answer:</strong> ${q.answers[q.correctAnswer - 1]}</p>
            <button class="edit-btn" onclick="editQuestion(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteQuestion(${index})">Delete</button>
        `;
        questionsList.appendChild(questionItem);
    });
}

function editQuestion(index) {
    const questionToEdit = questions[index];
    document.getElementById('category').value = questionToEdit.category;
    document.getElementById('question').value = questionToEdit.question;
    document.getElementById('answer1').value = questionToEdit.answers[0];
    document.getElementById('answer2').value = questionToEdit.answers[1];
    document.getElementById('answer3').value = questionToEdit.answers[2];
    document.getElementById('answer4').value = questionToEdit.answers[3];
    document.getElementById('correctAnswer').value = questionToEdit.correctAnswer;

    editIndex = index;
    showAddQuestion();
}

function deleteQuestion(index) {
    questions.splice(index, 1);
    displayQuestions();
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    // Toggle the 'hidden' class to show/hide the sidebar
    sidebar.classList.toggle('hidden');
    // Optionally, change the button text when toggling
    const toggleBtn = document.querySelector('.toggle-btn');
    if (sidebar.classList.contains('hidden')) {
        toggleBtn.innerHTML = '☰'; // Show button
    } else {
        toggleBtn.innerHTML = '✖'; // Hide button
    }
}
