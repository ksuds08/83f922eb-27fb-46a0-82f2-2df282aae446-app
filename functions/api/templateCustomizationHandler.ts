import { VercelRequest, VercelResponse } from '@vercel/node';

interface TemplateCustomizationRequest {
  templateId: string;
  customizations: Record<string, string | number | boolean>;
}

const availableTemplates = [
  'classic',
  'modern',
  'creative'
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { templateId, customizations }: TemplateCustomizationRequest = req.body;

  if (!availableTemplates.includes(templateId)) {
    return res.status(400).json({ message: 'Invalid template ID' });
  }

  // Mock implementation of customization logic
  const customizedTemplate = {
    templateId,
    ...customizations
  };

  return res.status(200).json({ message: 'Template customized successfully', customizedTemplate });
}
