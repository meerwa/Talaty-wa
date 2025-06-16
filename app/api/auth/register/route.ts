import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock database - in production, use a real database
const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { companyName, companyType, firstName, lastName, email, phone, password } = body

    // Validate required fields
    if (!companyName || !firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: "Tous les champs requis doivent être remplis" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "Un compte avec cet email existe déjà" }, { status: 409 })
    }

    // Create new user (in production, hash the password)
    const newUser = {
      id: users.length + 1,
      companyName,
      companyType,
      firstName,
      lastName,
      email,
      phone,
      password, // In production, hash this password
      createdAt: new Date().toISOString(),
      kycStatus: "pending",
      documentsUploaded: 0,
    }

    users.push(newUser)

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        companyName: newUser.companyName,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" },
    )

    // Return success response
    return NextResponse.json(
      {
        message: "Compte créé avec succès",
        user: {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          companyName: newUser.companyName,
          kycStatus: newUser.kycStatus,
        },
        token,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
