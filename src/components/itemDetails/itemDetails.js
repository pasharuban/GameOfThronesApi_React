import React, { Component } from "react";

import gotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

import "./itemDetails.css";

const Field = ({ item, field, label }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export { Field };

export default class ItemDetails extends Component {
  gotService = new gotService();

  state = {
    item: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.itemId !== this.props.itemId) this.updateItem();
  }

  onCharDetailsLoaded = (item) => {
    this.setState({
      item,
      loading: false,
    });
  };

  onError() {
    this.setState({
      item: null,
      error: true,
    });
  }

  updateItem() {
    const { itemId } = this.props;
    if (!itemId) {
      return;
    }

    this.setState({
      loading: true,
    });

    const { getData } = this.props;

    getData(itemId)
      .then(this.onCharDetailsLoaded)
      .catch(() => this.onError());
  }

  render() {
    const { item, loading, error } = this.state;

    if (!item && error) return <ErrorMessage />;
    else if (!item)
      return (
        <span className="select-error">
          Please select a {this.props.nameOfItem}!
        </span>
      );

    const { name } = item;

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
            {React.Children.map(this.props.children, (child) => {
              return React.cloneElement(child, { item });
            })}
          </ul>
        </>
      </div>
    );
  }
}

ItemDetails.defaultProps = {
  nameOfItem: "item",
};
