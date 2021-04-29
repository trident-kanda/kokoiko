import Head from "next/head";
import Container from "../components/Container";
import Nav from "../components/Nav";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../util/userContext";
import { useRouter } from "next/router";
import Main from "../components/Main";
import GoogleMap from "../components/GoogleMap";
import SearchBox from "../components/SearchBox";
import { useForm } from "react-hook-form";
export default function recruiment() {
  type formProps = {};
  const { user, session } = useContext(UserContext);
  const { replace } = useRouter();
  const defaultLatLng = { lat: 35.6809591, lng: 139.7673068 };
  const [latLng, setLatLng] = useState<any>(null);
  const [map, setMap] = useState<any>(null);
  const [maps, setMaps] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [apiReady, setReady] = useState(false);
  const [mapError, mapErrorSet] = useState<null | string>(null);
  const peopleArray = [1, 2, 3, 4, 5];
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
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

  const onSubmit = (data: formProps) => {
    if (latLng === null) {
      mapErrorSet("タップピンを立ててください");
    }
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
            <h2 className=" text-lg font-bold text-gray-700 ">
              集合場所
              <span className="ml-2 text-gray-500">タップ/クリックで選択</span>
              {mapError && !latLng && (
                <span className=" text-red-500 block">
                  場所を設定してください。
                </span>
              )}
            </h2>
            {apiReady && <SearchBox maps={maps} map={map} />}
            <GoogleMap
              defaultZoom={18}
              defaultCenter={defaultLatLng}
              onGoogleApiLoaded={handleApiLoaded}
              onClick={mapClick}
            ></GoogleMap>
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <label className="text-lg font-bold text-gray-700 ">
                集合場所詳細
                {errors.detailsPlace && (
                  <span className="text-lg font-bold text-red-500 ml-2">
                    {errors.detailsPlace.message}
                  </span>
                )}
              </label>
              <textarea
                {...register("detailsPlace", { required: "必須項目です。" })}
                className="block w-full focus:outline-none focus:border-green-500 p-1 border-gray-500 border-2 rounded"
              ></textarea>
              <label className="text-lg font-bold text-gray-700 ">
                概要
                {errors.overview && (
                  <span className="text-lg font-bold text-red-500 ml-2">
                    {errors.overview.message}
                  </span>
                )}
              </label>
              <textarea
                {...register("overview", { required: "必須項目です。" })}
                className="block w-full focus:outline-none focus:border-green-500 p-1 border-gray-500 border-2 rounded"
              ></textarea>
              <label className="text-lg font-bold text-gray-700 ">
                募集人数
              </label>
              <select
                {...register("numberPeople")}
                className="block w-full focus:outline-none focus:border-green-500 p-1 border-gray-500 border-2 rounded"
              >
                {peopleArray.map((number) => {
                  return (
                    <option key={number} value={number}>
                      {number}人
                    </option>
                  );
                })}
              </select>
              <div className="h-4" />
              <button className="block w-full focus:outline-none  rounded bg-green-500 text-white py-2 ">
                投稿
              </button>
            </form>
          </div>
        </Main>
      </Container>
    </div>
  );
}
