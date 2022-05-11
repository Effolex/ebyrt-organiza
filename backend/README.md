# Database Model

## Contents

 - [Initial Structure](#initial-structure)


## Initial Structure
Since the app needs to work for employees to manage their tasks and to increase productivity, it is essencial that we use a collection for users to be able to filter the tasks by, each task with contain an author key which will be used to filter by user.

Each task is composed by its status, in which there are 3 possible ones, the title, description, tags, and the author of the task.

```
task [
    {
		_id: number
        status: pendente | em andamento | pronto
        title: string,
        description: string,
        tags: [string],
        author: user_id
    }
]
user [
    {
	_id: number
    username: string,
    password: string,
    }
]
```
