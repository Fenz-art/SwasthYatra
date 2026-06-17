import { prisma } from "@/lib/prisma"
import { twilioWhatsAppService } from "./twilio-whatsapp.service"

const SEED_TEMPLATES = [
  {
    key: "PROVIDER_INVITATION",
    name: "Provider Invitation",
    channel: "WHATSAPP" as const,
    content: `Hello Dr. {{name}},\n\nA traveler near your location needs medical assistance.\n\nLanguage: {{language}}\nIssue: {{issue}}\n\nReply YES to accept this case.\nReply NO to decline.\n\nSwasthYatra Health Network`,
  },
  {
    key: "PROVIDER_ASSIGNMENT",
    name: "Provider Assignment",
    channel: "WHATSAPP" as const,
    content: `Hello Dr. {{name}},\n\nYou have been assigned a new patient.\n\nPatient Issue: {{issue}}\nLocation: {{city}}, {{country}}\n\nA conversation has been opened. Please respond to the patient.\n\nSwasthYatra Health Network`,
  },
  {
    key: "PROVIDER_FOLLOWUP",
    name: "Provider Follow-up",
    channel: "WHATSAPP" as const,
    content: `Hello Dr. {{name}},\n\nThis is a follow-up regarding the patient from {{city}}.\n\n{{message}}\n\nPlease respond at your earliest convenience.\n\nSwasthYatra Health Network`,
  },
  {
    key: "PROVIDER_ESCALATION",
    name: "Provider Escalation",
    channel: "WHATSAPP" as const,
    content: `Hello Dr. {{name}},\n\nThis is an escalation notice.\n\nPatient: {{issue}}\nStatus: No response received\n\nPlease respond within 30 minutes or the case will be reassigned.\n\nSwasthYatra Health Network`,
  },
  {
    key: "PATIENT_UPDATE",
    name: "Patient Update",
    channel: "WHATSAPP" as const,
    content: `Hello {{patientName}},\n\nWe found a provider near you:\n\n{{providerName}}\n{{providerAddress}}\n\nThey have been notified of your request and will respond shortly.\n\nSwasthYatra Health Network`,
  },
]

export const messageTemplateService = {
  async seed() {
    for (const tmpl of SEED_TEMPLATES) {
      await prisma.messageTemplate.upsert({
        where: { key: tmpl.key },
        update: { content: tmpl.content, active: true },
        create: tmpl,
      })
    }
  },

  async getByKey(key: string) {
    return prisma.messageTemplate.findUnique({ where: { key } })
  },

  async getAll() {
    return prisma.messageTemplate.findMany({ orderBy: { name: "asc" } })
  },

  render(template: string, variables: Record<string, string>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => variables[key] ?? `{{${key}}}`)
  },

  async renderAndSend(
    key: string,
    to: string,
    variables: Record<string, string>,
    deliveryId?: string,
  ) {
    const template = await this.getByKey(key)
    if (!template || !template.active) {
      return { success: false, error: `Template ${key} not found or inactive` }
    }

    const content = this.render(template.content, variables)
    return twilioWhatsAppService.sendMessage(to, content, deliveryId)
  },
}
