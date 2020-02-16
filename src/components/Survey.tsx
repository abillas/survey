import React, { useState, useEffect } from "react";
import Loading from "./Base/Loading";
import Chart from "./Chart";

const Survey = (props: any) => {
  const [loadedSurvey, setLoadedSurvey] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
    return () => {};
  }, [props.selectedSurvey]);

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
        const selectedSurvey = data.surveys[props.selectedSurvey];
        const loadedSurvey = { ...selectedSurvey };

        setLoading(false);
        setLoadedSurvey(loadedSurvey);

        console.log(loadedSurvey, "dd");
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Chart data={loadedSurvey} />
        </div>
      )}
    </>
  );
};
export default Survey;
