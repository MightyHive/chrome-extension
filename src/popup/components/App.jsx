import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

// Icons
import IconErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import IconHome from 'material-ui/svg-icons/action/home';
import IconTimeline from 'material-ui/svg-icons/action/timeline';
import IconCode from 'material-ui/svg-icons/action/code';
import IconHelpOutline from 'material-ui/svg-icons/action/help-outline';
import IconOpenInNew from 'material-ui/svg-icons/action/open-in-new';

// Components
import Home from './Home';
import Containers from './Containers';
import TrackersAndNetwork from './TrackersAndNetwork/TrackersAndNetwork';
import Help from './Help';

import PopupMenuConfig from '../../config/popup-menu.config';

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
      leftMenuOpen: false,
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

  handleToggle = () => this.setState({ leftMenuOpen: !this.state.leftMenuOpen });

  handleClose = () => this.setState({ leftMenuOpen: false });

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
      <Home tab={tab} select={this.select} />,
      // Experience 2
      <Containers tab={tab} />,
      // Experience 3
      <TrackersAndNetwork tab={tab} />,
      // Experience 4
      <Help />,
    ];

    return (
      <div className="popupApp">
        <header className="popupHeader">
          <AppBar
            title={<img src="/assets/img/logo-v1.png" className="logo" alt="Mighty Hive" />}
            onLeftIconButtonTouchTap={this.handleToggle}
            className="popupHeaderBar"
            zDepth={0}
          />
        </header>
        <main>
          <div className="dashboard">
            <div className="App">
              <Drawer
                docked={false}
                width={200}
                open={this.state.leftMenuOpen}
                onRequestChange={leftMenuOpen => this.setState({ leftMenuOpen })}
                className="leftMenu"
              >
                {PopupMenuConfig.map(item => (
                  <MenuItem>
                    <a onClick={this.handleClose} href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.title} <IconOpenInNew style={{ verticalAlign: 'middle' }} />
                    </a>
                  </MenuItem>
                ))}
                <MenuItem
                  onClick={() => {
                    this.handleClose();
                    this.select(3);
                  }}
                >
                  Help
                </MenuItem>
              </Drawer>
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
                  label="Home"
                  onClick={() => this.select(0)}
                />
                <BottomNavigationItem
                  icon={<IconCode />}
                  label="Containers"
                  onClick={() => this.select(1)}
                />
                <BottomNavigationItem
                  icon={<IconTimeline />}
                  label="Network"
                  onClick={() => this.select(2)}
                />
                <BottomNavigationItem
                  icon={<IconHelpOutline />}
                  label="Info"
                  onClick={() => this.select(3)}
                />
              </BottomNavigation>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
