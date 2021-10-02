import React, { Component } from "react";
import gotService from "../../services/gotService";
import ItemDetails, { Field } from "../itemDetails";
import { Link } from "react-router-dom";

import arrowBackUrl from "../img/back-arrow.png";

export default class BooksItem extends Component {
  gotService = new gotService();

  render() {
    return (
      <ItemDetails
        itemId={this.props.bookId}
        getData={this.gotService.getBook}
      >
        <Link to="/books/">
          <img src={arrowBackUrl} alt="back" />
        </Link>

        <Field field="numberOfPages" label="Number of pages" />
        <Field field="publisher" label="Publisher" />
        <Field field="released" label="Released" />
      </ItemDetails>
    );
  }
}
