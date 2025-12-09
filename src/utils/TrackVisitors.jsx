import { useEffect } from "react";

function getFingerprint() {
  let fp = localStorage.getItem("site_fp");
  if (!fp) {
    fp = crypto.randomUUID();
    localStorage.setItem("site_fp", fp);
  }
  return fp;
}

export default function TrackVisitors() {
  useEffect(() => {
    const fp = getFingerprint();

    fetch(
      "https://oyqmlglodkrjzccnzlgv.supabase.co/functions/v1/trackVisitor",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fingerprint: fp }),
      }
    );
  }, []);

  return null;
}
