import React, { Component } from "react";

import { Col, Row, Container } from "reactstrap";

import styled from "styled-components";

import Header from "../header";
import RandomChar from "../randomChar";
import CharacterPage from "../characterPage";
import ErrorMessage from "../errorMessage";

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
    error: false,
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

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
    if (this.state.error) {
      return <ErrorMessage />;
    }

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
          <CharacterPage></CharacterPage>
        </Container>
      </>
    );
  }
}
