export class MinioService {
  private endpoint: string
  private bucket: string

  constructor() {
    this.endpoint = process.env.S3_ENDPOINT ?? "http://localhost:9000"
    this.bucket = process.env.S3_BUCKET ?? "swasthyatra"
  }

  async upload(key: string, body: Buffer, contentType: string): Promise<string> {
    return `${this.endpoint}/${this.bucket}/${key}`
  }

  async delete(key: string): Promise<void> {}

  async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    return `${this.endpoint}/${this.bucket}/${key}?signed=${Date.now()}`
  }
}

export const minioService = new MinioService()
