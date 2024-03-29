import React, { useState } from "react";

import { ItemListChars } from "../itemList";
import ItemDetails, { Field } from "../itemDetails";
import ErrorMessage from "../errorMessage";
import RowBlock from "../rowBlock/rowBlock";

import GotService from "../../services/gotService";

const CharacterPage = () => {
  const gotService = new GotService();

  const [selectedChar, updateSelectedChar] = useState(null);

  function onCharSelected(id) {
    updateSelectedChar(id);
  }

  try {
    const characterList = (
      <ItemListChars
        onItemSelected={onCharSelected}
        renderItem={(item) => item.name}
      />
    );

    const characterDetails = (
      <ItemDetails
        itemId={selectedChar}
        getData={gotService.getCharacter}
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
  } catch (error) {
    console.log("error");
    return <ErrorMessage />;
  }
};

export default CharacterPage;
