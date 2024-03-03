<script>
    import axios from "axios";
    import { onMount } from "svelte";

    let email = "";
    let password = "";

    const login = async () => {
        try {
            const response = await axios.post("http://localhost:3000/login", {
                email,
                password,
            });

            // Si le serveur renvoie un token, cela signifie que la connexion a réussi
            if (response.data.token) {
                console.log("Connexion réussie");
                // Stocker le token dans le localStorage pour une utilisation future
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", response.data.username);
                // Vous pouvez rediriger l'utilisateur vers la page d'accueil ou toute autre page protégée
                window.location.href = "/";
            } else {
                console.error(
                    "Échec de la connexion : données de réponse inattendues",
                );
                // Vous pouvez ici gérer les cas où la réponse ne contient pas de token comme attendu
            }
        } catch (error) {
            console.error("Échec de la connexion", error);
            // Gérer ici les erreurs de la requête, par exemple afficher un message d'erreur à l'utilisateur
        }
    };

    // Exemple d'utilisation du token pour accéder à une route protégée (à titre illustratif)
    const fetchProtectedData = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(
                "http://localhost:3000/protected-route",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log("Données protégées reçues", response.data);
            // Traiter les données protégées ici
        } catch (error) {
            console.error(
                "Erreur lors de l'accès aux données protégées",
                error,
            );
            // Gérer ici les erreurs, par exemple accès refusé en raison d'un token invalide ou expiré
        }
    };

    // Exemple d'exécution d'une fonction au montage du composant pour tester l'accès à une ressource protégée
    onMount(() => {
        // fetchProtectedData(); // Décommentez pour tester l'accès à une route protégée au chargement du composant
    });
</script>

<body>
    <form on:submit|preventDefault={login}>
        <h2>Flopify</h2>
        <div>
            <input
                type="email"
                bind:value={email}
                id="email"
                placeholder="Votre email"
                required
            />
        </div>
        <div>
            <input
                type="password"
                bind:value={password}
                id="password"
                placeholder="Votre mot de passe"
                required
            />
        </div>
        <button type="submit">Connexion</button>
        <hr />
        <a href="/register">Pas encore inscrit ?<span>S'inscrire</span></a>
    </form>
</body>

<style>
    a span {
        display: inline-block;
        margin-left: 10px; /* Espacement entre les deux textes */
    }

    a {
        text-decoration: none;
    }
    span {
        color: #036eda;
        text-decoration: underline;
    }
    body {
        background: linear-gradient(135deg, #a8edea, #fed6e3);
        display: flex;
        height: 80vh;
        align-items: center;
        justify-content: center;
        margin: 0;
    }

    a {
        color: white;
        display: flex;
        justify-content: center;
        font-family: "Courier New", Courier, monospace;
        font-size: 17px;
        margin-bottom: 25px;
        margin-top: 10px;
    }
    hr {
        width: 90%;
        display: flex;
        justify-content: center;
    }
    h2 {
        color: white;
        display: flex;
        justify-content: center;
        font-family: "Courier New", Courier, monospace;
        font-size: 45px;
        margin-top: 5%;
        margin-bottom: 3%;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 100%;
        max-width: 600px;
        width: 600px;
        min-width: 300px;
        margin: 0 auto;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        background-color: black;
    }
    input,
    label {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        width: 75%;
        padding: 12px 15px;
        margin-bottom: 5px; /* Ajout pour espace entre label et input */
        border: 1px solid #ccc;
        background-color: rgb(70, 70, 70);
        border-radius: 4px;
        font-size: 17px;
        color: white;
    }
    button {
        width: 80%;
        margin-top: 20px;
        margin: 20px auto 30px auto;
        padding: 12px 15px;
        color: rgb(255, 255, 255);
        background-color: #036eda;
        border: none;
        border-radius: 30px;
        cursor: pointer;
        font-size: 19px;
    }
    button:hover {
        background-color: #0056b3;
    }
</style>
