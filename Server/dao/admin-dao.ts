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

export const findTicketsByStatus = status => {
  const params = {
    TableName: 'reimbursements',
    IndexName: 'status-index',
    KeyConditionExpression: '#stat = :s',
    ExpressionAttributeNames: {
      '#stat': 'status'
    },
    ExpressionAttributeValues: {
      ':s': status
    }
  };
  return docClient.query(params).promise();
};

export function updateStatus(reimbursement): Promise<any> {
  return docClient
    .update({
      TableName: 'reimbursements',
      Key: {
        username: reimbursement.username,
        timesubmitted: reimbursement.timesubmitted
      },
      UpdateExpression: 'set #stat = :s',
      ExpressionAttributeNames: {
        '#stat': 'status'
      },
      ExpressionAttributeValues: {
        ':s': reimbursement.status
      },
      ReturnValues: 'UPDATED_NEW'
    })
    .promise();
}
