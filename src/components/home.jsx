import React from "react";
import { useAuth } from "../context/authContext";

export default function Home() {
  const { accountId, token } = useAuth();

  return (
    <div>
      {accountId}, {token}
    </div>
  );
}
