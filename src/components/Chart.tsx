import React from "react";
import "./Chart.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const Chart = (props: any) => {
  let chartData;
  let map: any = {};
  let color: [];

  if (props.data && props.data.hasOwnProperty("questions")) {
    chartData = props.data.questions.map((char: any, index: number) => {
      return {
        name: char.questionTitle,
        color: char.colors,
        ...char.answerOptions.reduce((acc: any, cur: any) => {
          if (index === 0) {
            // we dont want the unnecessarily executions/re-renders
            map = {
              ...map,
              [cur.answerOption]: cur.text
            };
          }
          acc = {
            ...acc,
            [cur.answerOption]: cur.selectedByRespondents
          };
          return acc;
        }, {})
        // color: char.colors
      };
    });
  }
  console.log(chartData, map, "22");

  return (
    <>
      {props.data && props.data.hasOwnProperty("questions") ? (
        <div className="chartWrapper">
          <BarChart
            width={800}
            height={400}
            data={chartData}
            // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="name" tick={false} />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.keys(map).map((element: any) => {
              return (
                <Bar
                  dataKey={element}
                  key={element}
                  fill={element}
                  name={map[element]}
                />
              );
            })}
            ;
          </BarChart>
        </div>
      ) : (
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          Please Select a Survey
        </h1>
      )}
    </>
  );
};

export default Chart;
