import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "jumpstate";
import IconButton from "material-ui/IconButton";
import NavigationClose from "material-ui/svg-icons/action/power-settings-new";
import DrawerLogo from "material-ui/svg-icons/hardware/desktop-mac";
import { render } from "react-dom";
import AppBar from "material-ui/AppBar";
import { getCookie, deleteCookie } from "../utils/AppUtils";
import { browserHistory } from "react-router";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import "./scss/admin.scss";
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      open: true,
      user: ""
    };
  }
  logOut = () => {
    deleteCookie("username");
    deleteCookie("admin");
    browserHistory.push("/");
  };
  componentWillMount() {
    this.setState({ user: this.props.coach.loggedinUser });
  }
  rightAppbar = () => {
    return (
      <div className="appBarRight">
        <div style={{ color: "white" }}>
          Welcome, {this.state.user}
        </div>
        <IconButton tooltip="Logout" onClick={() => this.logOut()}>
          <NavigationClose color="white" />
        </IconButton>
      </div>
    );
  };
  render() {
    return (
      <div className="wholeAdmin">
        <div className="drawerAdmin">
          <Drawer open={this.state.open} width="15%">
            <div className="drawerTopAdmin">
              <DrawerLogo style={{ margin: 10 }} color={"white"} />
              <div>Admin Panel</div>
            </div>
            <div>
              <MenuItem>Menu Item</MenuItem>
              <MenuItem>Menu Item 2</MenuItem>
            </div>
          </Drawer>
        </div>
        <div className="bodyAdmin">
          <AppBar
            title="TDome v2.0"
            iconElementRight={this.rightAppbar()}
            showMenuIconButton={false}
            style={{ backgroundColor: "#EA2027" }}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
