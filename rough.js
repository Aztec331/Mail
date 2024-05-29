function load_mailbox(mailbox) {
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#detail_emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  let url;
  if (mailbox === 'inbox') {
    url = 'emails/inbox';
  } else if (mailbox === 'sent') {
    url = 'emails/sent';
  } else if (mailbox === 'archive') {
    url = 'emails/archive';
  } else {
    console.log('Invalid mailbox');
    return;
  }

  fetch(url)
    .then(response => response.json())
    .then(emails => {
      emails.forEach(function(email) {
        const div = document.createElement('div'); // Individual email div
        div.classList.add('email-div');

        if (mailbox === 'inbox') {
          div.innerHTML = `
            <span class="inbox-sender">${email.sender}</span>
            <span class="inbox-subject">${email.subject}</span>
            <span class="inbox-timestamp">${email.timestamp}</span>
            <span class="inbox-archive">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
              </svg>
            </span>
          `;
        } else if (mailbox === 'sent') {
          div.innerHTML = `
            <span class="sent-sender">${email.sender}</span>
            <span class="sent-subject">${email.subject}</span>
            <span class="sent-timestamp">${email.timestamp}</span>
          `;
        } else if (mailbox === 'archive') {
          div.innerHTML = `
            <span class="archive-sender">${email.sender}</span>
            <span class="archive-subject">${email.subject}</span>
            <span class="archive-timestamp">${email.timestamp}</span>
            <span class="archive-unarchive">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
              <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
            </svg>
          </span>
          `;
        }

        if (email.read === false) {
          div.style.backgroundColor = 'lightgrey';
        } else {
          div.style.backgroundColor = '';
        }

        document.querySelector('#emails-view').append(div);

        div.addEventListener('click', () => {
          detail_email(email.id);
        });
      });

      console.log(emails);
    });








}
