import axios from 'axios';
import querystring from 'querystring';
import db from './db.js'; // Assurez-vous que ce chemin est correct

const clientId = '294ce8b28eb4406fbf93ca35735e451c';
const clientSecret = '86ec3f8cef664f828f66d078f9480d17';

async function getSpotifyAccessToken() {
    // Informations d'identification pour l'authentification OAuth 2.0

    // Requête pour obtenir le jeton d'accès
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    // Vérifier si la requête a réussi
    if (response.ok) {
        const data = await response.json();
        return data.access_token;
    } else {
        throw new Error('Impossible de récupérer le jeton d\'accès Spotify');
    }
}

async function fetchSpotifyData(endpoint) {
    // Récupérer le jeton d'accès Spotify
    const accessToken = await getSpotifyAccessToken();

    // Ajouter le jeton d'accès à l'en-tête Authorization
    const headers = {
        'Authorization': `Bearer ${accessToken}`
    };

    // Effectuer la requête vers l'API Spotify
    const response = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
        headers: headers
    });

    // Vérifier si la requête a réussi
    if (response.ok) {
        // Extraire les données JSON de la réponse
        const data = await response.json();
        return data;
    } else {
        // Gérer les erreurs de requête
        throw new Error(`Erreur lors de la requête vers Spotify: ${response.statusText}`);
    }
}


async function importArtistsAndAlbums() {
    // Récupérer les artistes
    
    const artistsData = await fetchSpotifyData('search?q=a&type=artist&limit=50');


    const uniqueArtists = [];
    const seenArtists = new Set();
    for (const artist of artistsData.artists.items) {
        const lowercaseTrimmedName = artist.name.toLowerCase().trim();
        if (!seenArtists.has(lowercaseTrimmedName)) {
            uniqueArtists.push(artist);
            seenArtists.add(lowercaseTrimmedName);
        }
    }
    for (const artist of uniqueArtists) {
        // Insérer chaque artiste dans la base de données
        const artistStmt = db.prepare('INSERT INTO artists (name, genre) VALUES (?, ?)');
        const artistInfo = artistStmt.run(artist.name, artist.genres[0] || 'Non spécifié');

        // Récupérer les IDs d'albums pour l'artiste avec une limite de 5 albums
        const albumsData = await fetchSpotifyData(`artists/${artist.id}/albums?include_groups=album,single&market=US&limit=5`);
        const albumIds = albumsData.items.map(album => album.id).join(',');

        // Récupérer les détails des albums en utilisant les IDs récupérés
        const albumsDetails = await fetchSpotifyData(`albums?ids=${albumIds}&market=US`);
        for (const album of albumsDetails.albums) {
            // Insérer chaque album dans la base de données
            const albumStmt = db.prepare('INSERT INTO albums (name, release_date, artist_id, url_image) VALUES (?, ?, ?, ?)');
            albumStmt.run(album.name, album.release_date, artistInfo.lastInsertRowid, album.images[0]?.url || '');

            const albumId = db.prepare('SELECT last_insert_rowid() AS id').get().id;
            const albumInfo = { id: albumId }; // Stockez les informations sur l'album dans la variable albumInfo

            // Insérer les pistes de l'album avec une limite de 10 pistes par album
            const tracksData = await fetchSpotifyData(`albums/${album.id}/tracks?limit=10&market=US`);
            for (const track of tracksData.items) {
                const trackStmt = db.prepare('INSERT INTO musics (title, album_id) VALUES (?, ?)');
                trackStmt.run(track.name, albumInfo.id);
            }
        }
    }
}


export default importArtistsAndAlbums;