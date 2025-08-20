# Inspiration Site Component Library

A comprehensive React component library for building professional business websites with Hebrew/RTL support, inspired by modern design patterns and best practices.

## 🎯 **Overview**

This component library provides a complete set of reusable components for creating professional business websites with:
- **Hebrew/RTL Support**: Full right-to-left text direction support
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Full type safety with comprehensive interfaces
- **Accessibility**: WCAG compliant components
- **Customization**: Highly configurable with props

## 📦 **Components**

### **1. Navbar**
Fixed navigation bar with scroll behavior and mobile menu.

```tsx
import { Navbar } from '@/components/inspiration-site';

<Navbar 
  logoText="Your Brand"
  navItems={[
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" }
  ]}
  ctaText="Get Quote"
/>
```

**Props:**
- `logoText?: string` - Brand/logo text
- `navItems?: Array<{name: string, href: string}>` - Navigation items
- `ctaText?: string` - Call-to-action button text

### **2. HeroSection**
Full-screen hero section with background image and call-to-action buttons.

```tsx
import { HeroSection } from '@/components/inspiration-site';

<HeroSection
  headline="Your Main Headline"
  subheadline="Your compelling subheadline"
  backgroundImage="https://example.com/image.jpg"
  primaryCTA="Get Started"
  secondaryCTA="Learn More"
  additionalText="Optional additional text"
/>
```

**Props:**
- `headline: string` - Main headline
- `subheadline: string` - Subheadline text
- `backgroundImage: string` - Background image URL
- `primaryCTA: string` - Primary button text
- `secondaryCTA: string` - Secondary button text
- `additionalText?: string` - Optional additional text

### **3. ServicesSection**
Grid layout for displaying services with icons and descriptions.

```tsx
import { ServicesSection } from '@/components/inspiration-site';

<ServicesSection
  title="Our Services"
  description="What we offer"
  items={[
    {
      icon: "Home",
      title: "Service 1",
      description: "Service description"
    }
  ]}
  backgroundColor="bg-secondary/50"
/>
```

**Props:**
- `title: string` - Section title
- `description: string` - Section description
- `items: ServiceItem[]` - Array of service items
- `backgroundColor?: string` - Background color class

### **4. AboutSection**
Two-column layout with image and content, including benefits list.

```tsx
import { AboutSection } from '@/components/inspiration-site';

<AboutSection
  title="About Us"
  description="Company description"
  image="https://example.com/image.jpg"
  imageAlt="About us image"
  benefits={[
    {
      title: "Benefit 1",
      description: "Benefit description"
    }
  ]}
  missionTitle="Our Mission"
  missionDescription="Mission statement"
/>
```

**Props:**
- `title: string` - Section title
- `description: string` - Main description
- `image: string` - Image URL
- `imageAlt: string` - Image alt text
- `benefits: AboutBenefit[]` - Array of benefits
- `missionTitle?: string` - Mission section title
- `missionDescription?: string` - Mission description
- `backgroundColor?: string` - Background color class

### **5. WhyChooseUsSection**
Three-column grid for highlighting value propositions.

```tsx
import { WhyChooseUsSection } from '@/components/inspiration-site';

<WhyChooseUsSection
  title="Why Choose Us"
  items={[
    {
      icon: "Star",
      title: "Quality",
      description: "We deliver quality"
    }
  ]}
  backgroundColor="bg-secondary/50"
/>
```

**Props:**
- `title: string` - Section title
- `items: WhyChooseItem[]` - Array of value propositions
- `backgroundColor?: string` - Background color class

### **6. TestimonialsSection**
Grid layout for customer testimonials with profile images.

```tsx
import { TestimonialsSection } from '@/components/inspiration-site';

<TestimonialsSection
  title="Customer Reviews"
  description="What our customers say"
  items={[
    {
      quote: "Great service!",
      name: "John Doe",
      position: "CEO",
      company: "Company Inc",
      image: "https://example.com/avatar.jpg"
    }
  ]}
  backgroundColor=""
/>
```

**Props:**
- `title: string` - Section title
- `description: string` - Section description
- `items: TestimonialItem[]` - Array of testimonials
- `backgroundColor?: string` - Background color class

### **7. ContactSection**
Contact form with contact information and WhatsApp integration.

```tsx
import { ContactSection } from '@/components/inspiration-site';

<ContactSection
  title="Contact Us"
  description="Get in touch"
  formTitle="Send Message"
  contactInfo={{
    title: "Contact Information",
    address: { title: "Address", value: "123 Main St" },
    phone: { title: "Phone", value: "+1234567890" },
    email: { title: "Email", value: "info@example.com" }
  }}
  socialConnect={{
    title: "Social Media",
    whatsappBtn: "WhatsApp Us"
  }}
  whatsappLink="https://wa.me/1234567890"
  backgroundColor="bg-secondary/50"
/>
```

**Props:**
- `title: string` - Section title
- `description: string` - Section description
- `formTitle: string` - Form title
- `contactInfo: ContactInfo` - Contact information
- `socialConnect: SocialConnect` - Social media info
- `whatsappLink: string` - WhatsApp link
- `backgroundColor?: string` - Background color class

## 🎨 **Styling & Theming**

### **Tailwind CSS Classes**
All components use Tailwind CSS with custom design tokens:
- `font-display` - Display font family
- `text-primary` - Primary color
- `bg-secondary/50` - Secondary background with opacity
- `border-border/50` - Border color with opacity

### **Responsive Design**
- Mobile-first approach
- Breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Flexible grid systems
- Touch-friendly interactions

### **RTL Support**
- `dir="rtl"` on main container
- Hebrew text support
- Right-to-left layout considerations

## 🔧 **Usage Examples**

### **Basic Implementation**
```tsx
import {
  Navbar,
  HeroSection,
  ServicesSection,
  AboutSection,
  WhyChooseUsSection,
  TestimonialsSection,
  ContactSection
} from '@/components/inspiration-site';

export default function BusinessWebsite() {
  return (
    <main className="min-h-screen" dir="rtl">
      <Navbar logoText="Your Brand" />
      <HeroSection {...heroProps} />
      <ServicesSection {...servicesProps} />
      <AboutSection {...aboutProps} />
      <WhyChooseUsSection {...whyChooseProps} />
      <TestimonialsSection {...testimonialsProps} />
      <ContactSection {...contactProps} />
    </main>
  );
}
```

### **Custom Styling**
```tsx
<ServicesSection
  title="Our Services"
  description="What we offer"
  items={services}
  backgroundColor="bg-blue-50" // Custom background
/>
```

### **Form Integration**
```tsx
// Custom form submission
const handleSubmit = async (formData) => {
  // Your form submission logic
  await submitToAPI(formData);
};
```

## 📱 **Mobile Optimization**

- **Touch-friendly**: Large touch targets
- **Responsive images**: Optimized for mobile
- **Mobile menu**: Hamburger menu for navigation
- **Form optimization**: Mobile-friendly form inputs

## ♿ **Accessibility Features**

- **Keyboard navigation**: Full keyboard support
- **Screen reader friendly**: Proper ARIA labels
- **Focus management**: Clear focus indicators
- **Color contrast**: WCAG compliant colors

## 🚀 **Performance**

- **Lazy loading**: Images and heavy content
- **Optimized bundles**: Tree-shaking support
- **Efficient rendering**: React.memo where appropriate
- **Minimal dependencies**: Lightweight components

## 🔄 **Customization**

### **Theme Customization**
```css
:root {
  --primary: 221 83% 53%;
  --secondary: 210 40% 96%;
  --background: 210 40% 98%;
  --foreground: 222 47% 11%;
}
```

### **Component Customization**
All components accept additional className props for custom styling:
```tsx
<HeroSection
  className="custom-hero-class"
  {...otherProps}
/>
```

## 📚 **TypeScript Support**

Full TypeScript support with comprehensive interfaces:
```tsx
interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

interface AboutBenefit {
  title: string;
  description: string;
}
```

## 🤝 **Contributing**

1. **Component Structure**: Follow the established pattern
2. **TypeScript**: Always include proper interfaces
3. **Props**: Use optional props with defaults
4. **Styling**: Use Tailwind CSS classes
5. **Accessibility**: Include proper ARIA attributes

## 📄 **License**

This component library is part of the Shine Platform project.

---

**Built with ❤️ for professional business websites** 