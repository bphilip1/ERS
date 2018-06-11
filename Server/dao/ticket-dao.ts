import aws from 'aws-sdk';
import {ConfigurationOptions} from 'aws-sdk/lib/config'


const awsConfig: ConfigurationOptions = {
    region: 'us-east-2',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}

aws.config.update(awsConfig);
const dynamoDB = new aws.DynamoDB();
const docClient = new aws.DynamoDB.DocumentClient()

export function saveTicket(reimbursement): Promise<any> {
    return docClient.put({
      TableName: 'reimbursements',
      Item: reimbursement
    }).promise();
  }

  export function update(reimbursement): Promise<any> {
    return docClient.update({
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
        ':s': reimbursement.status,
      },
      ReturnValues: 'UPDATED_NEW'
    }).promise();
  }

  export function findAllByStatus(status: string): Promise<any> {
    return docClient.query({
      TableName: 'reimbursements',
      IndexName: 'status-index',
      KeyConditionExpression: '#stat = :s',
      ExpressionAttributeNames: {
        '#stat': 'status'
      },
      ExpressionAttributeValues: { 
        ':s': status
      },
    }).promise();
  }
  
  // export function findAllByTime(username: string, timesubmitted: number): Promise<any> {
  //   return docClient.query({
  //     TableName: 'reimbursements',
  //     KeyConditionExpression: '#userName = :u and #timesub = :ts',
  //     ExpressionAttributeNames: {
  //       '#userName': 'username',
  //       '#timesub': 'timesubmitted',
  //     },
  //     ExpressionAttributeValues: { 
  //       ':u': username,
  //       ':ts': timesubmitted
  //     },
  //   }).promise();
  // }
  
  // export function findPastTickets(){
    
  // }