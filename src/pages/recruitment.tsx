import Head from "next/head";
import Container from "../components/Container";
import Nav from "../components/Nav";
import Sidenav from "../components/Sidenav";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../util/userContext";
import { useRouter } from "next/router";
import Main from "../components/Main";
import GoogleMap from "../components/GoogleMap";
import SearchBox from "../components/SearchBox";
export default function recruiment() {
  const { user, session } = useContext(UserContext);
  const { replace } = useRouter();
  const defaultLatLng = { lat: 35.6809591, lng: 139.7673068 };
  const [latLng, setLatLng] = useState(defaultLatLng);
  const [map, setMap] = useState<any>(null);
  const [maps, setMaps] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [apiReady, setReady] = useState(false);
  const handleApiLoaded = ({ map, maps }: any) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((postion) => {
        map.panTo({
          lat: postion.coords.latitude,
          lng: postion.coords.longitude,
        });
      });
    }
    setMap(map);
    setMaps(maps);
    setReady(true);
  };

  const mapClick = ({ x, y, lat, lng, event }: any) => {
    if (marker) {
      marker.setMap(null);
    }
    const position = {
      lat,
      lng,
    };
    setLatLng(position);
    setMarker(
      new maps.Marker({
        map,
        position: position,
      })
    );
    map.panTo(position);
  };

  useEffect(() => {
    if (user === null) {
      replace("/signin");
    }
  }, [user]);

  return (
    <div>
      <Container>
        <Head>
          <title>KOKOIKO</title>
        </Head>
        <Nav />
        <Main>
          <div className=" bg-white  sm:rounded-lg shadow p-4">
            {apiReady && <SearchBox maps={maps} map={map} />}
            <GoogleMap
              defaultZoom={17}
              defaultCenter={defaultLatLng}
              onGoogleApiLoaded={handleApiLoaded}
              onClick={mapClick}
            ></GoogleMap>
          </div>
        </Main>
      </Container>
    </div>
  );
}
