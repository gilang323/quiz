import React, { Component } from "react";
import Options from "./Option";

class Question extends Component {
    render() {
      const { question, selectedOption, onOptionChange, onSubmit, onSkip, onBack, isLastQuestion, isFirstQuestion } =
        this.props;
  
      // Menambahkan pengecekan apakah ada soal berikutnya sebelum mengakses prop question
      if (!question) {
        return null; // Mengembalikan null jika tidak ada soal berikutnya
      }
  
      return (
        <div className="">
          <h3>Question {question.id}</h3>
          <h5 className="mt-2">{question.question}</h5>
          <form className="mt-2 mb-2">
            <Options
              options={question.options}
              selectedOption={selectedOption}
              onOptionChange={onOptionChange}
            />
            <br></br>
            <div className="button-container">
              {!isFirstQuestion && (
                <button type="button" className="btn btn-secondary mr-2" onClick={onBack}>
                  Back
                </button>
              )}
              {!isLastQuestion && (
                <button type="button" className="btn btn-primary" onClick={onSubmit}>
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      );
    }
  }
  
  export default Question;
  
