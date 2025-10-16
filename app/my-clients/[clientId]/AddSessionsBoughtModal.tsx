import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ClientType, useUpdateAddSessionsBought } from "@/hooks/useClientsApi";
import { useTranslation } from "react-i18next";

export function AddSessionsBoughtModal({ client }: { client: ClientType }) {
  const { t } = useTranslation();
  const [value, setValue] = useState<number>(0);
  const [open, setOpen] = useState(false);

  const { mutate: addSessionsBoughtMutation } = useUpdateAddSessionsBought();

  const handleValidate = () => {
    addSessionsBoughtMutation(
      {
        uuid: client._id?.toString() || "xxx",
        json: value,
      },
      {
        onSuccess: () => {
          setValue(0);
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {t("addSessions")}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("addPurchasedSessions")}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            placeholder={t("numberOfSessionsToAdd")}
            className="w-full"
          />

          <Button onClick={handleValidate} className="w-full">
            {t("confirm")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
