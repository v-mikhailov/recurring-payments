import bcrypt from 'bcrypt';
import { Router } from 'express';
import { UserModel } from '../models/user';
import { SALT_ROUNDS } from '../utils/constants';
import { validateShema } from '../middlewares/validateShema';
import {registerShema, loginShema} from '../shemas/auth.shema';
import { signToken } from '../utils/token';
export const authRouter = Router();


authRouter.post('/register', validateShema(registerShema), async (req, res) => {
  try {
   const email = req.body.email ? String(req.body.email).trim().toLowerCase(): undefined;
   const login = String(req.body.login).trim();
   const password = String(req.body.password);

  const conflictQuery = email 
    ? { $or: [{ email }, { login }] }
    : { login };
  console.log('conflictQuery', conflictQuery);
  const conflicts = await UserModel.findOne(conflictQuery)
    .select('email login')
    .lean();

  const errors: Record<string, string> = {};

  if (conflicts) {
    if (email && conflicts.email === email) errors.email = 'Email is already in use';
    if (conflicts.login === login) errors.login = 'Login is already in use';
  }

  if (Object.keys(errors).length > 0) {
    res.status(409).json({ errors });
    return;
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = new UserModel({
    login,
    password: passwordHash,
    ...(email && { email }),
  });

  const newUser = await user.save();
  const token = signToken({userId: String(newUser._id), login: newUser.login});

  res.status(201).json({ 
    user: {
      id: newUser._id,
      login: newUser.login,
      ...(newUser.email && { email: newUser.email }),
    },
    token
  });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

authRouter.post('/login', validateShema(loginShema), async (req, res) => {
  try {
    const login = String(req.body.login).trim();
    const password = String(req.body.password);
    const user = await UserModel.findOne({ login }).select('login email password');

    if (!user) {
      res.status(401).json({error: 'Invalid credentials'});
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({error: 'Invalid credentials'});
      return;
    }
    
    const token = signToken({userId: String(user._id), login: user.login});
    res.status(200).json({
      user: {
        login: user.login,
        ...(user.email && { email: user.email }), 
      },
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})
