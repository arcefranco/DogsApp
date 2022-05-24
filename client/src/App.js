//import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home';
import Main from './components/Main';
import Detail from './components/Detail';
import Form from './components/Form';

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' render={()=><Home/>}/>
      <Route exact path='/main' render={()=><Main/>}/>
      <Route exact path={'/dog/:id'} render={({match})=><Detail match={match}/>} />
      <Route exact path={'/form'} render={()=><Form/>}/>
    </BrowserRouter>
  );
}

export default App;
