import NetworkCallConfig from '../../../config/network-call.config';

/**
 * Parses tracker array to make it suitable for download, appending tracker
 * metadata and removing internal Chrome properties from the tracker network calls.
 * @param {array} trackers - List of individual trackers with their standard properties.
 */
export function parseTrackers(trackers) {
  return Object.keys(trackers).map((trackerId) => {
    const trackerCalls = trackers[trackerId];
    const trackerData = NetworkCallConfig.trackerData[trackerId];

    return {
      id: trackerId,
      displayName: trackerData.displayName,
      trackerCalls: trackerCalls.map(tracker =>
        ({
          url: tracker.url,
          method: tracker.data.method,
          status: tracker.data.statusCode,
          type: tracker.data.type,
          timeStamp: tracker.data.timeStamp,
        }),
      ),
    };
  });
}

/**
 * Flattens a tracker array to allow for a clean CSV format.
 * @param {array} trackers - List of individual trackers with their standard properties.
 */
export function flattenForCSV(trackers) {
  const result = [];

  trackers.forEach((tracker) => {
    const trackerData = NetworkCallConfig.trackerData[tracker.id];

    tracker.trackerCalls.forEach((trackerCall) => {
      result.push({
        trackerId: tracker.id,
        displayName: trackerData.displayName,
        url: trackerCall.url,
        method: trackerCall.method,
        status: trackerCall.status,
        type: trackerCall.type,
        timeStamp: trackerCall.timeStamp,
      });
    });
  });
  console.log(result);
  return result;
}
