import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Dashboard() {
  const [iframeUrl, setIframeUrl] = useState("");

  useEffect(() => {
    fetch("/api/metabase-token")
      .then((response) => response.json())
      .then((data) => setIframeUrl(data.iframeUrl));
  }, []);
  return (
    <>
      <Navbar />
      <div
        dangerouslySetInnerHTML={{
          __html: `<iframe src="${iframeUrl}" width="100%" height="1100" frameborder="0"></iframe>`,
        }}
      />
      <Footer />
    </>
  );
}

export default Dashboard;
