import React, { Component } from "react";

import ItemList from "../itemList";
import ItemDetails, { Field } from "../itemDetails";
import ErrorMessage from "../errorMessage";
import RowBlock from "../rowBlock/rowBlock";

import gotService from "../../services/gotService";

export default class BooksPage extends Component {
  gotService = new gotService();

  state = {
    selectedChar: null,
    error: false,
  };

  onCharSelected = (id) => {
    this.setState({
      selectedChar: id,
    });
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onCharSelected}
        getData={this.gotService.getAllBooks}
        renderItem={(item) => item.name}
      />
    );
    const charDetails = (
      <ItemDetails
        itemId={this.state.selectedChar}
        getData={this.gotService.getBook}
        nameOfItem="book"
      >
        <Field field="name" label="Name" />
        <Field field="numberOfPages" label="NumberOfPages" />
        <Field field="publisher" label="Publisher" />
        <Field field="titles" label="Titles" />
        <Field field="released" label="Released" />
      </ItemDetails>
    );

    return <RowBlock itemList={itemList} itemDetails={charDetails}></RowBlock>;
  }
}
