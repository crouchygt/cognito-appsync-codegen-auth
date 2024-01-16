# Cognito AppSync Codegen Authentication (WIP)

A sinple wrapper that will allow you to generate a cognito access token that can then be used in command line based applications.

For example, we are currently using it for introspection of a AppSync GraphQL API.

## Usage

As this is currently WIP, I have only published a ESM module that will work with Node 20.

THe username and password of the user you require to authenticate with is read from the following env varaibles:

UP_USERNAME
UP_PASSWORD

The userpool id and client id are then passed into the `cognitoAuthToken` method

```javascript
import { cognitoAuthToken } from "@crouchy/appsync-cognito-auth";

const USER_POOL_ID = "abc123";
const CLIENT_ID = "def456";

const accessToken = await cognitoAuthToken(USER_POOL_ID, CLIENT_ID);
```
