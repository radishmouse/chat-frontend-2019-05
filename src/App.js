import React from 'react';
import axios from 'axios';
import ChatList from './ChatList';
import ChatForm from './ChatForm';
import qs from 'qs';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      text: ''
    };  }

  componentDidMount() {

    // setInterval(async () => {
    //   const {data} = await axios.get('/api');
    //   // console.log(data);
    //   this.setState({
    //     messages: data
    //   });
    // }, 2000);
    // const { host } = window.location;
    const url = `ws://localhost:31337/ws`;  // Sadly, the react proxy not playing well with websockets
    this.connection = new WebSocket(url);

    this.connection.onmessage = (e) => {
      console.log(e);
      console.log(e.data);
      this.setState({
        messages: JSON.parse(e.data)
      });      
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Chat App</h1>
        <ChatList messages={this.state.messages}/>
        <ChatForm 
          text={this.state.text}
          handleChange={this._setText}
          handleSend={this._sendMessage}
        />
      </div>
    );
  }

  _setText = (text) => {
    console.log('App _setText got called');
    this.setState({
      text
    });
  }

  _sendMessage = async () => {    
    console.log('App _sendMessage got called');
    this.connection.send(JSON.stringify({message: this.state.text}));
    // await axios({
    //   method: 'post',
    //   url: '/api',
    //   data: qs.stringify({
    //     message: this.state.text
    //   }), 
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // });
    this.setState({
      text: ''
    })
  }
}


export default App;
