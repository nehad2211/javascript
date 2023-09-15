import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Task = () => {
  const [quoteList, setQuoteList] = useState([]);
  const [intervalTime, setIntervalTime] = useState(5); // Initial interval time in seconds
  const [apiCalls, setApiCalls] = useState(0);

  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get('https://api.adviceslip.com/advice');
      const randomQuote = response.data.slip.advice;
      setQuoteList((prevList) => [...prevList, randomQuote]);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (apiCalls < 15 && intervalTime <= 120) {
        fetchRandomQuote();
        setApiCalls(apiCalls + 1);
console.log(intervalTime,apiCalls)
        if (apiCalls === 4) {
          // After every 5 API calls, double the interval time
          setIntervalTime(intervalTime * 2);
          setApiCalls(0);
        }
      } else {
        clearInterval(intervalId); // Stop polling after 2 minutes
      }
    }, intervalTime * 1000); // Convert intervalTime to milliseconds

    return () => {
      clearInterval(intervalId);
    };
  }, [apiCalls, intervalTime]);

  return (
    <div>
      <h1>Random Advice Generator</h1>
      <div>
        <h2>List of Fetched Quotes:</h2>
        <ul>
          {quoteList.map((quote, index) => (
            <li key={index}>{quote}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Task;
