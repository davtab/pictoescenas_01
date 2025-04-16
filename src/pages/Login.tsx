import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonImg,
} from "@ionic/react";
import React, { useState, FC, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom"; // Importar Link de react-router-dom
import background from "/src/assets/background.jpg";
import "./Login.css";

const URL_Login = "http://localhost/api/login.php";

const Login: React.FC = () => {
  // State variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //const [currentUser, setCurrentUser] = useState<Parse.Object | null>(null);

  const doUserLogIn = async function (): Promise<boolean> {
    try {
      // Obtener los valores actuales de los inputs antes de enviarlos
      const currentUsername = username.trim();
      const currentPassword = password.trim();

      // Validar que los campos no estén vacíos
      if (!currentUsername || !currentPassword) {
        alert("Por favor, ingrese usuario y contraseña.");
        return false;
      }
      const response = await fetch(URL_Login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, password: password }),
      });
      console.log(JSON.stringify({ email: username, password: password }));
      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      if (data.success) {
        console.log("User:", data.user);
        localStorage.setItem("user", JSON.stringify(data.user));

        //Redirigir a home  //TODO
      } else {
        alert(data.error);
      }
      // Clear input fields
      setUsername("");
      setPassword("");
      // Update state variable holding current user
      //setCurrentUser(currentUser);
      return true;
    } catch (error: any) {
      // Error can be caused by wrong parameters or lack of Internet connection
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="login-content">
        <IonImg src={background} className="background-image" />
        <IonCard className="login-card">
          <h2>Pictoescenas</h2>
          <div className="header-login">
            <Link to="/login">Login de Usuarios</Link>
            <h3>|</h3>
            <Link to="/register">Registro</Link>
          </div>
          <br></br>
          <IonCardContent className="ion-card-content">
            <IonInput
              className="ion-input"
              placeholder="Usuario Pictosueños (correo)"
              type="text"
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
            />
            <IonInput
              className="ion-input"
              placeholder="Password"
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            />
            <div className="forgot-password-container">
              <a href="/register" className="forgot-password">
                ¿Has olvidado tu contraseña?
              </a>
              <IonButton
                className="pink-button half-width-button"
                expand="block"
                onClick={doUserLogIn}
              >
                Entrar
              </IonButton>
            </div>
            <hr></hr>
            <h2 className="social-text">
              También puedes acceder con tu cuenta de Facebook o Google
            </h2>
            <div className="social-buttons">
              <IonButton color="primary" expand="block" className="ion-button">
                Facebook
              </IonButton>
              <IonButton color="white" expand="block" className="ion-button">
                Google
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
        <p className="register-text">
          ¿No tienes todavía una cuenta de Pictoaplicaciones?{" "}
          <Link to="/register">Regístrate</Link>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Login;
