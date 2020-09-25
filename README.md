# Chat with React and GraphQL

This is a chat application, where you can login and register using your own email and password. Next after you log in, you'll be able to chat with your friends. Simply click the friend you want to chat with and have fun. You can send and react to messages.

## Live Demo

You may check the live demo of this application, simply click the link below
[link to application!](https://todo-maticoder.netlify.app/)

You can create your own account and then log in using your username and password or you can use a demo user, simply log in using following data

```
username: user
password: 123456
```

## Stack

```
React
Apollo
GraphQL
MongoDB
React Router
JWT
Material UI
```

## Implemented functionalities

This application was made to help you stay connected to your friends. You can send and react to messages

![](https://github.com/maticoder/chat-graphql/blob/master/images/chat.png)

The connection between client and the server is provided using GraphQL and Apollo Server

![](https://github.com/maticoder/chat-graphql/blob/master/images/server.png)

The server is also connected to the MongoDB database using Atlas Cloud.

![](https://github.com/maticoder/chat-graphql/blob/master/images/db.png)

## How to start using this app?

To start using this application you have to clone or download this repository using

```
git clone https://github.com/maticoder/chat-graphql.git
```

command

next you have to install all required node modules in client and server directories using

```
cd client
npm install
cd server
npm install
```

you also have to set your own MongoDB Atlas Cluster and create `config` directory in the `server` directory, with `env.json` file inside, looking like that

```
{
    "URL": "YOUR_MONGO_DB_URL",
    "JWT_SECRET": "YOUR_JWT_SECRET"
}
```

after all below is done, run these commands

```
cd client
npm start
```

and

```
cd server
npm run dev
```

the first one start client application on `localhost:3000` and the second one start the Apollo server on `localhost:4000`

## How does it look like?

<!-- ![](https://github.com/maticoder/chat-graphql/blob/master/how.gif) -->
