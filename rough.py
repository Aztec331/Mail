if 'Re'not in document.getElementById('compose-subject'):
    document.getElementById('compose-subject').value= `Re: ${email.subject}`
else:
    document.getElementById('compose-subject').value= ` ${email.subject}`