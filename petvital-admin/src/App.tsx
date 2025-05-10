import React, { Suspense } from "react";
// import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
// import ReduxToastr from "react-redux-toastr";

//routing

//localization initialization
import "../src/lang/translations";
import AppNavigator from "./routes/components/AppNavigator";
import MainLayout from "./layouts/main-layout";
import { SyncLoader } from "react-spinners";
import { Provider } from "react-redux";
import store from "./redux/store";
// import LoadingSpinner from "./components/LoadingSpinner";
// import store from "./redux/store";

//Sample Interface types defined here & not used here
//========================================
interface props {
  text: string;
  number: number;
  boolean: boolean;
  voidFunction: () => void;
  returnFunction: () => string;
  paramFunction: (args: string) => string;
  object: {
    property: string;
    id: number;
  };
}
//========================================

const App: React.FC<{}> = () => {
  return (
    // <Provider store={store}>
    <>
      {/* <LoadingSpinner /> */}
      <Provider store={store}>
        <Router>
          <Suspense
            fallback={
              <div className="loading-screen">
                <SyncLoader color="#36d7b7" />
              </div>
            }
          >
            {/* <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
          /> */}
            <MainLayout />
            <AppNavigator />
          </Suspense>
        </Router>
      </Provider>
    </>

    // </Provider>
  );
};

export default App;
