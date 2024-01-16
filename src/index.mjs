import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

const USER_POOL_ID = process.env.USER_POOL;
const USER_POOL_CLIENT_ID = process.env.USER_POOL_CLIENT_ID;
const COGNITO_USERNAME = process.env.USERNAME;
const COGNITO_PASSWORD = process.env.PASSWORD;

export const cognitoFetch = () => {
  const userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: USER_POOL_ID,
    ClientId: USER_POOL_CLIENT_ID,
  });
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    {
      Username: COGNITO_USERNAME,
      Password: COGNITO_PASSWORD,
    }
  );
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: COGNITO_USERNAME,
    Pool: userPool,
  });
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const AccessToken = result.getAccessToken().getJwtToken();
        resolve(AccessToken);
      },
      onFailure: (e) => {
        reject(e);
      }
    });
  });
};
