"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, MessageSquare } from "lucide-react";

export interface ContactInfo {
  title: string;
  address: {
    title: string;
    value: string;
  };
  phone: {
    title: string;
    value: string;
  };
  email: {
    title: string;
    value: string;
  };
}

export interface SocialConnect {
  title: string;
  whatsappBtn: string;
}

export interface ContactSectionProps {
  title: string;
  description: string;
  formTitle: string;
  contactInfo: ContactInfo;
  socialConnect: SocialConnect;
  whatsappLink: string;
  backgroundColor?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  title,
  description,
  formTitle,
  contactInfo,
  socialConnect,
  whatsappLink,
  backgroundColor = "bg-secondary/50"
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert("ההודעה נשלחה! נחזור אליך בהקדם 😊");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className={`py-16 md:py-24 ${backgroundColor}`} id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-4">
            {title}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        
        {/* Contact Form and Information */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card shadow-md rounded-lg p-6">
            <h3 className="font-display font-semibold text-xl md:text-2xl leading-tight mb-6">
              {formTitle}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  שם
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  אימייל
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  טלפון
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  איך אפשר לעזור?
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="min-h-[120px]"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "שולח..." : "שלח הודעה"}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="font-display font-semibold text-xl md:text-2xl leading-tight mb-6">
                {contactInfo.title}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">
                      {contactInfo.address.title}
                    </h4>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {contactInfo.address.value}
                    </p>
                  </div>
                </div>

                <a className="flex items-start gap-4" href={`tel:${contactInfo.phone.value}`}>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">
                      {contactInfo.phone.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {contactInfo.phone.value}
                    </p>
                  </div>
                </a>

                <a className="flex items-start gap-4" href={`mailto:${contactInfo.email.value}`}>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">
                      {contactInfo.email.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {contactInfo.email.value}
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* WhatsApp Button */}
            <div className="mt-8">
              <h4 className="font-medium text-lg mb-4">
                {socialConnect.title}
              </h4>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
                {socialConnect.whatsappBtn}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 