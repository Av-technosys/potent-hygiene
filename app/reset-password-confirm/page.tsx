import { Suspense } from "react";
import {ClientResetPasswordConfirm} from "./ClientResetPasswordConfirm";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientResetPasswordConfirm />
    </Suspense>
  );
}