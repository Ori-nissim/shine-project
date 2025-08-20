import { notFound } from 'next/navigation';
import { getPreviewData } from '@/lib/preview-storage';
import InspirationSiteTemplate from '@/templates/inspiration-site';
import dynamicImport from 'next/dynamic';
import PortfolioRenderer from '@/components/portfolio/PortfolioRenderer';
// Removed unused import
import { PortfolioConfig } from '@/lib/db/schema';

// Dynamically import DJ template to avoid SSR hydration issues
const DJTemplate = dynamicImport(() => import('@/templates/dj-template'), {
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Shine Platform Logo */}
        <div className="space-y-2" dir="ltr">
          <div className="flex items-center justify-center space-x-2 text-4xl font-bold">
            <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
              Shine
            </span>
            <span className="text-white">Platform</span>
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-yellow-300 mx-auto rounded-full"></div>
        </div>
        
        {/* Loading message */}
        <div className="text-white text-xl">טוען את האתר החדש שלך...</div>
        
        {/* Animated dots */}
        <div className="flex space-x-2 justify-center">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
        
        {/* Tagline */}
        <div className="text-gray-400 text-sm max-w-md mx-auto">
          Crafting digital experiences with passion and precision
        </div>
      </div>
    </div>
  )
});

interface PreviewPageProps {
  params: Promise<{
    key: string;
  }>;
}

// Generate static params for preview pages
export async function generateStaticParams() {
  // Return empty array to prevent static generation during build
  // This allows dynamic rendering while maintaining compatibility with Netlify
  return [];
}

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { key } = await params;
  
  // Get preview data
  const previewData = await getPreviewData(key);
  if (!previewData) {
    notFound();
  }
  
  // Render the appropriate template
  if (previewData.template === 'inspiration-site') {
    return (
      <InspirationSiteTemplate 
        data={previewData.data}
        whatsappNumber={previewData.whatsappNumber}
      />
    );
  }
  
  if (previewData.template === 'dj-template') {
    return (
      <DJTemplate 
        key={`dj-${key}`}
        data={previewData.data}
        whatsappNumber={previewData.whatsappNumber}
      />
    );
  }
  
  if (previewData.template === 'portfolio') {
    // Convert inspiration site data to portfolio config
    const portfolioConfig = convertToPortfolioConfig(previewData.data);
    return <PortfolioRenderer config={portfolioConfig} />;
  }
  
  if (previewData.template === 'landing-page') {
    // For now, use inspiration site template for landing page
    return (
      <InspirationSiteTemplate 
        data={previewData.data}
        whatsappNumber={previewData.whatsappNumber}
      />
    );
  }
  
  // If template not found, show 404
  notFound();
}

// Helper function to convert inspiration site data to portfolio config
function convertToPortfolioConfig(data: any): PortfolioConfig {
  return {
    meta: {
      title: data.hero?.title || "Professional Portfolio",
      description: data.hero?.subtitle || "Professional services",
      keywords: ["portfolio", "professional", "services"],
    },
    theme: {
      primaryColor: "#3B82F6",
      secondaryColor: "#1F2937",
      backgroundColor: "#FFFFFF",
      textColor: "#1F2937",
      fontFamily: "Inter, system-ui, sans-serif",
      borderRadius: 8,
      spacing: 24,
    },
    layout: {
      sections: [
        { id: "hero", type: "hero", order: 1, isVisible: true, config: { style: "hero-inspiration", alignment: "left", showCTA: true } },
        { id: "services", type: "services", order: 2, isVisible: true, config: { layout: "grid", columns: 3, showIcons: true } },
        { id: "about", type: "about", order: 3, isVisible: true, config: { layout: "split", showImage: true } },
        { id: "contact", type: "contact", order: 4, isVisible: true, config: { showForm: true, showSocial: true } },
        { id: "footer", type: "footer", order: 5, isVisible: true, config: { showCopyright: true, showSocial: true } }
      ],
      navigation: {
        isVisible: true,
        style: "minimal",
        links: [
          { label: "Home", href: "#hero", isExternal: false },
          { label: "Services", href: "#services", isExternal: false },
          { label: "About", href: "#about", isExternal: false },
          { label: "Contact", href: "#contact", isExternal: false },
        ]
      },
      footer: {
        isVisible: true,
        content: "© 2024 {{name}}. All rights reserved.",
        socialLinks: []
      }
    },
    content: {
      hero: {
        title: data.hero?.title || "Professional Services",
        subtitle: data.hero?.subtitle || "Expert solutions for your needs",
        description: data.about?.description || "Professional services with years of experience",
        ctaText: data.hero?.ctaText || "Get In Touch",
        ctaLink: "#contact",
      },
      services: data.services?.items?.map((service: any, index: number) => ({
        name: service.title,
        description: service.description,
        icon: service.icon || "briefcase",
        color: ["#3B82F6", "#F59E0B", "#10B981"][index % 3]
      })) || [],
      about: {
        title: data.about?.title || "About Me",
        content: data.about?.description || "Professional with years of experience",
        image: data.about?.image,
        skills: []
      },
      skills: {
        title: "Skills",
        skills: []
      },
      projects: {
        title: "Projects",
        projects: []
      },
      contact: {
        title: data.contact?.title || "Let's Work Together",
        email: data.contact?.email || "",
        phone: data.contact?.phone || "",
        location: data.contact?.address || "",
        socialLinks: []
      }
    }
  };
} 