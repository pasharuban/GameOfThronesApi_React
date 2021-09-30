import React, { Component } from "react";

import ItemList from "../itemList";
import ItemDetails, { Field } from "../itemDetails";
import ErrorMessage from "../errorMessage";
import RowBlock from "../rowBlock/rowBlock";

import gotService from "../../services/gotService";

export default class HousePage extends Component {
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

    const housesList = (
      <ItemList
        onItemSelected={this.onCharSelected}
        getData={this.gotService.getAllHouses}
        renderItem={(item) => item.name}
      />
    );
    const housesDetails = (
      <ItemDetails
        itemId={this.state.selectedChar}
        getData={this.gotService.getHouse}
        nameOfItem="house"
      >
        <Field field="name" label="Name" />
        <Field field="region" label="Region" />
        <Field field="words" label="Words" />
        <Field field="titles" label="Titles" />
        <Field field="ancestralWeapons" label="AncestralWeapons" />
      </ItemDetails>
    );

    return (
      <RowBlock itemList={housesList} itemDetails={housesDetails}></RowBlock>
    );
  }
}
