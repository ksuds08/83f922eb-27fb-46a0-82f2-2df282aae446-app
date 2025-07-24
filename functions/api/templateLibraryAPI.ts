import { VercelRequest, VercelResponse } from '@vercel/node';

interface Template {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

const templates: Template[] = [
  { id: '1', name: 'Modern Template', description: 'A sleek and modern resume template.', createdAt: '2023-10-01' },
  { id: '2', name: 'Classic Template', description: 'A classic resume template with a professional look.', createdAt: '2023-10-02' }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    res.status(200).json({ templates });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
