
/*
  config.js
    
  This module defines the rate limit configuration for the server, which helps prevent abuse and ensures fair usage of resources.
  The rate limit is applied to requests from each individual connection, and when the limit is exceeded, the server will send a message to the client indicating that they need to wait before sending more requests.

*/

// Define rate limit configuration
const rateLimitConfig = {
    // Set the window size in milliseconds
    // Requests within this time window count towards the rate limit
    windowMs: 60 * 1000, // 1 minute
  
    // Set the maximum number of requests allowed within the windowMs time window
    max: 120, // 120 requests per minute per connection
  
    // Set a message to send when the rate limit is exceeded
    message: 'Too many requests, please try again later.',
  
    // Enable headers to be set on the response when the rate limit is exceeded
    headers: true,
  };
  
  // Export the configuration object
  module.exports = {
    rateLimit: rateLimitConfig,
  };
  