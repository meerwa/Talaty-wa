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

    // Simulate AI-powered credit scoring
    // In production, this would analyze uploaded documents using ML models
    const mockAnalysis = {
      financialHealth: Math.floor(Math.random() * 30) + 70, // 70-100
      documentQuality: Math.floor(Math.random() * 20) + 80, // 80-100
      businessStability: Math.floor(Math.random() * 25) + 75, // 75-100
      creditHistory: Math.floor(Math.random() * 20) + 80, // 80-100
    }

    // Calculate overall score (weighted average)
    const overallScore = Math.round(
      mockAnalysis.financialHealth * 0.4 +
        mockAnalysis.documentQuality * 0.2 +
        mockAnalysis.businessStability * 0.3 +
        mockAnalysis.creditHistory * 0.1,
    )

    // Determine risk level
    let riskLevel = "low"
    let recommendation = "Excellent profil de crédit"

    if (overallScore < 60) {
      riskLevel = "high"
      recommendation = "Profil nécessitant une attention particulière"
    } else if (overallScore < 80) {
      riskLevel = "medium"
      recommendation = "Bon profil avec quelques points d'amélioration"
    }

    const scoringResult = {
      userId: (decoded as any).userId,
      overallScore,
      riskLevel,
      recommendation,
      breakdown: mockAnalysis,
      calculatedAt: new Date().toISOString(),
      factors: {
        strengths: ["Bonne santé financière", "Documents complets et de qualité", "Stabilité de l'entreprise"],
        improvements: ["Diversifier les sources de revenus", "Améliorer la trésorerie"],
      },
    }

    return NextResponse.json({
      message: "Score calculé avec succès",
      scoring: scoringResult,
    })
  } catch (error) {
    console.error("Scoring calculation error:", error)
    return NextResponse.json({ error: "Erreur lors du calcul du score" }, { status: 500 })
  }
}
