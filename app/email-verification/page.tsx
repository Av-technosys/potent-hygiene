import { Suspense } from "react";
import {EmailVerificationClient} from "./EmailVerificationClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailVerificationClient />
    </Suspense>
  );
}