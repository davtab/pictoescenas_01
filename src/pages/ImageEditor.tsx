import React from "react";
import { useState, useRef, FC } from "react";
import "./ImageEditor.css";

// Definición de tipos
type Tool = "image" | "selection" | "buttons" | "events" | "options" | null;
type SelectionType = "lasso" | "rectangle" | "circle" | null;
type ButtonType = "photo" | "text" | "picto" | "color";

interface Button {
  id: string;
  type: ButtonType;
  content?: string;
  position: { x: number; y: number };
  interactive: boolean;
}

interface SpeechBubble {
  id: string;
  text: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface SoundElement {
  id: string;
  src: string;
  position: { x: number; y: number };
}

interface TextBlock {
  id: string;
  content: string;
  position: { x: number; y: number };
  style: {
    fontSize: number;
    color: string;
    fontFamily: string;
  };
}

interface PictoBlock {
  id: string;
  pictos: string[]; // URLs de los pictogramas
  position: { x: number; y: number };
  direction: "horizontal" | "vertical";
}

const ImageEditor: FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<Tool>(null);
  const [selectionType, setSelectionType] = useState<SelectionType>(null);
  const [buttons, setButtons] = useState<Button[]>([]);
  const [speechBubbles, setSpeechBubbles] = useState<SpeechBubble[]>([]);
  const [sounds, setSounds] = useState<SoundElement[]>([]);
  const [textBlocks, setTextBlocks] = useState<TextBlock[]>([]);
  const [pictoBlocks, setPictoBlocks] = useState<PictoBlock[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Manejadores de herramientas
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && window.confirm("¿Confirmas que quieres cambiar la imagen?")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToolSelection = (tool: Tool) => {
    setActiveTool(tool);
  };

  // Funciones para agregar elementos
  const addButton = (type: ButtonType): void => {
    const newButton: Button = {
      id: Date.now().toString(),
      type,
      position: { x: 100, y: 100 },
      interactive: false,
    };
    setButtons([...buttons, newButton]);
  };

  const addSpeechBubble = (): void => {
    const newBubble: SpeechBubble = {
      id: Date.now().toString(),
      text: "Nuevo bocadillo",
      position: { x: 150, y: 150 },
      size: { width: 200, height: 100 },
    };
    setSpeechBubbles([...speechBubbles, newBubble]);
  };

  const addSound = (): void => {
    // En una implementación real, aquí se pediría el archivo de sonido
    const newSound: SoundElement = {
      id: Date.now().toString(),
      src: "",
      position: { x: 50, y: 50 },
    };
    setSounds([...sounds, newSound]);
  };

  const addTextBlock = (): void => {
    const newTextBlock: TextBlock = {
      id: Date.now().toString(),
      content: "Nuevo texto",
      position: { x: 200, y: 200 },
      style: {
        fontSize: 16,
        color: "#000000",
        fontFamily: "Arial",
      },
    };
    setTextBlocks([...textBlocks, newTextBlock]);
  };

  const addPictoBlock = (): void => {
    const newPictoBlock: PictoBlock = {
      id: Date.now().toString(),
      pictos: [],
      position: { x: 250, y: 250 },
      direction: "horizontal",
    };
    setPictoBlocks([...pictoBlocks, newPictoBlock]);
  };
  return (
    <div className="image-editor">
      <div className="toolbar">
        <button onClick={() => handleToolSelection("image")}>IMAGEN</button>
        <button onClick={() => handleToolSelection("selection")}>
          SELECCIÓN
        </button>
        <button onClick={() => handleToolSelection("buttons")}>BOTONES</button>
        <button onClick={() => handleToolSelection("events")}>EVENTOS</button>
        <button onClick={() => handleToolSelection("options")}>OPCIONES</button>
      </div>

      <div className="editor-content">
        {activeTool === "image" && (
          <div className="image-tool">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <p>Cambia la imagen con la que se trabaja</p>
          </div>
        )}

        {activeTool === "selection" && (
          <div className="selection-tool">
            <button onClick={() => setSelectionType("lasso")}>Lazo</button>
            <button onClick={() => setSelectionType("rectangle")}>
              Rectángulo
            </button>
            <button onClick={() => setSelectionType("circle")}>Círculo</button>
            <p>Selecciona el área de la imagen</p>
          </div>
        )}

        {activeTool === "buttons" && (
          <div className="buttons-tool">
            <button onClick={() => addButton("photo")}>Foto</button>
            <button onClick={() => addButton("text")}>Texto</button>
            <button onClick={() => addButton("picto")}>Picto</button>
            <button onClick={() => addButton("color")}>Color</button>
          </div>
        )}

        {activeTool === "events" && (
          <div className="events-tool">
            <button onClick={addSpeechBubble}>Bocadillo</button>
            <button onClick={addSound}>Sonido</button>
            <button onClick={addPictoBlock}>Bloque de Pictos</button>
            <button onClick={addTextBlock}>Bloque de Texto</button>
          </div>
        )}

        {activeTool === "options" && (
          <div className="options-tool">
            <h3>Opciones de la herramienta</h3>
            {/* Opciones específicas irían aquí */}
          </div>
        )}

        <div className="canvas-container">
          <canvas ref={canvasRef} width={800} height={600} />
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Editor"
              style={{ display: "none" }}
              id="source-image"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
