import React from "react";
import { NavLink as Link } from "react-router-dom";
import { connect } from "react-redux";

const NavItem = ({ path, fontAwesomeClassName, menuExpanded, text }) => {
  return (
    <Link className="NavItem" to={path} activeClassName="active" exact>
      <div>
        <i className={fontAwesomeClassName}></i>
        {menuExpanded ? <p>{text}</p> : null}
      </div>
    </Link>
  );
};
const mapStateToProps = state => {
  return {
    menuExpanded: state.settings.menuExpanded
  };
};
export default connect(
  mapStateToProps,
  {}
)(NavItem);
