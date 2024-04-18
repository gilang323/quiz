import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Question from "./Components/Question";
import qBank from "./Components/QuestionBank";
import Score from "./Components/Score";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionBank: qBank,
      currentQuestion: 0,
      selectedOption: "",
      score: 0,
      quizEnd: false,
      timeLeft: null,
    };
    this.timeLimit = 5 * 60 * 1000; 
    this.startTime = Date.now();
    this.timer = null;
  }

  componentDidMount() {
    // Set timer untuk menghitung waktu
    document.title = "Cat Test";
    this.timer = setInterval(this.updateTimer, 1000); // Update setiap 1 detik
  }

  componentWillUnmount() {
    // Membersihkan timer saat komponen di-unmount
    clearInterval(this.timer);
  }

  updateTimer = () => {
    const elapsedTime = Date.now() - this.startTime;
    const timeLeft = Math.max(this.timeLimit - elapsedTime, 0);
    this.setState({ timeLeft });
    if (timeLeft === 0) {
      this.handleTimeout();
    }
  };

  handleOptionChange = (e) => {
    this.setState({ selectedOption: e.target.value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.checkAnswer();
    this.handleNextQuestion();
  };

  checkAnswer = () => {
    const { questionBank, currentQuestion, selectedOption } = this.state;
    if (selectedOption === questionBank[currentQuestion].answer) {
      this.setState((prevState) => ({ score: prevState.score + 1 }));
    }
  };

  handleNextQuestion = () => {
    const { questionBank, currentQuestion } = this.state;
    if (currentQuestion + 1 < questionBank.length) {
      this.setState((prevState) => ({
        currentQuestion: prevState.currentQuestion + 1,
        selectedOption: "",
      }));
    } else {
      this.setState({
        quizEnd: true,
      });
    }
  };

  handleBackQuestion = () => {
    this.setState((prevState) => ({
      currentQuestion: Math.max(prevState.currentQuestion - 1, 0),
      selectedOption: "",
    }));
  };

  handleTimeout = () => {
    this.setState({ quizEnd: true });
  };

  render() {
    const { questionBank, currentQuestion, selectedOption, score, quizEnd, timeLeft } = this.state;
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);

    const isFirstQuestion = currentQuestion === 0;
    const isLastQuestion = currentQuestion === questionBank.length ;

    return (
      <div className="App d-flex flex-column align-items-center justify-content-center">
        <h1 className="app-title">QUIZ APP</h1>
        <div className="timer">
          <h2> Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds} </h2>  
          <br></br>
        </div>
        {!quizEnd ? (
          <Question
            className="question" 
            question={questionBank[currentQuestion]}
            selectedOption={selectedOption}
            onOptionChange={this.handleOptionChange}
            onSubmit={this.handleFormSubmit}
            onSkip={this.handleNextQuestion}  
            onBack={this.handleBackQuestion} // Menambahkan prop onBack
            isFirstQuestion={isFirstQuestion} // Menambahkan prop isFirstQuestion
            isLastQuestion={isLastQuestion} // Menambahkan prop isLastQuestion
          />
        ) : (
          <div>
            <Score
              score={score}
              onNextQuestion={this.handleNextQuestion}
              className="score"
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;

