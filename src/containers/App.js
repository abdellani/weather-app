import React from 'react';
import Form from '../components/form'
import Main from '../components/main'
import SourceCodeButton from "../general/source_code_button"

function App() {
  return (
    <div className="App">
      <SourceCodeButton url="https://github.com/abdellani/weather-app/"/>
      <Form/>
      <Main/>      
    </div>
  );
}

export default App;
