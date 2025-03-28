
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload } from "lucide-react";

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
    };
    
    reader.readAsDataURL(file);
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
            <p className="text-sm text-gray-600 text-center">
              {isProcessing ? "Analyzing soil image..." : "Image ready for analysis"}
            </p>
          </div>
        ) : (
          <div className="border-2 border-dashed border-soil rounded-md p-8 mb-4 flex flex-col items-center justify-center bg-soil-lightest h-64">
            <Upload className="w-12 h-12 text-soil-dark mb-2" />
            <p className="text-sm text-gray-600 text-center mb-2">
              Upload a clear image of your soil for analysis
            </p>
            <p className="text-xs text-gray-500 text-center">
              JPG, PNG, or GIF • Max 5MB
            </p>
          </div>
        )}
        
        <div className="flex justify-center">
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
        </div>
      </div>
    </Card>
  );
};

export default ImageUploader;
