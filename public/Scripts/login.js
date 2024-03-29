const login = document.getElementById('login')
login.addEventListener('submit', loginUser)

async function loginUser(event) {
  event.preventDefault()
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  const result = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  }).then((res) => res.json())

  if(result.status === 'ok'){
    alert('Success')
    window.location = "/home"

  } else {

    alert(result.error);
  }
}
