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

export function ModalHapusBukuTabungan({
  bukuTabunganId,
  openDialogHapusBukuTabungan,
  setOpenDialogHapusBukuTabungan,
}) {
  const queryClient = useQueryClient();

  const handleDelete = useMutation({
    mutationFn: async () => {
      return http().delete(`/buku-tabungan/${bukuTabunganId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buku-tabungan"] });
      toast("Berhasil menghapus buku tabungan", {
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
      open={openDialogHapusBukuTabungan}
      onOpenChange={setOpenDialogHapusBukuTabungan}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Buku Tabungan</AlertDialogTitle>
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
