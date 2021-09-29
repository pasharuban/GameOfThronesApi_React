import React, { Component } from "react";

import gotService from "../../services/gotService";
import Spinner from "../spinner/";
import ErrorMessage from "../errorMessage";

import "./charDetails.css";

export default class CharDetails extends Component {
  gotService = new gotService();

  state = {
    char: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.charId !== this.props.charId) this.updateChar();
  }

  onCharDetailsLoaded = (char) => {
    this.setState({
      char,
      loading: false,
    });
  };

  onError() {
    this.setState({
      char: null,
      error: true,
    });
  }

  updateChar() {
    const { charId } = this.props;
    if (!charId) {
      return;
    }

    this.setState({
      loading: true,
    });

    this.gotService
      .getCharacter(charId)
      .then(this.onCharDetailsLoaded)
      .catch(() => this.onError());
  }

  render() {
    const { char, loading, error } = this.state;

    if (!char && error) return <ErrorMessage />;
    else if (!char)
      return <span className="select-error">Please select a character!</span>;

    const { name, gender, born, died, culture } = char;

    if (loading) {
      return (
        <div className="char-details rounded">
          <Spinner />
        </div>
      );
    }

    return (
      <div className="char-details rounded">
        <>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span className="term">Born</span>
              <span>{born}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span className="term">Died</span>
              <span>{died}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span className="term">Culture</span>
              <span>{culture}</span>
            </li>
          </ul>
        </>
      </div>
    );
  }
}
