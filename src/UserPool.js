import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-west-2_vMll0b3wG', // obtained in aws cognito -> user pools
    ClientId: 'v9ob7dgk1kv9m9i2g3c9pim06' // obtained in aws cognito -> user pools -> app integrations -> app client list
};

export default new CognitoUserPool(poolData);