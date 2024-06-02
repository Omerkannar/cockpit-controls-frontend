import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Cell, Label } from 'recharts';
import './App.css'

const data = [
  { x: 0.5, y: 0.5},
  // { x: 120, y: 100, z: 260 },
  // { x: 170, y: 300, z: 400 },
  // { x: 140, y: 250, z: 280 },
  // { x: 150, y: 400, z: 500 },
  // { x: 110, y: 280, z: 200 },
];
const COLORS = ['gold'];

export default function App() {

  const [chartData, setChartData] = React.useState(data);
  const [chartData1, setChartData1] = React.useState(data);
  const [chartData2, setChartData2] = React.useState(data);

  React.useEffect(() => {
      const intervalId = setInterval(() => {
          const nextData = [...data];
          const nextData1 = [...data];
          const nextData2 = [...data];
          //console.log(nextData)
          const xx = Math.random() * 2 - 1;
          const yy = Math.random() * 2 - 1;
          nextData[0] = {
            x: xx,
            y:yy,
          };

          nextData1[0] = {
            x: yy,
            y:0,
          };

          nextData2[0] = {
            x: 0,
            y:Math.abs(Math.sin(yy)),
          };

          setChartData(nextData);
          setChartData1(nextData1);
          setChartData2(nextData2);
      }, 1000);

      return () => {
          clearInterval(intervalId);
      };
  });

  return (
    <div className='myDiv'>
    <ScatterChart
      width={200}
      height={200}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
      
    >
      <CartesianGrid fill='#36393f'/>
      {/* <XAxis type="number" dataKey="x" domain={[-1, 1]} ticks={[-1, -0.5,  0, 0.25, 0.5, 0.75, 1.0]}> */}
      <XAxis type="number" dataKey="x" domain={[-1, 1]} stroke='white'>
        <Label value="Lateral" offset={0} position="insideBottom" stroke='white'/>
      </XAxis>
      <YAxis type="number" dataKey="y" domain={[-1, 1]} stroke='white' label={{value: "Lateral", angle: -90, position: 'insideLeft', stroke: 'white'}}>
      </YAxis>
      {/* <Tooltip cursor={{ strokeDasharray: '3 3' }} /> */}
      <Scatter name="A school" data={chartData} fill="#36393f" isAnimationActive={true} animationEasing={'ease-in-out'}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Scatter>
    </ScatterChart>
    <br />
    <ScatterChart
      width={200}
      height={80}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
      
    >
      <CartesianGrid fill='#36393f'/>
      {/* <XAxis type="number" dataKey="x" domain={[-1, 1]} ticks={[-1, -0.5,  0, 0.25, 0.5, 0.75, 1.0]}> */}
      <XAxis type="number" dataKey="x" domain={[-1, 1]} stroke='white'>
        <Label value="Pedals" offset={-10} position="insideBottom" stroke='white'/>
      </XAxis>
      <YAxis type="number" dataKey="y" domain={[-0.001, 0.001]} stroke="#36393f" >
      </YAxis>
      {/* <Tooltip cursor={{ strokeDasharray: '3 3' }} /> */}
      <Scatter name="A school" data={chartData1} fill="#36393f" isAnimationActive={true} animationEasing={'ease-in-out'}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Scatter>
    </ScatterChart>
    <br />
    <ScatterChart
      width={80}
      height={200}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
      
    >
      <CartesianGrid fill='#36393f'/>
      {/* <XAxis type="number" dataKey="x" domain={[-1, 1]} ticks={[-1, -0.5,  0, 0.25, 0.5, 0.75, 1.0]}> */}
      <XAxis type="number" dataKey="x" domain={[-.001, .001]} />
      <YAxis type="number" dataKey="y" domain={[0, 1]} stroke='white' label={{value: "Lateral", angle: -90, position: 'insideLeft', stroke: 'white'}}>
      </YAxis>
      {/* <Tooltip cursor={{ strokeDasharray: '3 3' }} /> */}
      <Scatter name="A school" data={chartData2} fill="#36393f" isAnimationActive={true} animationEasing={'ease-in-out'}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Scatter>
    </ScatterChart>          
    </div>
  );
}


