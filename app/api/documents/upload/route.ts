import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Token d'authentification requis" }, { status: 401 })
    }

    const token = authHeader.substring(7)

    // Verify JWT token
    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")
    } catch (error) {
      return NextResponse.json({ error: "Token invalide" }, { status: 401 })
    }

    // Get form data
    const formData = await request.formData()
    const file = formData.get("file") as File
    const documentType = formData.get("documentType") as string

    if (!file || !documentType) {
      return NextResponse.json({ error: "Fichier et type de document requis" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Type de fichier non autorisé. Utilisez PDF, JPEG ou PNG." }, { status: 400 })
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "Fichier trop volumineux. Taille maximale: 10MB" }, { status: 400 })
    }

    // In production, save file to cloud storage (AWS S3, Google Cloud, etc.)
    // For now, we'll just simulate the upload
    const uploadedDocument = {
      id: Date.now(),
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      documentType,
      uploadedAt: new Date().toISOString(),
      status: "uploaded",
      userId: (decoded as any).userId,
    }

    // Simulate AI processing for document scoring
    setTimeout(() => {
      // This would trigger the AI analysis in production
      console.log("Starting AI analysis for document:", uploadedDocument.id)
    }, 1000)

    return NextResponse.json({
      message: "Document téléchargé avec succès",
      document: uploadedDocument,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Erreur lors du téléchargement" }, { status: 500 })
  }
}
