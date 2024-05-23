document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');

  //Remove any existing event listener for the compose form
  document.querySelector("#compose-form").removeEventListener('submit', submitHandler);

  //Add submit event listener to the compose form
  document.querySelector("#compose-form").addEventListener('submit', submitHandler);

});

function compose_email() {
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#detail_emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function submitHandler(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get form values
  const to = document.querySelector('#compose-recipients').value;
  const subject = document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;

  // POST request to send mail
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
    console.log(result);
    load_mailbox('sent'); // Load sent mailbox after the mail is sent
  })
  .catch(error => console.error('Error sending mail:', error));
}

function load_mailbox(mailbox) {
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#detail_emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';

  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  let url;
  switch(mailbox) {
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

  fetch(url)
  .then(response => response.json())
  .then(emails => {
    emails.forEach(function(email) {
      const div = document.createElement('div');
      div.classList.add('emails-loop');
      div.innerHTML = `
        <span class="sender">${email.sender}</span>
        <span class="subject">${email.subject}</span>
        <span class="timestamp">${email.timestamp}</span>
      `;
      if (email.read) {
        div.style.backgroundColor = 'lightgrey';
      }
      document.querySelector('#emails-view').append(div);

      div.addEventListener('click', () => {
        load_email_details(email.id);
      });
    });
  })
  .catch(error => console.error('Error fetching emails:', error));
}

function load_email_details(email_id) {
  fetch(`/emails/${email_id}`)
  .then(response => response.json())
  .then(email => {
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#detail_emails-view').style.display = 'block';

    document.querySelector('#detail_subject').textContent = email.subject;
    document.querySelector('#detail_sender').textContent = `From: ${email.sender}`;
    document.querySelector('#detail_reciepents').textContent = `To: ${email.recipients.join(', ')}`;
    document.querySelector('#detail_body').textContent = email.body;
    document.querySelector('#detail_timestamp').textContent = email.timestamp;
  })
  .catch(error => console.error('Error loading email details:', error));
}