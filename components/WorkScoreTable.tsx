import React from 'react';

type WorkScoreRecord = {
  date: string;
  status: 'p' | 'l' | 'a' | 'u';
};

interface WorkScoreTableProps {
  data: WorkScoreRecord[];
}

const getStatusColor = (status: string): string => {
  const colors: { [key: string]: string } = {
    p: 'bg-green-500', // Change to an actual color class
    l: 'bg-yellow-500', 
    a: 'bg-red-500', 
    u: 'bg-slate-600', 
  };
  return colors[status] || 'bg-slate-600';
};

// Function to convert the status character ('p', 'l', 'a', or '') to a full status string
const getStatusFromCharacter = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    p: 'Present',
    l: 'Late',
    a: 'Absent',
    '': 'Unknown',  // If blank, return 'Unknown'
  };
  return statusMap[status] || 'Unknown';  // Default to 'Unknown' if the character doesn't match
};
 
const getScoreOrDash = (scores: string[], index: number): string => {
  return scores[index] ? scores[index] : '-';
};

const WorkScoreTable: React.FC<WorkScoreTableProps> = ({ data }) => {
  const tasks = ["CA 1", "CA 2", "CA 3", "CA 4", "Project", "Spark", "Attendance"];
  const fullScores = ["7", "7", "6", "5", "20", "10", "5"];

  return (
      <div className ="flex-col">
      <div className ="pb-2 sm:pb-3 flex items-center justify-center">
    <table className="w-full sm:w-96 rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-slate-100 text-center">
          <th className="w-1/2 bg-orange-600 text-white font-medium p-2 border-b border-slate-300">
Total 60%
</th>
     {data.map((record) => (
          <th className="p-2 border-b border-slate-300 font-medium">{record[10]}</th>
     ))}
        </tr>
        <tr className="bg-slate-100 text-center font-medium">
          <th className="bg-red-500 text-white p-2 font-bold">
The use of AI*
</th>
     {data.map((record) => (
          <th className="w-1/2 p-2 font-medium">{record[11].toLowerCase()}</th>
     ))}
        </tr>
      </thead>
    </table>
    </div>

    <div className="h-[26rem] overflow-y-auto flex justify-center">
    <table className="flex-col w-full rounded-lg md:w-4/5 overflow-hidden">
      <thead className="sticky top-0 bg-white shadow-md">
        <tr className="text-orange-600 text-center border-slate-300 border-b-2">
          <th className="w-1/3 sm:w-1/4 p-1 sm:p-2">Task</th>
          <th className="w-1/3 sm:w-1/2 p-1 sm:p-2">Full Score (%)</th>
          <th className="w-1/3 p-1 sm:p-2">Achieved (%)</th>
        </tr>
      </thead>
      <tbody>
{tasks.map((task, index) => ( <tr className="odd:bg-slate-100 hover:bg-slate-300 text-center">
          <td className="bg-slate-200 p-2 border-b border-slate-300">{task}</td>
          <td className="p-2 border-b border-slate-300">{fullScores[index]}</td>
          <td className="text-center justify-center w-full border-b border-slate-300">{getScoreOrDash(data[0], index + 3)}</td>
        </tr>
      ))}
      </tbody>
    </table>
    </div>
    </div>
  );
};

export default WorkScoreTable;
