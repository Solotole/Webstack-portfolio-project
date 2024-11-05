// results posting
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('quiz-form');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      // Redirect or show a success message here
      // window.location.href = `/result/${data.result_id}`; // Example redirect
    })
    .catch(error => console.error('Error:', error));
  });
});
