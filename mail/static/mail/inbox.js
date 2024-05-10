document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  //'inbox','sent','archive' are just string names provided to load_mailbox() function
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');

  //Remove any existing event listener for the compose form, GOOD PRACTICE
  document.querySelector("#compose-form").removeEventListener('submit', submitHandler);

  //Add submit event listener to the compose form only after DOM loaded
  document.querySelector("#compose-form").addEventListener('submit', submitHandler);

  // //Get appropriate mailbox
  const element = document.createElement('div');
  element.id = 'emails-loop';
  element.innerHTML = 'This is the content of the div.';
  element.addEventListener('mouseover', function() {
      // Change background color when mouse is over the div
      element.style.backgroundColor = 'lightblue';
  });
  element.addEventListener('mouseout', function() {
      // Reset background color when mouse leaves the div
      element.style.backgroundColor = '';
  });
  document.querySelector('#emails-view').append(element);

  fetch('emails/inbox')
  .then(response => response.json())
  .then(emails => {
    emails.forEach(function(email){
      
      
    })








  
    console.log(emails);
  })


});





// Send Mail: When a user submits the email composition form, add JavaScript code to actually send the email.
// You’ll likely want to make a POST request to /emails, passing in values for recipients, subject, and body.
// Once the email has been sent, load the user’s sent mailbox.
function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

}





//function for addeventListener of id #compose-form(added in DOM)
function submitHandler(event){
  event.preventDefault(); //Prevent the form from submitting normally

  //Get form values
  const to = document.querySelector('#compose-recipients').value;
  const subject = document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;

  //POST request to send mail
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: to,
        subject: subject,
        body: body
    })
  })
  .then(response => response.json())
  .then(result => {
      // Print result
      console.log(result);
      load_mailbox('sent') //load sent mailbox after the mail is sent
  })
  .catch(error => console.error('Error sending mail:', error));
};





//show the desired mailbox and hide other views
//mailbox here means jo bhi string recieve hogi instead of mailbox
function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;



}




