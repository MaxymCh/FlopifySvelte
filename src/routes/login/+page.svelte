<script>
    import axios from "axios";

    let email = "";
    let password = "";

    const login = async () => {
        try {
            const response = await axios.post("http://localhost:3000/login", {
                email,
                password,
            });

            if (response.status === 200) {
                console.log("Connexion réussie");
                // Rediriger l'utilisateur ou afficher un message de succès
            } else {
                console.error("Échec de la connexion");
                // Gérer l'erreur, par exemple, afficher un message
            }
        } catch (error) {
            console.error("Échec de la connexion", error.response);
            // Gérer l'erreur, par exemple, afficher un message d'erreur
        }
    };
</script>

<form on:submit|preventDefault={login}>
    <h2>Connexion</h2>
    <div>
        <label for="email">Email:</label>
        <input
            type="email"
            bind:value={email}
            id="email"
            placeholder="Votre email"
            required
        />
    </div>
    <div>
        <label for="password">Mot de passe:</label>
        <input
            type="password"
            bind:value={password}
            id="password"
            placeholder="Votre mot de passe"
            required
        />
    </div>
    <button type="submit">Se connecter</button>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }
    input,
    label {
        width: 100%;
        padding: 10px;
        margin-bottom: 5px; /* Ajout pour espace entre label et input */
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
    }
    button {
        padding: 10px 15px;
        color: white;
        background-color: #007bff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }
    button:hover {
        background-color: #0056b3;
    }
</style>
