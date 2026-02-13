import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, Phone, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";


const DonateFood = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    donorName: "",
    organizationType: "",
    contactNumber: "",
    email: "",
    address: "",
    foodType: "",
    quantity: "",
    expiryTime: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, "donations"), {
      donorName: formData.donorName,
      organizationType: formData.organizationType,
      contactNumber: formData.contactNumber,
      email: formData.email,
      address: formData.address,
      foodType: formData.foodType,
      quantity: formData.quantity,
      expiryTime: formData.expiryTime,
      description: formData.description,
      createdAt: new Date(),
    });

    toast({
      title: "Donation Submitted! 🙏",
      description: "Stored successfully in database.",
    });

    setFormData({
      donorName: "",
      organizationType: "",
      contactNumber: "",
      email: "",
      address: "",
      foodType: "",
      quantity: "",
      expiryTime: "",
      description: "",
    });

  } catch (error) {
    console.error(error);
    toast({
      title: "Error",
      description: "Something went wrong!",
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
            Donate <span className="text-aqua">Food</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your surplus food and help create a hunger-free community. 
            Every meal donated brings hope to someone in need.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-dark-card border-border text-center">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-aqua mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">50+</div>
              <div className="text-sm text-muted-foreground">Active Donors</div>
            </CardContent>
          </Card>
          <Card className="bg-dark-card border-border text-center">
            <CardContent className="p-6">
              <MapPin className="h-8 w-8 text-aqua mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">25+</div>
              <div className="text-sm text-muted-foreground">Locations Covered</div>
            </CardContent>
          </Card>
          <Card className="bg-dark-card border-border text-center">
            <CardContent className="p-6">
              <Clock className="h-8 w-8 text-aqua mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </CardContent>
          </Card>
        </div>

        {/* Donation Form */}
        <Card className="bg-dark-card border-border shadow-glow">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground text-center">
              Food Donation Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Donor Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="donorName" className="text-foreground">
                    Donor Name / Organization *
                  </Label>
                  <Input
                    id="donorName"
                    value={formData.donorName}
                    onChange={(e) => handleInputChange("donorName", e.target.value)}
                    placeholder="Enter your name or organization"
                    required
                    className="bg-dark-surface border-border text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizationType" className="text-foreground">
                    Organization Type
                  </Label>
                  <Select
                    value={formData.organizationType}
                    onValueChange={(value) => handleInputChange("organizationType", value)}
                  >
                    <SelectTrigger className="bg-dark-surface border-border text-foreground">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-surface border-border">
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="hotel">Hotel</SelectItem>
                      <SelectItem value="marriage-hall">Marriage Hall</SelectItem>
                      <SelectItem value="event">Event Organizer</SelectItem>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactNumber" className="text-foreground">
                    Contact Number *
                  </Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                    placeholder="+91 9876543210"
                    required
                    className="bg-dark-surface border-border text-foreground"
                  />
                </div>

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
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-foreground">
                  Pickup Address *
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

              {/* Food Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="foodType" className="text-foreground">
                    Food Type *
                  </Label>
                  <Select
                    value={formData.foodType}
                    onValueChange={(value) => handleInputChange("foodType", value)}
                  >
                    <SelectTrigger className="bg-dark-surface border-border text-foreground">
                      <SelectValue placeholder="Select food type" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-surface border-border">
                      <SelectItem value="cooked-meals">Cooked Meals</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="fruits">Fruits</SelectItem>
                      <SelectItem value="snacks">Snacks</SelectItem>
                      <SelectItem value="sweets">Sweets</SelectItem>
                      <SelectItem value="mixed">Mixed Items</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-foreground">
                    Quantity *
                  </Label>
                  <Input
                    id="quantity"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange("quantity", e.target.value)}
                    placeholder="e.g., 50 people, 10 kg"
                    required
                    className="bg-dark-surface border-border text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiryTime" className="text-foreground">
                    Best Before *
                  </Label>
                  <Input
                    id="expiryTime"
                    type="datetime-local"
                    value={formData.expiryTime}
                    onChange={(e) => handleInputChange("expiryTime", e.target.value)}
                    required
                    className="bg-dark-surface border-border text-foreground"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-foreground">
                  Additional Notes
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Any special instructions, dietary information, or additional details..."
                  className="bg-dark-surface border-border text-foreground min-h-[100px]"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <Button type="submit" variant="hero" size="xl" className="min-w-[200px]">
                  Submit Donation
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <Card className="bg-dark-surface border-border">
            <CardContent className="p-6">
              <Phone className="h-8 w-8 text-aqua mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Need Help with Donation?
              </h3>
              <p className="text-muted-foreground mb-4">
                Call our support team for immediate assistance
              </p>
              <Button variant="outline" size="lg">
                📞 +91 9597256330
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DonateFood;