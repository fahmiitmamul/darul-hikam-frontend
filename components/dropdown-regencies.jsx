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

export default function DropdownRegencies({ field, fieldState }) {
  const [loading, setLoading] = useState(true);
  const [regencies, setRegencies] = useState([]);
  const [selectedRegency, setSelectedRegency] = useState("");

  const {
    setIdProvince,
    setIdRegency,
    setIdDistrict,
    setIdVillage,
    idProvince,
    idRegency,
  } = useLocationContext();

  // Fetch regencies from API
  useEffect(() => {
    if (!idProvince) return; // Jangan fetch jika idProvince kosong

    const fetchRegencies = async () => {
      try {
        setLoading(true); // Mulai loading
        const response = await fetch(
          `https://sc-copy-api-wilayah-indonesia-master-yhe2.vercel.app/api/districts/${idProvince}.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch regencies");
        }
        const data = await response.json();
        console.log("Fetched regencies:", data);
        setRegencies(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching regencies:", error);
        setRegencies([]);
      } finally {
        setLoading(false); // Matikan loading
      }
    };

    fetchRegencies();

    setRegencies([]);
    setSelectedRegency("");
    setIdRegency("");
  }, [idProvince]); // Gunakan idProvince dalam dependency array

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
          <SelectValue placeholder="Kabupaten / Kota" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Kabupaten Atau Kota</SelectLabel>
            {regencies.map((regencies) => (
              <SelectItem key={regencies.id} value={regencies.id}>
                {regencies.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
