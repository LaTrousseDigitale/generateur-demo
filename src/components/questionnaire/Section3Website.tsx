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

          {/* Questions spécifiques - Santé et bien-être */}
          {data.industry === "sante" && (
            <Card className="p-4 space-y-4 bg-accent/5 border-accent/30 mt-4">
              <Label className="text-base font-bold text-foreground">
                Questions spécifiques - Santé et bien-être
              </Label>
              
              <div className="space-y-3">
                <Label>Gestion patients et conformité</Label>
                {[
                  "Dossiers patients sécurisés",
                  "Prise de rendez-vous en ligne",
                  "Télémédecine / consultations virtuelles",
                  "Conformité HIPAA / protection données",
                  "Prescriptions électroniques",
                  "Portail patient (résultats, historique)",
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

          {/* Questions spécifiques - Éducation et formation */}
          {data.industry === "education" && (
            <Card className="p-4 space-y-4 bg-accent/5 border-accent/30 mt-4">
              <Label className="text-base font-bold text-foreground">
                Questions spécifiques - Éducation et formation
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
          {data.industry === "obnl" && (
            <Card className="p-4 space-y-4 bg-accent/5 border-accent/30 mt-4">
              <Label className="text-base font-bold text-foreground">
                Questions spécifiques - Organisme à but non lucratif
              </Label>
              
              <div className="space-y-3">
                <Label>Fonctionnalités OBNL</Label>
                {[
                  "Système de dons en ligne",
                  "Gestion des bénévoles et horaires",
                  "Calendrier d'événements publics",
                  "Galerie projets et impact",
                  "Infolettre et communications",
                  "Portail membres / donateurs",
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
        </Card>
      )}
    </div>
  );
};
