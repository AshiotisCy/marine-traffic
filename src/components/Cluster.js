import MarkerClusterGroup from "react-leaflet-markercluster";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { useSelector } from "react-redux";
import PopupBody from "./PopupBody";

const Cluster = () => {
  const vesselData = useSelector((state) => state.vessel.data);
  console.log("vesselData", vesselData);
  const ship = new Icon({
    iconUrl: "./ship.svg",
    iconSize: [30, 30],
  });

  return (
      <>
    {/* <MarkerClusterGroup> */}
      {vesselData?.map((vessel) => (
      <Marker
        key={Math.random()}
        position={[vessel?.LAT, vessel?.LON]}
        icon={ship}
      >
        <Popup>
          <PopupBody {...vessel} />
        </Popup>
      </Marker>
    ))}
    {/* </MarkerClusterGroup> */}
    </>
  );
};

export default Cluster;
