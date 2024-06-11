import type { NextApiRequest, NextApiResponse } from 'next';
import setupFirestore from '../../lib/firestoreSetup';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await setupFirestore();
    res.status(200).json({ message: 'Firestore setup completed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Firestore setup failed' });
  }
}
