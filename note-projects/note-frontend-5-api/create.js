import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.DYNAMODB_TABLE,

    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: data.noteId,
      email: data.email,
      title: data.title,
      content: data.content,
      created: data.created,
      updated: data.updated,
    }
  };
  console.log('create params =',params);
  await dynamoDb.put(params);

  return params.Item;
});
