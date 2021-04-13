const.form = document.getElementById('reg-form')
form.addEventListener('submit', registerUser)

async funtion registerUser(event) {
  event.preventDefault()
  const username = document.getElementById('username')
  const password = document.getElementById('password')

  const result = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  }).then((res) => res.json())

  console.log(result)
}
