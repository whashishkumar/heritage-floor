// "use client";
// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";

// interface AuthStatus {
//   success: boolean;
//   token: string | null;
//   loading: boolean;
// }

// export function useAuthCheck() {
//   const [authStatus, setAuthStatus] = useState<AuthStatus>({
//     success: false,
//     token: null,
//     loading: true,
//   });

//   useEffect(() => {
//     const token = Cookies.get("customer_token");
//     if (token) {
//       setAuthStatus({
//         success: true,
//         token,
//         loading: false,
//       });
//     } else {
//       setAuthStatus({
//         success: false,
//         token: null,
//         loading: false,
//       });
//     }
//   }, []);

//   return authStatus;
// }
