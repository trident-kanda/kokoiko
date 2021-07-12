import Head from "next/head";
import Container from "../components/Container";
import Nav from "../components/Nav";
import { useState } from "react";
import Main from "../components/Main";
import GoogleMap from "../components/GoogleMap";
import SearchBox from "../components/SearchBox";
import { useForm } from "react-hook-form";
import TextArea from "../components/form/TextArea";
import ErrorLabel from "../components/form/ErrorLabel";
import Label from "../components/form/Label";
import Selecter from "../components/form/Selecter";
import DateInput from "../components/form/DateInput";
import TimeInput from "../components/form/TimeInput";
import Input from "../components/form/Input";
import ReactLoading from "react-loading";
import { supabase } from "../../util/key";
import { User } from "@supabase/supabase-js";
import { setRecruitment } from "../../util/graphql";
import { GetServerSideProps } from "next";

type props = {
  user: User | null;
};
export default function recruiment({ user }: props) {
  type formProps = {
    date: string;
    detailPlace: string;
    numberPeople: string;
    overview: string;
    time: string;
    title: string;
  };

  type latlng = {
    lat: number;
    lng: number;
  };
  type user_metadata = {
    avatar_url: string;
    friendid: string;
    full_name: string;
  };

  const defaultLatLng = { lat: 35.6809591, lng: 139.7673068 };
  const [latLng, setLatLng] = useState<latlng | null>(null);
  const [map, setMap] = useState<any>(null);
  const [maps, setMaps] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [apiReady, setReady] = useState(false);
  const [load, loadChange] = useState(false);
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

  const onSubmit = async (data: formProps) => {
    if (latLng === null) {
      mapErrorSet("タップピンを立ててください");
      return;
    }
    loadChange(true);

    if (user) {
      const res = await setRecruitment(
        user.id,
        data.date,
        data.detailPlace,
        data.numberPeople,
        data.overview,
        data.time,
        data.title,
        latLng.lat,
        latLng.lng,
        user?.user_metadata.full_name
      );
      if (res) {
        loadChange(false);
      }
      if (!res) {
        loadChange(false);
        alert("保存できませんでした。");
      }
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

  return (
    <div>
      <Container>
        <Head>
          <title>KOKOIKO</title>
        </Head>
        <Nav />
        <Main>
          <div className=" bg-white  sm:rounded-lg shadow p-4 relative">
            {load && (
              <ReactLoading
                type={"spin"}
                color="gray"
                height={40}
                width={40}
                className="loading"
              />
            )}
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
              <ErrorLabel name="募集タイトル" error={errors.title} />
              <Input
                register={register}
                type="text"
                autoComplete="off"
                name="title"
              />
              <ErrorLabel name="集合場所詳細" error={errors.detailPlace} />
              <TextArea
                register={register}
                name="detailPlace"
                length={200}
                placeholder="200文字以内"
              />
              <ErrorLabel name="概要" error={errors.overview} />
              <TextArea
                register={register}
                name="overview"
                length={200}
                placeholder="200文字以内"
              />
              <Label name="募集人数" />
              <Selecter register={register} />
              <ErrorLabel name="日付" error={errors.date} />
              <DateInput register={register} />
              <ErrorLabel name="時間" error={errors.time} />
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return {
      props: {},
      redirect: { destination: "/signin", permanent: false },
    };
  }
  return {
    props: {
      user,
    },
  };
};
