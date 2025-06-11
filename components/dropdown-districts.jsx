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

export default function DropdownDistricts({ field, fieldState }) {
  const [loading, setLoading] = useState(true);
  const [districts, setDistricts] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState("");

  const {
    setIdProvince,
    setIdRegency,
    setIdDistrict,
    setIdVillage,
    idProvince,
    idRegency,
  } = useLocationContext();

  // Fetch districts from API
  useEffect(() => {
    if (!idProvince || !idRegency) return; // Jangan fetch jika idRegency kosong

    const fetchDistricts = async () => {
      try {
        setLoading(true); // Mulai loading
        const response = await fetch(
          `https://sc-copy-api-wilayah-indonesia-master-yhe2.vercel.app/api/districts/${idRegency}.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch districts");
        }
        const data = await response.json();
        console.log("Fetched districts:", data);
        setDistricts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching districts:", error);
        setDistricts([]);
      } finally {
        setLoading(false); // Matikan loading
      }
    };

    fetchDistricts();

    setDistricts([]);
    setSelectedDistricts("");
    setIdDistrict("");
  }, [idProvince, idRegency]); // Gunakan idProvince dalam dependency array

  const handleChange = (value) => {
    setIdVillage(value);
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
          <SelectValue placeholder="Kabupaten / Kota" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Kabupaten Atau Kota</SelectLabel>
            {districts.map((districts) => (
              <SelectItem key={districts.id} value={districts.id}>
                {districts.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
