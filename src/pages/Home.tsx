import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonImg,
  IonText,
} from "@ionic/react";
import background from "/src/assets/background.jpg";
import "./Home.css";

const Home: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <IonPage>
      <IonImg src={background} className="background-image" />
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pictoescenas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonText color="light">
          <h4 className="header-title">Imagen de la escena</h4>
        </IonText>
        <IonButton expand="block" color="success" className="upload-button">
          <label>
            Subir mi imagen
            <input type="file" hidden onChange={handleImageUpload} />
          </label>
        </IonButton>
        <IonInput placeholder="Busca tu imagen en la red" />
        {preview && <IonImg src={preview} alt="Preview" />}
        <IonText>
          <h4>Mis Pictoescenas</h4>
        </IonText>
        {/* Aquí se mostrarán las imágenes editadas */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
