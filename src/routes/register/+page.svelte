<script>
    import { goto } from "$app/navigation";
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
                goto("/login");
            } else {
                console.error("Échec de l’inscription");
                // Gérer l'erreur, par exemple, afficher un message
            }
        } catch (error) {
            // Gérer l'erreur, par exemple, afficher un message d'erreur
        }
    };
</script>

<html lang="fr">
    <body>
        <form on:submit|preventDefault={register} class="register-form">
            <h2>Inscription</h2>
            <div class="input-group">
                <input
                    type="text"
                    bind:value={username}
                    placeholder="Nom d'utilisateur"
                    required
                />
            </div>
            <div class="input-group">
                <input
                    type="email"
                    bind:value={email}
                    placeholder="Email"
                    required
                />
            </div>
            <div class="input-group">
                <input
                    type="password"
                    bind:value={password}
                    placeholder="Mot de passe"
                    required
                />
            </div>
            <button type="submit">S'inscrire</button>
            <hr />
            <a href="/login">Déjà inscrit ?<span>Se connecter</span></a>
        </form>
    </body>
</html>

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
    h2 {
        color: white;
        display: flex;
        justify-content: center;
        font-family: "Courier New", Courier, monospace;
        font-size: 45px;
        margin-top: 5%;
        margin-bottom: 3%;
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
    html {
        height: 100%;
        background-color: linear-gradient(135deg, #a8edea, #fed6e3);
    }
    body {
        background: linear-gradient(135deg, #a8edea, #fed6e3);
        display: flex;
        height: 80vh;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .register-form {
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

    .input-group {
        width: 100%;
    }

    input {
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

    h2 {
        color: white;
        font-family: "Courier New", Courier, monospace;
        font-size: 45px;
        text-align: center;
        margin-bottom: 20px;
    }
</style>
