export default class GotService {
  constructor() {
    this._apiBase = "https://www.anapioficeandfire.com/api";

    this._transformCharacter = this._transformCharacter.bind(this);
  }

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }
    return await res.json();
  }

  async getAllBooks() {
    const res = await this.getResource(`/books/`);
    return res.map(this._transformBook);
  }

  async getBook(id) {
    const book = await this.getResource(`/books/${id}/`);
    return this._transformBook(book);
  }

  async getAllCharacters() {
    const res = await this.getResource(`/characters?page=5&pageSize=10`);
    return res.map(this._transformCharacter);
  }

  async getCharacter(id) {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(character);
  }

  async getAllHouses() {
    const res = await this.getResource(`/houses/`);
    return res.map(this._transformHouse);
  }

  async getHouse(id) {
    const house = this.getResource(`/houses/${id}/`);
    return this._transformHouse(house);
  }

  isSet(data) {
    if (data) {
      return data;
    } else {
      return "NO DATA!";
    }
  }

  setIdForAnyChar(char) {
    return char.url.match(/\d/g).join("");
  }

  _transformCharacter(char) {
    this.setIdForAnyChar(char);
    return {
      id: this.setIdForAnyChar(char),
      name: this.isSet(char.name),
      gender: this.isSet(char.gender),
      born: this.isSet(char.born),
      died: this.isSet(char.died),
      culture: this.isSet(char.culture),
    };
  }

  _transformHouse(house) {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons,
    };
  }

  _transformBook(book) {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publiser: book.publiser,
      released: book.released,
    };
  }
}
