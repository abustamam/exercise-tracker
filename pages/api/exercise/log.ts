import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { Exercise } from '../../../lib/exercise';
import { User } from '../../../lib/user';

import middlewares from '../../../middleware';

const handler = nextConnect();
handler.use(middlewares);
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, from, to, limit } = req.query;
    console.log('req.query', req.query);
    const user = await User.findById(userId);
    let query = Exercise.find({ user: userId });
    if (from) {
      query = query.where('date').gt(from);
    }
    if (to) {
      query = query.where('date').gt(to);
    }
    if (limit) {
      query = query.limit(parseInt(limit, 10));
    }
    const exercises = await query.exec();
    console.log('exercises', exercises);
    const r = {
      _id: userId,
      username: user.username,
      count: exercises.length,
      log: exercises.map(({ description, duration, date }) => ({
        description,
        duration: +duration,
        date,
      })),
    };
    console.log('r', r);
    res.statusCode = 200;
    res.json(r);
  } catch (err) {
    res.statusCode = 400;
    res.json({
      error: err,
      ok: false,
    });
  }
});

export default handler;
