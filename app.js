let questions = [
    { question: "What does HTML stand for?", options: ["Hyper Text", "Home Text", "High Text", "Huge Text"], correctAnswer: "A" },
    { question: "CSS stands for?", options: ["Cascading Style Sheets", "Color Style Sheets", "Creative Style Sheets", "Custom Style Sheets"], correctAnswer: "A" }
  ];
  
  let editingIndex = null; // Track index of the question being edited
  
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
    editingIndex = index; // Set the global index for editing
  
    // Populate modal fields with current question data
    const question = questions[index];
    document.getElementById('editQuestion').value = question.question;
    document.getElementById('editOptionA').value = question.options[0];
    document.getElementById('editOptionB').value = question.options[1];
    document.getElementById('editOptionC').value = question.options[2];
    document.getElementById('editOptionD').value = question.options[3];
    document.getElementById('editCorrectAnswer').value = question.correctAnswer;
  
    // Show the edit modal
    const editModal = new bootstrap.Modal(document.getElementById('editQuestionModal'));
    editModal.show();
  }
  
  // Save edited question
  document.getElementById('editQuestionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Update question with new values from modal
    const questionText = document.getElementById('editQuestion').value;
    const options = [
      document.getElementById('editOptionA').value,
      document.getElementById('editOptionB').value,
      document.getElementById('editOptionC').value,
      document.getElementById('editOptionD').value
    ];
    const correctAnswer = document.getElementById('editCorrectAnswer').value;
  
    // Update the question in the questions array
    questions[editingIndex] = { question: questionText, options, correctAnswer };
    alert("Question updated successfully!");
  
    displayQuestions(); // Refresh table with updated data
    const editModal = new bootstrap.Modal(document.getElementById('editQuestionModal'));
    editModal.hide();
  });
  
  // Delete Question
  function deleteQuestion(index) {
    if (confirm("Are you sure you want to delete this question?")) {
      questions.splice(index, 1);
      displayQuestions();
    }
  }
  
  // Initialize
  displayQuestions();
  