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
// Binding the state and actions. These will be available as props to component
const style = {
  height: 300,
  width: 550
};

const newStyle = {
  margin: 12
};

const styles = {
  errorStyle: {
    color: "#FFFFFF"
  },
  underlineStyle: {
    borderColor: "#E4447C"
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
      email: ""
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  cLog = () => {
    console.log("SignUp button was clicked");
  };
  emailValue = e => {
    this.setState({ email: e.target.value });
  };
  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onClick={this.handleClose}
      />
    ];
    return (
      <div className="whole">
        <AppBar
          title="TDome v2.0"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          style={{ backgroundColor: "#FF4282" }}
        />
        <div className="body">
          <Paper style={style} zDepth={4}>
            <div className="outer">
              <div className="leftOuter">1</div>
              <div className="rightOuter">
                <TextField
                  hintText="User ID"
                  hintStyle={styles.errorStyle}
                  underlineStyle={styles.underlineStyle}
                />
                <TextField
                  hintText="Password"
                  hintStyle={styles.errorStyle}
                  underlineStyle={styles.underlineStyle}
                />
                <div>
                  <RaisedButton
                    label="Login"
                    secondary={true}
                    style={newStyle}
                  />
                  <RaisedButton
                    label="Sign Up"
                    secondary={true}
                    style={newStyle}
                    onClick={() => this.handleOpen()}
                  />
                  <Dialog
                    title="Hola motherfucker!"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                  >
                    <div>
                      <TextField
                        hintText="email ID"
                        errorText="This field is required"
                        onChange={event => this.emailValue(event)}
                      />
                      <br />
                      <TextField
                        hintText="Phone Number"
                        errorText="This field is required"
                      />
                      <br />
                      <TextField
                        hintText="Choose Username"
                        errorText="This field is required"
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
