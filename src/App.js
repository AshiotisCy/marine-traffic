import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import { useSelector } from "react-redux";
import { Icon } from "leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setVesselSlice } from "./redux/reducers/vesselSlice";
import Button from "@mui/material/Button";
import PopupBody from "./components/PopupBody";
import HeaderBody from "./components/HeaderBody";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker";
import "./App.css";

function App() {
  const vesselData = useSelector((state) => state.vessel.data);
  const dispatch = useDispatch();
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const apikey = process.env.REACT_APP_API_KEY;
  const day = 5;
  const mmsis = 241486000;
  const periods = "daily";

  const ship = new Icon({
    iconUrl: "./ship.svg",
    iconSize: [30, 30],
  });

  const [queryParams, setQueryParams] = useState({
    days: "",
    mmsi: "",
    period: "",
  });

  const getPositions = () => {
    return { lat: vesselData[0]?.LAT, lng: vesselData[0]?.LON };
  };

  const [latLng, setLatLng] = useState(getPositions());

  console.log("vesselA", vesselData);

  const vesselAPI = async (period, days, mmsi) => {
    try {
      axios
        .get(
          `${apiEndpoint}/${apikey}/v:3/msgtype:extended/period:${
            period !== "" ? period : periods
          }/days:${days !== "" ? days : day}/mmsi:${
            mmsi !== "" ? mmsi : mmsis
          }/protocol:jsono`
        )
        .then((response) => {
          console.log("response", response.data);
          dispatch(setVesselSlice(response.data));
        });
    } catch (error) {
      console.log("API ERROR:", error);
    }
  };

  useEffect(() => {
    // If we want to receive updated values of the vessels in a real life scenario we could use SetInterval to call the API every x amount of time.
    // For the purpose of the exercise we are NOT going to use that. Instead we are going to call the API once when the application loads
    // and later on when one of the query parameters change ex. (day, mmsi, period)
    vesselAPI(queryParams.period, queryParams.days, queryParams.mmsi);
  }, []);

  useEffect(() => {
    const arrayLength = vesselData.length;
    setLatLng({
      lat: vesselData[arrayLength]?.LAT,
      lng: vesselData[arrayLength]?.LON,
    });
  }, [vesselData]);

  const fetchQueryAPI = () => {
    vesselAPI(queryParams.period, queryParams.days, queryParams.mmsi);
  };

  const headerBodyProps = {
    queryParams: queryParams,
    setQueryParams: setQueryParams,
  };

  return (
    <>
      {console.log("params", queryParams)}
      <div className="headerMenu">
        <div className="headerMenuWrapper">
          <HeaderBody {...headerBodyProps} />
          <Button
            size="large"
            variant="contained"
            onClick={() => fetchQueryAPI()}
            style={{ minWidth: "200px", minHeight: "60px" }}
          >
            Submit
          </Button>
        </div>
        <div className="results">
          <span>Results Found: </span>
          <span>{vesselData.length}</span>
        </div>
      </div>
      {vesselData ? (
        <MapContainer center={[35.581384, 21.349695]} zoom={4} minZoom={3}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {vesselData?.map((vessel) => {
            return (
              <Marker
                key={Math.random()}
                position={[vessel?.LAT, vessel?.LON]}
                icon={ship}
              >
                <Popup>
                  <PopupBody {...vessel} />
                </Popup>
              </Marker>
            );
          })}
          <ReactLeafletDriftMarker
            // if position changes, marker will drift its way to new position
            position={[latLng.lat, latLng.lng]}
            // time in ms that marker will take to reach its destination
            duration={5000}
            icon={ship}
          >
            <Popup>Hi this is a popup</Popup>
            <Tooltip>Hi here is a tooltip</Tooltip>
          </ReactLeafletDriftMarker>
        </MapContainer>
      ) : null}
    </>
  );
}

export default App;
