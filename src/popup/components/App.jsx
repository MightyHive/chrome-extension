import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import IconErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import IconHome from 'material-ui/svg-icons/action/home';
import IconTimeline from 'material-ui/svg-icons/action/timeline';
import IconCode from 'material-ui/svg-icons/action/code';

// Components
import Home from './Home';
import DataLayers from './DataLayers';
import Containers from './Containers';
import TrackersAndNetwork from './TrackersAndNetwork/TrackersAndNetwork';

class App extends Component {
  static propTypes = {
    activeTabConnection: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      tab: undefined,
      loading: true,
      successfulLoad: false,
      menuSelectedIndex: 0,
    };
    this.openReport = this.openReport.bind(this);
  }

  componentDidMount() {
    try {
      this.props.activeTabConnection((message) => {
        if (message.data && !message.error) {
          this.setState({
            tab: message.data,
            successfulLoad: true,
            loading: false,
          });
        }

        if (message.error) {
          this.setState({
            successfulLoad: false,
            loading: false,
          });
        }
      });
    } catch (e) {
      console.error('Error initiating UI: ', e);
      this.setState({
        successfulLoad: false,
        loading: false,
      });
    }
  }

  openReport() {
    chrome.tabs.create({ url: `/full-report.html?id=${this.state.tab.tabId}` });
  }

  select = index => this.setState({ menuSelectedIndex: index });

  render() {
    const { loading, successfulLoad, tab } = this.state;
    if (loading) {
      return (
        <div className="center mainView">
          <CircularProgress size={80} />
        </div>
      );
    }

    if (!successfulLoad || !tab) {
      return (
        <div className="errorLoading">
          <IconErrorOutline style={{ height: '48px', width: '48px' }} />
          <h5>
            Unable to load site data.
          </h5>
          <p>So sorry. Try refreshing the page.</p>
        </div>
      );
    }

    const views = [
      // Experience 1
      <Home tab={tab} />,
      // Experience 2
      <Containers tab={tab} />,
      // Experience 3
      <TrackersAndNetwork tab={tab} />,
    ];

    return (
      <div className="App">
        <div className="mainView">
          {views[this.state.menuSelectedIndex]}
        </div>
        <RaisedButton
          label="View Full Report"
          backgroundColor="#183063"
          labelColor="#ffb50b"
          fullWidth
          onClick={this.openReport}
          labelStyle={{ fontFamily: 'Roboto Bold' }}
          style={{ marginTop: '20px' }}
        />
        <BottomNavigation
          selectedIndex={this.state.menuSelectedIndex}
          className="bottomNavigation"
        >
          <BottomNavigationItem
            icon={<IconHome />}
            onClick={() => this.select(0)}
          />
          <BottomNavigationItem
            icon={<IconCode />}
            onClick={() => this.select(1)}
          />
          <BottomNavigationItem
            icon={<IconTimeline />}
            onClick={() => this.select(2)}
          />
        </BottomNavigation>
      </div>
    );
  }
}

export default App;
