import { BadRequestException, Injectable } from '@nestjs/common';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

@Injectable()
export class FilesService {
    async uploadImage(file: Express.Multer.File): Promise<string> {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(file.mimetype)) {
            throw new BadRequestException(
                "Les images téléchargées doivent être au format JPEG, PNG ou GIF.",
            );
        }

        const ext = extname(file.originalname);
        const filename = `${uuidv4()}${ext}`;
        const path = `./uploads/${filename}`;

        await fs.writeFileSync(path, file.buffer);

        return filename;
    }
}