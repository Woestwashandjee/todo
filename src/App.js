import React, { Component } from 'react';
import "./main.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: []
    };
  }

  //local storage aanmaken
  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // slaat staat van app op in localstorage
    // als gebruiker pagina verlaat of refresht
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // slaat op als er kans is van unmount
    this.saveStateToLocalStorage();
  }
 // vergelijkt state met local. 
  hydrateStateWithLocalStorage() {
    // voor alle items in state 
    for (let key in this.state) {
      // als de key in local storage staat
      if (localStorage.hasOwnProperty(key)) {
        // haal key uit local storage
        let value = localStorage.getItem(key);

        // set state van local storage
        try {
          value = JSON.parse(value);
		  // haalt key en value uit json
          this.setState({ [key]: value });
        } catch (e) {
          // als er een empty string wordt opgeven error handeling ;) 
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // voor elk item in state sla op in local storage 
    for (let key in this.state) {
      // slaat op in locale opslag
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  updateInput(key, value) {
    // update react state
    this.setState({ [key]: value });
  }

  addItem() {
    // genereren van uniqueID vond ik wel een leuke manier 
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
 
    };

    // kopiert huidige lijst van items 
    const list = [...this.state.list];

    // toevoegen new item
    list.push(newItem);

    //  update van state met de nieuwe lijst en reset van newitem zodat ik weer iets kan inputten
    this.setState({
      list,
      newItem: ""
    });
  }

  deleteItem(id) {
    // copied  huidige  lijst van items 
    const list = [...this.state.list];
    // haalt het juiste id er uit 
    const updatedList = list.filter(item => item.id !== id);
	//het updaten van de lijst zodat het item eruit gaat
    this.setState({ list: updatedList });
  }
  
  render() {
    return (
      <body>
      <div>

      <h1 className="app-title">Mijn todo lijst</h1>
        
        <div className="container">
        <div
		/* snel nog even gemaakt hoor */
          style={{
            padding: 30,
            textAlign: "left",
            maxWidth: 500,
            margin: "auto"
          }}
        >
          Voeg item toe. 
          <br />
          <input
            type="text"
            placeholder="Type hier je item"
            value={this.state.newItem}
            onChange={e => this.updateInput("newItem", e.target.value)}
          />
          <button id
            className="add-btn btn-floating"
            onClick={() => this.addItem()}
            disabled={!this.state.newItem.length}
          >
            <i class="material-icons"> + </i>
          </button>
          <br /> <br />
          <ul>
            {this.state.list.map(item => {
              return (
                <li key={item.id}>
                  {item.value}
                  <button className="btn btn-floating" onClick={() => this.deleteItem(item.id)}>
                    <i class="material-icons">x</i>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      </div>
      </body>
    );
  }
}



export default App;