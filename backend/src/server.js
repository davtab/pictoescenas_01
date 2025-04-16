const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

// Configura Multer para guardar archivos en 'backend/uploads/'
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Ruta para subir archivos
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.json({
    success: true,
    path: `/uploads/${req.file.filename}`, // Ruta pública del archivo
  });
});

// Servir archivos estáticos
app.use("/uploads", express.static("uploads"));

app.listen(3001, () => console.log("Backend running on port 3001"));
