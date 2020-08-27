export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "ap-northeast-2",
    BUCKET: "demo-notes-upload"
  },
  apiGateway: {
    REGION: "ap-northeast-2",
    URL: "https://dushe3p20d.execute-api.ap-northeast-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "ap-northeast-2",
    USER_POOL_ID: "ap-northeast-2_wBxoUj2mJ",
    APP_CLIENT_ID: "5kjtc4uof5q4785lencd5kqm2t",
    IDENTITY_POOL_ID: "ap-northeast-2:37c0c513-0a76-4231-897a-15db2d4cce0e"
  }
};
