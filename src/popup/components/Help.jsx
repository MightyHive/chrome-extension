import React from 'react';
import { List, ListItem } from 'material-ui/List';

const Help = () => (
  <div className="custom-container">
    <h4 className="no-margin">Help</h4>
    <List>
      <ListItem
        primaryTogglesNestedList
        primaryText="I Don't See My Data Layer. How can I add it?"
        nestedItems={[
          <span>If you're using a tag management system other than Google Tag Manager or Tealium, or if you've renamed the data layer, then the extension will not be able to identify them by default. To add a new data layer, click the View Full Report button. Next, click the "DATA LAYERS" tab, and click the link at the bottom of the page. This will open a new window and present you with a dialog box to enter the name of your custom data layer.</span>,
        ]}
      />
      <ListItem
        primaryTogglesNestedList
        primaryText="How Can I See More Data about Trackers?"
        nestedItems={[
          <span>Everything on Full Report page is clickable, and will expand to show more information. Clicking on a tracker will expand to show all network activity associated with that vendor. Clicking on a specific call expands additional information like the HTTP status code of that request, and any query parameters being passed back to the server.</span>,
        ]}
      />
      <ListItem
        primaryTogglesNestedList
        primaryText="How Do I Access Details For The Redirect Path In The Full Report?"
        nestedItems={[
          <span>The redirect path can be seen by clicking on the View Full Report button. The redirect path is shown at the top of the Full Report page. The circles represent all of the domains that were hit on the way to the current page, and can be hovered over for more information.</span>,
        ]}
      />
      <ListItem
        primaryTogglesNestedList
        primaryText="Is this project open source?"
        nestedItems={[
          <span>It is! Our code is available under open-source licenses that can be found on <a href="https://github.com/MightyHive/chrome-extension" target="_blank">GitHub</a>.</span>,
        ]}
      />
    </List>
  </div>
);

export default Help;
