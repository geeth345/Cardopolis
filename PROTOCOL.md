**Login / Setup Events**
// TODO: Add description

# Game Events
## Server --> Client

### STATE
A JSON object containing the current state of the game. Includes all game entities and their
properties, as well as the current updateId. 

### UPDATE
An update event is sent when there is a change to the game state that should be reflected in the 
game screen (e.g. another player plays a card). The update event will contain a JSON object that 
contains what was updated. (Create entity / remove entity / update entity). Includes the orignal state, new state, and the updatedId to ensure synchronisation.

### UPDATE_SUCCESS
### UPDATE_FAIL


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
 