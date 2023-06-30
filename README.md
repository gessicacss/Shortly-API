# shortly

## About

This is a URL shortener service with authentication, it was developed using Node.js and PostgreSQL. It allows users to sign up, sign in, shorten URLs, view statistics, and manage their shortened URLs.

## Technologies

<p align='center'>
<img style='margin: 2px;' src='https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white'/>
<img style='margin: 2px;' src='https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black'/>
<img style='margin: 2px;' src='https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB'/>
<img style='margin: 2px;' src='https://img.shields.io/badge/postgres-%234ea94b.svg?style=for-the-badge&logo=postgresql&logoColor=white'>
<img style='margin: 2px; width:70px' src='https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white/'>
</p>

## Routes

#### <span style='font-weight:bold;'>POST</span> /signup

A route that creates a new user account. If there's a participant with this e-mail already registered, it returns a 409 status code error. If its sucessfull it returns a 201 status code. The request body should contain:

```
{
  "name": "João",
  "email": "joao@driven.com.br",
  "password": "driven",
  "confirmPassword": "driven"
}
```

#### <span style='font-weight:bold;'>POST</span> /signup

A route that will allow the user to sign in. If there's no user with the given e-mail registered it'll return a 404 status code error, if the password doesn't match with the ones given on signUp, it'll return a 401 status code error. It'll return a token as a response.

#### <span style='font-weight:bold;'>POST</span> /urls/shorten

This is an authenticated route. It requires an Authorization header, if the Authorization header is missing or invalid, responds with status code 401.

```
headers: { Authorization: `Bearer ${token}` }
```

Receives a request body in the following format:

```
{
  "url": "https://..."
}
```
If there is an error in the format of the request body, responds with status code 422 and the corresponding errors. In case of success it'll return a 201 status code and a response like this:

```
{
  "id": 1,
  "shortUrl": "a8745bcf" // here the generated identifier
}
```

#### <span style='font-weight:bold;'>GET</span> /urls/:id
This is not an authenticated route. If the shortened URL does not exist, responds with status code 404. It responds with status code 200 in case of success and a response body in the following format:

```
{
  "id": 1,
  "shortUrl": "bd8235a0",
  "url": "https://..."
}
```

#### <span style='font-weight:bold;'>GET</span> /urls/open/:shortUrl
This is not an authenticated route. It redirects the user to the corresponding link and also increments the visit count for the link. If the shortened URL does not exist, responds with a 404 status code error.

#### <span style='font-weight:bold;'>DELETE</span> /urls/:id
This is an authenticated route. It requires an Authorization header in the format Bearer TOKEN. If the Authorization header is missing or invalid, responds with status code 401. Responds with status code 401 when the shortened URL does not belong to the user. If the shortened URL belongs to the user, responds with status code 204 and deletes the shortened URL. If the shortened URL does not exist, responds with status code 404.

#### <span style='font-weight:bold;'>GET</span> /users/me
This is an authenticated route. It requires an Authorization header in the format Bearer TOKEN. Returns the data of the user associated with the token. If the Authorization header is missing or invalid, responds with status code 401. Responds with status code 200 and a response body in the following format:

```
{
  "id": user ID,
  "name": user name,
  "visitCount": sum of the visit counts of all user's links,
  "shortenedUrls": [
    {
      "id": 1,
      "shortUrl": "...",
      "url": "...",
      "visitCount": sum of the visit counts for the link
    },
    {
      "id": 2,
      "shortUrl": "...",
      "url": "...",
      "visitCount": sum of the visit counts for the link
    }
  ]
}
```

#### <span style='font-weight:bold;'>GET</span> /ranking
This is not an authenticated route. It'll show the 10 most visited links, it responds with status code 200 and a response body in the following format:

```
[
  {
    "id": user ID,
    "name": user name,
    "linksCount": 5,
    "visitCount": 100000
  },
  {
    "id": user ID,
    "name": user name,
    "linksCount": 3,
    "visitCount": 85453
  },
  {
    "id": user ID,
    "name": user name,
    "linksCount": 10,
    "visitCount": 0
  },
  {
    "id": user ID,
    "name": user name,
    "linksCount": 0,
    "visitCount": 0
  }
]
```


## How to run

To run this, you'll have to install PostgreSQL and create a table to acess the database.

1. Clone this repository
2. Install the dependencies

```
npm i
```

3. Create a **.env** file in the root directory and add the necessary environment variables. This file should not be committed to GitHub for security reasons. It should look like this:

```
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database_name>

    <username>: your PostgreSQL username.
    <password>: your PostgreSQL password.
    <database_name>: database name which you want to connect.
```

4. Restore the database dump with the following command:

```
psql -U <username> -d <database_name> -f dump.sql

Replace <username> with the PostgreSQL username that should be used for the database.
Replace <database_name> with the name of the database where the dump should be restored.
```

5. Run the back-end with

```
npm start
```

6. Access http://localhost:5000 on your browser to run the API.
