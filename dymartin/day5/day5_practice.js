//day 4 practice by dylan

//Import expressJS module
const express = require('express');
// Create an express application object
const app = express()
app.set("view engine", "ejs");



class GameMatch {
  constructor() {
    this.id = gameList.length + 1000;
    this.turn = ''; // index of this.players, whose turn it is.
    this.players = [];
    this.round = '0';

  }
}

class Character {
  constructor(name, race, profession) {
    this.id = characterList.length + 1000;
    this.name = name
    this.race = race
    this.profession = profession
    this.equipment = {
      head: {},
      chest: {},
      legs: {},
      weapon: {},
      shield: {}
    }
    this.inventory = []
    this.abilities = []
    this.stats = {
      attack: "3212",
      defense: "2979",
      speed: "100",
      hp_current: '5403',
      hp_max: '5403'
    }
    //This method searches for an item in the itme list with this name
    //And adds it to this character's inventory
    this.pickupItem = function(searchName) {
        console.log(this);
        for (var item of item_list) {
          console.log(item.name);
          if (item.name == searchName) {
            console.log("Item get! You have found an item.");
            this.inventory.push(item);
            break;
          }
        }
      },
      //This method searches for a given slot and overwrites
      //it with an empty object
      this.unequipItem = function(slot) {
        for (var slotName in this.equipment) {
          console.log(slotName);
          if (slotName == slot) {
            console.log("Item unequipped.");
            this.equipment.slotName = {};
            break;
          }
        }
      }
  }
}
// Holds all possible items
var item_list = [{
    name: 'Eternal Tempest Staff',
    slot: 'weapon',
    bonuses: {
      attack: 16
    }
  },
  {
    name: 'Divine Sword - Phoenix Blade',
    slot: 'weapon',
    bonuses: {
      attack: 30
    }
  }
];
//start with 2 characters
var gameList = []
var characterList = []
characterList.push(new Character('Aleris Blackreaver VI, Duke of Vakkaerith', 'Draconic', 'Magician'))
characterList.push(new Character('Vugo Alcove', 'Human', 'Warrior'))

for (var i in characterList) {
  characterList[0].pickupItem('Divine Sword - Phoenix Blade');
}

app.get('/game', (req, res) => {
  //search for game
  var foundGame = gameList.find(game => game.id == req.query.gameid)
  //if found, you can manipulate it
  if (foundGame) {
    //check if user sent &addcharacter={NUMBER}
    if (req.query.addcharacter) {
      //check if lobby is full
      if (foundGame.players.length < 2) {
        //find character with id
        var foundProfile = characterList.find(character => character.id == req.query.addcharacter)
        //if it exists, add to the game
        if (foundProfile) {
          foundGame.players.push(foundProfile.id)
        }
      }
    }
    // Render a template called 'game' from the /views folder - send a variable called "sendData"
    res.render('game', {
      sendData: foundGame
    })
  } else {
    res.redirect('/newgame')
  }
});

app.get('/newgame', (req, res) => {
  gameList.push(new GameMatch());
  res.redirect('/game/?gameid=' + gameList[gameList.length - 1].id)
})


// Create a GET endpoint
// Change endpoint to include user's characterid
app.get('/profile', (req, res) => {
  var foundProfile = characterList.find(character => character.id == req.query.characterid)
  if (foundProfile) {
    // Render a template called 'profile' from the /views folder - send a variable called "sendData"
    res.render('profile', {
      sendData: foundProfile
    })
  } else {
    res.redirect('/newprofile')
  }
});

app.get('/newprofile', (req, res) => {
  characterList.push(new Character('New Test', 'Non-existent', '404: job not found'))
  res.redirect('/profile?characterid=' + characterList[characterList.length - 1].id)
});


//Start an http listen server
app.listen(3000);
