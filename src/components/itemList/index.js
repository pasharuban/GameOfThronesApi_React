import ItemList from "./itemList";
import WithData from "../withData";
import GotService from "../../services/gotService";

const { getAllCharacters, getAllBooks, getAllHouses } = new GotService();

const ItemListChars = WithData(ItemList, getAllCharacters);
const ItemListBooks = WithData(ItemList, getAllBooks);
const ItemListHouses = WithData(ItemList, getAllHouses);

export { ItemListChars, ItemListBooks, ItemListHouses };
