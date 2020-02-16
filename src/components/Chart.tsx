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
  let colorList: any = ["#3C403C", "#14930E", "#5FF7FE", "#FF5733", "#FFBE33"];

  if (props.data && props.data.hasOwnProperty("questions")) {
    chartData = props.data.questions.map((char: any, index: number) => {
      return {
        name: char.questionTitle,
        color: char.colors,
        ...char.answerOptions.reduce((acc: any, cur: any, j: any) => {
          if (index === 0) {
            // we dont want the unnecessarily executions/re-renders
            map = {
              ...map,
              [cur.answerOption]: { text: cur.text, color: colorList[j] }
            };
          }
          acc = {
            ...acc,
            [cur.answerOption]: cur.selectedByRespondents
          };
          return acc;
        }, {})
      };
    });
  }
  console.log(chartData, map, "22");

  return (
    <>
      {props.data && props.data.hasOwnProperty("questions") ? (
        <div className="chartWrapper">
          <BarChart width={900} height={450} data={chartData}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="name" tick={false} />
            <YAxis />
            <Tooltip
              labelStyle={{ fontWeight: 700 }}
              itemStyle={{ color: "black" }}
            />
            <Legend />
            {Object.keys(map).map((element: any) => {
              return (
                <Bar
                  dataKey={element}
                  key={element}
                  fill={map[element].color}
                  name={map[element].text}
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
