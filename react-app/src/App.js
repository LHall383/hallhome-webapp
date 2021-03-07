import './App.css';

import {
  Alignment,
  Card,
  Elevation,
  Navbar,
  Text,
  Icon,
  H1,
  H4
} from "@blueprintjs/core";
import "@blueprintjs/icons";

function App() {
  return (
    <div className="App bp3-dark">
      <div className="App-header">
        <Navbar fixedToTop="true">
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>The Hall Home</Navbar.Heading>
                <Navbar.Divider />
                <a className="bp3-button bp3-minimal" href="/">
                  <Icon icon="home"></Icon>
                  <Text>Home</Text>
                </a>
            </Navbar.Group>
        </Navbar>
      </div>
      
      <div className="App-body">
        <H1>The Hall Home</H1>

        <div className="card-container">
          <Card elevation={Elevation.TWO}>
            <H4 className="bp3-heading">Nextcloud File Storage</H4>
            <p>
              Nextcloud is a file hosting interface for multiple users to view, store and share files. 
              To log in to our Nextcloud, head on over to <a href="https://cloud.thehallho.me">https://cloud.thehallho.me</a> 
            </p>
          </Card>
        </div>

      </div>

      <footer className="App-footer">
        <div className="App-footer-text">
          Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
