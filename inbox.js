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
  if(mailbox==="inbox"){
    url = "emails/inbox";
  }
  else if(mailbox==="sent"){
    url = "emails/sent";
  }
  else if(mailbox==="archive"){
    url = "emails/archive";
  }

  //fetches mail according to the URL provided by if else 
  fetch(url)
  .then(response => response.json())
  .then(emails => {

    
    emails.forEach(function(email){
      //created a div in javascript due to SPA(Single page application)
      //name of the element is div and constants name too is div
      const div = document.createElement('div'); //indivisual email div

      //class name of each indivisual email named as-'div'
      div.classList.add('email-div');

      //populating div element with loop variable 'email'
      //and using span tag for different areas like for sender,subject etc 

      //inbox mails which have archive button
      if (mailbox==="inbox"){
        div.innerHTML= `
        <span class="sender">${email.sender}</span>
        <span class="subject">${email.subject}</span>
        <span class="timestamp">${email.timestamp}</span>
        <span class="archive"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-down" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1z"/>
        <path fill-rule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
        </svg></span>`;
      }

      //sent mails
      else if(mailbox==="sent"){
        div.innerHTML= `
        <span class="sent-sender">${email.sender}</span>
        <span class="sent-subject">${email.subject}</span>
        <span class="sent-timestamp">${email.timestamp}</span>`;
        
      }

      //archive mails which have unarchive button
      else if(mailbox==="archive"){
        div.innerHTML= `
        <span class="sender">${email.sender}</span>
        <span class="subject">${email.subject}</span>
        <span class="timestamp">${email.timestamp}</span>
        <span class="unarchive"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-up" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1z"/>
        <path fill-rule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708z"/>
        </svg></span>`;
      }


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

      //archiving mail when you click on the 
      const archivebutton = div.querySelector('.archive svg');
      if (archivebutton) {
        archivebutton.addEventListener('click', (event) => {
          event.stopPropagation();
          archive_mail(email.id);
        });
      }

      const unarchivebutton = div.querySelector('.unarchive svg');
      if (unarchivebutton) {
        unarchivebutton.addEventListener('click', (event) => {
          event.stopPropagation();
          unarchive_mail(email.id);
        });
      }

      //adding an event listener to reply button in detail-email view
      document.querySelector("#reply").addEventListener('click',()=>{

        //hiding other views and showing compose view with pre-filled data
        document.querySelector('#emails-view').style.display = 'none';
        document.querySelector('#detail_emails-view').style.display = 'none';
        document.querySelector('#compose-view').style.display = 'block';
        
        //pre-fill email sender
        document.getElementById('compose-recipients').value= `${email.sender}`

        //pre-fill email subject
        if (!document.getElementById('compose-subject').value.includes('Re:')) {
          document.getElementById('compose-subject').value = `Re: ${email.subject}`;
        } else {
          document.getElementById('compose-subject').value = email.subject;
        }

      })
  
    })
    //forEach ends above me

    //use this to show array of each singular mail in the console
    //in the browser
    console.log(emails)
  })


}



//function of addEventlistener of indivisual div's from "load_mailbox function 
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


//archives the emails 
function archive_mail(email_id) {
  
  fetch(`/emails/${email_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      archived: true
    })
  })

  //load inbox after archiving
  load_mailbox("inbox")
}

//unarchives the emails
function unarchive_mail(email_id){

  fetch(`/emails/${email_id}`, {
    method: 'PUT',
    body: JSON.stringify({
        archived: false
    })
  })

  //load inbox after unarchiving
  //test comment
  load_mailbox("inbox")
}

