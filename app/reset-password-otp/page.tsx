import { Suspense } from "react";
import {ClientResetPasswordOtp} from "./ClientResetPasswordOtp";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientResetPasswordOtp />
    </Suspense>
  );
}