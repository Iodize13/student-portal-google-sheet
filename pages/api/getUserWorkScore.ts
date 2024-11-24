import { NextApiRequest, NextApiResponse } from 'next';

const getUserWorkScore = (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;

  const data = [
    { date: '2024-11-18', status: 'Present' },
    { date: '2024-11-21', status: 'Late' },
    { date: '2024-11-25', status: 'Absent' },
    { date: '2024-11-28', status: 'Unknown' },
  ];

  res.status(200).json({ data });
};

export default getUserWorkScore;
