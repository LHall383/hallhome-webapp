import {
  Button,
  H1,
} from "@blueprintjs/core";
import "@blueprintjs/icons";

const spotify_user_login = function() {
  console.log('login');
}

export default function MusicAnalysis() {
  return (
    <div>
      <div className="App-body-title">
        <H1>Spotify Music Analysis</H1>
      </div>

      <Button icon="log-in" onClick={spotify_user_login}>Login</Button>

    </div>
  )
}