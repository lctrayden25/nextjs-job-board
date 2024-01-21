import React, {
  InputHTMLAttributes,
  forwardRef,
  useMemo,
  useState,
} from "react";
import { Input } from "./ui/input";
import citiesList from "@/lib/cities-list";

interface LocationInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

const LocationInput = forwardRef<HTMLInputElement, LocationInputProps>(
  ({ onLocationSelected, ...props }, ref) => {
    const [locationSearchInput, setLocationSearchInput] = useState<string>("");
    const [hasFocus, setHasFocus] = useState<boolean>(false);

    const cities = useMemo(() => {
      if (!locationSearchInput.trim()) return [];

      const searchWords = locationSearchInput.split(" ");

      return citiesList
        ?.map((city) => `${city?.name}, ${city?.subcountry}`)
        ?.filter(
          (city) =>
            city?.toLowerCase().startsWith(searchWords?.[0]?.toLowerCase()) &&
            searchWords?.every((word) =>
              city?.toLowerCase()?.includes(word?.toLowerCase()),
            ),
        )
        ?.slice(0, 5);
    }, [locationSearchInput]);

    return (
      <div>
        <Input
          {...props}
          type="search"
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          placeholder="Search for city"
          ref={ref}
          value={locationSearchInput}
          onChange={(e) => setLocationSearchInput(e.target.value)}
        />
        {locationSearchInput.trim() && hasFocus && (
          <div className="absolute z-20 w-full divide-y rounded-b-lg border-x border-b bg-background shadow-xl">
            {cities.length === 0 && <p className="p-3">No results round</p>}
            {cities?.length > 0 &&
              cities?.map((city) => (
                <button
                  key={city}
                  className="block w-full p-2 text-start"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onLocationSelected(city);
                    setLocationSearchInput("");
                  }}
                >
                  {city}
                </button>
              ))}
          </div>
        )}
      </div>
    );
  },
);

LocationInput.displayName = "LocationInput";

export default LocationInput;
