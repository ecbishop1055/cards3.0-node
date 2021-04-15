const form = document.getElementById('reg-form')
form.addEventListener('submit', passwordChange)

async function passwordChange(event) {
  event.preventDefault()
  const password = document.getElementById('password').value

  const result = await fetch('/api/change-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      newpassword: password,
      token: localStorage.getItem('token')
    })
  }).then((res) => res.json())

  if(result.status === 'ok'){

    alert('Success')
    window.location = "/home"

  } else {

    alert(result.error);

  }
}
