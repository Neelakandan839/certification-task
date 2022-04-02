const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const router = express.Router();

router.get("/certificate/:file", (req, res) => {
  const address = path.join(__dirname, `../public/certificate/${req.params.file}`);
  fs.access(address, fs.F_OK, (err) => {
    if (err) {
      res.status(404).json({
        message: "File not found",
      });
      return;
    }
    res.sendFile(address);
  });
});

var today = new Date();

const upload = multer({
  storage: multer.diskStorage({
    destination: `${__dirname}/../public/certificate`,
    filename: (req, file, cb) => {
      cb(null,`${today.getDate()}_${today.getMonth() + 1}_${today.getFullYear()}_${file.originalname}`);
    },

    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);
      if (ext !== ".pdf" && ext !== ".jpg") {
        cb(new Error("File type not supported"));
      }
      cb(null, true);
    },
  }),
});

router.post("/certificate", upload.single("file"), (req, res) => {
  const { file } = req;

  const fname = `${today.getDate()}_${today.getMonth() + 1}_${today.getFullYear()}_${file.originalname}`;
  res.send({
    message: "Certificate uploaded successfully",
    url: `/host/certificate/${fname}`,
  });
});

module.exports = router;
