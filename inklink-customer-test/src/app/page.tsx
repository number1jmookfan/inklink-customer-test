"use client";
import Image from "next/image";
import { POST, GET } from "./apiRequests";
import { useEffect, useState } from "react";
import { RedirectType } from "next/navigation";
import { redirect } from "next/navigation";

export default function Page() {
  const [reqId, setReqId] = useState("");
  const [googleLink, setGoogleLink] = useState("");

  const googleProofInfo = {
    description: "prove the user can navigate to google.com",
    title: "google proof",
  };

  useEffect(() => {
    (async () => {
      const [data] = await POST(
        googleProofInfo.description,
        googleProofInfo.title
      );
      const id = data.request_id;
      const link = data.request_url;
      setReqId(id);
      setGoogleLink(link);
    })();
  }, []);

  const [googleStatus, setGoogleStatus] = useState("");

  const [checkStatus, setCheckStatus] = useState(false);

  useEffect(() => {
    (async () => {
      setTimeout(() => setCheckStatus(!checkStatus), 10000);

      if (googleStatus !== "PASSED") {
        const status = await GET(
          "http://localhost:3000/api/request-result/" + reqId
        );
        setGoogleStatus(status);
        console.log("set googstatus", status);
      }
    })();
  }, [checkStatus, reqId]);

  return (
    <div className="flex">
      <a
        className="bg-red-500 text-white w-fit"
        href={googleLink}
        target="_blank"
      >
        prove you can go to google!
      </a>
      <div>{googleStatus}</div>
    </div>
  );
}
