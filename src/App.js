import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuote = React.lazy(() => import("./Pages/NewQuote"));
const AllQuotes = React.lazy(() => import("./Pages/AllQuotes"));
const QuoteDetail = React.lazy(() => import("./Pages/QuoteDetail"));
const Layout = React.lazy(() => import("./components/layout/Layout"));
const NotFound = React.lazy(() => import("./Pages/NotFound"));

const App = () => {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default App;
