import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { Exercise } from '../../../lib/exercise';
import { User } from '../../../lib/user';
import middlewares from '../../../middleware';
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
    const fd = await parseForm(req);
    const { userId, description, duration, date: notDate } = fd;
    const date = notDate ? new Date(notDate) : new Date();
    const exercise = await Exercise.create({
      description,
      duration,
      date,
      user: userId,
    });
    const user = await User.findById(userId);
    user.exercises.push(exercise);
    await user.save();
    res.statusCode = 200;
    const r = {
      _id: user._id,
      username: user.username,
      description: exercise.description,
      duration: +exercise.duration,
      date: date.toDateString(),
    };
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
