import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import CircularProgress from 'material-ui/CircularProgress';
import IconErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import * as url from 'url';

// Components
import NavigationPath from './NavigationPath';
import Trackers from './Trackers/Trackers';
import Containers from './Containers/Containers';
import DataLayers from './DataLayers/DataLayers';
import Network from './Network/Network';

export default class App extends Component {
  static propTypes = {
    tabConnection: PropTypes.func.isRequired,
    tabId: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      tab: undefined,
      loading: true,
      successfulLoad: false,
      menuSelectedIndex: 0,
    };
  }

  componentDidMount() {
    const { tabConnection, tabId } = this.props;

    try {
      tabConnection(tabId, (message, disconnect) => {
        if (message.navigationChange) {
          disconnect();
          return;
        }

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

    const parsedUrl = url.parse(tab.navigationPath.final.url || tab.navigationPath.initial.url);
    const pathname = parsedUrl.pathname === '/' ? '' : parsedUrl.pathname;

    return (
      <div className="reportApp">
        <div className="heroContainer">
          <div className="hero">
            <h3 className="reportTitle">Full report</h3>
            <h5 className="reportUrl">{parsedUrl.host + pathname}</h5>
          </div>
        </div>
        <NavigationPath navigationPath={tab.navigationPath} />
        <Tabs className="dashboard">
          <Tab label="Trackers" className="reportTab">
            <Trackers
              trackers={tab.trackers}
              trackerCount={tab.trackerCount}
              network={tab.networkCalls}
            />
          </Tab>
          <Tab label="Containers" className="reportTab">
            <Containers
              containers={tab.containers}
            />
          </Tab>
          <Tab label="Data Layers" className="reportTab">
            <DataLayers layers={tab.dataLayers} />
          </Tab>
          <Tab label="Network Activity" className="reportTab">
            <Network
              currentURL={tab.currentURL}
              network={tab.networkCalls}
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
