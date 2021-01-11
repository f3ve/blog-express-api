require('dotenv').config();
const db = require('../models/index');

const { User } = db;

async function createSuperUser() {
  let firstname, lastname, email, password;
  const args = process.argv.slice(2);
  if (args.length < 4) {
    console.error(
      'ERROR: Must include fname, lname, email, and password\nexample: npm run makeuser fname=first lname=last email=email@example.com password=aaAA11!!'
    );
    return;
  }

  args.forEach((arg) => {
    const split = arg.split('=');
    const key = split[0];
    const val = split[1];

    if (key === 'fname') {
      firstname = val;
    }

    if (key === 'lname') {
      lastname = val;
    }

    if (key === 'email') {
      email = val;
    }

    if (key === 'password') {
      password = val;
    }
  });

  User.create({
    firstname,
    lastname,
    password,
    email,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
    .then((user) => console.log(`Success! Created new user ${user.firstname}`))
    .catch((err) => console.error('Error, unable to create user', err));
}

createSuperUser();
