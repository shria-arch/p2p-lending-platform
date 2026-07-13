const multer = require("multer");
const multerS3 = require("multer-s3");
const { randomUUID } = require("crypto");

const s3 = require("../config/s3");

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,

    metadata: function (req, file, cb) {
      cb(null, {
        fieldName: file.fieldname,
      });
    },

    key: function (req, file, cb) {
      const fileName = `${randomUUID()}-${file.originalname}`;
      cb(null, fileName);
    },
  }),

  fileFilter: function (req, file, cb) {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, JPG and PNG files are allowed."));
    }
  },
});

module.exports = upload;