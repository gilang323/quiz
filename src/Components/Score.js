import React, { Component } from 'react';
import '../App.css'

class Score extends Component {
	render() {
		const { score, onNextQuestion } = this.props;
    const resultMessage = score >= 7 ? (
      <div>
        <h2>Results : success</h2>
        <h4>Your score: {score}</h4>
      </div>
    ) : (
      <div>
        <h2>Result: Failed</h2>
        <h4>Your score: {score}</h4>
      </div>
    );

		return (
			<div>
				{resultMessage}
			</div>
		);
	}
}

export default Score;
