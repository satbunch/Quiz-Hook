import React, { useState, useEffect } from 'react'
import axios from 'axios';

const App: React.FC = () => {
  const [quiz, setQuiz] = useState<any[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/quiz');
      setQuiz(response.data);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, question: string) => {
    setUserAnswers({ ...userAnswers, [question]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/quiz/submit', userAnswers);
      setScore(response.data.score);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  return (
    <div>
      <h1>Quiz Hook</h1>
      {quiz.map((q, index) => (
        <div key={index}>
          <p>{q.question}</p>
          <input type="text" value={userAnswers[q.question] || ''} onChange={(e) => handleChange(e, q.question)} />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      {score !== null && <p>Your score: {score}</p>}
    </div>
  );
};


export default App
