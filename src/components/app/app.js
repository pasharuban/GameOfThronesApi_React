import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import styled from "styled-components";

const ButtonForRandomChar = styled.button`
  width: 120px;
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: white;
  background-color: teal;
  border: 1px solid black;
  border-radius: 2px;
  margin-bottom: 10px;
`;

export default class App extends Component {
  state = {
    showRandomChar: true,
    buttonText: "Hide",
  };

  onRandomChar = () => {
    this.setState(({ showRandomChar }) => {
      const buttonText = showRandomChar ? "Show" : "Hide";
      return {
        showRandomChar: !showRandomChar,
        buttonText: buttonText,
      };
    });
  };

  render() {
    const elem = this.state.showRandomChar ? <RandomChar /> : null;
    return (
      <>
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{ size: 5, offset: 0 }}>
              <div className="random-char-section">
                <ButtonForRandomChar onClick={this.onRandomChar}>
                  {this.state.buttonText}
                </ButtonForRandomChar>
                {elem}
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <ItemList />
            </Col>
            <Col md="6">
              <CharDetails />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
