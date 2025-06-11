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

export default function DropdownVillages({ field, fieldState }) {
  const [loading, setLoading] = useState(true);
  const [villages, setVillages] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState("");

  const {
    setIdProvince,
    setIdRegency,
    setIdDistrict,
    setIdVillage,
    idProvince,
    idRegency,
    idDistrict,
  } = useLocationContext();

  // Fetch villages from API
  useEffect(() => {
    if ((!idProvince, !idRegency, !idDistrict)) return; // Jangan fetch jika idDistrict kosong

    const fetchVillages = async () => {
      try {
        setLoading(true); // Mulai loading
        const response = await fetch(
          `${config.apiAddress}/villages/${idDistrict}.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch villages");
        }
        const data = await response.json();
        console.log("Fetched villages:", data);
        setVillages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching villages:", error);
        setVillages([]);
      } finally {
        setLoading(false); // Matikan loading
      }
    };

    setVillages([]);
    setSelectedVillage();
    setIdVillage();
    fetchVillages();
  }, [idProvince, idRegency, idDistrict]); // Gunakan idProvince dalam dependency array

  return (
    <div>
      <Select {...field} onValueChange={field.onChange} defaultValue="">
        <SelectTrigger
          className={cn(
            "w-full",
            fieldState.error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : ""
          )}
        >
          <SelectValue placeholder="Kelurahan" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Kelurahan</SelectLabel>
            {villages.map((villages) => (
              <SelectItem key={villages.id} value={villages.id}>
                {villages.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
