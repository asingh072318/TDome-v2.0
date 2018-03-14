import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "jumpstate";
import "./scss/index.scss";
import { render } from "react-dom";
import AppBar from "material-ui/AppBar";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import { orange500, blue500 } from "material-ui/styles/colors";
import { browserHistory } from "react-router";

// Binding the state and actions. These will be available as props to component
const style = {
  height: 300,
  width: 550
};

const customContentStyle = {
  width: "35%",
  maxWidth: "none"
};

const newStyle = {
  margin: 12
};

const styles = {
  errorStyle: {
    color: "#000000"
  },
  underlineStyle: {
    borderColor: "#7f8c8d"
  },
  floatingLabelStyle: {
    color: orange500
  },
  floatingLabelFocusStyle: {
    color: blue500
  }
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      open: false,
      usernameSignin: "",
      passwordSignin: "",
      rollno: "",
      phone: 0,
      usernameRegister: "",
      passwordRegister: "",
      cpasswordRegister: "",
      emailRegister: "",
      loginError: ""
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  states = (e, value) => {
    if (value === "usernameSignin") {
      this.setState({ usernameSignin: e.target.value });
    } else if (value === "passwordSignin") {
      this.setState({ passwordSignin: e.target.value });
    } else if (value === "rollno") {
      this.setState({ rollno: e.target.value });
    } else if (value === "phone") {
      this.setState({ phone: e.target.value });
    } else if (value === "usernameRegister") {
      this.setState({ usernameRegister: e.target.value });
    } else if (value === "passwordRegister") {
      this.setState({ passwordRegister: e.target.value });
    } else if (value === "cpasswordRegister") {
      this.setState({ cpasswordRegister: e.target.value });
    } else if (value === "emailRegister") {
      this.setState({ emailRegister: e.target.value });
    }
  };
  login = () => {
    let obj = {};
    obj.username = this.state.usernameSignin;
    obj.password = this.state.passwordSignin;
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj)
    })
      .then(response => response.json())
      .then(message => {
        if (message.status === 400) {
          this.setState({ loginError: message.message });
          browserHistory.push("/home");
        } else this.setState({ loginError: message.message });
      })
      .catch(err => {
        alert("Error sending data to server : " + err.message);
      });
  };
  register = () => {
    let obj = {
      username: this.state.usernameRegister,
      password: this.state.passwordRegister,
      cpassword: this.state.cpasswordRegister,
      rollno: this.state.rollno,
      email: this.state.emailRegister,
      phone: this.state.phone
    };
    console.log(obj);
    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj)
    })
      .then(response => response.json())
      .then(message => {
        console.log("register response ", message);
      })
      .catch(err => {
        alert("Error sending data to server : " + err.message);
      });
  };
  render() {
    const actions = [
      <RaisedButton
        label="Submit"
        labelColor="#FFFFFF"
        //primary={true}
        backgroundColor="#EA2027"
        style={newStyle}
        onClick={() => this.register()}
      />,
      <RaisedButton
        label="Cancel"
        labelColor="#FFFFFF"
        //primary={true}
        backgroundColor="#EA2027"
        onClick={() => this.handleClose()}
      />
    ];
    return (
      <div className="whole">
        <AppBar
          title="TDome v2.0"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          style={{ backgroundColor: "#EA2027" }}
        />
        <div className="body">
          <Paper style={style} zDepth={4}>
            <div className="outer">
              <div className="leftOuter">1</div>
              <div className="rightOuter">
                <TextField
                  hintText="Username"
                  hintStyle={styles.errorStyle}
                  underlineStyle={styles.underlineStyle}
                  onChange={event => this.states(event, "usernameSignin")}
                />
                <TextField
                  hintText="Password"
                  hintStyle={styles.errorStyle}
                  underlineStyle={styles.underlineStyle}
                  type="password"
                  onChange={event => this.states(event, "passwordSignin")}
                />
                <div style={{ color: "red", fontSize: 14 }}>
                  {this.state.loginError}
                </div>
                <div>
                  <RaisedButton
                    label="Login"
                    labelColor="#FFFFFF"
                    //primary={true}
                    style={newStyle}
                    backgroundColor="#EA2027"
                    onClick={() => this.login()}
                  />
                  <RaisedButton
                    label="Sign Up"
                    labelColor="#FFFFFF"
                    //primary={true}
                    style={newStyle}
                    backgroundColor="#EA2027"
                    onClick={() => this.handleOpen()}
                  />
                  <Dialog
                    title="Register"
                    actions={actions}
                    modal={true}
                    contentStyle={customContentStyle}
                    open={this.state.open}
                    autoScrollBodyContent={true}
                    titleClassName="title"
                    bodyClassName="dialog"
                    contentClassName="dialog"
                    actionsContainerClassName="register"
                  >
                    <div>
                      <TextField
                        hintText="Full Name"
                        hintStyle={styles.errorStyle}
                        underlineStyle={styles.underlineStyle}
                        fullWidth={true}
                      />
                      <br />
                      <TextField
                        hintText="BIT Roll Number"
                        hintStyle={styles.errorStyle}
                        errorText="BE/xxxxx/20xx"
                        underlineStyle={styles.underlineStyle}
                        onChange={event => this.states(event, "rollno")}
                        fullWidth={true}
                      />
                      <br />
                      <TextField
                        hintText="Email ID"
                        hintStyle={styles.errorStyle}
                        //errorText="This field is required"
                        underlineStyle={styles.underlineStyle}
                        fullWidth={true}
                        onChange={event => this.states(event, "emailRegister")}
                      />
                      <br />
                      <TextField
                        hintText="Username"
                        hintStyle={styles.errorStyle}
                        underlineStyle={styles.underlineStyle}
                        fullWidth={true}
                        //errorText="This field is required"
                        onChange={event =>
                          this.states(event, "usernameRegister")}
                      />
                      <br />
                      <TextField
                        hintText="Password"
                        hintStyle={styles.errorStyle}
                        underlineStyle={styles.underlineStyle}
                        type="password"
                        fullWidth={true}
                        //errorText="This field is required"
                        onChange={event =>
                          this.states(event, "passwordRegister")}
                      />
                      <br />
                      <TextField
                        hintText="Confirm Password"
                        hintStyle={styles.errorStyle}
                        underlineStyle={styles.underlineStyle}
                        type="password"
                        fullWidth={true}
                        onChange={event =>
                          this.states(event, "cpasswordRegister")}
                        //errorText="This field is required"
                      />
                      <br />
                      <TextField
                        hintText="Phone Number"
                        hintStyle={styles.errorStyle}
                        underlineStyle={styles.underlineStyle}
                        fullWidth={true}
                        //errorText="This field is required"
                        onChange={event => this.states(event, "phone")}
                      />
                      <br />
                    </div>
                  </Dialog>
                </div>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    coach: state.coach
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
