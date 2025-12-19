import { useEffect, useRef, useState } from 'react';
import { useCartSync } from '@/hooks/useCartSync';
import { Button } from '@/components/ui/button';
import { Sparkles, ShoppingCart, Menu, X } from 'lucide-react';
import logoTrousseDigitale from '@/assets/logo-trousse-digitale.png';

interface SyncedHeaderProps {
  onCtaClick?: () => void;
}

// Fallback header when iframe fails or for immediate display
const FallbackHeader = ({ 
  cartItemCount, 
  cartSessionId, 
  onCtaClick 
}: { 
  cartItemCount: number; 
  cartSessionId: string;
  onCtaClick?: () => void;
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { label: "Accueil", href: "https://latroussedigitale.ca/" },
    { label: "Applications", href: "https://latroussedigitale.ca/#applications" },
    { label: "Démos", href: "https://latroussedigitale.ca/#demos" },
    { label: "Avantages", href: "https://latroussedigitale.ca/#avantages" },
    { label: "Tarifs", href: "https://latroussedigitale.ca/#tarifs" },
    { label: "Contact", href: "https://latroussedigitale.ca/#contact" }
  ];

  const cartUrl = `https://latroussedigitale.ca/panier?session_id=${cartSessionId}`;

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="https://latroussedigitale.ca" className="flex-shrink-0">
            <img 
              src={logoTrousseDigitale} 
              alt="La Trousse Digitale" 
              className="h-12 w-auto" 
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a 
                key={link.label} 
                href={link.href} 
                className="text-[15px] text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side - Cart & CTA */}
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Cart */}
            <a href={cartUrl} className="relative text-gray-500 hover:text-gray-700 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#ff6b3d] text-white text-[10px] font-medium rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </a>

            {/* CTA Button */}
            <Button 
              className="hidden sm:flex !bg-[#ff6b3d] hover:!bg-[#e55a2d] text-white rounded-lg px-5 py-2.5 text-[14px] font-medium items-center gap-2"
              onClick={onCtaClick}
            >
              <Sparkles className="h-4 w-4" />
              Générer ma démo
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-3">
              {navLinks.map(link => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  className="text-[15px] text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
                >
                  {link.label}
                </a>
              ))}
              <Button 
                className="!bg-[#ff6b3d] hover:!bg-[#e55a2d] text-white rounded-lg px-5 py-2.5 text-[14px] font-medium flex items-center gap-2 mt-2"
                onClick={onCtaClick}
              >
                <Sparkles className="h-4 w-4" />
                Générer ma démo
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export const SyncedHeader = ({ onCtaClick }: SyncedHeaderProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { itemCount: cartItemCount, sessionId: cartSessionId } = useCartSync();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);

  // The URL for the header embed page on the main site
  // latroussedigitale.ca needs to create this page: /header-embed
  const headerEmbedUrl = `https://latroussedigitale.ca/header-embed?session_id=${cartSessionId}&origin=${encodeURIComponent(window.location.origin)}`;

  // Send cart updates to iframe
  useEffect(() => {
    if (iframeRef.current && iframeLoaded) {
      iframeRef.current.contentWindow?.postMessage({
        type: 'CART_UPDATE',
        itemCount: cartItemCount,
        sessionId: cartSessionId
      }, 'https://latroussedigitale.ca');
    }
  }, [cartItemCount, cartSessionId, iframeLoaded]);

  // Listen for messages from the iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from the main site
      if (event.origin !== 'https://latroussedigitale.ca') return;

      const { type, data } = event.data;

      switch (type) {
        case 'HEADER_READY':
          console.log('[SyncedHeader] Header iframe ready');
          setIframeLoaded(true);
          break;
        case 'NAVIGATION':
          // Handle navigation - redirect the parent window
          window.location.href = data.href;
          break;
        case 'CTA_CLICK':
          // Handle CTA button click
          onCtaClick?.();
          break;
        case 'CART_CLICK':
          // Handle cart click - navigate to cart with session
          window.location.href = `https://latroussedigitale.ca/panier?session_id=${cartSessionId}`;
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [cartSessionId, onCtaClick]);

  // Handle iframe load error
  const handleIframeError = () => {
    console.log('[SyncedHeader] Iframe failed to load, using fallback');
    setIframeFailed(true);
  };

  // Timeout for iframe load
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!iframeLoaded) {
        console.log('[SyncedHeader] Iframe timeout, using fallback');
        setIframeFailed(true);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [iframeLoaded]);

  // Always show fallback for now until latroussedigitale.ca implements the embed page
  // Once implemented, change this to: if (iframeFailed)
  if (true || iframeFailed) {
    return (
      <FallbackHeader 
        cartItemCount={cartItemCount} 
        cartSessionId={cartSessionId}
        onCtaClick={onCtaClick}
      />
    );
  }

  return (
    <>
      {/* Show fallback while iframe loads */}
      {!iframeLoaded && (
        <FallbackHeader 
          cartItemCount={cartItemCount} 
          cartSessionId={cartSessionId}
          onCtaClick={onCtaClick}
        />
      )}
      
      {/* Hidden iframe that loads the actual header */}
      <iframe
        ref={iframeRef}
        src={headerEmbedUrl}
        className={`w-full border-0 sticky top-0 z-50 ${iframeLoaded ? 'block' : 'hidden'}`}
        style={{ height: '72px' }}
        onLoad={() => {
          console.log('[SyncedHeader] Iframe loaded');
        }}
        onError={handleIframeError}
        title="Header synchronisé"
        sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation"
      />
    </>
  );
};

export default SyncedHeader;