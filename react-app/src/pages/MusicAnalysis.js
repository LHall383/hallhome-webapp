import "./MusicAnalysis.scss";

import * as React from "react";

import { Button, H1, InputGroup, Text } from "@blueprintjs/core";
import "@blueprintjs/icons";

import axios from "axios";
if (process.env.NODE_ENV === 'production') { 
  axios.defaults.baseURL = "https://thehallho.me/api";
}else if(process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = "http://localhost:3001/";
}

export default class MusicAnalysis extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      spotifyUsername: "",
      publicUserData: {},
      publicUserDataValid: false,
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    this.setState({publicUserDataValid: false});
  }

  handleUsernameEdit = (event) => {
    this.setState({spotifyUsername: event.target.value});
  }

  handleGetPublicUserData = () => {
    console.log('get username: ' + this.state.spotifyUsername);

    //axios get to backend with param username set to spotifyUsername
    axios({
      method: 'get',
      url: '/user-public',
      params: {
        username: this.state.spotifyUsername
      },
      responseType: 'json'
    })
    .then((response) => {
      console.log(response.data);
      if(response.data){
        this.setState({publicUserData: response.data, publicUserDataValid: true});
      }
    })
    .catch((error) => {
      console.log(error);
      this.setState({publicUserData: {}, publicUserDataValid: false});
    });
  }

  render() {
    return (
      <div>
        <div className="App-body-title">
          <H1>Spotify Music Analysis</H1>
        </div>

        {/* <Button icon="log-in" onClick={()=>{}}>Login</Button> */}

        <div className="input-with-button">
          <InputGroup leftIcon="user" placeholder="Spotify Username" value={this.state.spotifyUsername} onChange={this.handleUsernameEdit}></InputGroup> {/* spotify username: 12100501122*/}
          <Button icon="import" onClick={this.handleGetPublicUserData}>Get Public User Data</Button>
        </div>

        {this.state.publicUserDataValid && this.state.publicUserData &&
          <div>
            {/* <Text>{JSON.stringify(this.state.publicUserData)}</Text> */}
            {this.state.publicUserData.images.length > 0 && <img src={this.state.publicUserData.images[0].url} alt={"Profile picture for"+this.state.publicUserData.display_name} height="250"></img>}
            <Text>{this.state.publicUserData.display_name} - {this.state.publicUserData.followers.total} follower(s)</Text>
            <a href={this.state.publicUserData.external_urls.spotify}>{this.state.publicUserData.external_urls.spotify}</a>
          </div>
        }

      </div>
    );
  }
}