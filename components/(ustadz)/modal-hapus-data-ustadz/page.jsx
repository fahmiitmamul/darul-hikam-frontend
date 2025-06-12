import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import http from "@/helpers/http.helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function ModalHapusDataUstadz({
  ustadzId,
  openDialogHapusUstadz,
  setOpenDialogHapusUstadz,
}) {
  const queryClient = useQueryClient();

  const handleDelete = useMutation({
    mutationFn: async () => {
      return http().delete(`/ustadz/${ustadzId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ustadz"] });
      toast("Berhasil menghapus ustadz", {
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
      open={openDialogHapusUstadz}
      onOpenChange={setOpenDialogHapusUstadz}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Ustadz</AlertDialogTitle>
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
