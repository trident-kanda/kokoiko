import Head from "next/head";
import Container from "../components/Container";
import Nav from "../components/Nav";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Main from "../components/Main";
import GoogleMap from "../components/GoogleMap";
import SearchBox from "../components/SearchBox";
import { useForm } from "react-hook-form";
import TextArea from "../components/form/TextArea";
import ErrorLabel from "../components/form/ErrorLabel";
import Label from "../components/form/Label";
import PeopleSelect from "../components/form/PeopleSlect";
import DateInput from "../components/form/DateInput";
import TimeInput from "../components/form/TimeInput";

export default function recruiment() {
  type formProps = {};

  const defaultLatLng = { lat: 35.6809591, lng: 139.7673068 };
  const [latLng, setLatLng] = useState<any>(null);
  const [map, setMap] = useState<any>(null);
  const [maps, setMaps] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [apiReady, setReady] = useState(false);
  const [mapError, mapErrorSet] = useState<null | string>(null);
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
    console.log(data);
    console.log(latLng);
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
              <ErrorLabel name="集合場所詳細" errors={errors.detailsPlace} />
              <TextArea register={register} name="detailsPlace" />
              <ErrorLabel name="概要" errors={errors.overview} />
              <TextArea register={register} name="overview" />
              <Label name="募集人数" />
              <PeopleSelect register={register} />
              <ErrorLabel name="日付" errors={errors.date} />
              <DateInput register={register} />
              <ErrorLabel name="時間" errors={errors.time} />
              <TimeInput register={register} />
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
