import { useEffect, useRef } from "react";

const SearchBox = ({ map, maps }: any) => {
  const input = useRef(null);
  const searchBox: any = useRef(null);

  useEffect(() => {
    searchBox.current = new maps.places.SearchBox(input.current);
    map.controls[maps.ControlPosition.TOP_LEFT].push(input.current);
    searchBox.current.addListener("places_changed", () => {
      const places = searchBox.current.getPlaces();
      if (places.length === 0) {
        return;
      }
      const location = places[0].geometry.location;
      map.panTo(location);
    });
  }, [maps]);
  return (
    <input
      type="text"
      ref={input}
      className=" border border-gray-500 rounded focus:outline-none focus:border-green-500 p-1 w-1/2 absolute right-full"
    />
  );
};

export default SearchBox;
