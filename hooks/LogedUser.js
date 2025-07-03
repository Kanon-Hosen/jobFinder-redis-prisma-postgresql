import { headers } from "next/headers";

export default async function LogedUser() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  const res = await fetch(`${protocol}://${host}/api/me`, {
    headers: {
      Cookie: headersList.get("cookie") || "",
    },
  });

  const data = await res.json();
  return data;
}
