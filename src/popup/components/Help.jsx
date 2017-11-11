import React from 'react';
import { List, ListItem } from 'material-ui/List';

const Help = () => (
  <div className="custom-container">
    <h4 className="no-margin">Help</h4>
    <List>
      <ListItem
        primaryTogglesNestedList
        primaryText="Example Text"
        nestedItems={[
          <span>Example nested text.</span>,
        ]}
      />
      <ListItem
        primaryTogglesNestedList
        primaryText="Example Text"
        nestedItems={[
          <span>Example nested text.</span>,
        ]}
      />
      <ListItem
        primaryTogglesNestedList
        primaryText="Example Text"
        nestedItems={[
          <span>Example nested text.</span>,
        ]}
      />
      <ListItem
        primaryTogglesNestedList
        primaryText="Example Text"
        nestedItems={[
          <span>Example nested text.</span>,
        ]}
      />
    </List>
  </div>
);

export default Help;

