import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { FileText, Mail, Phone, User } from "lucide-react";

interface Section9Props {
  data: any;
  onChange: (updates: any) => void;
}

export const Section9Summary = ({
  data,
  onChange
}: Section9Props) => {
  return <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Résumé et contact
        </h3>
        <p className="text-sm text-muted-foreground">
          Derniers détails avant de voir votre démo personnalisée
        </p>
      </div>

      {/* Nom du contact */}
      <div className="space-y-2">
        <Label htmlFor="contact-name">
          <span className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Votre nom complet *
          </span>
        </Label>
        <Input 
          id="contact-name" 
          value={data.contactName || ""} 
          onChange={e => onChange({ contactName: e.target.value })} 
          placeholder="Jean Tremblay"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="contact-email">
          <span className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Votre adresse courriel *
          </span>
        </Label>
        <Input 
          id="contact-email" 
          type="email"
          value={data.contactEmail || ""} 
          onChange={e => onChange({ contactEmail: e.target.value })} 
          placeholder="jean@monentreprise.ca"
        />
      </div>

      {/* Téléphone */}
      <div className="space-y-2">
        <Label htmlFor="contact-phone">
          <span className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Votre numéro de téléphone
          </span>
        </Label>
        <Input 
          id="contact-phone" 
          type="tel"
          value={data.contactPhone || ""} 
          onChange={e => onChange({ contactPhone: e.target.value })} 
          placeholder="514-555-1234"
        />
      </div>

      {/* Méthode de contact préférée */}
      <div className="space-y-3">
        <Label>Comment préférez-vous être contacté ? *</Label>
        <RadioGroup value={data.contactMethod || ""} onValueChange={value => onChange({
        contactMethod: value
      })}>
          <Card className="p-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="contact-method-email" />
              <Mail className="w-4 h-4 text-muted-foreground" />
              <label htmlFor="contact-method-email" className="text-sm cursor-pointer flex-1">
                Par courriel
              </label>
            </div>
          </Card>

          <Card className="p-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="telephone" id="contact-method-telephone" />
              <Phone className="w-4 h-4 text-muted-foreground" />
              <label htmlFor="contact-method-telephone" className="text-sm cursor-pointer flex-1">
                Par téléphone
              </label>
            </div>
          </Card>

          <Card className="p-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="whatsapp" id="contact-method-whatsapp" />
              <Phone className="w-4 h-4 text-muted-foreground" />
              <label htmlFor="contact-method-whatsapp" className="text-sm cursor-pointer flex-1">
                Messenger
              </label>
            </div>
          </Card>
        </RadioGroup>
      </div>

      {/* Autres besoins */}
      <div className="space-y-2">
        <Label htmlFor="other-needs">Autres besoins ou commentaires</Label>
        <Textarea id="other-needs" value={data.otherNeeds || ""} onChange={e => onChange({
        otherNeeds: e.target.value
      })} placeholder="Y a-t-il d'autres fonctionnalités ou exigences spécifiques que vous aimeriez mentionner ?" rows={4} />
      </div>

      {/* Confirmation */}
      <Card className="p-4 bg-primary/5 border-primary/20">
        <p className="text-sm">
          Presque terminé ! Une fois que vous aurez cliqué sur "suivant", vous accéderez à votre démo en temps réel ainsi qu'un devis personnalisé de votre projet. Pour toute question, n'hésitez pas à nous joindre du lundi au jeudi de 11h à 19h et les vendredi entre 10h et 14h. Nous vous répondrons dans un délai de 24 heures ouvrables.
        </p>
      </Card>
    </div>;
};
