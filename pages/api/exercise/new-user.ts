import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import middlewares from '../../../middleware';
import { User } from '../../../lib/user';
import { parseForm } from '../../../src/util';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nextConnect();
handler.use(middlewares);
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { username } = await parseForm(req);
    const existingRecord = await User.findOne({ username });
    if (existingRecord) {
      throw new Error('User already exists');
    }
    const record = await User.create({ username });
    res.statusCode = 200;
    res.json(record);
  } catch (err) {
    console.log('err', err)
    res.statusCode = 400;
    res.json({
      error: err.message,
      ok: false,
    });
  }
});

export default handler;
