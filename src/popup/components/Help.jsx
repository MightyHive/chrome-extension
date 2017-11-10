import React from 'react';

const Help = () => (
  <div className="custom-container">
    <h4 className="no-margin">Help</h4>
    <ul className="helpList">
      <li>
          <h3>What do the Tabs Mean?</h3>
          <div>
            <p>Home: this is the overview tab and provides a count of Trackers, Containers, and Network Calls. Those elements are clickable and will take you to the appropriate tab</p>
            <p>Containers: this tab lists the different tag management systems the extension detects, and clicking on the vendor name reveals the container ID</p>
            <p>Network: this tab is divided into Trackers and Network activity. Trackers are network calls that the extension can connect to advertising vendors. Network shows all network calls - including Trackers</p>
            <p>Full Report: this page shows all data from the tabs as well as the redirect path and information on any data layers that are present</p>
            <p>Info: you're on this tab right now! It is your help center</p>
          </div>
      </li>
      <li>
          <h3>I Don't See My Data Layer</h3>
          <div>
            <p>If you're using a tag management system other than Google Tag Manager or Tealium, or if you've renamed the data layer, then the extension will not be able to identify them by default.</p>
            <p>To add a new data layer, click the extension icon, and the View Full Report button. Next, click the "DATA LAYERS" tab, and click the link at the bottom of the page. This will open a new window and present you with a dialog box to enter the name of your custom data layer.</p>
          </div>
      </li>
      <li>
          <h3>How Can I See More Data on the Redirect Path?</h3>
          <div>
            <p>The redirect path can be seen by clicking on the View Full Report button. The redirect path is shown at the top of the Full Report page.</p>
            <p>The circles represent all of the domains that were hit on the way to the current page, and can be hovered over for more information.</p>
          </div>
      </li>

      <li>
          <h3>How Can I See More Data about Trackers?</h3>
          <div>
            <p>Everything on Full Report page is clickable, and will expand to show more information.</p>
            <p>Clicking on a tracker will expand to show all network activity associated with that vendor.</p>
            <p>Clicking on a specific call expands additional information like the HTTP status code of that request, and any query parameters being passed back to the server.</p>
          </div>
      </li>
    </ul>
  </div>
);

export default Help;

