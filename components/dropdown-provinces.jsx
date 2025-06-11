import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useLocationContext } from "./location-context";

export default function DropdownProvinces({ field, fieldState }) {
  const { idProvince, setIdProvince } = useLocationContext();
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://sc-copy-api-wilayah-indonesia-master-yhe2.vercel.app/api/provinces.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch provinces");
        }
        const data = await response.json();
        setProvinces(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching provinces:", error);
        setProvinces([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  // Handle select change
  const handleChange = (value) => {
    setIdProvince(value);
  };

  return (
    <div>
      <Select
        {...field}
        onValueChange={(value) => {
          field.onChange(value);
          handleChange(value);
        }}
        defaultValue=""
      >
        <SelectTrigger
          className={cn(
            "w-full",
            fieldState.error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : ""
          )}
        >
          <SelectValue placeholder="Provinsi" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Provinsi</SelectLabel>
            {provinces.map((province) => {
              return (
                <SelectItem key={province.id} value={province.id}>
                  {province.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
