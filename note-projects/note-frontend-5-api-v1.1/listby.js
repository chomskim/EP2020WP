import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    FilterExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": event.pathParameters.email
    }
  };

  const result = await dynamoDb.scan(params);

  // Return the matching list of items in response body
  return result.Items;
});
