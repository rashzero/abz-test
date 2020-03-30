import React, { useRef } from 'react';
import Header from './Header';
import Main from './Main';

function App() {
  const inputRef = useRef(null);
  const focusRegistration = () => {
    return inputRef.current.focus();
  };
  return (
    <div className="App">
      <Header focusRegistration={focusRegistration} />
      <Main focusRegistration={focusRegistration} inputRef={inputRef} />
    </div>
  );
}

export default App;
