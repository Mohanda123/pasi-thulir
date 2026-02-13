import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Users, Heart, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"; // adjust path if needed


const RequestFood = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    organizationName: "",
    organizationType: "",
    contactPerson: "",
    contactNumber: "",
    email: "",
    address: "",
    peopleCount: "",
    urgencyLevel: "",
    preferredTime: "",
    dietaryRestrictions: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, "requests"), {
      ...formData,
      createdAt: serverTimestamp(),
    });

    toast({
      title: "Request Submitted! 🙏",
      description: "Your food request has been registered successfully.",
    });

    // Reset form
    setFormData({
      organizationName: "",
      organizationType: "",
      contactPerson: "",
      contactNumber: "",
      email: "",
      address: "",
      peopleCount: "",
      urgencyLevel: "",
      preferredTime: "",
      dietaryRestrictions: "",
      description: "",
    });

  } catch (error) {
    console.error(error);
    toast({
      title: "Error",
      description: "Something went wrong!",
      variant: "destructive",
    });
  }
};


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Request <span className="text-aqua">Food</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with generous donors in your area. Request food for your organization 
            or community and help us eliminate hunger together.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-dark-card border-border text-center">
            <CardContent className="p-6">
              <Heart className="h-8 w-8 text-aqua mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">1000+</div>
              <div className="text-sm text-muted-foreground">Meals Delivered</div>
            </CardContent>
          </Card>
          <Card className="bg-dark-card border-border text-center">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-aqua mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">30+</div>
              <div className="text-sm text-muted-foreground">Organizations Helped</div>
            </CardContent>
          </Card>
          <Card className="bg-dark-card border-border text-center">
            <CardContent className="p-6">
              <MapPin className="h-8 w-8 text-aqua mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">25+</div>
              <div className="text-sm text-muted-foreground">Cities Covered</div>
            </CardContent>
          </Card>
        </div>

        {/* Request Form */}
        <Card className="bg-dark-card border-border shadow-glow">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground text-center">
              Food Request Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Organization Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="organizationName" className="text-foreground">
                    Organization Name *
                  </Label>
                  <Input
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) => handleInputChange("organizationName", e.target.value)}
                    placeholder="Enter organization name"
                    required
                    className="bg-dark-surface border-border text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizationType" className="text-foreground">
                    Organization Type *
                  </Label>
                  <Select
                    value={formData.organizationType}
                    onValueChange={(value) => handleInputChange("organizationType", value)}
                  >
                    <SelectTrigger className="bg-dark-surface border-border text-foreground">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-surface border-border">
                      <SelectItem value="orphanage">Orphanage</SelectItem>
                      <SelectItem value="shelter">Shelter Home</SelectItem>
                      <SelectItem value="ngo">NGO</SelectItem>
                      <SelectItem value="elderly-care">Elderly Care</SelectItem>
                      <SelectItem value="school">School</SelectItem>
                      <SelectItem value="community">Community Group</SelectItem>
                      <SelectItem value="family">Family in Need</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson" className="text-foreground">
                    Contact Person *
                  </Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                    placeholder="Enter contact person name"
                    required
                    className="bg-dark-surface border-border text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactNumber" className="text-foreground">
                    Contact Number *
                  </Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                    placeholder="+91 98765 43210"
                    required
                    className="bg-dark-surface border-border text-foreground"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your@email.com"
                  className="bg-dark-surface border-border text-foreground"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-foreground">
                  Delivery Address *
                </Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter complete address with landmarks"
                  required
                  className="bg-dark-surface border-border text-foreground min-h-[80px]"
                />
              </div>

              {/* Request Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="peopleCount" className="text-foreground">
                    Number of People *
                  </Label>
                  <Input
                    id="peopleCount"
                    type="number"
                    value={formData.peopleCount}
                    onChange={(e) => handleInputChange("peopleCount", e.target.value)}
                    placeholder="e.g., 50"
                    required
                    className="bg-dark-surface border-border text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgencyLevel" className="text-foreground">
                    Urgency Level *
                  </Label>
                  <Select
                    value={formData.urgencyLevel}
                    onValueChange={(value) => handleInputChange("urgencyLevel", value)}
                  >
                    <SelectTrigger className="bg-dark-surface border-border text-foreground">
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-surface border-border">
                      <SelectItem value="immediate">Immediate (Today)</SelectItem>
                      <SelectItem value="urgent">Urgent (1-2 days)</SelectItem>
                      <SelectItem value="moderate">Moderate (3-5 days)</SelectItem>
                      <SelectItem value="flexible">Flexible (Within a week)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredTime" className="text-foreground">
                    Preferred Time
                  </Label>
                  <Select
                    value={formData.preferredTime}
                    onValueChange={(value) => handleInputChange("preferredTime", value)}
                  >
                    <SelectTrigger className="bg-dark-surface border-border text-foreground">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-surface border-border">
                      <SelectItem value="morning">Morning (6AM - 12PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12PM - 6PM)</SelectItem>
                      <SelectItem value="evening">Evening (6PM - 10PM)</SelectItem>
                      <SelectItem value="anytime">Anytime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Dietary Restrictions */}
              <div className="space-y-2">
                <Label htmlFor="dietaryRestrictions" className="text-foreground">
                  Dietary Restrictions / Preferences
                </Label>
                <Input
                  id="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={(e) => handleInputChange("dietaryRestrictions", e.target.value)}
                  placeholder="e.g., Vegetarian, No spicy food, Halal, etc."
                  className="bg-dark-surface border-border text-foreground"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-foreground">
                  Additional Information
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Tell us more about your organization and specific needs..."
                  className="bg-dark-surface border-border text-foreground min-h-[100px]"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <Button type="submit" variant="request" size="xl" className="min-w-[200px]">
                  Submit Request
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-800/30">
            <CardContent className="p-6">
              <Phone className="h-8 w-8 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Emergency Food Request?
              </h3>
              <p className="text-muted-foreground mb-4">
                For urgent food needs, call our emergency helpline immediately
              </p>
              <Button variant="destructive" size="lg">
                🚨 Emergency: +91 8098016330
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RequestFood;