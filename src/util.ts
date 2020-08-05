import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';

export const parseForm = (req: NextApiRequest) =>
  new Promise<{ [field: string]: string }>((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
      if (err) {
        return reject(err);
      }
      return resolve(fields);
    });
  });
