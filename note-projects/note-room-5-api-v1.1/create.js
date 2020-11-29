import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.DYNAMODB_TABLE,

    Item: {
      roomId: data.roomId,
      roomDesc: data.roomDesc,
      owner: data.owner,
      memberList: data.memberList,
      created: Date.now(),
      updated: Date.now(),
    }
  };
  console.log('create params =',params);
  await dynamoDb.put(params);

  return params.Item;
});
