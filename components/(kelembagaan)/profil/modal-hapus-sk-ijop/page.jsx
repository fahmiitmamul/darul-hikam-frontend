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

export function ModalHapusSkIjop({
  skIjopId,
  openDialogHapusSkIjop,
  setOpenDialogHapusSkIjop,
}) {
  const queryClient = useQueryClient();

  const handleDelete = useMutation({
    mutationFn: async () => {
      return http().delete(`/profil/sk-ijop/${skIjopId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sk-ijop"] });
      toast("Berhasil menghapus sk ijop", {
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
      open={openDialogHapusSkIjop}
      onOpenChange={setOpenDialogHapusSkIjop}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus SK IJOP</AlertDialogTitle>
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
