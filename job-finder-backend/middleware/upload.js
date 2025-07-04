import multer from 'multer';
import path from 'path';

// Set storage location and filename format
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes'); // store files in 'uploads/resumes' folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  }
});

// File filter to allow only PDF and DOCX
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .pdf and .docx files are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;