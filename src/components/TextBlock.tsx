import React, { useState, useRef } from "react";
import "./TextBlock.css";
import { useDrag } from "react-dnd";

type TextBlockProps = {
  id: string;
  content: string;
  x: number;
  y: number;
  fontFamily: string;
  fontSize: number;
  color: string;
  onUpdate: (
    id: string,
    updates: { content?: string; x?: number; y?: number }
  ) => void;
  onDelete: (id: string) => void;
};

const TextBlock: React.FC<TextBlockProps> = ({
  id,
  content,
  x,
  y,
  fontFamily,
  fontSize,
  color,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  // Configuración de arrastre (react-dnd)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TEXT_BLOCK",
    item: { id, x, y },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Maneja el cambio de texto
  const handleBlur = () => {
    if (textRef.current) {
      onUpdate(id, { content: textRef.current.innerText });
    }
    setIsEditing(false);
  };

  return (
    <div
      ref={drag}
      className={`text-block ${isDragging ? "dragging" : ""}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        fontFamily,
        fontSize: `${fontSize}px`,
        color,
      }}
      onDoubleClick={() => setIsEditing(true)}
    >
      <div
        ref={textRef}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onBlur={handleBlur}
        className="text-content"
      >
        {content}
      </div>
      {isEditing && (
        <button className="delete-button" onClick={() => onDelete(id)}>
          ×
        </button>
      )}
    </div>
  );
};

export default TextBlock;
