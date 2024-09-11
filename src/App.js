import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import PageFilters from './view/pageFilters/PageFilters';
import ViewWord from './view/viewWord/ViewWord';
import Profile from './view/profile/Profile';
import SignIn from './view/signin/SignIn';
import SignUp from './view/signup/SignUp';
import Paid from './view/paid/Paid.jsx';
import SendPay from './view/sendPay/SendPay.jsx';

function App() {

  const [isReadyForInstall, setIsReadyForInstall] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
    // Prevent the mini-infobar from appearing on mobile.

    //el eventprevent es para que cargue solo
    event.preventDefault();
    // console.log("👍", "beforeinstallprompt", event);
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Remove the 'hidden' className from the install button    ainer.
    setIsReadyForInstall(true);
    });
  }, []);

  async function downloadPwa(){
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
    // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.

    //el prompt solo puede ser escuchado una vez por sesión para no saturar con llamadas "descargame"
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    setIsReadyForInstall(false);
  }

  return (

    
    <div className="App">
      <div>
        {isReadyForInstall && 
          // <a  id="descargar" onClick={downloadPwa} href="/"><b>Descargar App</b></a>
          <button onClick={downloadPwa} align="center">Descargar biblioteca digital</button>
        }
      </div>
      <Routes>
        <Route path='/' element={<SignIn />}/>
        <Route path='/pageFilters' element={<PageFilters />}/>
        <Route path='/viewWord/:id' element={<ViewWord />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/SignUp' element={<SignUp />}/>
        <Route path='/paid' element={<Paid />}/>
        <Route path='/sendpay' element={<SendPay />}/>
      </Routes>
    </div>
  );
}

export default App;
