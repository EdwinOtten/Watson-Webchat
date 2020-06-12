require('dotenv').config()
const express = require('express')
const cookieSession = require('cookie-session')
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

// Set default values if not provided
const port = process.env.PORT || 3000
const environment = process.env.ENVIRONMENT || 'production'
const cookieMaxAge = process.env.COOKIE_MAX_AGE || 1000 * 60 * 60 * 24 * 365, // one year

function checkEnvVariable(name) {
    if (!process.env[name]) {
        console.log(`Environment variable ${name} is missing. Terminating app..`)
        process.exit()
    }
}

checkEnvVariable('QUERY_STRING_SECRET')
checkEnvVariable('COOKIE_SESSION_SECRET')
checkEnvVariable('WATSON_INTEGRATION_ID')
checkEnvVariable('WATSON_INTEGRATION_REGION')
checkEnvVariable('WATSON_SERVICE_INSTANCE_ID')
checkEnvVariable('WATSON_RSA_KEY')

const app = express()

// cookie-session middleware
app.use(cookieSession({
    secret: process.env.QUERY_STRING_SECRET,
    maxAge: cookieMaxAge,
    httpOnly: environment !== 'development', // disable httpOnly when developing
    secure: environment !== 'development' // disable secure when developing
}));

// Session ID middleware
app.use(function (req, res, next) {
    if (req.session.id === undefined) {
        req.session.id = uuidv4();
    }
    next()
})

// Returns a signed JWT generated by RS256 algorithm.
function generateJWT(userId) {
    const payload = {
        sub: userId
    };
    // The "expiresIn" option adds an "exp" claim to the payload. It is highly recommended you add an exp claim.
    return jwt.sign(payload, process.env.WATSON_RSA_KEY, { algorithm: 'RS256', expiresIn: '10000ms' });
}

app.get('/', async(req, res) => {
    if (req.query.secret !== process.env.QUERY_STRING_SECRET) {
        res.status(401);
        res.send('Unauthorized')
        return
    }

    const jwt = generateJWT(req.session.id);

    res.send(`<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        html, body {
            margin: 0;
            padding: 0;
        }
        .chatElement {
            height: 100%;
            width: 100%;
        }
    </style>
</head>
<body>
    <div class="chatElement"></div>

    <script>
        const element = document.querySelector('.chatElement');

        window.watsonAssistantChatOptions = {
            integrationID: "${process.env.WATSON_INTEGRATION_ID}", // The ID of this integration.
            region: "${process.env.WATSON_INTEGRATION_REGION}", // The region your integration is hosted in.
            identityToken: "${jwt}",
            serviceInstanceID: "${process.env.WATSON_SERVICE_INSTANCE_ID}", // The ID of your service instance.

            element: element,
            hideCloseButton: true,
            showLauncher: false,
            openChatByDefault: true,

            onLoad: function(instance) { instance.render(); }
        };
        setTimeout(function(){
        const t=document.createElement('script');
        t.src="https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js";
        document.head.appendChild(t);
        });
    </script>
</body>
</html>`)
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}?secret=${process.env.QUERY_STRING_SECRET}`))
