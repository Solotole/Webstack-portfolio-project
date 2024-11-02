// Function to validate user answers
async function validateAnswers(userAnswers) {
  let correctCount = 0;
  for (const answer of userAnswers) {
    // Send each answer to the validation endpoint
    const response = await fetch('http://127.0.0.1:5001/api/v1/validate', {
	method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer_id: answer.id })
    });
    if (response.ok) {
      const data = await response.json();
      if (data.is_correct) {
        correctCount += 1;
      }
    } else {
      console.log("Error validating answer:", await response.json());
    }
  }
  // Calculate the percentage of correct answers
  const percentage = (correctCount / userAnswers.length) * 100;
  console.log(`User scored: ${percentage}%`);
  // Append the result to the User's result array in the backend
  await updateUserResults(percentage);
}

// Function to update User's result in the backend
async function updateUserResults(score) {
  const response = await fetch('http://127.0.0.1:5001/api/v1/update_user_results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ result: score })
  });
  if (!response.ok) {
    console.log("Error updating user results:", await response.json());
  } else {
    console.log("User results updated successfully.");
  }
}

const userAnswers = [
    { id: 'answer_id_1' },
    { id: 'answer_id_2' },
];
validateAnswers(userAnswers);
