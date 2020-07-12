import React from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../Header/Header";
import SideLeftBar from "../SideLeft/SideLeft";
import SideRight from "../SideRight/SideRight";
import "./Layout.scss";

const Layout = (props) => {
  return (
    <div>
      <Header />
      <Container fluid>
        <Row>
          <Col
            sm={12}
            lg={{ size: 1 }}
            // className="mcq-sidebar-left-container"
          ></Col>
          <Col sm={12} lg={{ size: 9 }}>
            <div className="mc-heading-main">
              <h2>Welcome to your MCQ test.</h2>
              <span>It won't take long</span>
            </div>
            <Row>
              <Col lg={4} sm={12}>
                <SideLeftBar />
              </Col>
              <Col lg={8} sm={12}>
                {props.children}
              </Col>
            </Row>
          </Col>
          <Col sm={{ size: 12, order: 2 }} lg={{ size: 2, order: 2 }}>
            <SideRight />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Layout;
