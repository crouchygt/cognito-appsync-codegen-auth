import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

const COGNITO_USERNAME = process.env.UP_USERNAME;
const COGNITO_PASSWORD = process.env.UP_PASSWORD;

export const cognitoAuthToken = (userPoolId, userPoolClientId) => {
  const userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: userPoolId,
    ClientId: userPoolClientId,
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
