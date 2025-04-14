import { NotAcceptableException } from '@nestjs/common';
import { diskStorage } from 'multer';
import * as path from 'path';

const storage = diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    const name = file.originalname.split('.')[0];
    const nn = name.replace(/ /g, '_');
    const fileExtName = path.extname(file.originalname);
    cb(null, `${Date.now()}-${nn}${fileExtName}`);
  },
});

export const multerConfig = {
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3, // 3MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
      return cb(new NotAcceptableException('Only image files are allowed!'));
    }
    cb(null, true);
  },
};
