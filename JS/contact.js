// Contact Form Handler
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // In a real application, you would send this data to a server
  console.log('Form submitted:', { name, email, subject, message });
  
  // Show success message
  alert('Thank you for contacting us! We will get back to you soon.');
  
  // Reset form
  this.reset();
});