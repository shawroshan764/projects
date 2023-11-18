import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import nlp from "compromise";
import "compromise-sentences";
import "./App.css"; // Import your custom styles

const App = () => {
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");

  const handleInputChange = (e: any) => {
    setInputText(e.target.value);
  };

  const handleConvertClick = () => {
    const doc = nlp(inputText);
    doc.sentences().toPastTense();
    const result = doc.text();
    setResultText(result);
  };

  return (
    <div className="container">
      <div className="row">
        <h2 className="text-center mt-4 font-weight-bold">
          Present to Past Tense Converted
        </h2>

        <div className="mt-4 col-md-6 offset-md-3">
          <textarea
            className="form-control dark-border" // Add custom class for styling
            id="exampleFormControlTextarea1"
            rows={3}
            placeholder="Write a sentence in present tense..."
            value={inputText}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="col-md-4 offset-md-5">
          <button className="btn btn-primary mt-4" onClick={handleConvertClick}>
            Translate to Past Tense
          </button>
        </div>

        {resultText && (
          <div className="col-md-6 offset-md-3 mt-4">
            <div className="alert alert-primary" role="alert">
              {resultText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
