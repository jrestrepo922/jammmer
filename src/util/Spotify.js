const clientId = 'e701573340dd4e12a31dfdf2a8973d1a';
const redirectUri = 'http://localhost:3000/'

let accessToken; 

const Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken; 
        }

            // check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1]; 
            const expiresIn = Number(expiresInMatch[1]); 
            // This clears the parameters, allowing us to grab a new access token when it expries. 
            window.setTimeout(( )=> accessToken = '', expiresIn * 1000); 
            window.history.pushState('Access Token', null, '/'); 
            return accessToken
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
        }
    },

    search(term){
        const accessToken = Spotify.getAccessToken(); 
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then( response => {
            return response.json(); 
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return []; 
            }
            return jsonResponse.tracks.items.map(track => (
                {
                    id: track.id, 
                    name: track.name, 
                    artist: track.artists[0].name,
                    album: track.album.name, 
                    uri: track.uri
                }
            ))
        })
    }


}

export default Spotify; 