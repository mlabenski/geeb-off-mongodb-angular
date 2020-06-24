// server.js

const express = require("express");
const cors = require('cors');
const app = express();
// Our users which will be queried by their index
const users= [
    {
        streamName: "RuptureXX",
        level: 3,
        totalGeebs: 338,
        inQueue: false
    },
    {
        streamName: "cmgriffing",
        level: 1,
        totalGeebs: 7,
        inQueue: false
    },
    {
        streamName: "TheBudLabCA",
        level: 2,
        totalGeebs: 11,
        inQueue: false
    },
    {
        streamName: "TurtleTune",
        level: 3,
        totalGeebs: 57,
        inQueue: false
    }
  ]
const matches = [
    {
      matchID: 1,
      roundNumber: 1,
      currentUser: "RuptureXX",
      users: [...users],
    },
  ];
  
  // Allow cross-origin requests
  app.use(cors({origin: true}));

  app.get('/:userId', (req, res) => res.send(Widgets.getById(req.params.id)));
  app.get('/', (req, res) => res.send(Widgets.create()));

  app.put('/:userid', (req, res) => res.send(Widgets.update(req.params.id, req.body)));
  app.get('/', (req, res) => res.send(Widgets.list()));

  
  app.get("/matches", (req, res) => {
    return res.json(matches);
  });
  
  app.get("/match/:id", (req, res) => {
    // To prevent the ID "0" we'll simply subtract by one. This way we can query for id = 2 which will serve us 1, etc.
    const idx = req.params.id - 1;
  
    if (!matches[idx]) {
      return res.status(404).json({ error: "Match not found" });
    }
  
    return res.json(matches[idx]);
  });

  //queue api calls
  //get all users
  app.get("/users", (req, res) => {
    return res.json(users);
  });

  app.post('/users/', function(req, res) {
    return res.end(json.stringify(req.body));
  });


  //get specific user
  app.get("/users/:streamName", (req, res) => {
    const idx = req.params.streamName;
  
    if (!users[idx]) {
      return res.status(404).json({ error: "Users not found" });
    }
    return res.json(users[idx]);
  });



  
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });