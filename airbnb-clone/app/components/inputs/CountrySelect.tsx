"use client";
import Select from "react-select";
import useCountries from "@/app/hooks/useCountry";
import ReactCountryFlag from "react-country-flag";
export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();
  console.log(getAll());
  return (
    <div>
      <Select
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        formatOptionLabel={(option: any) => (
          <div
            className="
            flex flex-row items-center gap-3"
          >
            <div role="img">
              {" "}
              <ReactCountryFlag
                className="w-[1em] h-[1em]"
                countryCode={`${option.value}`}
                svg
                aria-label={option.label}
              />
            </div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      ></Select>
    </div>
  );
};

export default CountrySelect;
