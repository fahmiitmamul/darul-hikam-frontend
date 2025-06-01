"use client";
import React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UploadAktaPendirianPenyelenggara() {
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileSelect = (selectedFile) => {
    setError("");

    // Check if file is PDF
    if (selectedFile.type !== "application/pdf") {
      setError("Please select a PDF file only");
      return;
    }

    // Check file size (optional - 10MB limit)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <Label htmlFor="pdf-upload">Upload Akta Pendirian Penyelenggara</Label>
        <Card
          className={cn(
            "border-2 border-dashed transition-colors",
            isDragOver
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25",
            error ? "border-destructive" : ""
          )}
        >
          <CardContent
            className="flex flex-col items-center justify-center p-6 text-center cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-10 w-10 text-muted-foreground mb-4" />
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Tarik dokumen disini atau{" "}
                <span className="text-primary underline">pilih</span>
              </p>
              <p className="text-xs text-muted-foreground">
                max 2MB bertipe pdf, png, jpg{" "}
              </p>
            </div>
            <Input
              ref={fileInputRef}
              id="pdf-upload"
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
          {error}
        </div>
      )}

      {file && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-red-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeFile}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {file && <Button className="w-full">Upload Izin Operasional</Button>}
    </div>
  );
}
