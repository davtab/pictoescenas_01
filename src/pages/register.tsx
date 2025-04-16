import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonImg,
  IonItem,
  IonCheckbox,
  IonLabel,
} from "@ionic/react";
import "./register.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import background from "/src/assets/background.jpg";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aceptado, setAceptado] = useState(false);

  const doRegister = async () => {
    // Implementar lógica de registro aquí
    if (!username || !email || !password || !aceptado) {
      alert(
        "Por favor, complete todos los campos y acepte la política de privacidad."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost/api/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: username,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en el registro");
      } else {
        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Response:", response);
      }

      const data = await response.json();
      console.log(data);
      alert("Registro exitoso");
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema con el registro. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="register-content">
        <IonImg src={background} className="register-background-image" />
        <IonCard className="register-login-card">
          <h2>Pictoescenas</h2>
          <div className="register-header-login">
            <Link to="/login">Login de Usuarios</Link>
            <h3>|</h3>
            <Link to="/register">Registro</Link>
          </div>
          <br></br>
          <IonCardContent className="register-ion-card-content">
            <IonInput
              className="register-ion-input"
              placeholder="Nombre de Usuario"
              type="text"
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
            />
            <IonInput
              className="register-ion-input"
              placeholder="Tu e-mail"
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            />
            <IonInput
              className="register-ion-input"
              placeholder="Password"
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            />
            <div className="register-privacy-container">
              <IonCheckbox
                slot="start"
                checked={aceptado}
                onIonChange={(e) => setAceptado(e.detail.checked)}
              />
              <IonLabel className="register-privacy">
                He leído y acepto la política de privacidad
              </IonLabel>
              <IonButton
                className="register-pink-button half-width-buttonx"
                expand="block"
                onClick={doRegister}
              >
                Registrarme
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Register;
