import "./Header.scss";
import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
  NavItem,
  NavLink,
} from "reactstrap";
import ReactAvatar from "react-avatar";
import { IoIosPaper } from "react-icons/io";
import { useUser } from "../../utils/helper";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const user = useUser();

  return (
    <div>
      <Navbar expand="md" className="mcq-header" dark>
        <NavbarBrand href="/">
          <IoIosPaper size={42} />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse
          isOpen={isOpen}
          navbar
          className="mcq-header__collapsible"
          color="white"
        >
          <Nav className="mr-auto" navbar color="green">
            {/* <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem> */}
          </Nav>
          <NavbarText>
            <ReactAvatar round size={42} name={user.username} />
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
