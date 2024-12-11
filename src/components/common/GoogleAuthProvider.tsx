import { GoogleOAuthProvider } from "@react-oauth/google";

import { env } from "@/env";

export const EnableGoogleAuth = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <GoogleOAuthProvider clientId={env.auth.google.client_id}>
        {children}
      </GoogleOAuthProvider>
    </>
  );
};
