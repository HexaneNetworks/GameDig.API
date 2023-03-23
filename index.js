/*
 * gamedig-api - A simple API for querying game server information using GameDig
 * https://github.com/HexaneNetworks/gamedig-api
 *
 * Copyright (c) 2023 Hyro @ Hexane Networks
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */


// Import required modules
const express = require('express');
const favicon = require('serve-favicon');
const Gamedig = require('gamedig');
const { check, validationResult } = require('express-validator');
const validator = require('validator');
const allowedGameTypes = require('./gametypes');
const rateLimit = require('express-rate-limit');
const { rateLimit: rateLimitConfig } = require('./config');

// Initialize the Express app and set the port
const app = express();
const port = process.env.PORT || 3000;

// Use the favicon middleware
app.use(favicon('./favicon.ico'));

// Define a validation and sanitization chain for the URL path parameters
const validateUrlParams = [
  check('game')
    .isIn(allowedGameTypes)
    .withMessage('Game is not supported.'),
  check('ip')
    .custom((value, { req }) => {
      if (validator.isIP(value) || validator.isFQDN(value)) {
        return true;
      }
      throw new Error('Invalid IP address or hostname.');
    })
    .withMessage('Invalid IP address or hostname.')
    .trim()
    .escape(),
  check('port')
    .isInt({ min: 1, max: 65535 })
    .withMessage('Invalid port number.'),
];

// Add a route handler for the root path
app.get('/', (req, res) => {
  res.redirect('https://github.com/HexaneNetworks/gamedig-api');
});
  
// Route handler with rate limit, validation, and sanitization
app.get('/:game/ip=:ip&port=:port', rateLimit(rateLimitConfig), validateUrlParams, async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Extract error messages
    const errorMessages = errors.array().map(error => {
      return { [error.param]: error.msg };
    });

    // Format error messages and send a 400 response
    const prettyErrors = JSON.stringify(errorMessages, null, 2);
    return res.status(400).set('Content-Type', 'application/json').send(prettyErrors);
  }

  // Extract game, IP, and port from request parameters
  const { game, ip, port: gamePort } = req.params;

  try {
    // Query the game server using Gamedig
    const state = await Gamedig.query({
      type: game,
      host: ip,
      port: gamePort,
    });

    // Add "online" property to the state object
    state.online = true;

    // Set Content-Type header and send the response
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(state, null, 2));
  } catch (error) {
    // Set Content-Type header to JSON
    res.set('Content-Type', 'application/json');

    // Send a response with "online false" property and error message
    const errorResponse = {
      online: false,
      error: `Failed to query the server: ${error.message}`
    };
    const prettyErrorResponse = JSON.stringify(errorResponse, null, 2);
    res.status(500).send(prettyErrorResponse);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
