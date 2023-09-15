// export default App;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [quote, setQuote] = useState('');
  const [quoteList, setQuoteList] = useState([]);

  // Function to fetch a random quote
  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get('https://api.adviceslip.com/advice');
      const randomQuote = response.data.slip.advice;
      setQuote(randomQuote);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  // Function to add the current quote to the list of fetched quotes
  const addQuoteToList = () => {
    if (quote) {
      setQuoteList([...quoteList, quote]);
      setQuote('');
    }
  };

  // Use useEffect to fetch a quote when the component mounts
  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <div>
      <h1>Random Advice Generator</h1>
      <button onClick={fetchRandomQuote}>Fetch Random Quote</button>
      <button onClick={addQuoteToList}>Add to List</button>
      <div>
        <h2>Current Quote:</h2>
        <p>{quote}</p>
      </div>
      <div>
        <h2>List of Fetched Quotes:</h2>
        <ul>
          {quoteList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

