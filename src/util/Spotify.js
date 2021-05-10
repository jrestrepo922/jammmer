const clientId = 'e701573340dd4e12a31dfdf2a8973d1a';
const redirectUri = 'http://localhost:3000'

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
            //  if the token does not exist  route to authentication page of Spotify. This will create the access token. 
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
            window.location = accessUrl
        }
    },

    search(term){
        const accessToken = Spotify.getAccessToken(); 
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        }).then( response => {
            return response.json(); 
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return []; 
            }
            // returns track objects
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
    }, 




    savePlaylist(name, trackUris){
        // if now songs are added to the playlist, do nothing. 
        if(!name || !trackUris.length){
            return;  
        } 
        const accessToken = Spotify.getAccessToken(); 
        const headers = { Authorization: `Bearer ${accessToken}`}; 
        let userId; 

        return fetch('https://api.spotify.com/v1/me', { headers: headers }).then(
            response => response.json()
        ).then(jsonResponse => {
            // jsonReponse.id is fetch using a get request and need for the post request fetch bellow. 
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            }).then(response => response.json()).then( // json is taken as input and parse to produce Javascript Object
                jsonResponse => {
                    // now saving the tracks to the playlist under the specific playlist name
                    const playlistId = jsonResponse.id; 
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                        headers: headers, 
                        method: 'POST', 
                        body: JSON.stringify({ uris: trackUris})
                    })
                }
            ) 
        })
    },

    getUserPlaylist(){
        // if now songs are added to the playlist, do nothing. 
        const accessToken = Spotify.getAccessToken(); 
        const headers = { Authorization: `Bearer ${accessToken}`}; 
        let userId; 

        return fetch('https://api.spotify.com/v1/me', { headers: headers }).then(
            response => response.json()
        ).then(jsonResponse => {
            // jsonReponse.id is fetch using a get request and need for the post request fetch bellow. 
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {headers: headers })
                .then(response => response.json()).then( // json is taken as input and parse to produce Javascript Object
                jsonResponse => {
                    return jsonResponse.items.map(item => {
                        return {name: item.name, playlistId: item.id}
                    })
                }
            ) 
        })
    },

    getPlaylistTracks(playlistId){
        
        // if now songs are added to the playlist, do nothing. 
        const accessToken = Spotify.getAccessToken(); 
        const headers = { Authorization: `Bearer ${accessToken}`}; 
        let userId; 
        return fetch('https://api.spotify.com/v1/me', { headers: headers }).then(
            response => response.json()
        ).then(jsonResponse => {
            // jsonReponse.id is fetch using a get request and need for the post request fetch bellow. 
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {headers: headers })
                .then(response => response.json()).then( // json is taken as input and parse to produce Javascript Object
                jsonResponse => {
                    if(!jsonResponse.items){
                        return []; 
                    }
                    
                    // returns track objects
                    return jsonResponse.items.map(track => (
                        
                        {
                            id: track.track.id, 
                            name: track.track.name, 
                            artist: track.track.artists[0].name,
                            album: track.track.album.name, 
                            uri: track.track.uri,
                            playlistId: playlistId
                        }
                    ))
                }
            ) 
        })
    }


}

export default Spotify; 

