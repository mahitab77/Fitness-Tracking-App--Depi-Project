import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useAuth } from "../../hooks/use-auth";

function UploadImg({ setFileBath }) {
  const { session } = useAuth();

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const fileInputRef = useRef(null); // Reference to reset the input field

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && !["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
      setUploadStatus("Please select a valid image file (PNG, JPG, JPEG).");
      setSelectedFile(null);
    } else {
      setSelectedFile(file);
      setUploadStatus(""); // Clear any previous status
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/uploadImg?userId=${session.id}`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        const result = await response.json();
        setUploadStatus("Image uploaded successfully!");
        console.log("file:", result.filePath);
        setFileBath(result.filePath);

        // Reset the file input and selected file state
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset the input field
        }


        
        window.location.reload(); // Refreshes the page
      } else {
        setUploadStatus("Failed to upload image. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("An error occurred while uploading the image.");
    }
  };

  return (
    <>
      <Form method="post" encType="multipart/form-data">
        <Card className="max-w-[500px]">
          <CardHeader>
            <Label htmlFor="picture">Upload profile picture</Label>
          </CardHeader>

          <CardContent>
            <Input
              id="picture"
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </CardContent>

          <CardFooter className="flex-col items-start">
            <Button
              type="button"
              onClick={handleUpload}
              disabled={!selectedFile}
            >
              Upload
            </Button>
            {uploadStatus && (
              <p
                className={`mt-4 text-sm ${uploadStatus.includes("successfully") ? "text-green-600" : "text-red-600"}`}
              >
                {uploadStatus}
              </p>
            )}
          </CardFooter>
        </Card>
      </Form>
    </>
  );
}

export default UploadImg;
