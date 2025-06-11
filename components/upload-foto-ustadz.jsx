"use client";
import React from "react";
import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, User, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UploadFotoUstadz({
  fileFotoUstadz,
  setFileFotoUstadz,
  size = "lg",
  onImageUpload,
  className,
}) {
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
  };

  const handleFileSelect = (file) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      setPreview(result);
      onImageUpload?.(file, result);

      setFileFotoUstadz(file);
    };
    reader.readAsDataURL(file);

    // Simulate upload process
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
    }, 1500);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (preview) {
    return (
      <div className={cn("relative", className)}>
        <Avatar
          className={cn(
            sizeClasses[size],
            "cursor-pointer border-2 border-background shadow-lg hover:shadow-xl transition-shadow",
            isUploading && "opacity-50"
          )}
          onClick={triggerFileInput}
        >
          <AvatarImage src={preview || "/placeholder.svg"} alt="Profile" />
          <AvatarFallback>
            <User className={iconSizes[size]} />
          </AvatarFallback>
        </Avatar>

        {isUploading && (
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center rounded-full bg-black/50",
              sizeClasses[size]
            )}
          >
            <Upload
              className={cn(iconSizes[size], "text-white animate-pulse")}
            />
          </div>
        )}

        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <Button
        type="button"
        onClick={triggerFileInput}
        size="icon"
        className={cn(
          sizeClasses[size],
          "rounded-full border-2 border-dashed border-muted-foreground/50 bg-muted/50 hover:bg-muted hover:border-muted-foreground transition-all duration-200",
          isUploading && "opacity-50 cursor-not-allowed"
        )}
        variant="ghost"
        disabled={isUploading}
      >
        {isUploading ? (
          <Upload className={cn(iconSizes[size], "animate-pulse")} />
        ) : (
          <Camera className={iconSizes[size]} />
        )}
      </Button>

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
}
