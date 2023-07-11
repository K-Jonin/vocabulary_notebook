import "./style.scss"
import Header from "./components/header/Header";
import Folders from "./pages/folder/Folders";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { constants } from "./utils/constants/constants";
import NotFound from "./pages/error/NotFound";
import Vocabularies from "./pages/vocabulary/Vocabularies";
import Error from "./pages/error/Error";
import "./utils/stringUtility";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Switch>
          <Route exact path="/">
            <a href={constants.PATH_FOLDERS}>フォルダへ</a>
          </Route>
          <Route exact path={constants.PATH_FOLDERS}>
            <Folders />
          </Route>
          <Route path={constants.PATH_VOCABULARIES}>
            <Vocabularies />
          </Route>
          <Route path={constants.PATH_ERROR_PAGE}>
            <Error />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
