"use client";
import { ScanSearch } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

interface ScanResult {
  getText: () => string;
  
}

const Home: React.FC = () => {
  const [data, setData] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const router = useRouter();

  const handleScanButtonClick = () => {
    setIsScanning(!isScanning); // Toggle scanning state
  };

  const handleResult = (result: ScanResult | null | undefined, error: Error | null | undefined) => {
    if (result) {
      const scannedUrl = result.getText();
      setData(scannedUrl);
      setIsScanning(false);
      try {
        router.push(scannedUrl);
      } catch (err) {
        console.warn("Scanned text is not a valid URL:", err);
      }
    }

    if (error) {
      console.warn("QR Code scanning error:", error.message);
    }
  };

  return (
    <div>
      <main className="w-full mx-auto flex flex-col justify-center items-center pb-20">
        <h1 className="text-center font-bold text-3xl leading-none text-pink-600">Welcome to Boomzo Coupons</h1>
        <h1 className="text-center font-bold text-2xl text-yellow-600 my-2">Scan your QR code</h1>
        {!isScanning && (
          <Image src={"/qr.png"} height={200} width={200} alt="QRScan" />
        )}
        {/* QR Code Scanner */}
        <div className="mx-auto mt-2 w-full max-w-sm">
          {isScanning && (
            <div style={{ width: "100%" }}>
              <QrReader
                onResult={handleResult}
                constraints={{
                  facingMode: "environment",
                }}
              />
            </div>
          )}
        </div>

        <div className="flex justify-center flex-col items-center w-full mx-auto mt-4">
          <button
            onClick={handleScanButtonClick}
            className={`px-4 py-2 font-bold flex gap-x-1 items-center text-white rounded ${isScanning ? "bg-red-500" : "bg-green-500"}`}
          >
            <span><ScanSearch /></span> {isScanning ? "Stop Scanning" : "Start Scanning"}
          </button>
          <p className="font-bold text-green-500 mt-4">{data}</p>
        </div>
      </main>
    </div>
  );
};

export default Home;

