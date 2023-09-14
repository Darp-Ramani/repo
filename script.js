// Spotify API credentials
const clientId = 'YOUR_CLIENT_ID'; // Replace with your actual client ID
const clientSecret = 'YOUR_CLIENT_SECRET'; // Replace with your actual client secret

// Create a Spotify Web Playback SDK instance
const player = new Spotify.Player({
    name: 'My Web Player',
    getOAuthToken: callback => {
        // Retrieve an access token
        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        })
        .then(response => response.json())
        .then(data => {
            const accessToken = data.access_token;
            callback(accessToken);
        });
    }
});

// Connect to the Spotify player
player.connect().then(success => {
    if (success) {
        console.log('Connected to Spotify Web Playback SDK');
    }
}).catch(error => {
    console.error('Error connecting to Spotify Web Playback SDK', error);
});

// Play Thunder by Imagine Dragons when the button is clicked
document.getElementById('playButton').addEventListener('click', () => {
    player.togglePlay().then(() => {
        console.log('Toggled playback');
    }).catch(error => {
        console.error('Error toggling playback', error);
    });
});
