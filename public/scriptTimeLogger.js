// JavaScript to show and hide the successfulMsg
const successfulMsg = document.getElementById("successfulMsg");
// Locate the submit button by its class name
const submitButton = document.querySelector('.submit');




// Function to show the message and then hide it
function showSuccessMessageAndRedirect() {
  successfulMsg.style.display = "block"; // Display the message
  // Check if the submit button element was found
  if (submitButton) {
    // Modify the margin-top property to 5%
    submitButton.style.marginTop = '5%';
  }
  setTimeout(() => {
    successfulMsg.style.display = "none"; // Hide the message after 3 seconds
    // Redirect to secrets.html after hiding the message
    window.location.href = "/timelogger"; // Change the URL to your actual page
  }, 3000); // 3000 milliseconds (3 seconds)
}
