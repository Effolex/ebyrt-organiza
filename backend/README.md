# Epilogue

## Contents

 * **[Database Structure](#database-structure)**

 * **[Routes](#routes)**
    * **[Create User](#create-user)**


# backend Structure


## Database Structure
Since the app needs to work for employees to manage their tasks and to increase productivity, it is essencial that we use a table for users to be able to filter the tasks by, each task with contain an author key which references the user.

Each task is composed by its status, in which there are 3 possible ones, the title, description, tags, and the author of the task.

```
task [
    {
		id: number
        status: pendente | em andamento | pronto
        title: string,
        description: string,
        tags: [string],
        authorId: user_id
    }
]
tag [
    {
        id: number,
        authorId: number,
        taskId: number,
        name: string
    }
]

user [
    {
	id: number
    email: string,
    name: string,
    password: string,
    }
]
```

# Routes

**Create User**
----
Create a user at the database.
>  <strong>`POST`</strong> /user/create - Body <i>required</i>
<details close>
<summary>Detailed Info</summary>

* **URL**

  /users/create

* **Method:**

  `POST` Expects a body 
* **Body Params**
*Required:*

```json
{
    "email": "string",
    "name": "string",
    "password": "string"

}
```
* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ message: 'User Created' }`
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error: "The field [field] was not provided or was invalid" }`

* **Sample body:**

  ```javascript
    {
        "email": "person@email.com,
        "name": "Active Person",
        "password": "123abc"
    }
  ```
<details/>