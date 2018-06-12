import aws from 'aws-sdk';
import bcrypt from 'bcrypt';
import { ConfigurationOptions } from 'aws-sdk/lib/config';

const awsConfig: ConfigurationOptions = {
  region: 'us-east-2',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

aws.config.update(awsConfig);
const dynamoDB = new aws.DynamoDB();
const docClient = new aws.DynamoDB.DocumentClient();

export const signUp = (userData): Promise<any> => {
  const hash = bcrypt.hashSync(userData.password, 10);
  const user = {
    ...userData,
    password: hash,
    role: 'employee'
  };
  const data = {
    TableName: 'users',
    Item: user
  };
  return docClient.put(data).promise();
};

export const findUser = (username): Promise<any> => {
  const params = {
    TableName: 'users',
    KeyConditionExpression: '#title = :username',
    ExpressionAttributeNames: {
      '#title': 'username'
    },
    ExpressionAttributeValues: {
      ':username': username
    }
  };
  return docClient.query(params).promise();
};
