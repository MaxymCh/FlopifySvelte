<script>
    import axios from "axios";

    let username = "";
    let email = "";
    let password = "";

    const register = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/register",
                {
                    username,
                    email,
                    password,
                },
            );

            if (response.status === 201) {
                console.log("Inscription réussie");
                // Rediriger l'utilisateur ou afficher un message de succès
            } else {
                console.error("Échec de l’inscription");
                // Gérer l'erreur, par exemple, afficher un message
            }
        } catch (error) {
            // Gérer l'erreur, par exemple, afficher un message d'erreur
        }
    };
</script>

<form on:submit|preventDefault={register}>
    <h2>Inscription</h2>
    <input
        type="text"
        bind:value={username}
        placeholder="Nom d'utilisateur"
        required
    />
    <input type="email" bind:value={email} placeholder="Email" required />
    <input
        type="password"
        bind:value={password}
        placeholder="Mot de passe"
        required
    />
    <button type="submit">S'inscrire</button>
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
    input {
        padding: 10px;
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
