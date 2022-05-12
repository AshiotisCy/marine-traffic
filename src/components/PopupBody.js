import moment from "moment";

const PopupBody = (vessel) => {
  return (
    <div className="vesselInformation">
      <div className="mmsi">
        <span>MMSI: </span>
        <span>{vessel.MMSI}</span>
      </div>
      <div className="vesselId">
        <span>Ship ID: </span>
        <span>{vessel.SHIP_ID}</span>
      </div>
      <div className="imo">
        <span>IMO: </span>
        <span>{vessel.IMO}</span>
      </div>
      <div className="coordinatesWrapper">
        <div className="lon">
          <span>LON: </span>
          <span>{vessel.LON}</span>
        </div>
        <div className="lat">
          <span>LAT: </span>
          <span>{vessel.LAT}</span>
        </div>
      </div>
      <div className="timestamp">
        <span>Vessel Timestamp: </span>
        <span>{moment(vessel.TIMESTAMP).format("DD-MMM-YYYY HH:mm")}</span>
      </div>
    </div>
  );
};

export default PopupBody;
