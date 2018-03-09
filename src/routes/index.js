import React from "react";
import { Route, IndexRoute } from "react-router";
import CoreLayout from "../layouts/CoreLayout/CoreLayout";
import Index from "../views/index.js";
import Signup from "../views/signup.js";
import * as utils from "../utils/AppUtils";

// bind the view components to appropriate URL path
export default store =>
  <div>
    <Route path="/" component={CoreLayout}>
      <IndexRoute component={Index} />
      <Route path="/signup" component={Signup} />
    </Route>
  </div>;
