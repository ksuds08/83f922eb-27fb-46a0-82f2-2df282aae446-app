import { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Dummy authentication logic
    if (username === 'user' && password === 'password') {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
