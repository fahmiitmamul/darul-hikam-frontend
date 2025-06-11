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
  const [selectedVillages, setSelectedVillages] = useState("");

  const {
    setIdProvince,
    setIdRegency,
    setIdDistrict,
    setIdVillage,
    idProvince,
    idRegency,
  } = useLocationContext();

  // Fetch villages from API
  useEffect(() => {
    if (!idProvince) return; // Jangan fetch jika idProvince kosong

    const fetchVillages = async () => {
      try {
        setLoading(true); // Mulai loading
        const response = await fetch(
          `https://sc-copy-api-wilayah-indonesia-master-yhe2.vercel.app/api/villages/${idProvince}.json`
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

    fetchVillages();

    setVillages([]);
    setSelectedVillages("");
    setIdRegency("");
  }, [idProvince]); // Gunakan idProvince dalam dependency array

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
