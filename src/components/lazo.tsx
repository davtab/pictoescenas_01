import { FC, Dispatch, SetStateAction } from "react";

type SelectionToolProps = {
  setSelectionType: Dispatch<
    SetStateAction<"lasso" | "rectangle" | "circle" | null>
  >;
};

const Lazo: FC<SelectionToolProps> = ({ setSelectionType }) => {
  return (
    <div className="selection-tool">
      <button onClick={() => setSelectionType("lasso")}>Lazo</button>
      <button onClick={() => setSelectionType("rectangle")}>Rectángulo</button>
      <button onClick={() => setSelectionType("circle")}>Círculo</button>
      <p>Selecciona el área de la imagen</p>
    </div>
  );
};

export default Lazo;
