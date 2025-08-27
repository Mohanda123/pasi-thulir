import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, MessageCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent! 📧",
      description: "Thank you for reaching out. We'll get back to you within 24 hours.",
    });
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      primary: "+91 9597256330",
      secondary: "Available 24/7 for emergencies",
      action: "Call Now",
      urgent: false,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      primary: "+91 9597256330",
      secondary: "Quick responses via WhatsApp",
      action: "Message on WhatsApp",
      urgent: false,
    },
    {
      icon: Mail,
      title: "Email",
      primary: "pasithulir@gmail.com",
      secondary: "General inquiries and support",
      action: "Send Email",
      urgent: false,
    },
    {
      icon: AlertCircle,
      title: "Emergency Helpline",
      primary: "+91 8098016330",
      secondary: "For urgent food assistance",
      action: "Emergency Call",
      urgent: true,
    },
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 8:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 6:00 PM" },
    { day: "Sunday", hours: "Emergency calls only" },
    { day: "Emergency Line", hours: "24/7 Available" },
  ];

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contact <span className="text-aqua">Us</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions, suggestions, or need assistance? We're here to help you make a difference 
            in fighting hunger and reducing food waste.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((contact, index) => (
           <Card 
              key={index} 
              className={`bg-dark-card border-border hover:shadow-glow transition-all duration-300 ${
                contact.urgent ? 'border-red-500/30 bg-red-900/10' : ''
              }`}
            >
              <CardContent className="p-6 text-center">
                <contact.icon className={`h-10 w-10 mx-auto mb-4 ${
                  contact.urgent ? 'text-red-400' : 'text-aqua'
                }`} />
                <h3 className="text-lg font-semibold text-foreground mb-2">{contact.title}</h3>
                <p className={`font-medium mb-2 ${
                  contact.urgent ? 'text-red-400' : 'text-aqua'
                }`}>{contact.primary}</p>
                <p className="text-sm text-muted-foreground mb-4">{contact.secondary}</p>

                {/* 🔽 Replace Button here */}
                {contact.title === "WhatsApp" ? (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a
                      href="https://wa.me/919597256330"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contact.action}
                    </a>
                  </Button>
                ) : contact.title === "Phone Support" ? (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href="tel:+919597256330">{contact.action}</a>
                  </Button>
                ) : contact.title === "Email" ? (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href="mailto:pasithulir@gmail.com">{contact.action}</a>
                  </Button>
                ) : (
                  <Button
                    variant={contact.urgent ? "destructive" : "outline"}
                    size="sm"
                    className="w-full"
                  >
                    {contact.action}
                  </Button>
                )}
              </CardContent>
            </Card>

          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-dark-card border-border shadow-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        required
                        className="bg-dark-surface border-border text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="bg-dark-surface border-border text-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                        className="bg-dark-surface border-border text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-foreground">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="What is this about?"
                        required
                        className="bg-dark-surface border-border text-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us how we can help you..."
                      required
                      className="bg-dark-surface border-border text-foreground min-h-[120px]"
                    />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            {/* Office Hours */}
            <Card className="bg-dark-card border-border">
              <CardHeader>
                <CardTitle className="text-xl text-foreground flex items-center">
                  <Clock className="h-5 w-5 text-aqua mr-2" />
                  Support Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {officeHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{schedule.day}</span>
                    <span className="text-sm font-medium text-foreground">{schedule.hours}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-dark-surface border-border">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="donate" className="w-full" asChild>
                  <a href="/donate">🍽️ Donate Food Now</a>
                </Button>
                <Button variant="request" className="w-full" asChild>
                  <a href="/request">🙏 Request Food Help</a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/live-board">📋 View Live Board</a>
                </Button>
              </CardContent>
            </Card>

            {/* Emergency Notice */}
            <Card className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-800/30">
              <CardContent className="p-6 text-center">
                <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Emergency Food Need?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For urgent food assistance, don't wait - call our emergency line immediately.
                </p>
                <Button variant="destructive" className="w-full">
                  🚨 Emergency: +91 8098016330
                </Button>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="bg-dark-card border-border">
              <CardHeader>
                <CardTitle className="text-xl text-foreground flex items-center">
                  <MapPin className="h-5 w-5 text-aqua mr-2" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Operating across Tamil Nadu to create a <span className="text-aqua font-semibold">Pasi illa Tamil Nadu</span>. 
                  Together, we're building a community where no one goes hungry and nothing goes to waste.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;