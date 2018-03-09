import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "jumpstate";
import { browserHistory } from "react-router";
import "./scss/index.scss";
import AppBar from "material-ui/AppBar";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
const style = {
  height: 300,
  width: 550
};
const but1 = {
  marginTop: 20
};
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  navigateTo = path => {
    this.context.router.push({ pathname: path });
  };
  render() {
    return (
      <div className="whole">
        <AppBar
          title="ThunderDome v2.0"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <div className="body">
          <Paper style={style} zDepth={5}>
            <div className="box">
              <div className="logo">
                <img src={require("./images/logo.png")} width="150px" />
              </div>
              <div className="login">
                <TextField hintText="Username" />
                <TextField hintText="Password" />
                <div className="row">
                  <RaisedButton label="Login" primary={true} style={but1} />
                  <RaisedButton
                    label="Sign Up"
                    primary={true}
                    style={but1}
                    onClick={() => browserHistory.push("/signup")}
                  />
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
