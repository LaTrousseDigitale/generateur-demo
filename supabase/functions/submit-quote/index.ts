import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://latroussedigitale.ca',
  'https://demos.latroussedigitale.ca',
  'https://www.latroussedigitale.ca',
  'http://localhost:5173',
  'http://localhost:8080',
]

function getCorsHeaders(req: Request) {
  const origin = req.headers.get('origin') || ''
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }
}

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }
  
  record.count++
  return false
}

// Validation constants
const MAX_SHORT_TEXT = 100
const MAX_MEDIUM_TEXT = 255
const MAX_LONG_TEXT = 1000
const MAX_ARRAY_LENGTH = 50

// Validation functions
function isValidEmail(email: string): boolean {
  if (!email) return true
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= MAX_MEDIUM_TEXT
}

function sanitizeString(value: unknown, maxLength: number): string | null {
  if (value === null || value === undefined) return null
  if (typeof value !== 'string') return null
  return value.trim().slice(0, maxLength) || null
}

function sanitizeStringArray(value: unknown, maxLength: number = MAX_ARRAY_LENGTH): string[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((item): item is string => typeof item === 'string')
    .slice(0, maxLength)
    .map(item => item.trim().slice(0, MAX_SHORT_TEXT))
    .filter(item => item.length > 0)
}

const validIndustries = [
  "services", "commerce", "transport", "sante", "construction",
  "tech", "education", "obnl", "restauration", "architecture",
  "auto", "arts-scene", "demenagement", "immobilier", "finances", "autre"
]

const validModules = [
  "calculateur-pdf", "rendez-vous", "tickets", "crm-lite",
  "projets-lite", "rh-lite", "base-connaissances", "chat-interne",
  "onboarding", "signatures", "kpi-dashboard"
]

const validSolutionTypes = ["website", "portal", "module"]
const validWebsiteTypes = ["vitrine", "ecommerce", "organisationnel"]
const validPortalTypes = ["client", "employes", "rh", "mixte"]
const validPaymentModes = ["abonnement", "proprietaire", "financement"]
const validMaintenanceLevels = ["essentiel", "avance", "premium", ""]
const validDomainTypes = ["nouveau", "existant", "transfert", ""]
const validHostingPreferences = ["lovable", "externe", ""]

function validateEnumValue(value: unknown, validValues: string[]): string | null {
  if (value === null || value === undefined) return null
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return validValues.includes(trimmed) ? trimmed : null
}

function validateEnumArray(value: unknown, validValues: string[]): string[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((item): item is string => typeof item === 'string' && validValues.includes(item))
    .slice(0, validValues.length)
}

interface QuoteData {
  companyName?: string
  industry?: string
  solutionTypes?: string[]
  websiteType?: string | null
  portalType?: string | null
  selectedModules?: string[]
  customModule?: string
  canvaServices?: string[]
  domainType?: string
  hostingPreference?: string
  paymentMode?: string | null
  maintenanceLevel?: string
  monthlyBudget?: string
  contactMethod?: string
  [key: string]: unknown
}

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req)
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('cf-connecting-ip') || 
                     'unknown'
    
    // Check rate limit
    if (isRateLimited(clientIP)) {
      console.warn(`[submit-quote] Rate limited: ${clientIP}`)
      return new Response(
        JSON.stringify({ error: 'Trop de requêtes. Veuillez réessayer dans quelques minutes.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const body: QuoteData = await req.json()

    // Validate and sanitize all fields server-side
    const companyName = sanitizeString(body.companyName, MAX_SHORT_TEXT)
    const contactMethod = sanitizeString(body.contactMethod, MAX_SHORT_TEXT)
    
    // Validate email format if provided
    if (contactMethod && contactMethod.includes('@') && !isValidEmail(contactMethod)) {
      return new Response(
        JSON.stringify({ error: 'Format d\'email invalide' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const industry = validateEnumValue(body.industry, validIndustries)
    const solutionTypes = validateEnumArray(body.solutionTypes, validSolutionTypes)
    const websiteType = validateEnumValue(body.websiteType, validWebsiteTypes)
    const portalType = validateEnumValue(body.portalType, validPortalTypes)
    const selectedModules = validateEnumArray(body.selectedModules, validModules)
    const customModule = sanitizeString(body.customModule, MAX_LONG_TEXT)
    const canvaServices = sanitizeStringArray(body.canvaServices)
    const domainType = validateEnumValue(body.domainType, validDomainTypes)
    const hostingPreference = validateEnumValue(body.hostingPreference, validHostingPreferences)
    const paymentMode = validateEnumValue(body.paymentMode, validPaymentModes)
    const maintenanceLevel = validateEnumValue(body.maintenanceLevel, validMaintenanceLevels)
    const monthlyBudget = sanitizeString(body.monthlyBudget, MAX_SHORT_TEXT)

    // Build sanitized questionnaire data (only include validated fields)
    const sanitizedQuestionnaireData: Record<string, unknown> = {}
    
    if (companyName) sanitizedQuestionnaireData.companyName = companyName
    if (industry) sanitizedQuestionnaireData.industry = industry
    if (solutionTypes.length > 0) sanitizedQuestionnaireData.solutionTypes = solutionTypes
    if (websiteType) sanitizedQuestionnaireData.websiteType = websiteType
    if (portalType) sanitizedQuestionnaireData.portalType = portalType
    if (selectedModules.length > 0) sanitizedQuestionnaireData.selectedModules = selectedModules
    if (customModule) sanitizedQuestionnaireData.customModule = customModule
    if (canvaServices.length > 0) sanitizedQuestionnaireData.canvaServices = canvaServices
    if (domainType) sanitizedQuestionnaireData.domainType = domainType
    if (hostingPreference) sanitizedQuestionnaireData.hostingPreference = hostingPreference
    if (paymentMode) sanitizedQuestionnaireData.paymentMode = paymentMode
    if (maintenanceLevel) sanitizedQuestionnaireData.maintenanceLevel = maintenanceLevel
    if (monthlyBudget) sanitizedQuestionnaireData.monthlyBudget = monthlyBudget
    if (contactMethod) sanitizedQuestionnaireData.contactMethod = contactMethod

    // Insert with sanitized data
    const quoteData = {
      client_email: contactMethod,
      client_name: companyName,
      company_name: companyName,
      solution_types: solutionTypes.length > 0 ? solutionTypes : null,
      industry,
      website_type: websiteType,
      portal_type: portalType,
      modules: selectedModules.length > 0 ? selectedModules : null,
      custom_module: customModule,
      canva_services: canvaServices.length > 0 ? canvaServices : null,
      domain_type: domainType,
      hosting_preference: hostingPreference,
      payment_mode: paymentMode,
      maintenance_level: maintenanceLevel,
      monthly_budget: monthlyBudget,
      questionnaire_data: sanitizedQuestionnaireData,
      status: 'pending'
    }

    const { data, error } = await supabase
      .from('quotes')
      .insert(quoteData)
      .select('id')
      .single()

    if (error) {
      console.error('[submit-quote] Database error:', error)
      return new Response(
        JSON.stringify({ error: 'Erreur lors de la sauvegarde du devis' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`[submit-quote] Quote created: ${data.id} from IP: ${clientIP}`)
    
    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('[submit-quote] Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Erreur interne du serveur' }),
      { status: 500, headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' } }
    )
  }
})
