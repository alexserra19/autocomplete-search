import React from 'react';
import './App.css';
import AutoCompletionSearch from './components/AutoCompletionSearch';


const App = () => {
  return (
    <div className="App">
      <AutoCompletionSearch 
        title={"AutoComplete Search!"}
      />
    </div>
  );
}

export default App;
