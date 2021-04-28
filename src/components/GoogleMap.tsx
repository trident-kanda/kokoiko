import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";

const GoogleMap = ({ children, ...props }: any) => {
  return (
    <div className=" h-80">
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{
          key: "AIzaSyAqeDiz2m3DdYEsAqg_r8VZuhf1i-FZWeM",
          libraries: "places",
        }}
        {...props}
      >
        {children}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
