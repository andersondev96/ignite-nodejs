import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from '../utils/dynamodbClient';

export const handle: APIGatewayProxyHandler = async (event) => {

  const { user_id } = event.pathParameters;

  const { Items } = await document.query({
    TableName: "todos_db",
    IndexName: "userId",
    KeyConditionExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
      ":user_id": user_id,
    },
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      Items,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};