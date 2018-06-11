function addTicket() {
    const username = document.getElementById('input-username').value;
    const timeSubmitted = document.getElementById('input-timeSubmitted').value;
    const reimbursementType = document.getElementById('input-reimbursementType').value;
 
  
    const reimbursement = {username, timeSubmitted, reimbursementType};
  
    fetch('http://localhost:3000/ticket', {
      body: JSON.stringify(reimbursement),
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include',
      method: 'POST'
    })
    .then(resp => {
      if (resp.status === 401 || resp.status === 403) {
        alert('invalid permissions')
        throw 'Invalid permissions';
      }
      return resp.json();
    })
    .then(data => {
      alert('created') 
    })
    .catch(err => {
      console.log(err);
    });
  }