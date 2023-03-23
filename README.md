# GameDig API 🎮

A simple API for querying game server information using GameDig.

## Live Endpoint URL 🌐

You can use the GameDig API in your own projects by sending a GET request to the following URL:

`https://gamedig-api.hexane.co/GAME/ip=IP&port=PORT`

The endpoint is hosted on serverless infrastructure and currently has a rate limit of 120 requests per minute.

Here is a couple of examples of how you can use the endpoint to query a game server:
    
Garry's Mod - [https://gamedig-api.hexane.co/garrysmod/ip=104.234.220.221&port=27015](https://gamedig-api.hexane.co/garrysmod/ip=104.234.220.221&port=27015)

Rust - [https://gamedig-api.hexane.co/rust/ip=45.88.230.74&port=8406](https://gamedig-api.hexane.co/rust/ip=45.88.230.74&port=8406)

Minecraft - [https://gamedig-api.hexane.co/minecraft/ip=minecraft.hypixel.net&port=25565](https://gamedig-api.hexane.co/minecraft/ip=minecraft.hypixel.net&port=25565)

## Features ✨

* Supports a wide range of game servers.
* Rate limiting to prevent abuse.
* Input validation and sanitization.
* JSON response format for easy integration.

## Supported Games 🎮

The GameDig API supports a wide variety of games. To see a full list of the supported games and their unique identifiers, please refer to the [GameDig documentation](https://github.com/gamedig/node-gamedig#games-list).

## Requirements ✅

* Node.js (v12.0.0 or higher)
* npm (v6.0.0 or higher)

## How to Use 🔧

1. Clone the repository or download the files
2. Install dependencies with `npm install`
3. Start the server with `node index.js`
4. Send a GET request to `http://localhost:3000/GAME/ip=IP&port=PORT` where `GAME` is the unique identifier of the game you want to query, `IP` is the IP address or hostname of the server, and `PORT` is the port number of the server.

### Example

To query a Minecraft server with the IP address `play.hypixel.net` and port `25565`, send a GET request to `http://localhost:3000/minecraft/ip=play.hypixel.net&port=25565`.

## Configuration ⚙️

The `config.js` file contains rate limit settings that can be adjusted to your needs:

* `windowMs`: Time window size in milliseconds.
* `max`: Maximum number of requests allowed within the `windowMs` time window.
* `message`: Message to be sent when the rate limit is exceeded.
* `headers`: Whether to set headers on the response when the rate limit is exceeded.

## Response Format 📤

The API will respond with a JSON object containing information about the queried server. If the server is online and the query is successful, the object will contain properties such as `map`, `players`, and `maxplayers`. If the server is offline or the query fails, the object will contain an `online` property set to `false` and an `error` property with a message describing the error.

### Example

Here is an example response from querying a Garry's Mod server with the IP address `104.234.220.220` and port `27015`:
```json
{
  "name": "Gaminglight.com ▌ SCP-RP ▌ NEW Auto Breaching ▌ SITE-13!",
  "map": "rp_gl_site13",
  "password": false,
  "raw": {
    "protocol": 17,
    "folder": "garrysmod",
    "game": "SCP-RP",
    "appId": 4000,
    "numplayers": 44,
    "numbots": 0,
    "listentype": "d",
    "environment": "l",
    "secure": 0,
    "version": "2022.06.08",
    "steamid": "85568392923361745",
    "tags": [
      "gm:scprp loc:us ver:230210"
    ]
  },
  "maxplayers": 128,
  "players": [
    {
      "name": "DanneMyBoi",
      "raw": {
        "score": 0,
        "time": 15844.1943359375
      }
    }
  ],
  "bots": [],
  "connect": "104.234.220.220:27015",
  "ping": 15,
  "online": true
}
```

## License 📄

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the `LICENSE` file for more information.

