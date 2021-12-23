import { APIGatewayProxyHandler } from "aws-lambda";

import { document } from '../utils/dynamodbClient';
import { v4 as uuidV4 } from "uuid";

interface ICreateTodo {
  title: string;
  deadline: Date;
}

export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;

    await document.put({
      TableName: 'todos_db',
      Item: {
        id: uuidV4(),
        user_id: user_id,
        title,
        done: false,
        deadline
      }
    }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: `Todo ${title} created`
    }),
    headers: {
      "Content-Type": "application/json",
    }
  }
}