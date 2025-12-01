import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Globe } from "lucide-react";

interface Section3Props {
  data: any;
  onChange: (updates: any) => void;
}

export const Section3Website = ({ data, onChange }: Section3Props) => {
  const toggleItem = (field: string, item: string) => {
    const current = data[field] || [];
    const updated = current.includes(item) ? current.filter((i: string) => i !== item) : [...current, item];
    onChange({ [field]: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          Configuration du Site Web
        </h3>
        <p className="text-sm text-muted-foreground">Définissez le type et les fonctionnalités de votre site</p>
      </div>

      {/* Type de site */}
      <div className="space-y-2">
        <Label>Type de site web *</Label>
        <RadioGroup value={data.websiteType || ""} onValueChange={(value) => onChange({ websiteType: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vitrine" id="vitrine" />
            <label htmlFor="vitrine" className="text-sm cursor-pointer">
              Site Vitrine - Présentation de vos services/produits
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ecommerce" id="ecommerce" />
            <label htmlFor="ecommerce" className="text-sm cursor-pointer">
              E-commerce - Boutique en ligne
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="organisationnel" id="organisationnel" />
            <label htmlFor="organisationnel" className="text-sm cursor-pointer">
              Organisationnel - Intranet / Documentation
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Site Vitrine */}
      {data.websiteType === "vitrine" && (
        <Card className="p-4 space-y-4 bg-primary/5 border-primary/20">
          <div className="space-y-3">
            <Label>Pages principales (sélectionnez toutes celles qui s'appliquent)</Label>
            {["Accueil", "À propos", "Services", "Portfolio", "Blog", "Contact"].map((page) => (
              <div key={page} className="flex items-center space-x-2">
                <Checkbox
                  id={`page-${page}`}
                  checked={(data.websitePages || []).includes(page)}
                  onCheckedChange={() => toggleItem("websitePages", page)}
                />
                <label htmlFor={`page-${page}`} className="text-sm cursor-pointer">
                  {page}
                </label>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <Label>Sections importantes</Label>
            {["Témoignages clients", "FAQ", "Galerie photos", "Équipe", "Coordonnées"].map((section) => (
              <div key={section} className="flex items-center space-x-2">
                <Checkbox
                  id={`section-${section}`}
                  checked={(data.websiteSections || []).includes(section)}
                  onCheckedChange={() => toggleItem("websiteSections", section)}
                />
                <label htmlFor={`section-${section}`} className="text-sm cursor-pointer">
                  {section}
                </label>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* E-commerce */}
      {data.websiteType === "ecommerce" && (
        <Card className="p-4 space-y-4 bg-primary/5 border-primary/20">
          <div className="space-y-2">
            <Label>Nombre approximatif de produits</Label>
            <RadioGroup
              value={data.ecommerceProductCount || ""}
              onValueChange={(value) => onChange({ ecommerceProductCount: value })}
            >
              {["1-50 produits", "51-200 produits", "201-500 produits", "500+ produits"].map((range) => (
                <div key={range} className="flex items-center space-x-2">
                  <RadioGroupItem value={range} id={range} />
                  <label htmlFor={range} className="text-sm cursor-pointer">
                    {range}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="existing-platform">Plateforme e-commerce existante (si applicable)</Label>
            <Input
              id="existing-platform"
              value={data.ecommerceExistingPlatform || ""}
              onChange={(e) => onChange({ ecommerceExistingPlatform: e.target.value })}
              placeholder="Ex: Shopify, WooCommerce, Magento..."
            />
          </div>

          <div className="space-y-3">
            <Label>Fonctionnalités e-commerce nécessaires</Label>
            {[
              "Variantes de produits (tailles, couleurs)",
              "Abonnements récurrents",
              "Print on Demand (POD)",
              "Paiements en ligne sécurisés",
              "Calcul automatique de livraison",
              "Dropshipping",
              "Connexion FTP pour inventaire",
            ].map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={`ecom-${feature}`}
                  checked={(data.ecommerceNeeds || []).includes(feature)}
                  onCheckedChange={() => toggleItem("ecommerceNeeds", feature)}
                />
                <label htmlFor={`ecom-${feature}`} className="text-sm cursor-pointer">
                  {feature}
                </label>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label>Préférence de plateforme</Label>
            <RadioGroup
              value={data.ecommercePlatform || ""}
              onValueChange={(value) => onChange({ ecommercePlatform: value })}
            >
              {["Shopify", "WordPress / WooCommerce", "Solution personnalisée", "Peu importe"].map((platform) => (
                <div key={platform} className="flex items-center space-x-2">
                  <RadioGroupItem value={platform} id={`platform-${platform}`} />
                  <label htmlFor={`platform-${platform}`} className="text-sm cursor-pointer">
                    {platform}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Questions spécifiques - Vente automobile et pièces */}
          {data.industry === "auto" && (
            <Card className="p-4 space-y-4 bg-accent/5 border-accent/30 mt-4">
              <Label className="text-base font-bold text-foreground">
                Questions spécifiques - Vente automobile et pièces
              </Label>
              
              {/* Nouveaux: Questions sur le business */}
              <div className="space-y-2">
                <Label>Type de produits vendus *</Label>
                <RadioGroup
                  value={data.autoProductType || ""}
                  onValueChange={(value) => onChange({ autoProductType: value })}
                >
                  {[
                    "Pièces automobiles neuves",
                    "Pièces automobiles usagées / recyclées",
                    "Véhicules neufs et d'occasion",
                    "Accessoires et équipements",
                    "Mix de produits (pièces et véhicules)"
                  ].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <RadioGroupItem value={type} id={`product-type-${type}`} />
                      <label htmlFor={`product-type-${type}`} className="text-sm cursor-pointer">
                        {type}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Type d'acheteur principal *</Label>
                <RadioGroup
                  value={data.autoCustomerType || ""}
                  onValueChange={(value) => onChange({ autoCustomerType: value })}
                >
                  {[
                    "Particuliers (B2C)",
                    "Ateliers / Garages (B2B)",
                    "Concessionnaires (B2B)",
                    "Mix B2B et B2C"
                  ].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <RadioGroupItem value={type} id={`customer-type-${type}`} />
                      <label htmlFor={`customer-type-${type}`} className="text-sm cursor-pointer">
                        {type}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="current-sales">Comment gérez-vous vos ventes actuellement?</Label>
                <Input
                  id="current-sales"
                  value={data.autoCurrentSales || ""}
                  onChange={(e) => onChange({ autoCurrentSales: e.target.value })}
                  placeholder="Ex: Par téléphone, email, sur place uniquement..."
                />
              </div>
              
              <div className="space-y-3">
                <Label>Recherche et compatibilité véhicules</Label>
                {[
                  "Recherche par année/marque/modèle",
                  "Recherche par numéro VIN",
                  "Diagrammes et schémas de pièces",
                  "Compatibilité automatique des pièces",
                  "Catalogue pièces OEM vs aftermarket",
                ].map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={`auto-compat-${feature}`}
                      checked={(data.autoCompatibility || []).includes(feature)}
                      onCheckedChange={() => toggleItem("autoCompatibility", feature)}
                    />
                    <label htmlFor={`auto-compat-${feature}`} className="text-sm cursor-pointer">
                      {feature}
                    </label>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <Label>Fonctionnalités additionnelles</Label>
                {[
                  "Filtres avancés (prix, marque, condition)",
                  "Intégration fournisseurs (API/FTP)",
                  "Gestion des garanties",
                  "Programme de fidélité / points",
                  "Devis instantané pour installation",
                ].map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={`auto-feat-${feature}`}
                      checked={(data.autoSearchFeatures || []).includes(feature)}
                      onCheckedChange={() => toggleItem("autoSearchFeatures", feature)}
                    />
                    <label htmlFor={`auto-feat-${feature}`} className="text-sm cursor-pointer">
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Questions spécifiques - Restauration */}
          {data.industry === "restauration" && (
            <Card className="p-4 space-y-4 bg-accent/5 border-accent/30 mt-4">
              <Label className="text-base font-bold text-foreground">
                Questions spécifiques - Restauration
              </Label>
              
              {/* Nouvelles questions sur le business */}
              <div className="space-y-2">
                <Label>Type de restaurant *</Label>
                <RadioGroup
                  value={data.restaurantType || ""}
                  onValueChange={(value) => onChange({ restaurantType: value })}
                >
                  {[
                    "Restaurant traditionnel",
                    "Fast-food / Restauration rapide",
                    "Café / Bistro",
                    "Food truck / Traiteur",
                    "Restaurant gastronomique"
                  ].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <RadioGroupItem value={type} id={`resto-type-${type}`} />
                      <label htmlFor={`resto-type-${type}`} className="text-sm cursor-pointer">
                        {type}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Service de vente principal *</Label>
                <RadioGroup
                  value={data.restaurantSalesType || ""}
                  onValueChange={(value) => onChange({ restaurantSalesType: value })}
                >
                  {[
                    "Sur place uniquement",
                    "Livraison uniquement",
                    "À emporter uniquement",
                    "Mix (sur place + livraison/emporter)"
                  ].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <RadioGroupItem value={type} id={`sales-type-${type}`} />
                      <label htmlFor={`sales-type-${type}`} className="text-sm cursor-pointer">
                        {type}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="space-y-3">
                <Label>Fonctionnalités restaurant</Label>
                {[
                  "Menu en ligne avec photos et descriptions",
                  "Système de réservation de tables",
                  "Commande en ligne (pick-up / livraison)",
                  "Gestion des allergènes et restrictions alimentaires",
                  "Programme de fidélité",
                  "Horaires d'ouverture dynamiques",
                ].map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={`resto-${feature}`}
                      checked={(data.restaurantFeatures || []).includes(feature)}
                      onCheckedChange={() => toggleItem("restaurantFeatures", feature)}
                    />
                    <label htmlFor={`resto-${feature}`} className="text-sm cursor-pointer">
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Questions spécifiques - Commerce de détail */}
          {data.industry === "commerce" && (
            <Card className="p-4 space-y-4 bg-accent/5 border-accent/30 mt-4">
              <Label className="text-base font-bold text-foreground">
                Questions spécifiques - Commerce de détail
              </Label>
              
              {/* Nouvelles questions sur le business */}
              <div className="space-y-2">
                <Label>Type de commerce *</Label>
                <RadioGroup
                  value={data.retailType || ""}
                  onValueChange={(value) => onChange({ retailType: value })}
                >
                  {[
                    "Boutique unique",
                    "Chaîne de magasins",
                    "En ligne uniquement",
                    "Click & Collect (en ligne + magasin)"
                  ].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <RadioGroupItem value={type} id={`retail-type-${type}`} />
                      <label htmlFor={`retail-type-${type}`} className="text-sm cursor-pointer">
                        {type}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="retail-products">Quels types de produits vendez-vous?</Label>
                <Input
                  id="retail-products"
                  value={data.retailProductTypes || ""}
                  onChange={(e) => onChange({ retailProductTypes: e.target.value })}
                  placeholder="Ex: Vêtements, électronique, décoration..."
                />
              </div>
              
              <div className="space-y-3">
                <Label>Gestion magasin et inventaire</Label>
                {[
                  "Synchronisation inventaire magasin/en ligne",
                  "Scan codes-barres / QR",
                  "Programme de fidélité",
                  "Click & collect (acheter en ligne, ramasser en magasin)",
                  "Gestion des promotions et soldes",
                  "Alertes de stock bas",
                ].map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={`retail-${feature}`}
                      checked={(data.retailFeatures || []).includes(feature)}
                      onCheckedChange={() => toggleItem("retailFeatures", feature)}
                    />
                    <label htmlFor={`retail-${feature}`} className="text-sm cursor-pointer">
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </Card>
      )}

      {/* Organisationnel */}
      {data.websiteType === "organisationnel" && (
        <Card className="p-4 space-y-4 bg-primary/5 border-primary/20">
          <div className="space-y-3">
            <Label>Pages organisationnelles</Label>
            {["Annuaire employés", "Documentation interne", "Politiques et procédures", "Actualités internes"].map(
              (page) => (
                <div key={page} className="flex items-center space-x-2">
                  <Checkbox
                    id={`org-${page}`}
                    checked={(data.organisationalPages || []).includes(page)}
                    onCheckedChange={() => toggleItem("organisationalPages", page)}
                  />
                  <label htmlFor={`org-${page}`} className="text-sm cursor-pointer">
                    {page}
                  </label>
                </div>
              )
            )}
          </div>

          <div className="space-y-3">
            <Label>Fonctionnalités</Label>
            {["Recherche avancée", "Système de permissions", "Gestion de versions", "Authentification SSO"].map(
              (feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={`org-feat-${feature}`}
                    checked={(data.organisationalFeatures || []).includes(feature)}
                    onCheckedChange={() => toggleItem("organisationalFeatures", feature)}
                  />
                  <label htmlFor={`org-feat-${feature}`} className="text-sm cursor-pointer">
                    {feature}
                  </label>
                </div>
              )
            )}
          </div>

          {/* Questions spécifiques santé/education/obnl déplacées en dehors de cette section */}
        </Card>
      )}

      {/* ============================================ */}
      {/* QUESTIONS SPÉCIFIQUES PAR INDUSTRIE */}
      {/* S'affichent quel que soit le type de site */}
      {/* ============================================ */}

      {/* Questions spécifiques - Santé et bien-être */}
      {data.industry === "sante" && data.websiteType && (
        <Card className="p-4 space-y-4 bg-accent/5 border-accent/30">
          <Label className="text-base font-bold text-foreground flex items-center gap-2">
            🏥 Questions spécifiques - Santé et bien-être
          </Label>
          
          <div className="space-y-3">
            <Label>Fonctionnalités santé requises</Label>
            {[
              "Dossiers patients sécurisés",
              "Prise de rendez-vous en ligne",
              "Télémédecine / consultations virtuelles",
              "Conformité HIPAA / protection données",
              "Prescriptions électroniques",
              "Portail patient (résultats, historique)",
              "Rappels automatiques de rendez-vous",
              "Gestion des assurances",
            ].map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={`health-${feature}`}
                  checked={(data.healthCompliance || []).includes(feature)}
                  onCheckedChange={() => toggleItem("healthCompliance", feature)}
                />
                <label htmlFor={`health-${feature}`} className="text-sm cursor-pointer">
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Questions spécifiques - Construction */}
      {data.industry === "construction" && data.websiteType && (
        <Card className="p-4 space-y-4 bg-accent/5 border-accent/30">
          <Label className="text-base font-bold text-foreground flex items-center gap-2">
            🏗️ Questions spécifiques - Construction et rénovation
          </Label>
          
          <div className="space-y-3">
            <Label>Type de services offerts</Label>
            {[
              "Construction résidentielle",
              "Construction commerciale",
              "Rénovation intérieure",
              "Rénovation extérieure",
              "Toiture et revêtement",
              "Plomberie / Électricité",
            ].map((service) => (
              <div key={service} className="flex items-center space-x-2">
                <Checkbox
                  id={`construct-${service}`}
                  checked={(data.constructionServices || []).includes(service)}
                  onCheckedChange={() => toggleItem("constructionServices", service)}
                />
                <label htmlFor={`construct-${service}`} className="text-sm cursor-pointer">
                  {service}
                </label>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <Label>Fonctionnalités souhaitées</Label>
            {[
              "Portfolio de projets avec photos avant/après",
              "Formulaire de demande de soumission",
              "Calculateur de coût estimatif",
              "Témoignages clients et avis",
              "Galerie de réalisations par catégorie",
              "Certifications et licences affichées",
            ].map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={`construct-feat-${feature}`}
                  checked={(data.constructionFeatures || []).includes(feature)}
                  onCheckedChange={() => toggleItem("constructionFeatures", feature)}
                />
                <label htmlFor={`construct-feat-${feature}`} className="text-sm cursor-pointer">
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Questions spécifiques - Éducation et formation */}
      {data.industry === "education" && data.websiteType && (
        <Card className="p-4 space-y-4 bg-accent/5 border-accent/30">
          <Label className="text-base font-bold text-foreground flex items-center gap-2">
            🎓 Questions spécifiques - Éducation et formation
          </Label>
          
          <div className="space-y-3">
            <Label>Fonctionnalités académiques</Label>
            {[
              "Portail étudiants (notes, horaires, documents)",
              "Gestion des cours et inscriptions",
              "Plateforme e-learning / LMS",
              "Suivi de présences",
              "Communication parents-professeurs",
              "Bibliothèque de ressources pédagogiques",
              "Certificats et attestations en ligne",
              "Quiz et évaluations en ligne",
            ].map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={`edu-${feature}`}
                  checked={(data.educationFeatures || []).includes(feature)}
                  onCheckedChange={() => toggleItem("educationFeatures", feature)}
                />
                <label htmlFor={`edu-${feature}`} className="text-sm cursor-pointer">
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Questions spécifiques - OBNL */}
      {data.industry === "obnl" && data.websiteType && (
        <Card className="p-4 space-y-4 bg-accent/5 border-accent/30">
          <Label className="text-base font-bold text-foreground flex items-center gap-2">
            💚 Questions spécifiques - Organisme à but non lucratif
          </Label>
          
          <div className="space-y-3">
            <Label>Fonctionnalités OBNL</Label>
            {[
              "Système de dons en ligne (ponctuel et récurrent)",
              "Gestion des bénévoles et horaires",
              "Calendrier d'événements publics",
              "Galerie projets et impact",
              "Infolettre et communications",
              "Portail membres / donateurs",
              "Rapports annuels et transparence",
              "Campagnes de financement",
            ].map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={`nonprofit-${feature}`}
                  checked={(data.nonprofitFeatures || []).includes(feature)}
                  onCheckedChange={() => toggleItem("nonprofitFeatures", feature)}
                />
                <label htmlFor={`nonprofit-${feature}`} className="text-sm cursor-pointer">
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Questions spécifiques - Services professionnels */}
      {data.industry === "services" && data.websiteType && (
        <Card className="p-4 space-y-4 bg-accent/5 border-accent/30">
          <Label className="text-base font-bold text-foreground flex items-center gap-2">
            💼 Questions spécifiques - Services professionnels
          </Label>
          
          <div className="space-y-3">
            <Label>Fonctionnalités souhaitées</Label>
            {[
              "Présentation des services détaillée",
              "Témoignages et études de cas",
              "Formulaire de contact avancé",
              "Prise de rendez-vous en ligne",
              "Zone clients sécurisée",
              "Blog / Articles d'expertise",
              "FAQ dynamique",
              "Chat en direct",
            ].map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={`services-${feature}`}
                  checked={(data.servicesFeatures || []).includes(feature)}
                  onCheckedChange={() => toggleItem("servicesFeatures", feature)}
                />
                <label htmlFor={`services-${feature}`} className="text-sm cursor-pointer">
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Questions spécifiques - Architecture */}
      {data.industry === "architecture" && data.websiteType && (
        <Card className="p-4 space-y-4 bg-accent/5 border-accent/30">
          <Label className="text-base font-bold text-foreground flex items-center gap-2">
            🏛️ Questions spécifiques - Architecture et design
          </Label>
          
          <div className="space-y-3">
            <Label>Fonctionnalités portfolio</Label>
            {[
              "Galerie de projets haute résolution",
              "Filtres par type de projet",
              "Visualisation 3D / visite virtuelle",
              "Études de cas détaillées",
              "Processus de travail illustré",
              "Présentation de l'équipe",
              "Publications et récompenses",
              "Formulaire de brief projet",
            ].map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={`archi-${feature}`}
                  checked={(data.architectureFeatures || []).includes(feature)}
                  onCheckedChange={() => toggleItem("architectureFeatures", feature)}
                />
                <label htmlFor={`archi-${feature}`} className="text-sm cursor-pointer">
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Questions spécifiques - Arts de la scène */}
      {data.industry === "arts-scene" && data.websiteType && (
        <Card className="p-4 space-y-4 bg-accent/5 border-accent/30">
          <Label className="text-base font-bold text-foreground flex items-center gap-2">
            🎭 Questions spécifiques - Arts de la scène
          </Label>
          
          <div className="space-y-3">
            <Label>Fonctionnalités événementielles</Label>
            {[
              "Billetterie en ligne",
              "Calendrier des spectacles",
              "Présentation des artistes",
              "Galerie photos et vidéos",
              "Abonnements de saison",
              "Système de réservation de places",
              "Infolettre événements",
              "Intégration réseaux sociaux",
            ].map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={`arts-${feature}`}
                  checked={(data.artsFeatures || []).includes(feature)}
                  onCheckedChange={() => toggleItem("artsFeatures", feature)}
                />
                <label htmlFor={`arts-${feature}`} className="text-sm cursor-pointer">
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Questions spécifiques - Transport */}
      {data.industry === "transport" && data.websiteType && (
        <Card className="p-4 space-y-4 bg-accent/5 border-accent/30">
          <Label className="text-base font-bold text-foreground flex items-center gap-2">
            🚚 Questions spécifiques - Transport et logistique
          </Label>
          
          <div className="space-y-3">
            <Label>Fonctionnalités transport</Label>
            {[
              "Demande de soumission en ligne",
              "Suivi de colis / livraison",
              "Calculateur de tarifs",
              "Zones de livraison et délais",
              "Portail client pour historique",
              "Intégration API transporteurs",
              "Gestion de flotte",
              "Réservation de transport",
            ].map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={`transport-${feature}`}
                  checked={(data.transportFeatures || []).includes(feature)}
                  onCheckedChange={() => toggleItem("transportFeatures", feature)}
                />
                <label htmlFor={`transport-${feature}`} className="text-sm cursor-pointer">
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Questions spécifiques - Tech */}
      {data.industry === "tech" && data.websiteType && (
        <Card className="p-4 space-y-4 bg-accent/5 border-accent/30">
          <Label className="text-base font-bold text-foreground flex items-center gap-2">
            💻 Questions spécifiques - Technologie et informatique
          </Label>
          
          <div className="space-y-3">
            <Label>Fonctionnalités tech</Label>
            {[
              "Page produit / SaaS détaillée",
              "Documentation technique en ligne",
              "Démo ou essai gratuit",
              "Système de tickets support",
              "Base de connaissances / FAQ",
              "Blog technique",
              "Intégrations et API",
              "Tarification et plans",
            ].map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={`tech-${feature}`}
                  checked={(data.techFeatures || []).includes(feature)}
                  onCheckedChange={() => toggleItem("techFeatures", feature)}
                />
                <label htmlFor={`tech-${feature}`} className="text-sm cursor-pointer">
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
