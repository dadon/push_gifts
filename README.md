# push.gifts

API and frontend for MinterPush Hackathon

<ul>
<li><a href="https://push.gifts">Site</a></li>
<li><a href="https://api.push.gifts/docs">API Documentation</a></li>
<li><a href="https://api.push.gifts/api.json">Open API spec</a></li>
</ul>

## Project setup
To run the local version of api, browse to the backend folder and run:
```
docker-compose up
```

To run api in production you need to set the following environment variables

BACKGROUND - flag for launching background services (status update from minter, currency exchange rate update) 

MINTER_NODE - url to minter node

ENCRYPTION_KEY - key for encrypting the wallets created

CURRENCY_API_KEY - Api key for [openexchangerates.org](https://openexchangerates.org) to obtain currency rates.

BIP_TO_PHONE_KEY - api key for [biptophone.ru](https://biptophone.ru).

TWILLIO_SID, TWILLIO_TOKEN - credentials for sending sms

SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM - credentials for email
