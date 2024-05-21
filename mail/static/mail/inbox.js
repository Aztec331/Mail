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


});





// Send Mail: When a user submits the email composition form, add JavaScript code to actually send the email.
// You’ll likely want to make a POST request to /emails, passing in values for recipients, subject, and body.
// Once the email has been sent, load the user’s sent mailbox.
function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#detail_emails-view').style.display = 'none';
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
      console.log('result is above me')
      load_mailbox('sent') //load sent mailbox after the mail is sent
  })
  .catch(error => console.error('Error sending mail:', error));
};





//show the desired mailbox and hide other views
//mailbox here means jo bhi string recieve hogi instead of mailbox
function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#detail_emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  //run a switch case for urls of different mailboxes
  let url;
  switch(mailbox){
    case 'inbox':
      url = 'emails/inbox';
      break;
    case 'sent':
      url = 'emails/sent';
      break;
    case 'archive':
      url = 'emails/archive';
      break;
    default:
      console.log('Invalid mailbox');
      return;
  }

  //fetches mail according to the URL provided by switch case
  fetch(url)
  .then(response => response.json())
  .then(emails => {

    
    emails.forEach(function(email){
      //created a div in javascript due to SPA(Single page application)
      //name of the element is div and constants name too is div
      const div = document.createElement('div'); //indivisual email div



      //class name of element 'div'
      div.classList.add('emails-loop');

      //populating div element with loop variable 'email'
      //and using span tag
      div.innerHTML= `
      <span class="sender">${email.sender}</span>
      <span class="sender">${email.subject}</span>
      <span class="sender">${email.timestamp}</span>
      `
      //changing color of the div if it is read by the user
      if(email.read===true){
        div.style.backgroundColor= 'lightgrey';
      }

      document.querySelector('#emails-view').append(div);

      const subject = document.createElement('h3'); //subject tag for detail email
      const timestamp = document.createElement('div') //timestamp tag for detail email
      const sender = document.createElement('div') // sender tag for detail email
      const recipients = document.createElement('div') // recipients tag for detail email
      const body = document.createElement('textarea') // body tag for detail email
    
      //when you click on any div/email its detailed view opens up
      div.addEventListener('click',() => {
    
        document.querySelector('#emails-view').style.display = 'none';
        document.querySelector('#compose-view').style.display = 'none';
        document.querySelector('#detail_emails-view').style.display = 'block';
    
        fetch(`/emails/${email.id}`)
        .then(response => response.json())
        .then(email => {
    
          //inserting dynamic data into respective elements
          subject.textContent= email.subject
          timestamp.textContent= email.timestamp
          sender.textContent= email.sender
          recipients.textContent= email.recipients
          body.textContent= email.body
    
          document.getElementById('#detail_subject').append(subject);
    
    
            
            console.log(email);
        
    
        });
        
      })



    })

    console.log(emails);

  })














}
//load_mailbox(mailbox) function ends



