export default function (): string {
  let secret: string
  if (process.env.JWT_SECRET) {
    secret = process.env.JWT_SECRET
  } else {
    throw new Error("JWT_SECRET environment variable is not set")
  }

  return secret
}