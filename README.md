# fullstackopen-phonebook-backend

to deploy into heroku set MONGODB_URI

`````
$ heroku config:set MONGODB_URI=mongodb+srv://user:secretpasswordhere@cluster0-ostce.mongodb.net/db-mongo-app?retryWrites=true
`````

if the command causes an error, give the value in apostrophes '....'
`````
$ heroku config:set MONGODB_URI='mongodb+srv://user:secretpasswordhere@cluster0-ostce.mongodb.net/db-mongo-app?retryWrites=true'
`````

too see all env

´´´´
$ heroku config
´´´´


