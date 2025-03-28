
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload, Camera } from "lucide-react";

interface ImageUploaderProps {
  onImageCaptured: (base64Image: string) => void;
  isProcessing: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageCaptured, isProcessing }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image is too large. Please select an image under 5MB.");
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file.");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target?.result as string;
      setPreviewImage(base64Image);
      onImageCaptured(base64Image);
      toast.success("Image uploaded successfully! Analyzing soil...");
    };
    
    reader.readAsDataURL(file);
  };

  // Function to handle capturing an image from camera (mobile devices)
  const handleCameraCapture = () => {
    // Check if the device supports camera capture
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      toast.info("Camera functionality would open here in a production app");
      // In a real implementation, we would implement camera capture here
    } else {
      toast.error("Your device does not support camera access");
    }
  };
  
  return (
    <Card className="soil-card flex flex-col items-center p-6 animate-grow">
      <h2 className="text-xl font-semibold text-soil-darkest mb-4">Soil Image Upload</h2>
      
      <div className="w-full max-w-md">
        {previewImage ? (
          <div className="relative w-full mb-4">
            <img 
              src={previewImage} 
              alt="Soil preview" 
              className="w-full h-64 object-cover rounded-md border-2 border-soil mb-2"
            />
            <div className="flex items-center justify-center mt-2">
              {isProcessing ? (
                <div className="bg-soil-light text-white px-3 py-1 rounded-full text-sm flex items-center">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Analyzing with Gemini AI...
                </div>
              ) : (
                <div className="bg-green-100 text-soil-dark px-3 py-1 rounded-full text-sm">
                  Analysis complete
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-soil rounded-md p-8 mb-4 flex flex-col items-center justify-center bg-soil-lightest h-64">
            <Upload className="w-12 h-12 text-soil-dark mb-2" />
            <p className="text-sm text-gray-600 text-center mb-2">
              Upload a clear image of your soil for Gemini AI analysis
            </p>
            <p className="text-xs text-gray-500 text-center">
              JPG, PNG, or GIF • Max 5MB
            </p>
          </div>
        )}
        
        <div className="flex justify-center gap-3">
          <Button 
            asChild
            className="soil-button flex items-center"
            disabled={isProcessing}
          >
            <label>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={isProcessing}
              />
              {previewImage ? "Choose Another Image" : "Select Soil Image"}
            </label>
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className="border-soil text-soil-darkest"
            onClick={handleCameraCapture}
            disabled={isProcessing}
          >
            <Camera className="w-4 h-4 mr-2" />
            Take Photo
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ImageUploader;
