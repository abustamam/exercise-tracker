import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { User } from '../../../lib/user';

import middlewares from '../../../middleware';

const handler = nextConnect();
handler.use(middlewares);
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const { hostname } = new URL(original_url);
    // await lookup(hostname);
    // const short_url = generate();
    // const data = { original_url, short_url };
    // const record = await Url.create(data);
    const users = await User.find({})
    res.statusCode = 200;
    res.json(users);
  } catch (err) {
    res.statusCode = 400;
    res.json({
      error: err,
      ok: false,
    });
  }
});

export default handler;
