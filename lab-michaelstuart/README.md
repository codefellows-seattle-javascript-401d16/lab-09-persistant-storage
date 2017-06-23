# Lab 08 - persistent storage

## Functionality
- crud api affecting a single resource
- demonstrates utility of promises versus callbacks
- create, read, update, destroy a user schema
- utilize file system instead of json for storage

## Examples
- POST http://localhost:8080/ { name, password, email } will create a user with those properties and generate an id
- GET http://localhost:8080/id=yourid will receive a user object as response
- PUT http://localhost:8080/id=yourid { name: newname, id: yourid} will update the name property on the corresponing object with a new name
- DELETE http://localhost:8080/id=yourid will delete the user object associated with the id query param
