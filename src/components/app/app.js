import React, { Component } from "react";

import { Col, Row, Container } from "reactstrap";

import styled from "styled-components";

import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";
import PageNotFound from "../pageNotFound";

import { BooksItem, BooksPage, CharacterPage, HousesPage } from "../pages";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./app.css";

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
      <Router>
        <div className="app">
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
            <Switch>
              <Route path="/" render={() => <h1>MAIN PAGE</h1>} exact />
              <Route path="/characters" component={CharacterPage} exact />
              <Route path="/books" component={BooksPage} exact />
              <Route
                path="/books/:id"
                render={({ match }) => {
                  const { id } = match.params;
                  return <BooksItem bookId={id} />;
                }}
                exact
              />
              <Route path="/houses" component={HousesPage} exact />
              <Route component={PageNotFound} exact />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}
