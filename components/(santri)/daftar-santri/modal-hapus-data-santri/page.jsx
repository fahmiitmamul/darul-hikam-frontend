import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import http from "@/helpers/http.helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function ModalHapusDataSantri({
  santriId,
  openDialogHapusSantri,
  setOpenDialogHapusSantri,
}) {
  const queryClient = useQueryClient();

  const handleDelete = useMutation({
    mutationFn: async () => {
      return http().delete(`/santri/${santriId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["santri"] });
      toast("Berhasil menghapus mudir atau pimpinan", {
        description: new Date().toLocaleString(),
      });
    },
    onError: (err) => {
      toast(err.response.data.message, {
        description: new Date().toLocaleString(),
      });
    },
  });

  const onSubmit = (data) => {
    handleDelete.mutate();
  };

  return (
    <AlertDialog
      open={openDialogHapusSantri}
      onOpenChange={setOpenDialogHapusSantri}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Mudir Atau Pimpinan</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat dibatalkan. Tindakan ini akan menghapus
            secara permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleDelete.mutate();
            }}
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
