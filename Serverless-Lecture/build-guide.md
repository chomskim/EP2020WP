# Set-up

### Git Clone


Goto Root Dir

$ git clone https://github.com/chomskim/EP2020WP.git

## ASW Setting
Root 사용자로 Login

Service IAM

Create New Group  
Admin  
Attach Policy  
 - DatabaseAdministrator
 - SystemAdministrator
 - AdministratorAccess
 - AmazonAPIGatewayAdministrator

Add user  
User name [brain]  
Access type -- Programmatic access  
Next: Permissions  
Group Admin  
Next...  
Create user  
Access key ID -- AKIAZUJLQTNJTBCQXKO5  
Secret access key -- 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  
  
Create Access key  
Download csv file -- brain_accessKeys.csv  
AKIAZUJLQTNJT7FP5VN2  
8QHnsohRTNwUQRa7SENnDF02BPu7w0xFlIqOGJN2  

# Serverless Framework

## [Serverless Tutorial](https://serverless-stack.com/#table-of-contents)

## [What is Serverless?](https://serverless-stack.com/chapters/ko/what-is-serverless.html)

## [What is AWS Lambda?](https://serverless-stack.com/chapters/ko/what-is-aws-lambda.html)

## [Why Create Serverless Apps?](https://serverless-stack.com/chapters/ko/why-create-serverless-apps.html)

|Service              |Rate                                                                  |Cost   |
| :------------------ | :------------------------------------------------------------------- | ----: |
|Cognito	          |Free[1]	                                                             |$0.00  |
|API Gateway	      |$3.5/M reqs + $0.09/GB transfer	                                     |$2.20  |
|Lambda	              |Free[2]	                                                             |$0.00  |
|DynamoDB	          |$0.0065/hr 10 write units, $0.0065/hr 50 read units[3]                |$2.80  |
|S3	                  |$0.023/GB storage, $0.005/K PUT, $0.004/10K GET, $0.0025/M objects[4] |$0.24  |
|CloudFront	          |$0.085/GB transfer + $0.01/10K reqs	                                 |$0.86  |
|Route53	          |$0.50 hosted zone + $0.40/M queries	                                 |$0.50  |
|Certificate Manager  |Free	                                                                 |$0.00  |

[1] Cognito is free for < 50K MAUs and $0.00550/MAU onwards.  
[2] Lambda is free for < 1M requests and 400000GB-secs of compute.  

## Create an AWS Account

## Create an IAM User

## [Configure the AWS CLI](https://serverless-stack.com/chapters/ko/configure-the-aws-cli.html)

```sh
$ pip install awscli
$ aws configure

$ aws configure
AWS Access Key ID [****************XSVQ]: ****************QXKO5
AWS Secret Access Key [****************dpxS]: ****************TLL/zD
Default region name [ap-northeast-2]:
Default output format [None]:

$ aws configure --profile brain
AWS Access Key ID [None]: ****************5VN2
AWS Secret Access Key [None]: 8****************IqOGJN2
Default region name [None]: ap-northeast-2
Default output format [None]: 

$ npm install serverless -g

```

## Add Support for ES6/ES7 JavaScript

## Deploy your Hello World API

https://github.com/AnomalyInnovations/serverless-nodejs-starter  

```sh
$ mkdir helloworld-api -- OR-- $ serverless
$ cd helloworld-api
copy serverless.yml handler.js package.json .gitignore

$ npm install
make node-module
$ serverless invoke local --function hello
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"Go Serverless v1.0! Your function executed successfully!\",\n  \"input\": \"\"\n}"
}

```

## Create Lambda From Console

AWS Service Lambda  
Create Function  
Author from scratch
Function name -- hello-lambda  
  
<pre>
index.js  

exports.handler = async (event) => {
    console.log("event=",event);
    const name = event.name ? event.name : "Lambda";
    const response = {
        statusCode: 200,
        body: JSON.stringify(`Hello from ${name}!`),
    };
};

Test
{
  "name": "kim"
}

Execution Result
Response:
{
  "statusCode": 200,
  "body": "\"Hello from kim!\""
}

</pre>

## Create API Gateway From Console

Choose an API type  
HTTP API -- build  
API name --hello-greeting  
Stages for hello-greeting -- dev
....




