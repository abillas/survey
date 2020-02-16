import React, { useState } from "react";
import Surveys from "./components/Surveys";
import Survey from "./components/Survey";

const App = (props: any) => {
  const [selectedSurvey, setSelectedSurvey] = useState<number>();

  const surveySelectHandler = (e: any) => {
    const surveyId = e.target.value;
    setSelectedSurvey(surveyId);
  };

  return (
    <React.Fragment>
      <Surveys
        surveySelectHandler={surveySelectHandler}
        selectedSurvey={selectedSurvey}
      />
      <Survey selectedSurvey={selectedSurvey} />
    </React.Fragment>
  );
};

export default App;
