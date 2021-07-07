# Codespace Rewards Shop

This application illustrates simple process and functionality for an ecommerce web application

## Application Setup

Step 1:

Copy config/config.sample.php to config/config.php and update the details for your database

Step 2:

Copy routes/mail.inc.sample.php to routes/mail.inc.php and update the details for your email provider

Step 3:

Import the database.sql file into your database to have the correct schema for the application

## Using the Application

Register a new account to start using the application

## Application API

This web application uses the api located at css-api.ydev.co.za to retrieve information about the member profile as well as badges owned and points balance.

The checkout process is also done via the API.

## Deploying the API

The API is easy to deploy via docker and assumes you have docker setup and running on the same system

Step 1:

Clone the repo to the docker host and change directory to the api folder

Step 2:

Update the config/db.js file with the same database server details as the main application

Step 3:

Run the below commands to build the docker image and then start the API docker container

``` Docker
docker build -t codespace-api .

docker run -d --name codespace-api -p 3000:3000 codespace-api
```

## Demo site

https://css.ydev.co.za

