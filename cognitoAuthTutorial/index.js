const express = require('express');
const bodyParser = require('body-parser');
const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

const app = express();
const port = 3000;

AWS.config.update({ region: 'ap-south-1' });

const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'ap-south-1' });

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const secret = process.env.SECRET;

app.use(bodyParser.json());

const authenticateJWT=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        jwt.verify(token,secret,(err,user)=>{
            if(err){
                return res.sendStatus(403);
            }
            req.user=user;
            next();  
        })
    }
    else{
        res.sendStatus(401);
    }
};


const generateSecretHash = (username) => {
    return crypto
        .createHmac('SHA256', CLIENT_SECRET)
        .update(username + CLIENT_ID)
        .digest('base64');
};


app.post('/signup', async (req, res) => {
    const { username, email, password, phone } = req.body;

    const params = {
        ClientId: CLIENT_ID,
        Username: username,
        Password: password,
        UserAttributes: [{ Name: 'email', Value: email },{ Name: 'phone_number', Value: phone }]
        ,
        SecretHash: generateSecretHash(username) 
    };

    try {
        const data = await cognito.signUp(params).promise();
        res.json(data);
    } catch (err) {
        res.status(400).json(err);
    }
});


app.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: CLIENT_ID,
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
            SECRET_HASH: generateSecretHash(username) 
        }
    };

    try {
        const data = await cognito.initiateAuth(params).promise();
        const token = jwt.sign({ username: data.AuthenticationResult.AccessToken }, secret, { expiresIn: '1h' });
        res.json({ token });
    } 
    catch (err) {
        res.status(400).json(err);
    }
});


app.post('/confirm', async (req, res) => {
    const { username, confirmCode } = req.body;

    const params = {
        ClientId: CLIENT_ID,
        Username: username,
        ConfirmationCode: confirmCode,
        SecretHash: generateSecretHash(username) 
    };

    try {
        const data = await cognito.confirmSignUp(params).promise();
        res.json(data);
    } catch (err) {
        res.status(400).json(err);
    }
});


app.post("/logout", authenticateJWT, async (req, res) => {
    const token = req.headers.authorization;
    const params = {
        AccessToken: token
    };

    try {
        await cognito.globalSignOut(params).promise();
        res.status(200).json({ message: "User logged out from all devices successfully" });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ error: "Failed to logout", details: error.message });
    }
});

app.get('/api-page', authenticateJWT, (req, res) => {
    res.json({ message: 'Welcome to the API testing page' });
});

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
});