// GET /emails/<str:mailbox>

// Sending a GET request to /emails/<mailbox> where <mailbox> is either inbox,
// sent, or archive will return back to you (in JSON form) a list of all emails
// in that mailbox, in reverse chronological order. For example, if you send a
// GET request to /emails/inbox, you might get a JSON response like the below
// (representing two emails):

fetch('/emails/inbox')
.then(response => response.json())
.then(emails => {
    // Print emails
    console.log(emails);

    // ... do something else with emails ...
});

// GET /emails/<int:email_id>

// Sending a GET request to /emails/email_id where 
// email_id is an integer id for an email will return a 
// JSON representation of the email, like the below:

{
        "id": 100,
        "sender": "foo@example.com",
        "recipients": ["bar@example.com"],
        "subject": "Hello!",
        "body": "Hello, world!",
        "timestamp": "Jan 2 2020, 12:00 AM",
        "read": false,
        "archived": false
}
