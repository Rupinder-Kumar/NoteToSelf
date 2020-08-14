import React, { Component } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { bake_cookie, read_cookie, delete_cookie } from "sfcookies";
import Note from "./Note";

const cookie_key = "NOTES";

class App extends Component {
  constructor() {
    super();

    this.state = {
      text: "",
      notes: [],
    };
  }

  componentDidMount() {
      this.setState({notes: read_cookie(cookie_key)});
  }

  submit() {
    const {notes, text} = this.state;
    notes.push({text});
    this.setState({ notes });
    bake_cookie(cookie_key, this.state.notes)
  }

  clear() {
      delete_cookie(cookie_key);
      this.setState({notes: []})
  }

  render() {
    return (
      <div>
        <h2>Note to Self</h2>
        <Form inline>
          <FormControl
            onChange={(e) => this.setState({ text: e.target.value })}
          />{" "}
          <Button onClick={() => this.submit()}>Submit</Button>
        </Form>
        {this.state.notes.map((note, index) => {
            return(
                <Note key={index} note={note.text}/>
        )})}
        <hr/>
        <Button onClick={() => this.clear()}>Clear Notes</Button>
      </div>
    );
  }
}

export default App;
