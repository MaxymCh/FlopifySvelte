import axios from 'axios';
import querystring from 'querystring';
import db from './db.js'; // Assurez-vous que ce chemin est correct

const clientId = '294ce8b28eb4406fbf93ca35735e451c';
const clientSecret = '86ec3f8cef664f828f66d078f9480d17';

async function getSpotifyAccessToken() {
    const { data } = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
        grant_type: 'client_credentials'
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
        },
    });
    return data.access_token;
}

async function fetchSpotifyData(endpoint) {
    const accessToken = await getSpotifyAccessToken();
    const { data } = await axios.get(`https://api.spotify.com/v1/${endpoint}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    return data;
}

async function importArtistsAndAlbums() {
    // Supposons que vous récupériez une liste d'artistes de Spotify
    const artistsData = await fetchSpotifyData('search?q=genre:%22rock%22&type=artist&limit=10');
    const artists = artistsData.artists.items;

    for (const artist of artists) {
        // Insérer l'artiste dans la base de données
        const insertArtist = db.prepare('INSERT INTO artists (name, genre) VALUES (?, ?)');
        const artistInfo = insertArtist.run(artist.name, artist.genres[0] || 'Non spécifié');
        
        // Récupérer et insérer les albums de l'artiste
        const albumsData = await fetchSpotifyData(`artists/${artist.id}/albums?include_groups=album,single&market=US`);
        const albums = albumsData.items;

        for (const album of albums) {
            const insertAlbum = db.prepare('INSERT INTO albums (name, release_date, artist_id) VALUES (?, ?, ?)');
            const albumInfo = insertAlbum.run(album.name, album.release_date, artistInfo.lastInsertRowid);

            // Récupérer et insérer les pistes de chaque album
            const tracksData = await fetchSpotifyData(`albums/${album.id}/tracks?market=US`);
            const tracks = tracksData.items;

            for (const track of tracks) {
                const insertTrack = db.prepare('INSERT INTO musics (title, album_id) VALUES (?, ?)');
                insertTrack.run(track.name, albumInfo.lastInsertRowid);
            }
        }
    }
}


export default importArtistsAndAlbums;