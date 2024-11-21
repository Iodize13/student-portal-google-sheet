import { getSheetData } from '../../lib/googleSheets';

export default async function handler(req, res) {
 const { spreadsheetId, range } = req.query;

 if (!spreadsheetId || !range) {
    return res.status(400).json({ error: 'Missing spreadsheetId or range' });
 }

 try {
    const data = await getSheetData(spreadsheetId, range);
    return res.status(200).json(data);
 } catch (error) {
    return res.status(500).json({ error: error.message });
 }
}
