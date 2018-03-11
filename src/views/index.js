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

const customContentStyle = {
  width: '35%',
  maxWidth: 'none',
};

const newStyle = {
  margin: 12
};

const styles = {
  errorStyle: {
    color: "#FFFFFF"
  },
  underlineStyle: {
    borderColor: "#FF4282"
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
      <FlatButton label="Cancel" secondary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Submit"
        secondary={true}
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
                    title="Register"
                    actions={actions}
                    modal={true}
                    contentStyle={customContentStyle}
                    open={this.state.open}
                    autoScrollBodyContent={true}
                    titleClassName='title'
                    bodyClassName='dialog'
                  >
                    <div>
                      <TextField
                        hintText="BIT Roll Number"
                        hintStyle={styles.errorStyle}
                        errorText="BE/xxxxx/20xx"
                        underlineStyle={styles.underlineStyle}
                      />
                    <br />
                      <TextField
                        hintText="email ID"
                        hintStyle={styles.errorStyle}
                        //errorText="This field is required"
                        underlineStyle={styles.underlineStyle}
                        onChange={event => this.emailValue(event)}
                      />
                      <br />
                      <TextField
                        hintText="Phone Number"
                        hintStyle={styles.errorStyle}
                        underlineStyle={styles.underlineStyle}
                        //errorText="This field is required"
                      />
                    <br />
                      <TextField
                        hintText="Password"
                        hintStyle={styles.errorStyle}
                        underlineStyle={styles.underlineStyle}
                        //errorText="This field is required"
                      />
                      <br />
                        <TextField
                          hintText="Confirm Password"
                          hintStyle={styles.errorStyle}
                          underlineStyle={styles.underlineStyle}
                          //errorText="This field is required"
                        />
                        <br />
                      <TextField
                        hintText="Choose Username"
                        hintStyle={styles.errorStyle}
                        underlineStyle={styles.underlineStyle}
                        //errorText="This field is required"
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