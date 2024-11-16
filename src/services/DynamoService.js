import AWS from 'aws-sdk';
import { awsConfig } from '../aws-exports';

AWS.config.update(awsConfig);
const dynamoDB = new AWS.DynamoDB.DocumentClient();
