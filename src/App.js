import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { setVesselSlice } from "./redux/reducers/vesselSlice";
import Button from "@mui/material/Button";
import HeaderBody from "./components/HeaderBody";
import Cluster from "./components/Cluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import "./App.css";

function App() {
  const vesselData = useSelector((state) => state.vessel.data);
  const dispatch = useDispatch();
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const apikey = process.env.REACT_APP_API_KEY;
  const day = 5;
  const mmsis = 241486000;
  const periods = "daily";

  const [queryParams, setQueryParams] = useState({
    days: "",
    mmsi: "",
    period: "",
  });

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

  const fetchQueryAPI = () => {
    vesselAPI(queryParams.period, queryParams.days, queryParams.mmsi);
  };

  const headerBodyProps = {
    queryParams: queryParams,
    setQueryParams: setQueryParams,
  };

  return (
    <>
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
          <Cluster />
        </MapContainer>
      ) : null}
    </>
  );
}

export default App;
