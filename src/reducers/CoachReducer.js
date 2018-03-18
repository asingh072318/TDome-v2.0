import { State, Effect } from "jumpstate";
import { Actions } from "jumpstate";
import _ from "lodash";
const currentState = "TodoStateV1";
export default State(currentState, {
  // Initial State should be starts with the key 'initial': ...
  initial: {
    registerCode: 0,
    loginCode: 0,
    loginMessage: "",
    loggedinUser: "",
    registerMessage: "",
    isAdmin: false
  },
  registerAPIdata(state, payload) {
    //console.log("Register API data called", payload);
    var registerMessage = payload.username + " " + payload.message;
    state.registerCode = payload.code;
    state.registerMessage = registerMessage;
    return _.cloneDeep(state);
  },
  loginAPIdata(state, payload) {
    console.log(payload);
    var loginMessage = payload.message;
    state.loginCode = payload.code;
    state.loginMessage = loginMessage;
    state.isAdmin = false;
    if (payload.code === 200) {
      state.loggedinUser = payload.user.username;
      state.isAdmin = payload.user.admin;
    }
    return _.cloneDeep(state);
  }
});
Effect("loginAPI", (requestObject = {}) => {
  fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestObject)
  })
    .then(response => response.json())
    .then(message => {
      Actions.TodoStateV1.loginAPIdata(message);
      // if (message.code === 200) {
      //   this.setState({ loginError: message.message });
      //   if (message.user.admin) browserHistory.push("/admin");
      //   else browserHistory.push("/home");
      // } else this.setState({ loginError: message.message });
    })
    .catch(err => {
      alert("Error sending data to server : " + err.message);
    });
});
Effect("registerAPI", (requestObject = {}) => {
  //console.log("inside register API");
  fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestObject)
  })
    .then(response => response.json())
    .then(message => {
      Actions.TodoStateV1.registerAPIdata(message);
    })
    .catch(err => {
      alert("Error sending data to server : " + err.message);
    });
});
