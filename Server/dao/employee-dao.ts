import aws from 'aws-sdk';
import { ConfigurationOptions } from 'aws-sdk/lib/config';

const awsConfig: ConfigurationOptions = {
  region: 'us-east-2',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

aws.config.update(awsConfig);
const dynamoDB = new aws.DynamoDB();
const docClient = new aws.DynamoDB.DocumentClient();

export const saveTicket = reimbursement => {
  const fullReimbursement = {
    ...reimbursement,
    timesubmitted: new Date().getTime(),
    approver: 'NA',
    status: 'pending'
  };
  return docClient
    .put({
      TableName: 'reimbursements',
      Item: fullReimbursement
    })
    .promise();
};

export const findTicket = username => {
  const params = {
    TableName: 'reimbursements',
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
