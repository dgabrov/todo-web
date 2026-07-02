@application/src/service/server.ts
- implement getPasswordData
- this posts a request of type PasswordInputData to the same service that is used in the other stubs that you see in server.ts file
- if the result is not an error (error code bigger or equal than 400) then you should get a PasswordData instance that you must return

- implement set password data by pushing a PUT request to the same server, having as a payload a PasswordBundle
- you just get a 200 in case of success, or error for error code bigger or equal than 400
