// Cloudinary Types
export interface CloudinaryUploadResponse {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  access_mode: string;
  original_filename: string;
  eager?: Array<{
    transformation: string;
    width: number;
    height: number;
    bytes: number;
    format: string;
    url: string;
    secure_url: string;
  }>;
}

export interface CloudinaryUploadOptions {
  folder?: string;
  public_id?: string;
  transformation?: string;
  tags?: string[];
  context?: Record<string, string>;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export type UploadFolder = 'default' | 'profile_images';
