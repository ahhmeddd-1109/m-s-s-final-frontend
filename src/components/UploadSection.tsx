import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, FileAudio, X, Play, Pause } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'ready' | 'processing' | 'completed' | 'error';
}

export const UploadSection = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: uploadRef, isVisible: uploadVisible } = useScrollAnimation({ threshold: 0.3 });

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const audioFiles = droppedFiles.filter(file => 
      file.type.startsWith('audio/') || 
      ['mp3', 'wav', 'ogg', 'flac', 'm4a'].some(ext => file.name.toLowerCase().endsWith(ext))
    );

    audioFiles.forEach(file => {
      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'uploading'
      };

      setFiles(prev => [...prev, newFile]);

      // Simulate upload progress
      const interval = setInterval(() => {
        setFiles(prev => prev.map(f => {
          if (f.id === newFile.id) {
            const newProgress = Math.min(f.progress + Math.random() * 20, 100);
            const newStatus = newProgress === 100 ? 'ready' : 'uploading';
            return { ...f, progress: newProgress, status: newStatus };
          }
          return f;
        }));
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        setFiles(prev => prev.map(f => 
          f.id === newFile.id ? { ...f, progress: 100, status: 'ready' } : f
        ));
      }, 2000);
    });
  }, []);

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const startSeparation = (id: string) => {
    setFiles(prev => prev.map(f => 
      f.id === id ? { ...f, status: 'processing', progress: 0 } : f
    ));

    // Simulate processing
    const interval = setInterval(() => {
      setFiles(prev => prev.map(f => {
        if (f.id === id && f.status === 'processing') {
          const newProgress = Math.min(f.progress + Math.random() * 10, 100);
          const newStatus = newProgress === 100 ? 'completed' : 'processing';
          return { ...f, progress: newProgress, status: newStatus };
        }
        return f;
      }));
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setFiles(prev => prev.map(f => 
        f.id === id ? { ...f, progress: 100, status: 'completed' } : f
      ));
    }, 8000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <section className="py-20 px-6" id="upload">
      <div className="max-w-4xl mx-auto">
        <div 
          ref={titleRef}
          className={cn(
            "text-center mb-12 scroll-reveal",
            titleVisible && "visible"
          )}
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Upload Your Music
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Drop your audio files here and let our AI separate them into individual tracks.
            Supports MP3, WAV, FLAC, OGG, and M4A formats.
          </p>
        </div>

        <Card 
          ref={uploadRef}
          className={cn(
            "mb-8 border-primary/20 bg-card/50 backdrop-blur-sm scroll-reveal-scale hover-lift",
            uploadVisible && "visible"
          )}
        >
          <CardContent className="p-8">
            <div
              className={cn(
                "border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300",
                isDragOver
                  ? "border-primary bg-primary/5 scale-105"
                  : "border-primary/30 hover:border-primary/50 hover:bg-primary/5"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center hover-glow">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Drop your audio files here</h3>
                  <p className="text-muted-foreground mb-4">
                    or click to browse and select files
                  </p>
                  <Button variant="outline" className="mx-auto hover-lift">
                    <FileAudio className="w-4 h-4 mr-2" />
                    Choose Files
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Maximum file size: 100MB • Supported formats: MP3, WAV, FLAC, OGG, M4A
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Uploaded Files</h3>
            {files.map((file, index) => (
              <Card 
                key={file.id} 
                className={cn(
                  "border-primary/20 bg-card/50 backdrop-blur-sm hover-lift scroll-reveal",
                  "visible",
                  `stagger-${index + 1}`
                )}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center hover-glow">
                        <FileAudio className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-lg">{file.name}</h4>
                        <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {file.status === 'ready' && (
                        <Button 
                          variant="hero" 
                          size="sm"
                          className="hover-lift"
                          onClick={() => startSeparation(file.id)}
                        >
                          Start Separation
                        </Button>
                      )}
                      {file.status === 'completed' && (
                        <Button variant="electric" size="sm" className="hover-lift">
                          Download Results
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {(file.status === 'uploading' || file.status === 'processing') && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {file.status === 'uploading' ? 'Uploading...' : 'Processing...'}
                        </span>
                        <span className="text-primary">{Math.round(file.progress)}%</span>
                      </div>
                      <Progress value={file.progress} className="h-2" />
                    </div>
                  )}

                  {/* Status Indicators */}
                  <div className="flex items-center space-x-2 mt-3">
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      {
                        'bg-yellow-500 animate-pulse': file.status === 'uploading',
                        'bg-green-500': file.status === 'ready',
                        'bg-blue-500 animate-pulse': file.status === 'processing',
                        'bg-primary': file.status === 'completed',
                        'bg-red-500': file.status === 'error',
                      }
                    )} />
                    <span className="text-sm text-muted-foreground capitalize">
                      {file.status === 'ready' ? 'Ready for separation' : file.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};