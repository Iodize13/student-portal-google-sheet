import { useEffect, useState } from 'react';

const MyComponent = () => {
 const [data, setData] = useState([]);

 useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/getSheetData?spreadsheetId=1AU-MOFkHquxXDc4s2mubRQIGbNl7o7uNT8UvS0g2dx8&range=Sheet1!A1:B10');
      const result = await response.json();
      setData(result);
    };

    fetchData();
 }, []);

 return (
    <div>
      <h1>Google Sheets Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
 );
};

export default MyComponent;
