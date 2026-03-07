const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

const MAX_ACCOUNT_ID = 40000000;
const GDBROWSER_API = "https://gdbrowser.com/api/profile/";

app.get('/api/random-player', async (req, res) => {
    let attempts = 0;
    
    while (attempts < 100) {
        const randomID = Math.floor(Math.random() * MAX_ACCOUNT_ID) + 1;
        try {
            const response = await fetch(`${GDBROWSER_API}${randomID}`);
            if (response.ok) {
                const data = await response.json();
                return res.json(data); // Send the player data to the browser
            }
        } catch (err) {
            // Silently retry and try again and again... And again...
        }
        attempts++;
    }
    res.status(404).json({ error: "Couldn't find a player. Try again!" });
});

app.listen(PORT, () => {
    console.log(`chasing the server at http://localhost:${PORT}`);
});