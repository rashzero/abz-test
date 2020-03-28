import React from 'react';
import Header from './Header';
import Main from './Main';

function App() {
  const textInput = React.createRef();

  const focusRegistration = () => {
    textInput.current.focus();
  }
  
  return (
    <div className="App">
      <Header focusRegistration={focusRegistration} />
      <Main focusRegistration={focusRegistration} textInput={textInput} />
    </div>
  );
}

export default App;
