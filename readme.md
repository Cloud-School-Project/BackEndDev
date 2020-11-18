# Cloud School

Deployment url: https://lambdacloud.herokuapp.com/

## Authorization </br>

### POST /admin/signup  (Only Username and Password)
### POST /volunteer/signup 
### POST /student/signup
<br>

This creates a new user in the database, and returns both the *user object* and *user id*

| Name     | Requried | Type   | Unique?   | Description                  |
|----------|----------|--------|-----------|------------------------------|
| username |   yes    | string |     yes   | the username of the user     |
| password |   yes    | string |     no    | the password of the user     |
| email    |   yes    | string |     yes   | the email of the user     |

<br>
### POST /admin/login (Only Username and Password)
### POST /volunteer/login
### POST /student/login
<br>

This creates a *token* and returns it if login was successful

| Name     | Requried | Type   | Unique?   | Description                  |
|----------|----------|--------|-----------|------------------------------|
| username |   yes    | string |     yes   | the username of the user     |
| password |   yes    | string |     no    | the password of the user     |
|                                                                         |
<br><br>


## Classes 

### GET /classes/class

Returns a list of all Classes

Article Object:

| Name     | Type    | Description                                      |
|----------|---------|--------------------------------------------------|
| Id       | Integer | Auto incremented Id                              |
| Subject  | String  | Subject of Class                                 |
| Completed| String  | Whether the class is done or not                 |
| Morning  | Integer | Id if class has volunteer for this time          |
| Afternoon| Integer | Id if class has volunteer for this time          |
| Evening  | Integer | Id if class has volunteer for this time          |
<br>

### Post /classes/class
Required Subject ONLY (min 3 chars for subject name)

Returns a list of all Classes

<br>

### Put /classes/class
Required Subject (min 3 chars for subject name)
Optional Changes: value of Morning, Afternoon, or Evening to an active Volunteer Id
Completed: to true, if class is complete

<br>
