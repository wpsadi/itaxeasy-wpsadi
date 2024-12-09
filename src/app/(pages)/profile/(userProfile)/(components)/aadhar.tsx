'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CloudUpload, File, X } from 'lucide-react'

export default function AadharUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploaded, setIsUploaded] = useState(false)
  const [extractedData, setExtractedData] = useState({
    name: '',
    aadharNumber: '',
    dateOfBirth: '',
    address:"",
  })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf']
    },
    multiple: false
  })

  const removeFile = () => {
    setFile(null)
    setIsUploaded(false)
    setExtractedData({ name: '', aadharNumber: '', dateOfBirth: '',address:"" })
  }

  const handleUpload = async () => {
    if (!file) return

    // Placeholder for processing function
    // Replace this with your actual processing logic
    const processFile = async (file: File) => {
      // Simulating processing delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Return mock data
      return {
        name: 'John Doe',
        aadharNumber: '1234 5678 9012',
        dateOfBirth: '1990-01-01',
        address:"ghuia ke khet mai "
      }
    }

    try {
      const result = await processFile(file)
      setExtractedData(result)
      setIsUploaded(true)
    } catch (error) {
      console.error('Error processing file:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Upload Aadhar Card</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isUploaded && (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
            }`}
          >
            <input {...getInputProps()} />
            {file ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <File className="w-8 h-8 mr-2 text-primary" />
                  <span className="text-sm font-medium">{file.name}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={removeFile}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div>
                <CloudUpload className="w-12 h-12 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Drag and drop your Aadhar card here, or click to select
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Supported formats: PNG, JPG, JPEG, PDF
                </p>
              </div>
            )}
          </div>
        )}
        {isUploaded && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={extractedData.name}
                onChange={(e) => setExtractedData({ ...extractedData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aadharNumber">Aadhar Number</Label>
              <Input
                id="aadharNumber"
                value={extractedData.aadharNumber}
                onChange={(e) => setExtractedData({ ...extractedData, aadharNumber: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={extractedData.dateOfBirth}
                onChange={(e) => setExtractedData({ ...extractedData, dateOfBirth: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aadharNumber">Address</Label>
              <Input
                id="aadharNumber"
                value={extractedData.address}
                onChange={(e) => setExtractedData({ ...extractedData, address: e.target.value })}
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isUploaded ? (
          <Button className="w-full" disabled={!file} onClick={handleUpload}>
            Upload and Process
          </Button>
        ) : (
          <Button className="w-full" onClick={removeFile}>
            Upload Another
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

