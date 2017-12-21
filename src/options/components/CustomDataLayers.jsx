import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import ChipInput from 'material-ui-chip-input';

import * as chromeUtils from '../../chrome.utils';

export default class App extends Component {
  static propTypes = {
    getFromStorage: PropTypes.func.isRequired,
    saveToStorage: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      customDataLayers: [],
      chipErrorMessage: undefined,
      isChanged: false,
    };
    this.saveDataLayers = this.saveDataLayers.bind(this);
  }

  componentDidMount() {
    chromeUtils.getFromStorage('customLayerList')
    .then((data) => {
      if (data && data.customLayerList) {
        this.setState({
          customDataLayers: data.customLayerList.map(({ key }) => key),
        });
      }
    })
    .catch(e => console.error('Error getting customLayerList: ', e));
  }

  addCustomDataLayer(layer) {
    const isValid = this.validateInput(layer);

    if (isValid) {
      this.setState({
        customDataLayers: this.state.customDataLayers.concat([layer]),
        isChanged: true,
      });
    } else {
      this.setState({
        chipErrorMessage: 'Invalid variable name',
      });
    }
  }

  deleteCustomDataLayer(index) {
    if (typeof index === 'number' && this.state.customDataLayers[index]) {
      // Copy the array and cut out the index
      const newLayers = this.state.customDataLayers.slice();
      newLayers.splice(index, 1);

      this.setState({
        customDataLayers: newLayers,
        isChanged: true,
      });
    }
  }

  validateInput(input) {
    const validVariableName = new RegExp(/^[a-zA-Z_$][a-zA-Z_$0-9]*$/);

    return validVariableName.test(input);
  }

  saveDataLayers() {
    chromeUtils.saveToStorage({
      customLayerList: this.state.customDataLayers.map((key) => {
        return { key, type: 'userDefined' };
      }),
    })
    .then(() => {
      this.setState({
        isChanged: false,
      });
    })
    .catch();
  }

  render() {
    return (
      <div>
        <p>
          To track a custom named data layer variable, type in the name and hit the "Enter" or "Return" key to add it to the list. <br /><br />
          Then, click "Save" and refresh the page you'd like to inspect. Pull the "Full Report" to view the contents of the newly added data layer. You're all set!
        </p>
        <ChipInput
          value={this.state.customDataLayers}
          onRequestAdd={layer => this.addCustomDataLayer(layer)}
          onRequestDelete={(layer, index) => this.deleteCustomDataLayer(index)}
          newChipKeyCodes={[13, 9]} // Enter, Tab
          errorText={this.state.chipErrorMessage}
        />
        <div style={{ marginTop: '20px' }}>
          <RaisedButton
            label="Save"
            onClick={this.saveDataLayers}
            disabled={!this.state.isChanged}
            primary
          />
        </div>
      </div>
    );
  }
}
