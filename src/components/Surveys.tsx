import React, { useState, useEffect, useContext } from "react";
import Loading from "./Base/Loading";
import "./Surveys.css";

const Surveys = (props: any) => {
  const [loadedSurveys, setLoadedSurveys] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    fetch("https://my-json-server.typicode.com/focaldata/demo/db")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then(data => {
        const selectedSurveys = data.surveys;
        setLoading(false);
        setLoadedSurveys(
          selectedSurveys.map((char: any, index: number) => ({
            title: char.title,
            id: index
          }))
        );
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <select
          className={"select"}
          value={props.selectedSurvey}
          onChange={props.surveySelectHandler}
        >
          <option>Please select</option>
          {loadedSurveys.map((char: any) => (
            <option key={char.id} value={char.id}>
              {char.title}
            </option>
          ))}
        </select>
      )}
    </React.Fragment>
  );
};

export default Surveys;
