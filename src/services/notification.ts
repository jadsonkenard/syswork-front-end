import { toast } from "sonner";

type NotificationType = "success" | "error" | "warning" | "info";

export function notify(type: NotificationType, message: string) {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    default:
      toast(message);
  }
}
