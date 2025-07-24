import { NowRequest, NowResponse } from '@vercel/node';
import { generatePDF, generateWord } from '../utils/exportUtils';

export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    const { format, resumeData } = req.body;
    let fileBuffer;

    switch (format) {
      case 'pdf':
        fileBuffer = await generatePDF(resumeData);
        res.setHeader('Content-Type', 'application/pdf');
        break;
      case 'word':
        fileBuffer = await generateWord(resumeData);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        break;
      default:
        return res.status(400).json({ error: 'Invalid format specified.' });
    }

    res.setHeader('Content-Disposition', `attachment; filename=resume.${format}`);
    res.status(200).send(fileBuffer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to export resume.' });
  }
}