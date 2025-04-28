"use client";
import React from "react";
import { useCallback, useState } from "react";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function PdfUploader() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setError(null);

      // Validate files
      const invalidFiles = acceptedFiles.filter(
        (file) => file.type !== "application/pdf"
      );
      if (invalidFiles.length > 0) {
        setError("Only PDF files are allowed");
        return;
      }

      const oversizedFiles = acceptedFiles.filter(
        (file) => file.size > 10 * 1024 * 1024
      ); // 10MB limit
      if (oversizedFiles.length > 0) {
        setError("File size exceeds 10MB limit");
        return;
      }

      // Add preview property to files
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles((prev) => [...prev, ...newFiles]);

      // Simulate upload progress
      simulateUpload();
    },
    [files]
  );

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return 0;
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    onDrop(droppedFiles);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      onDrop(selectedFiles);
    }
  };

  const removeFile = (fileToRemove) => {
    setFiles(files.filter((file) => file !== fileToRemove));
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(fileToRemove.preview);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Card>
        <CardContent className="p-6">
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25",
              files.length > 0 && "border-primary/50"
            )}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <UploadCloudIcon className="h-10 w-10 text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">
              Drag & drop your PDF files here
            </h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              or click to browse files (max 10MB)
            </p>
            <Button
              variant="outline"
              onClick={() => document.getElementById("file-input")?.click()}
            >
              Select Files
            </Button>
            <input
              id="file-input"
              type="file"
              accept=".pdf,application/pdf"
              multiple
              className="hidden"
              onChange={handleFileInputChange}
            />
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {uploadProgress !== null && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Uploaded Files</h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <FileIcon className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm font-medium truncate max-w-[180px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(file)}
                >
                  <XIcon className="h-4 w-4" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
