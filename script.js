// Spotify API credentials
const clientId = 'e1118d05d2f74380b13083dc72908f0d'; // Replace with your actual client ID
const clientSecret = '9ae608e72061470babe549f8c57715fd'; // Replace with your actual client secret

// Function to initialize the Spotify Web Playback SDK
function initializePlayer() {
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

            // Play Thunder by Imagine Dragons when the button is clicked
            document.getElementById('playButton').addEventListener('click', () => {
                player.togglePlay().then(() => {
                    console.log('Toggled playback');
                }).catch(error => {
                    console.error('Error toggling playback', error);
                });
            });
        }
    }).catch(error => {
        console.error('Error connecting to Spotify Web Playback SDK', error);
    });
}

// Load the Spotify Web Playback SDK script asynchronously
(function() {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    script.defer = true;
    script.onload = initializePlayer; // Initialize player once the SDK script is loaded
    document.head.appendChild(script);
})();
