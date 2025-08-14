import bcrypt from 'bcrypt';
import { Router } from 'express';
import { UserModel } from '../models/user';
import { SALT_ROUNDS } from '../utils/constants';
import { validate } from '../middlewares/validate';
import {registerShema, loginShema} from '../shemas/auth.shema';
import { signToken } from '../utils/token';
export const authRouter = Router();


authRouter.post('/register', validate(registerShema), async (req, res) => {
  try {
    const {email, login, password} = req.body;

    const existingByEmail = await UserModel.findOne({email: email});

    // TODO if both Email and login are used send both errors not the first one
    if (existingByEmail) {
      res.status(409).json({ error: 'Email is already in use' });
      return;
    }

    const existingByLogin = await UserModel.findOne({login: login});

    if (existingByLogin) {
      res.status(409).json({ error: 'Login is already in use' });
      return
    }
  
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new UserModel({
      login,
      email,
      password: passwordHash,
    })

    const newUser = await user.save();
  
    res.status(201).json({ 
      user: {
        id: newUser._id,
        login: newUser.login,
        email: newUser.email,
      }
    });

  } catch (error) { 
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


authRouter.post('/login', validate(loginShema), async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await UserModel.findOne({ login });

    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }

    const token = signToken({userId: user.id, login: user.login});
    res.json({ user: {
      login: user.login,
      email: user.email,
    },token })

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
   
  res.send('pong')
})