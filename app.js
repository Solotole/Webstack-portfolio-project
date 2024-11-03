let questions = [
    { question: "What does HTML stand for?", options: ["Hyper Text", "Home Text", "High Text", "Huge Text"], correctAnswer: "A" },
    { question: "CSS stands for?", options: ["Cascading Style Sheets", "Color Style Sheets", "Creative Style Sheets", "Custom Style Sheets"], correctAnswer: "A" }
  ];
  
  let editingIndex = null; // Track index of the question being edited
  
  // Display questions
  function filterQuestions() {
    const searchText = document.getElementById('searchBar').value.toLowerCase();
    
    // Filter questions based on the search text
    const filteredQuestions = questions.filter(q => 
      q.question.toLowerCase().includes(searchText) ||
      q.options.some(option => option.toLowerCase().includes(searchText))
    );
    
    displayQuestions(filteredQuestions); // Display only filtered questions
  }
  
  // Modify displayQuestions to accept an array of questions
  function displayQuestions(questionArray = questions) {
    const cardGrid = document.getElementById('cardGrid');
    cardGrid.innerHTML = ""; // Clear existing content
    
    questionArray.forEach((q, index) => {
      const card = document.createElement('div');
      card.className = "col-md-4 d-flex align-items-stretch mb-4"; // Bootstrap classes
  
      card.innerHTML = `
        <div class="card question-card shadow-lg p-3 bg-white rounded text-dark">
          <div class="card-body">
            <h5 class="card-title">${q.question}</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">A: ${q.options[0]}</li>
              <li class="list-group-item">B: ${q.options[1]}</li>
              <li class="list-group-item">C: ${q.options[2]}</li>
              <li class="list-group-item">D: ${q.options[3]}</li>
            </ul>
            <p class="mt-2"><strong>Correct Answer:</strong> ${q.correctAnswer}</p>
            <div class="card-buttons mt-2">
              <button class="btn btn-sm btn-warning" onclick="editQuestion(${index})">Edit</button>
              <button class="btn btn-sm btn-danger" onclick="deleteQuestion(${index})">Delete</button>
            </div>
          </div>
        </div>
      `;
      
      cardGrid.appendChild(card); // Append card to grid
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
  