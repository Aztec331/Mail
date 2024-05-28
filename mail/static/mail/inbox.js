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
      div.classList.add('email-div');

      //populating div element with loop variable 'email'
      //and using span tag
      div.innerHTML= `
      <span class="sender">${email.sender}</span>
      <span class="subject">${email.subject}</span>
      <span class="timestamp">${email.timestamp}</span>
      <span class="archive"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
      <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
    </svg></span>
      `
      //changing color of the div if it is read by the user
      if(email.read===false){
        div.style.backgroundColor= 'lightgrey';
      }
      else{
        div.style.backgroundColor= '';
      }

      document.querySelector('#emails-view').append(div);

      //eventlistener for div which shows detailed email
      div.addEventListener('click',() => {
        detail_email(email.id)
        
      });

    })
    //forEach ends above me

    //use this to show array of each singular mail in the console
    //in the browser
    console.log(emails)
  })


}



//function of addEventlistener of indivisual div's from "load_mailbox function"
//let all the details of the mail load first, then only decide what view to show 
//and what view to hide
function detail_email(email_id){

    fetch(`/emails/${email_id}`)
    .then(response => response.json())
    .then(email => {

      //show the detail_emails-view and hide other views
      document.querySelector('#emails-view').style.display = 'none';
      document.querySelector('#compose-view').style.display = 'none';
      document.querySelector('#detail_emails-view').style.display = 'block';

      //inserting dynamic data into respective elements in html
      document.getElementById('detail_subject').textContent= email.subject;
      document.getElementById('detail_timestamp').textContent= email.timestamp;
      document.getElementById('detail_sender').textContent=`From: ${email.sender}`;
      document.getElementById('detail_reciepents').textContent=`To: ${email.recipients}`;
      document.getElementById('detail_body').textContent= email.body;

    });

    //after reading the mail mark read as true so the color goes black beauty
    fetch(`/emails/${email_id}`, {
      method: 'PUT',
      body: JSON.stringify({
          read: true
      })
    })


}


