// import { deleteQuestion as deleteQuestionAPI } from './deleteQuestion.js';
  let currentQuestionId;
  let questions = [];
  let editingIndex = null; // Track index of the question being edited

  // Function to handle updating question and answers in the backend
  function updateQuestionInDatabase(questionId, updatedData) {
    return fetch(`http://127.0.0.1:5001/api/v1/admin/questions/${questionId}`, {
	    method: 'PUT',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        alert("Question and answers updated successfully!");
        questions = questions.map(q => 
		q.question_id === questionId ? 
		{ ...q, ...updatedData } : q
	);
        displayQuestions();
      } else {
        alert("Failed to update question and answers.");
      }
    })
    .catch(error => console.error("Error updating question and answers:", error));
  }


  // Display questions
  function displayQuestions() {
    const tableBody = document.querySelector('#questionsTable tbody');
    tableBody.innerHTML = "";
    questions.forEach((q, index) => {
      const row = document.createElement('tr');
      row.setAttribute('data-question-id', q.question_id);
      row.innerHTML = `
        <td>${q.question}</td>
        <td>${q.options[0]}</td>
        <td>${q.options[1]}</td>
        <td>${q.options[2]}</td>
        <td>${q.options[3]}</td>
        <td>${q.correctAnswer}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editQuestion(${index}, '${q.question_id}')">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteQuestion(${index}, '${q.question_id}')">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Add new question
  document.getElementById('addQuestionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const question = document.getElementById('question').value;
    const optionA = document.getElementById('optionA').value;
    const optionB = document.getElementById('optionB').value;
    const optionC = document.getElementById('optionC').value;
    const optionD = document.getElementById('optionD').value;
    const options = [
      optionA,
      optionB,
      optionC,
      optionD
    ];
    const correctAnswer = document.getElementById('correctAnswer').value;
    const data = { question, options, correctAnswer };
    callingRoutes(data);
    // function to save new questions and its and answers into mongo database
    const addModal = new bootstrap.Modal(document.getElementById('addQuestionModal'));
    addModal.hide();
  });
  
  // Edit Question
  function editQuestion(index, questionId) {
    editingIndex = index; // Set the global index for editing
    
    // Populate modal fields with current question data
    const question = questions[index];
    document.getElementById('editQuestion').value = question.question;
    document.getElementById('editOptionA').value = question.options[0];
    document.getElementById('editOptionB').value = question.options[1];
    document.getElementById('editOptionC').value = question.options[2];
    document.getElementById('editOptionD').value = question.options[3];
    document.getElementById('editCorrectAnswer').value = question.correctAnswer;
    currentQuestionId = questionId;
    // Show the edit modal
    const editModal = new bootstrap.Modal(document.getElementById('editQuestionModal'));
    editModal.show();
  }
  
  // function to call endroutes to save questions and answers
  function callingRoutes(data) {
    // Post the question
    // console.log(`question in js ${data.question}`);
    fetch('http://127.0.0.1:5001/api/v1/admin/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: data.question })
    })
    .then(response => response.json())
    .then(questionData => {
      if (questionData.question_id) {
        questions.push({
		question: data.question, 
		options: data.options, 
		correctAnswer: data.correctAnswer, 
		question_id: questionData.question_id
	});
        // const questionId = questionData.question_id;
	fetch('http://127.0.0.1:5001/api/v1/admin/answers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question_id: questionData.question_id,
            answers: data.options,
            correct_answer: data.correctAnswer
	  })
	})
        .then(response => response.json())
        .then(answerData => {
          alert('Question and answers added successfully to database!');
          // Refresh table with updated data
          displayQuestions();
	})
        .catch(error => console.error('Error posting answers:', error));
      } else {
        alert('Failed to create question.');
      }
    })
    .catch(error => console.error('Error posting question:', error));
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

    const updatedData = { 
	    question: questionText, 
	    options: options, 
	    correctAnswer: correctAnswer 
    };
    // Update the question in the questions array
    questions[editingIndex] = { question: questionText, options, correctAnswer };
    updateQuestionInDatabase(currentQuestionId, updatedData);
    alert("Question updated successfully!");
    // Refresh table with updated data
    const editModal = new bootstrap.Modal(document.getElementById('editQuestionModal'));
    editModal.hide();
  });
  
  async function deleteQuestionAPI() {
    const url = `http://127.0.0.1:5001/api/v1/admin/questions/${currentQuestionId}`;
    fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
       if (response.ok) {
         alert('Question deleted successfully.');
       } else {
         alert('Failed to delete question.');
       }
    })
    .catch(error => console.error('Error deleting question:', error));
  }

  // Delete Question
  async function deleteQuestion(index, question_id) {
    if (confirm("Are you sure you want to delete this question?")) {
      console.log(`question id: ${question_id}`);
      // Call API to delete from the database
      currentQuestionId = question_id;
      await deleteQuestionAPI();
      questions.splice(index, 1);
      // Refresh table with updated data
      displayQuestions();
    }
  }
