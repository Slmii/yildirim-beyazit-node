# Node Server for InternetComputer Canister

### Overview

This Node.js server acts as an intermediary between the InternetComputer canister and the underlying system. Designed to handle specific limitations of the Rust IC SDK, this server processes HTTP POST requests from the canister, performs inter-canister calls using the [`node-ic0`](https://github.com/dfinity/node-ic0) package, and sends the responses back to the canister. This packages handles the interface lookup and IDL creation for us.

### Problem Statement

The current Rust IC SDK faces a limitation where it cannot type the response from a generic inter-canister call. As a result, retrieving a proper typed response becomes challenging. This Node.js server provides a workaround to this limitation.

### How It Works

1. The InternetComputer canister sends an HTTP POST request to this Node server. The request contains data fields
   - `canisterId` - `string`
   - `methodName` - `string`
   - `args` - `unknown[]`
2. Upon receiving the request, the Node server uses `node-ic0` to perform an inter-canister call.
3. Once the call is completed and a response is obtained, the Node server sends this response back to the canister.
4. The canister can then use this response with `serde_json`.
