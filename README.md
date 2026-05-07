# Auth API

Skapad av: Pontus Johansson

Webbtjänst med autentisering byggd i Node.js, Express och MongoDB. Hanterar registrering av användarkonton, inloggning med JWT samt skyddade routes. Del av Moment 4 i backend-kursen.

## Tech stack

- Node.js + Express
- MongoDB + Mongoose
- bcrypt (lösenordshashning)
- jsonwebtoken (JWT)
- dotenv (miljövariabler)

## Installation

1. Klona repot
```bash
   git clone https://github.com/DITTNAMN/auth-api.git
   cd auth-api
```

2. Installera beroenden
```bash
   npm install
```

3. Skapa en `.env`-fil i projektroten med följande variabler:
```
   MONGODB_URL=mongodb://localhost:27017/auth_api
   JWT_SECRET=din_hemliga_nyckel_här
   PORT=3000
```

4. Starta servern
```bash
   npm run dev
```

Servern körs på `http://localhost:3000`.

## Endpoints

### POST /api/register
Skapar ett nytt användarkonto. Lösenordet hashas innan det sparas.

**Body:**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "hemligt123"
}
```

**Response (201):**
```json
{
  "message": "Användaren är skapad",
  "user": {
    "id": "...",
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

### POST /api/login
Loggar in en användare och returnerar en JWT giltig i 1 timme.

**Body:**
```json
{
  "username": "testuser",
  "password": "hemligt123"
}
```

**Response (200):**
```json
{
  "message": "Inloggning lyckades",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### GET /api/profile 🔒
Skyddad route som returnerar inloggad användares profil. Kräver giltig JWT.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Här är din profil",
  "user": {
    "_id": "...",
    "username": "testuser",
    "email": "test@example.com",
    "account_created": "2026-05-05T..."
  }
}
```

## Statuskoder

| Kod | Betydelse |
|-----|-----------|
| 200 | OK |
| 201 | Skapad |
| 400 | Felaktig input |
| 401 | Ej autentiserad (saknar token / fel inloggning) |
| 403 | Ogiltig eller utgången token |
| 404 | Hittades inte |
| 500 | Internt serverfel |
