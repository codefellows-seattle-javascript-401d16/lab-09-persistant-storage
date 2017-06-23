Questions:

is this correct?
http GET localhost:3000/api/notes id=79388411-57ba-11e7-851f-0fa847c34c8f

Keep getting this error, unable to track it:
http: error: ConnectionError: ('Connection aborted.', RemoteDisconnected('Remote end closed connection without response',)) while doing GET request to URL: http://localhost:3000/api/notes
~ $

lab9-amanda [thursday !]$ node index.js
end post
batter up! 3000
{}
/Users/amandakoster/Documents/Amanda/learnings/CodeFellows/401/lab-09-persistant-storage/lab9-amanda/route/note-router.js:29
    return res.sendStatus(400)

    for delete, use fs.remove, that worked for me anyways

    [10:36]
    and test is passing


##To Submit this Assignment
<!--
fork this repository
write all of your code in a directory named lab- + <your name> e.g. lab-duncan -->
<!-- please write the code from lab-08 to this new directory (make a copy as a starting point)
it's in your best interests to retype it as practice
push to your repository
submit a pull request to this repository
submit a link to your PR in canvas
write a question and observation on canvas
Resources -->

<!-- fs-extra -->
Directions
##Make these directories to organize your code
<!-- lib
test
model
route
data // to hold your JSON files -->

## Refactor your previous lab to pull your routes into a separate module
In the router add res.send, res.sendStatus, and res.json to the response objects, before they are passed into a route handler
create a constructor to module your resouce and put it in your model directory
create a storage module that will persist you data to the file system
Bonus

2pts - have the storage module check for the type sub-directory, and create it if it does not exist
