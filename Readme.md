# Express Test: Step-by-Step Guide (Node.js to Running Code)

This guide shows how to set up Node.js, install dependencies, run this project, and test the API.

> **Assignment requirement:** You must use a real database (for example MongoDB, MySQL, or PostgreSQL). In-memory storage (like local arrays) is only for practice and is **not valid** for final assignment submission.

## 1) Install Node.js

1. Go to https://nodejs.org/
2. Download the **LTS** version.
3. Run the installer and keep default options.
4. Open a new terminal and verify installation:

```powershell
node -v
npm -v
```

You should see version numbers.

---

## 2) Open the Project Folder

In terminal:

```powershell
cd "C:\Users\USERAS\Desktop\Express Test"
```

---

## 3) Install Project Dependencies

This project uses Express.

```powershell
npm install
```

If you are creating this project from scratch, install the package directly:

```powershell
npm install express
```

### Packages used in this project

- `express` (dependency)
  - Install command: `npm install express`

Current dependency in `package.json`:

```json
"dependencies": {
  "express": "^5.2.1"
}
```

---

## 4) Project Files Overview

- `server.js` → main Express server
- `package.json` → scripts and dependencies

Important scripts in `package.json`:

- `npm start` → runs `node server.js`
- `npm run dev` → runs `node server.js`

---

## 5) Run the Server

```powershell
npm start
```

Expected output:

```text
Server running at http://localhost:3000
```

---

## 5.1) `server.js`

Use these steps if you want to write the code yourself from an empty file.

### Step 1: Import Express

```javascript
const express = require("express");
```

### Step 2: Create app, port, and database setup (**required for assignment**)

```javascript
const app = express();
const PORT = 3000;

// Assignment requirement:
// connect your API to a real database (MongoDB/MySQL/PostgreSQL)
// and store items there instead of using an in-memory array.
```

### Step 3: Enable JSON body parsing middleware

```javascript
app.use(express.json());
```

### Step 4: Add a root route (`GET /`)

```javascript
app.get("/", (req, res) => {
  res.send("Basic Express CRUD API is running");
});
```

### Step 5: Read all items (`GET /items`)

```javascript
app.get("/items", (req, res) => {
  res.json(items);
});
```

### Step 6: Create item (`POST /items`)

```javascript
app.post("/items", (req, res) => {
  const newItem = {
    id: Date.now(),
    name: req.body.name
  };

  items.push(newItem);
  res.status(201).json(newItem);
});
```

### Step 7: Update item (`PUT /items/:id`)

```javascript
app.put("/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  items[index].name = req.body.name;
  res.json(items[index]);
});
```

### Step 8: Delete item (`DELETE /items/:id`)

```javascript
app.delete("/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  const deleted = items.splice(index, 1);
  res.json(deleted[0]);
});
```

### Step 9: Start the server

```javascript
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

## 6) API Endpoints in This Code

Base URL:

```text
http://localhost:3000
```

Endpoints implemented in `server.js`:

- `GET /` → health message
- `GET /items` → list all items
- `POST /items` → create item
- `PUT /items/:id` → update item
- `DELETE /items/:id` → delete item

---

## 7) Test the API (Postman)

### Step 1: Install and open Postman

1. Download Postman from https://www.postman.com/downloads/
2. Install and open it.

### Step 2: Start your Express server

In terminal, run:

```powershell
npm start
```

Keep it running while testing.

### Step 3: Set base URL

Use this base URL in Postman:

```text
http://localhost:3000
```

### Step 4: Test `GET /`

- Method: `GET`
- URL: `http://localhost:3000/`
- Click **Send**
- Expected response: `Basic Express CRUD API is running`

### Step 5: Test `GET /items`

- Method: `GET`
- URL: `http://localhost:3000/items`
- Click **Send**
- Expected response: array of items

### Step 6: Test `POST /items`

- Method: `POST`
- URL: `http://localhost:3000/items`
- Go to **Body** → **raw** → select **JSON**
- Use body:

```json
{
  "name": "New Item"
}
```

- Click **Send**
- Expected response: created item with `id` and `name`

### Step 7: Test `PUT /items/:id`

1. Copy an `id` value from `GET /items` response.
2. Send request:
   - Method: `PUT`
   - URL: `http://localhost:3000/items/ITEM_ID`
   - Body → raw → JSON:

```json
{
  "name": "Updated Item"
}
```

3. Click **Send**
4. Expected response: updated item object

### Step 8: Test `DELETE /items/:id`

1. Use an existing item id.
2. Send request:
   - Method: `DELETE`
   - URL: `http://localhost:3000/items/ITEM_ID`
3. Click **Send**
4. Expected response: deleted item object
