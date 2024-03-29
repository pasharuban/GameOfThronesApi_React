import React, { Component } from "react";

import { ItemListChars } from "../itemList";
import ItemDetails, { Field } from "../itemDetails";
import ErrorMessage from "../errorMessage";
import RowBlock from "../rowBlock/rowBlock";

import gotService from "../../services/gotService";

export default class CharacterPage extends Component {
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

    const characterList = (
      <ItemListChars
        onItemSelected={this.onCharSelected}
        renderItem={(item) => item.name}
      />
    );

    const characterDetails = (
      <ItemDetails
        itemId={this.state.selectedChar}
        getData={this.gotService.getCharacter}
        nameOfItem="character"
      >
        <Field field="name" label="Name" />
        <Field field="gender" label="Gender" />
        <Field field="born" label="Born" />
        <Field field="died" label="Died" />
        <Field field="culture" label="Culture" />
      </ItemDetails>
    );

    return (
      <RowBlock
        itemList={characterList}
        itemDetails={characterDetails}
      ></RowBlock>
    );
  }
}
