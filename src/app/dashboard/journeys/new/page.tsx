"use client"

import { createTravelHealthSession } from "@/modules/session/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Compass, Stethoscope, AlertTriangle, ShieldCheck, ArrowRight, User } from "lucide-react"

export default function NewJourneyPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    language: "en",
    symptoms: "",
    duration: "",
    allergies: "",
    medications: ""
  })

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await createTravelHealthSession({
        country: formData.country,
        city: formData.city,
        language: formData.language,
        symptoms: formData.symptoms.split(",").map(s => s.trim()).filter(Boolean),
        duration: formData.duration || undefined,
        allergies: formData.allergies ? formData.allergies.split(",").map(s => s.trim()).filter(Boolean) : undefined,
        medications: formData.medications ? formData.medications.split(",").map(s => s.trim()).filter(Boolean) : undefined,
      })
      router.push("/dashboard/journeys")
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-4">
        <h1 className="text-xl font-semibold text-white/95">Initialize Journey</h1>
        <p className="text-xs text-white/45">
          Establish traveler context, symptoms, and medical history to initialize your active session.
        </p>
      </div>

      {/* Progress timeline indicator */}
      <div className="flex justify-between items-center px-2 text-[10px] font-semibold text-white/45 uppercase tracking-wider">
        <span className={step >= 1 ? "text-[#00E5FF]" : ""}>01 Travel Context</span>
        <span className="h-px w-8 bg-white/10" />
        <span className={step >= 2 ? "text-[#00E5FF]" : ""}>02 Symptom Intake</span>
        <span className="h-px w-8 bg-white/10" />
        <span className={step >= 3 ? "text-[#00E5FF]" : ""}>03 Medical History</span>
      </div>

      <Card className="border-white/[0.08] bg-[#0D1015] shadow-xl">
        <CardContent className="p-6">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in-0 duration-150">
              <div className="flex items-center gap-2 text-xs font-semibold text-white/45 uppercase tracking-wider mb-2">
                <Compass className="h-4 w-4 text-[#00E5FF]" />
                <span>Where is care needed?</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/65">Country</label>
                  <Input
                    value={formData.country}
                    onChange={e => handleChange("country", e.target.value)}
                    required
                    placeholder="e.g., Japan"
                    className="bg-[#07080A] border-white/[0.08] text-sm text-white/90 placeholder-white/20 focus-visible:ring-[#00E5FF]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/65">City</label>
                  <Input
                    value={formData.city}
                    onChange={e => handleChange("city", e.target.value)}
                    required
                    placeholder="e.g., Tokyo"
                    className="bg-[#07080A] border-white/[0.08] text-sm text-white/90 placeholder-white/20 focus-visible:ring-[#00E5FF]"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/65">Language Preference</label>
                <Input
                  value={formData.language}
                  onChange={e => handleChange("language", e.target.value)}
                  required
                  placeholder="e.g., en"
                  className="bg-[#07080A] border-white/[0.08] text-sm text-white/90 focus-visible:ring-[#00E5FF]"
                />
                <p className="text-[10px] text-white/30">
                  Default language code for routing translation support services.
                </p>
              </div>
              <Button
                onClick={() => formData.country && formData.city && setStep(2)}
                disabled={!formData.country || !formData.city}
                className="w-full bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#07080A] font-semibold text-xs h-9 transition-colors mt-2"
              >
                Continue <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in-0 duration-150">
              <div className="flex items-center gap-2 text-xs font-semibold text-white/45 uppercase tracking-wider mb-2">
                <Stethoscope className="h-4 w-4 text-[#00E5FF]" />
                <span>Describe the symptoms</span>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/65">Symptoms (comma separated)</label>
                <Textarea
                  value={formData.symptoms}
                  onChange={e => handleChange("symptoms", e.target.value)}
                  required
                  placeholder="e.g., stomach pain, fever, nausea"
                  className="bg-[#07080A] border-white/[0.08] text-sm text-white/90 placeholder-white/20 focus-visible:ring-[#00E5FF] min-h-[80px]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/65">Duration</label>
                <Input
                  value={formData.duration}
                  onChange={e => handleChange("duration", e.target.value)}
                  placeholder="e.g., 2 days"
                  className="bg-[#07080A] border-white/[0.08] text-sm text-white/90 placeholder-white/20 focus-visible:ring-[#00E5FF]"
                />
              </div>
              <div className="flex gap-3 mt-2">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="w-1/3 border-white/[0.08] hover:bg-white/[0.04] text-white/80 text-xs h-9"
                >
                  Back
                </Button>
                <Button
                  onClick={() => formData.symptoms && setStep(3)}
                  disabled={!formData.symptoms}
                  className="w-2/3 bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#07080A] font-semibold text-xs h-9 transition-colors"
                >
                  Continue <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in-0 duration-150">
              <div className="flex items-center gap-2 text-xs font-semibold text-white/45 uppercase tracking-wider mb-2">
                <User className="h-4 w-4 text-[#00E5FF]" />
                <span>Traveler Medical History</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/65">Known Allergies (optional)</label>
                  <Input
                    value={formData.allergies}
                    onChange={e => handleChange("allergies", e.target.value)}
                    placeholder="e.g., Penicillin"
                    className="bg-[#07080A] border-white/[0.08] text-sm text-white/90 placeholder-white/20 focus-visible:ring-[#00E5FF]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/65">Current Medications (optional)</label>
                  <Input
                    value={formData.medications}
                    onChange={e => handleChange("medications", e.target.value)}
                    placeholder="e.g., Metformin"
                    className="bg-[#07080A] border-white/[0.08] text-sm text-white/90 placeholder-white/20 focus-visible:ring-[#00E5FF]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-amber-400 bg-amber-500/5 border border-amber-500/10 p-3 rounded mt-2">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>
                  By initializing, our network will immediately start checking local pharmaceutical equivalents and physician availability matching this record.
                </span>
              </div>

              <div className="flex gap-3 mt-2">
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="w-1/3 border-white/[0.08] hover:bg-white/[0.04] text-white/80 text-xs h-9"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-2/3 bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#07080A] font-semibold text-xs h-9 transition-colors"
                >
                  {loading ? "Initializing..." : "Initialize Active Session"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
