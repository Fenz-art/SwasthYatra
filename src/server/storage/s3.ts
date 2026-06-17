export class S3Service {
  private region: string
  private bucket: string

  constructor() {
    this.region = process.env.AWS_REGION ?? "us-east-1"
    this.bucket = process.env.AWS_BUCKET ?? "swasthyatra-dev"
  }

  async upload(key: string, body: Buffer, contentType: string): Promise<string> {
    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`
  }

  async delete(key: string): Promise<void> {}

  async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}?signed=${Date.now()}`
  }
}

export const s3Service = new S3Service()
