import Image from "next/image";
import React, { useState } from "react";
import Cropper from "react-easy-crop";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

import { Modal } from "./(components)/Modal";
import { StatusBadge } from "./(components)/status-badge";
import { useUploadImage } from "./(components)/uploadImg";

export type ProfileType = "user" | "business";

interface ProfileCardProps {
  activeTab: ProfileType;
}

type CroppedAreaPixels = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function UserProfile({ activeTab }: ProfileCardProps) {
  const adharUpload = useUploadImage();

  const [adhaarVerified] = useState(false);
  const [panVerified] = useState(false);

  const [isAdharModalOpen, setAdharModalOpen] = useState(false);
  const [isPanModalOpen, setPanModalOpen] = useState(false);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedAreaPixels | null>(null);

  const [fileName, setFileName] = useState<string>("No file chosen");



  const openAdharModal = () => setAdharModalOpen(true);

  const closeAdharModal = () => {
    setAdharModalOpen(false);
    setImageSrc(null);
    setCroppedImage(null);
    setFileName("No file chosen");
  };

  const openPanModal = () => setPanModalOpen(true);
  const closePanModal = () => {
    setPanModalOpen(false);
    setImageSrc(null);
    setCroppedImage(null);
    setFileName("No file chosen");
  };

  // Image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
    } else {
      alert("Please upload a valid JPG or PNG image.");
    }
  };

  const handleCropComplete = (
    _croppedArea: { x: number; y: number; width: number; height: number },
    croppedAreaPixels: CroppedAreaPixels
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const getCroppedImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return null;
    return new Promise<string>((resolve) => {
      const image = new window.Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        ctx?.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );

        resolve(canvas.toDataURL("image/jpeg"));
      };
    });
  };

  const handleCropConfirm = async () => {
    const cropped = await getCroppedImage();
    setCroppedImage(cropped);
    setImageSrc(null);
  };

  const handleUploadCroppedImage = async () => {
    if (!croppedImage) {
      alert("Please crop the image first.");
      return;
    }

    const byteString = atob(croppedImage.split(",")[1]);
    const mimeString = croppedImage.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    const file = new File([arrayBuffer], fileName, { type: mimeString });

    adharUpload.mutate(file);
  };

  return (
    <Card className="p-6">
      {activeTab === "user" && (
        <>
          <div className="relative mb-6">
            <div className="h-32 w-full rounded-lg bg-gradient-to-r from-blue-200 to-pink-200" />
            <Avatar className="absolute bottom-0 left-1/2 h-24 w-24 -translate-x-1/2 translate-y-1/2 transform border-4 border-white">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>SS</AvatarFallback>
            </Avatar>
          </div>
          <div className="mt-16 text-center">
            <h2 className="text-xl font-semibold">Sarthak Sahu</h2>
            <p className="text-sm text-muted-foreground">
              sarthaksahu813@gmail.com
            </p>
          </div>
          <div className="mt-6 flex justify-center space-x-4">
            {/* Aadhaar Modal */}
            <div onClick={openAdharModal}>
              <StatusBadge type="aadhaar" verified={adhaarVerified} />
            </div>
            <Modal isOpen={isAdharModalOpen} onClose={closeAdharModal}>
              <p className="mb-4">Upload Aadhaar Image</p>
              <div className="mb-4">
                <input
                  title="Upload Aadhaar Image"
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={(e) => handleImageUpload(e)}
                  className="mb-4"
                />
              </div>

              {imageSrc && (
                <div className="relative h-60 w-full">
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={12.91 / 8.0}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={handleCropComplete}
                  />
                </div>
              )}
              {croppedImage && (
                <div className="mt-4">
                  <p>Preview:</p>
                  <Image
                    src={croppedImage}
                    alt="Cropped Aadhaar Preview"
                    height={40}
                    width={80}
                    className="mt-2  w-full object-contain"
                  />
                </div>
              )}
              {imageSrc && (
                <button
                  onClick={handleCropConfirm}
                  className="mt-4 bg-green-500 text-white py-2 px-4 hover:bg-green-600 rounded-lg"
                >
                  Confirm Crop
                </button>
              )}
              {croppedImage && (
                <div className="mt-4 text-center">
                  <button
                    onClick={handleUploadCroppedImage}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    disabled={adharUpload.isPending}
                  >
                    Upload Cropped Image
                  </button>
                </div>
              )}
              <button
                onClick={closeAdharModal}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Close
              </button>
            </Modal>

            {/* PAN Modal */}
            <div onClick={openPanModal}>
              <StatusBadge type="pan" verified={panVerified} />
            </div>
            <Modal isOpen={isPanModalOpen} onClose={closePanModal}>
              <p className="mb-4">Upload PAN Image</p>
              <div className="mb-4">
                <input
                  title="Upload PAN Image"
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={(e) => handleImageUpload(e)}
                  className="mb-4"
                />
              </div>

              {imageSrc && (
                <div className="relative h-60 w-full rounded-lg">
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={12.91 / 7.5}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={handleCropComplete}
                  />
                </div>
              )}
              {croppedImage && (
                <div className="mt-4">
                  <p>Preview:</p>
                  <Image
                    src={croppedImage}
                    alt="Cropped PAN Preview"
                    height={40}
                    width={80}
                    className="mt-2  w-full object-contain"
                  />
                </div>
              )}
              {imageSrc && (
                <button
                  onClick={handleCropConfirm}
                  className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Confirm Crop
                </button>
              )}
              {croppedImage && (
                <div className="mt-4 text-center">
                  <button
                    onClick={handleUploadCroppedImage}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Upload Cropped Image
                  </button>
                </div>
              )}
              <button
                onClick={closePanModal}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Close
              </button>
            </Modal>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center rounded-lg border p-4">
              <div className="text-center">
                <div className="text-sm font-medium">Business Profile</div>
                <div className="mt-1">
                  <StatusBadge type="check" verified={true} size="sm" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-lg border p-4">
              <div className="text-center">
                <div className="text-sm font-medium">Pan Aadhaar Link</div>
                <div className="mt-1">
                  <StatusBadge type="cross" verified={false} size="sm" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
