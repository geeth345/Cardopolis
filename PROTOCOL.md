**Login / Setup Events**
// TODO: Add description

# Game Events
## Server --> Client

### STATE
A JSON object containing the current state of the game. Includes all game entities and their
properties, as well as the current updateId. 
    
```json
{
    "updateId": 1,
    "entities": [
        {
        "id": 1,
        "type": "card",
        "props": {
            // propeties here (e.g. pos, tapped)
        }
        },
        {
        "id": 2,
        "type": "token",
        "props": {
            // propeties here (e.g. life, name)
        }
        }
    ]
}
```

### UPDATE
An update event is sent when there is a change to the game state that should be reflected in the 
game screen (e.g. another player plays a card). The update event will contain a JSON object that 
contains what was changed. A list of changes which can be of the following types: 
(Create entity / remove entity / update entity). JSON structure:

```json
{
  "updateId": 1,
  "changes": [
    {
      "type": "create",
      "entity": {
        "id": 1,
        "type": "card",
        "props": {
          // propeties here (e.g. pos, tapped)
        }
      }
    },
    {
      "type": "update", 
      "id": 1,
      "prevState" : {
        "tapped" : false
      },
      "newState": {
        "tapped" : true
      }
    },
    {
      "type": "remove",
      "id": 1      
    }
  ]
}
``` 

### UPDATE_SUCCESS
An update has been successfully applied to the game state. Contains the updateId of the update.

### UPDATE_FAIL
An update has failed to be applied to the game state. Contains the updateId of the update, and an error 
message.


## Client --> Server

### STATE_REQ
A request for the current state of the game. The server will respond with a STATE event.

### HISTORY_REQ
A request for the history of the game from a given updateId. The server will respond with a list
of UPDATES that have occurred since the given updateId. Useful for synchronising the game state
when a server update has been missed. 

### USR_UPDATE
A user update occurs when the user makes a change to a game entity (e.g. moving a card,
increment life count, etc.). Contains a JSON object that contains 1) The current updateId (to ensure
synchronisation), 2) The original state of the entity, and 3) The updated state of the entity.
 