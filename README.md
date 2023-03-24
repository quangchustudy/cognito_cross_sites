# aws-cognito-react - v2

![signin](./logo.png)

Testing for cross sites using aws cognito:

## Scenario
We'll have 2 websites:
- website 1: http://localhost:4000
- website 2: http://localhost:3000
Testing flow:
- Open web1 -> login to web1 -> open web 2 to check that we don't need to login to see the home page of web2
- Logout web1 -> refresh web 2 to see whether we still can see the home page of web2

## Reference Link

[link](https://github.com/dbroadhurst/aws-cognito-react)

## AWS Cognito Infrastructure setup

To help deploy the AWS Cognito infrastructure I've create an Amazon Cloud Development (CDK) script

CDK set up instructions can be found [here](https://docs.aws.amazon.com/cdk/latest/guide/cli.html)

CDK deploy instructions

```bash
cd cdk
npm run cdk bootstrap   # only needed first time
npm run cdk deploy
```

After deployment copy the userPoolId and userPoolClientId values from the command line window; you will need these values in the app config step

## App Configuration

Setup the Cognito environment values buy creating app/.env.local for app1 and app2 file and adding the following

```bash
REACT_APP_USERPOOL_ID=YOUR_USER_POOL_ID
REACT_APP_CLIENT_ID=YOUR_CLIENT_ID
```

Create React App has been used to setup the development process so the next steps should be familiar

- Install and start web1 on port 4000
```bash
cd app
npm install --force 
npm start
```
- Note: for macbook then we adjust file package json in app folder as below
```json
  "scripts": {
    "start": "PORT=3000 && react-scripts start",
    ....
  },
```

- Install and start web2
```bash
cd app2
npm install --force
npm start
```


