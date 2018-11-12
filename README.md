# Petals

## Overview
Petals is an example RESTful API to expose Inventory and allow merchants to purchase items.

## Getting Setup

Pull the repo and run

```bash
$ npm install
```

## Running Tests

Both Unit Tests and Integration Tests are run together to simplify the example.  You could separate them out via
different npm scripts if desired.

```bash
$ npm test
```

## Running The Server

To test the server locally (via POSTman, etc)

```bash
$ node server.js
```

## Usage

### Authentication
Petals requires OAuth 2.0 Authorization, passing an Access Token in the Authorization header.  In the absence of an Authentication Server, the value `validAccessToken` will be used as a placeholder.
```
'Authorization': 'Bearer validAccessToken'
```

The assumption for OAuth 2.0 is based on requirements that the REST API would be accessed by merchants in other cities.  The assumption here is that other merchants will use their own backend systems to be placing the orders for merchandise, since Petals does not have intention to setup their own website for allowing orders to be placed.  Hence, we would be using Client Credentials Grant - if authentication were setup within the server.  

If that changed in the future, we could swap OAuth 2.0 implementations to something supporting either 3rd party authentication (Facebook, Google) or another alternative of OAuth 2.0 based on requirements.

#### GET /v1/items
**Response**
```json
[
    {
        "id": 1,
        "name": "Silver Petals",
        "description": "Fine Silver Petals with shimmer",
        "price": 9900,
        "quantity": 4
    },
    { ... }
]
```

#### POST /v1/order
**Request**
```json
{
    "id": 1,
    "quantity": 1
}
```
**Response** - Order Success
```json
{
    "id": 1,
    "name": "Silver Petals",
    "description": "Fine Silver Petals with shimmer",
    "price": 9900,
    "quantity": 1
}
```
**Response** - Order Errors
```json
{
    "status": 409,
    "error": "InsufficientQuantityError",
    "reason": "InsufficientQuantityError - Not enough of item remaining to fulfill request",
    "id": 1,
    "quantity": 4,
    "requested": 12
}
```
