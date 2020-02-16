# push.gifts

API and frontend for MinterPush Hackathon

<ul>
<li><a target="_blank" href="https://push.gifts">Site</a></li>
<li><a target="_blank" href="https://api.push.gifts/docs">API Documentation</a></li>
<li><a target="_blank" href="https://api.push.gifts/api.json">Open API spec</a></li>
</ul>

## Backend setup

To run the local version of api, browse to the backend folder and run:
```
docker-compose up
```

To run api in production you need to set the following environment variables:
<ul>
<li>BACKGROUND - flag for launching background services (status update from minter, currency exchange rate update)</li> 
<li>MINTER_NODE - url to minter node</li>
<li>ENCRYPTION_KEY - key for encrypting the wallets created</li>
<li>CURRENCY_API_KEY - Api key for [openexchangerates.org](https://openexchangerates.org) to obtain currency rates.</li>
<li>BIP_TO_PHONE_KEY - api key for [biptophone.ru](https://biptophone.ru).</li>
<li>TWILLIO_SID, TWILLIO_TOKEN - credentials for sending sms</li>
<li>SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM - credentials for email</li>
</ul>

## Frontend setup
To run the local version of site, browse to the frontend folder, set the following environment variables:
<ul>
<li>VUE_APP_API - url to backend server</li>
<li>VUE_APP_SITE - site url</li>
</ul>

And run:

```
npm install
npm run serve
```

To bundle frontend for production:

```
npm run build
```

## License

[ISC](http://opensource.org/licenses/ISC)
