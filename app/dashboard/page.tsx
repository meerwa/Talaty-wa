"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  Clock,
  Upload,
  FileText,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  Shield,
  AlertCircle,
} from "lucide-react"

export default function DashboardPage() {
  const [kycStatus, setKycStatus] = useState("pending") // pending, verified, rejected
  const [documentsUploaded, setDocumentsUploaded] = useState(2)
  const [totalDocuments] = useState(5)
  const [creditScore] = useState(null) // Will be calculated after all documents

  const kycSteps = [
    { id: 1, title: "Informations personnelles", status: "completed" },
    { id: 2, title: "Vérification d'identité", status: "completed" },
    { id: 3, title: "Vérification d'adresse", status: "pending" },
    { id: 4, title: "Validation finale", status: "pending" },
  ]

  const requiredDocuments = [
    { id: 1, name: "Pièce d'identité", status: "uploaded", type: "identity" },
    { id: 2, name: "Justificatif de domicile", status: "uploaded", type: "address" },
    { id: 3, name: "Bilans comptables (2 dernières années)", status: "pending", type: "financial" },
    { id: 4, name: "Relevés bancaires (3 derniers mois)", status: "pending", type: "financial" },
    { id: 5, name: "Kbis de l'entreprise", status: "pending", type: "legal" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Talaty</span>
              </div>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-lg font-semibold text-gray-900">Tableau de bord</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Bienvenue, Jean Dupont</h2>
            <p className="text-gray-600">
              Suivez votre progression et gérez vos documents pour obtenir votre score de financement.
            </p>
          </div>

          {/* Status Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Statut eKYC</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  {kycStatus === "verified" && (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <Badge className="bg-green-100 text-green-800">Vérifié</Badge>
                    </>
                  )}
                  {kycStatus === "pending" && (
                    <>
                      <Clock className="w-5 h-5 text-yellow-500" />
                      <Badge className="bg-yellow-100 text-yellow-800">En cours</Badge>
                    </>
                  )}
                  {kycStatus === "rejected" && (
                    <>
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <Badge className="bg-red-100 text-red-800">Rejeté</Badge>
                    </>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {kycStatus === "pending" && "Vérification en cours..."}
                  {kycStatus === "verified" && "Identité vérifiée avec succès"}
                  {kycStatus === "rejected" && "Documents à revoir"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documents</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {documentsUploaded}/{totalDocuments}
                </div>
                <Progress value={(documentsUploaded / totalDocuments) * 100} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {totalDocuments - documentsUploaded} documents restants
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Score de crédit</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {creditScore ? (
                  <>
                    <div className="text-2xl font-bold">{creditScore}/100</div>
                    <p className="text-xs text-muted-foreground mt-2">Score excellent</p>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-gray-400">--</div>
                    <p className="text-xs text-muted-foreground mt-2">En attente des documents</p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="kyc" className="space-y-6">
            <TabsList>
              <TabsTrigger value="kyc">Vérification eKYC</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="score">Score & Analyse</TabsTrigger>
            </TabsList>

            <TabsContent value="kyc">
              <Card>
                <CardHeader>
                  <CardTitle>Processus de vérification eKYC</CardTitle>
                  <CardDescription>Complétez toutes les étapes pour valider votre identité</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {kycSteps.map((step, index) => (
                      <div key={step.id} className="flex items-center space-x-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : step.status === "pending"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {step.status === "completed" ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <span className="text-sm font-medium">{step.id}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{step.title}</h4>
                          <p className="text-sm text-gray-500">
                            {step.status === "completed" && "Terminé"}
                            {step.status === "pending" && "En cours"}
                            {step.status === "not_started" && "Non commencé"}
                          </p>
                        </div>
                        {step.status === "pending" && <Button size="sm">Continuer</Button>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Documents requis</CardTitle>
                  <CardDescription>Téléchargez tous les documents nécessaires pour l'évaluation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {requiredDocuments.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              doc.status === "uploaded" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {doc.status === "uploaded" ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <FileText className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{doc.name}</h4>
                            <p className="text-sm text-gray-500">
                              {doc.status === "uploaded" ? "Téléchargé" : "En attente"}
                            </p>
                          </div>
                        </div>
                        {doc.status === "pending" && (
                          <Button size="sm" variant="outline">
                            <Upload className="w-4 h-4 mr-2" />
                            Télécharger
                          </Button>
                        )}
                        {doc.status === "uploaded" && (
                          <Button size="sm" variant="ghost">
                            Voir
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="score">
              <Card>
                <CardHeader>
                  <CardTitle>Score de crédit et analyse</CardTitle>
                  <CardDescription>Votre évaluation sera disponible une fois tous les documents soumis</CardDescription>
                </CardHeader>
                <CardContent>
                  {!creditScore ? (
                    <div className="text-center py-12">
                      <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Analyse en cours</h3>
                      <p className="text-gray-500 mb-4">
                        Complétez le téléchargement de vos documents pour recevoir votre score personnalisé
                      </p>
                      <Button>Télécharger les documents manquants</Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Score display would go here */}
                      <div className="text-center">
                        <div className="text-6xl font-bold text-green-600 mb-2">{creditScore}</div>
                        <p className="text-lg text-gray-600">Score de crédit excellent</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
