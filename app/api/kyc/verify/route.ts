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

    const body = await request.json()
    const { step, data } = body

    // Simulate KYC verification process
    let verificationResult = {
      step,
      status: "pending",
      message: "Vérification en cours...",
      nextStep: null,
    }

    switch (step) {
      case "identity":
        // Simulate identity verification
        verificationResult = {
          step: "identity",
          status: "completed",
          message: "Identité vérifiée avec succès",
          nextStep: "address",
        }
        break

      case "address":
        // Simulate address verification
        verificationResult = {
          step: "address",
          status: "completed",
          message: "Adresse vérifiée avec succès",
          nextStep: "final",
        }
        break

      case "final":
        // Final KYC validation
        verificationResult = {
          step: "final",
          status: "completed",
          message: "Vérification eKYC terminée avec succès",
          nextStep: null,
        }
        break

      default:
        return NextResponse.json({ error: "Étape de vérification invalide" }, { status: 400 })
    }

    return NextResponse.json({
      message: "Vérification eKYC mise à jour",
      verification: verificationResult,
    })
  } catch (error) {
    console.error("KYC verification error:", error)
    return NextResponse.json({ error: "Erreur lors de la vérification eKYC" }, { status: 500 })
  }
}
