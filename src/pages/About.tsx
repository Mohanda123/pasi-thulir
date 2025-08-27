import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Target, Users, Leaf, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "Every meal shared is an act of love and kindness towards our community."
    },
    {
      icon: Target,
      title: "Zero Waste",
      description: "Our mission is to eliminate food waste while feeding those in need."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building stronger communities through food sharing and mutual support."
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Creating a sustainable ecosystem for food distribution and waste reduction."
    }
  ];

  const stats = [
    { number: "1000+", label: "Meals Donated", description: "Fresh meals delivered to those in need" },
    { number: "50+", label: "Active Donors", description: "Restaurants, hotels, and individuals" },
    { number: "30+", label: "Organizations", description: "Orphanages, shelters, and NGOs supported" },
    { number: "25+", label: "Locations", description: "Cities and areas covered across Tamil Nadu" }
  ];

  const team = [
    {
      name: "Vision Team",
      role: "Platform Creators",
      description: "Passionate individuals working towards a hunger-free Tamil Nadu"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <Leaf className="h-16 w-16 text-aqua mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              About <span className="text-aqua">Pasi Thulir</span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            "Pasi Thulir" என்றால் பசியை துளிராக மாற்றுவது. We believe that no one should go 
            hungry when there is surplus food available. Our platform bridges the gap between 
            food donors and those in need, creating a <span className="text-aqua font-semibold">Pasi illa Tamil Nadu</span>.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-dark-card border-border shadow-glow">
            <CardContent className="p-8">
              <Target className="h-12 w-12 text-aqua mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-aqua">Zero Hunger in Tamil Nadu.</strong> We envision a state where 
                no person goes to bed hungry, where surplus food reaches those who need it most, 
                and where communities come together to support each other.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-border shadow-glow">
            <CardContent className="p-8">
              <Heart className="h-12 w-12 text-aqua mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-aqua">Connect surplus food with hungry people.</strong> Through 
                technology and community spirit, we create efficient pathways for food donation, 
                ensuring fresh meals reach the right people at the right time.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Our <span className="text-aqua">Values</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-dark-card border-border hover:border-aqua/50 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <value.icon className="h-10 w-10 text-aqua mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Impact Stats */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Our <span className="text-aqua">Impact</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-dark-surface border-border text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-aqua mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-foreground mb-2">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            How <span className="text-aqua">It Works</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-dark-card border-border text-center">
              <CardContent className="p-8">
                <div className="bg-aqua/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-aqua">1</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Donors Register</h3>
                <p className="text-muted-foreground">
                  Restaurants, hotels, event organizers, and individuals register their surplus food on our platform.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-dark-card border-border text-center">
              <CardContent className="p-8">
                <div className="bg-aqua/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-aqua">2</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Smart Matching</h3>
                <p className="text-muted-foreground">
                  Our system matches available food with nearby organizations and individuals in need based on location and requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-dark-card border-border text-center">
              <CardContent className="p-8">
                <div className="bg-aqua/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-aqua">3</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Food Delivered</h3>
                <p className="text-muted-foreground">
                  Recipients collect the food directly from donors, ensuring fresh meals reach those who need them most.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quote Section */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-dark-surface to-dark-card border-aqua/30">
            <CardContent className="p-12 text-center">
              <blockquote className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                "Unavu aagattum anbu, waste aagamal vazhattuvom"
              </blockquote>
              <p className="text-lg text-aqua mb-4">
                Let food become love, let's live without waste
              </p>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                This Tamil saying embodies our core philosophy - transforming surplus food into acts of compassion, 
                ensuring nothing goes to waste while nourishing our community.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-dark-card border-border">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Join Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Be part of the movement to create a hunger-free Tamil Nadu. Whether you have food to donate 
                or represent an organization in need, your participation makes a difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/donate">Become a Donor</Link>
                </Button>
                <Button variant="request" size="xl" asChild>
                  <Link to="/request">Request Food</Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;