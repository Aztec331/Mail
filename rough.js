function load_mailbox(mailbox) {
  
    // Show the mailbox and hide other views
    document.querySelector('#emails-view').style.display = 'block';
    document.querySelector('#detail_emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';
  
    // Show the mailbox name
    document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  
    // Run a switch case for URLs of different mailboxes
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
  
    // Fetch mails according to the URL provided by switch case
    fetch(url)
    .then(response => response.json())
    .then(emails => {
      emails.forEach(function(email) {
        // Create a div in JavaScript due to SPA (Single Page Application)
        const div = document.createElement('div'); // individual email div
        div.classList.add('emails-loop'); // class name of element 'div'
        div.innerHTML = `
          <span class="sender">${email.sender}</span>
          <span class="subject">${email.subject}</span>
          <span class="timestamp">${email.timestamp}</span>
        `;
        // Change color of the div if it is read by the user
        if (email.read === true) {
          div.style.backgroundColor = 'lightgrey';
        }
        document.querySelector('#emails-view').append(div);
  
        const subject = document.createElement('h3'); // subject tag for detail email
        const timestamp = document.createElement('div'); // timestamp tag for detail email
        const sender = document.createElement('div'); // sender tag for detail email
        const recipients = document.createElement('div'); // recipients tag for detail email
        const body = document.createElement('textarea'); // body tag for detail email
  
        // When you click on any div/email its detailed view opens up
        div.addEventListener('click', () => {
          document.querySelector('#emails-view').style.display = 'none';
          document.querySelector('#compose-view').style.display = 'none';
          document.querySelector('#detail_emails-view').style.display = 'block';
  
          fetch(`/emails/${email.id}`)
          .then(response => response.json())
          .then(email => {
            // Inserting dynamic data into respective elements
            subject.textContent = email.subject;
            timestamp.textContent = email.timestamp;
            sender.textContent = email.sender;
            recipients.textContent = email.recipients.join(', ');
            body.value = email.body;
  
            // Append the elements to the detail view
            document.getElementById('detail_subject').append(subject);
            document.getElementById('detail_timestamp').append(timestamp);
            document.getElementById('detail_sender').append(sender);
            document.getElementById('detail_recipients').append(recipients);
            document.getElementById('detail_body').append(body);
  
            console.log(email);
          });
        });
      });
      console.log(emails);
    });







    
  }
  