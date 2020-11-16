# Cloud School

Deployment url: https://lambdacloud.herokuapp.com/

## Authorization </br>

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

### GET /classes

Returns a list of all Classes

Article Object:

| Name     | Type    | Description                                      |
|----------|---------|--------------------------------------------------|
| Id       | Integer | Auto incremented Id                              |
| Subject  | String  | Subject of Class                                 |
| Completed| String  | Whether the class is done or not                 |
| Morning  | Integer | Id if class has volunteer for this time          |
| Afternoon| Integer | Id if class has volunteer for this time          |
| Evening  | Integer |  Id if class has volunteer for this time         |
<br>

### GET /articles/:id

Returns the *article with corresponding id*

| Name      | Requried | Type          | Unique?   | Description           |
|-----------|----------|---------------|-----------|-----------------------|
|    id     |    yes   | URL Parameter |   yes     | The Id of the article |

### PUT /edit_articles/:id

**Requires Authentication**

Returns the *updated list*

All values in article object except id can be changed

## Saved Articles

These endpoints require you to be logged in

### GET /

Returns the list of article objects saved by user

Saved Articles Object:

| Name       | Type    | Description                                      |
|------------|---------|--------------------------------------------------|
| Id         | Integer | Autoincremented Id                               |
| user_id    | Integer | Id of the specific user who liked the article    |
| article_id | Integer | Id of the article that was liked                 |

### POST /:articleId

Returns object with the *current user's id (user_id)* *article_id, and updated list*

| Name             | Requried | Type          | Unique?   | Description                                 |
|------------------|----------|---------------|-----------|---------------------------------------------|
| articleId        |    yes   | URL Parameter |   yes     | The id of the article that you want to save |

### DELETE /:articleId

Returns the updated list of saved articles for user

| Name      | Requried | Type          | Unique?   | Description                                         |
|-----------|----------|---------------|-----------|-----------------------------------------------------|
| id        |    yes   | URL Parameter |   yes     | The Id of the saved article that you want to delete |