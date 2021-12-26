const fetch = require('node-fetch')

const body = {
  verification: 'works',
  eventType: 'vote',
  eventData: {
    user: {
      id: '94959495954994',
      username: 'Jelo',
      discriminator: '6969',
      avatar: 'https://myavatar.lol'
    },
    votes: 4
  }
}

fetch('http://localhost:3000/test', {
  method: 'POST',
  body: JSON.stringify(body), // dont delete this project, i need to test the server count, ok, but dont delete it
  headers: {'Content-Type': 'application/json'} // ok
}) // save required //wtf, i dsaved, why¿
.then(res => res.json()) //check other terminal, works
.then(data => console.log('sent'))
.catch(error => console.log(error))