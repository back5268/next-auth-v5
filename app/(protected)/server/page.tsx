import { UserInfo } from "@/components/user-info";
import { currrentUser } from "@/lib/auth";
import React from "react";

const ServerPage = async () => {
  const user = await currrentUser();

  return <UserInfo label="Server Component" user={user} />;
};

export default ServerPage;
