// Sample questions array
let questions = [
    { question: "What does HTML stand for?", options: ["Hyper Text", "Home Text", "High Text", "Huge Text"], correctAnswer: "A" },
    { question: "CSS stands for?", options: ["Cascading Style Sheets", "Color Style Sheets", "Creative Style Sheets", "Custom Style Sheets"], correctAnswer: "A" }
  ];
  
  // Display questions
  function displayQuestions() {
    const tableBody = document.querySelector('#questionsTable tbody');
    tableBody.innerHTML = "";
    questions.forEach((q, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${q.question}</td>
        <td>${q.options[0]}</td>
        <td>${q.options[1]}</td>
        <td>${q.options[2]}</td>
        <td>${q.options[3]}</td>
        <td>${q.correctAnswer}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editQuestion(${index})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteQuestion(${index})">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Add new question
  document.getElementById('addQuestionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const question = document.getElementById('question').value;
    const options = [
      document.getElementById('optionA').value,
      document.getElementById('optionB').value,
      document.getElementById('optionC').value,
      document.getElementById('optionD').value
    ];
    const correctAnswer = document.getElementById('correctAnswer').value;
    questions.push({ question, options, correctAnswer });
    alert("Question added successfully!");
    displayQuestions();
    const addModal = new bootstrap.Modal(document.getElementById('addQuestionModal'));
    addModal.hide();
  });
  
  // Edit Question
  function editQuestion(index) {
    // Logic to open a modal to edit question
  }
  
  // Delete Question
  function deleteQuestion(index) {
    if (confirm("Are you sure you want to delete this question?")) {
      questions.splice(index, 1);
      displayQuestions();
    }
  }
  
  // Initialize
  displayQuestions();
  