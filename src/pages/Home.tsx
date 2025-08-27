import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Heart, Users, MapPin, Clock, Leaf, ArrowRight, Shield, Star, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import chennaiCommunity from "@/assets/chennai-community.jpg";
import donorChef from "@/assets/donor-chef.jpg";
import childrenReceiving from "@/assets/children-receiving.jpg";
import volunteerTeam from "@/assets/volunteer-team.jpg";

const Home = () => {
  const stats = [
    { number: "2,500+", label: "Meals Donated", icon: Heart, description: "Fresh meals delivered daily" },
    { number: "150+", label: "Active Donors", icon: Users, description: "Restaurants & individuals" },
    { number: "50+", label: "Locations", icon: MapPin, description: "Across Chennai & Tamil Nadu" },
    { number: "24/7", label: "Available", icon: Clock, description: "Round-the-clock support" },
  ];

  const impactMetrics = [
    { metric: "95%", label: "Success Rate", description: "Food successfully delivered" },
    { metric: "30min", label: "Avg Response", description: "Quick donor-recipient matching" },
    { metric: "Zero", label: "Cost to Users", description: "Completely free platform" },
    { metric: "100%", label: "Verified", description: "All donors are authenticated" },
  ];

  const features = [
    {
      title: "Smart Food Matching",
      description: "AI-powered system instantly connects surplus food with nearby recipients based on location, dietary needs, and availability.",
      icon: MapPin,
      image: chennaiCommunity,
    },
    {
      title: "Trusted Donor Network", 
      description: "Partner with verified restaurants, hotels, and individuals across Chennai who are committed to reducing food waste.",
      icon: Shield,
      image: donorChef,
    },
    {
      title: "Real Impact Tracking",
      description: "See the direct impact of your donations with real-time tracking and community feedback from recipients.",
      icon: TrendingUp,
      image: childrenReceiving,
    },
  ];

  const testimonials = [
    {
      name: "Ramesh Kumar",
      role: "Restaurant Owner, T. Nagar",
      quote: "Pasi Thulir made it so easy to donate our surplus food. Now nothing goes to waste!",
      rating: 5,
    },
    {
      name: "Sister Mary",
      role: "Orphanage Director",
      quote: "The children get fresh, nutritious meals regularly. This platform is a blessing.",
      rating: 5,
    },
    {
      name: "Priya Shankar",
      role: "NGO Coordinator",
      quote: "Professional, efficient, and truly making a difference in our community.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Enhanced with Professional Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Food donation platform connecting Chennai communities"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/95 to-dark-bg/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-bg/40" />
        </div>

        {/* Premium Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <Leaf className="h-12 w-12 text-aqua animate-pulse" />
                    <div className="absolute inset-0 bg-aqua/20 rounded-full blur-lg" />
                  </div>
                  <div className="ml-4">
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground">
                      Pasi <span className="text-transparent bg-gradient-premium bg-clip-text">Thulir</span>
                    </h1>
                  </div>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <h2 className="text-2xl md:text-3xl text-aqua-light font-medium font-display">
                  "Unavu aagattum anbu, waste aagamal vazhattuvom"
                </h2>
                
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                  Connect surplus food with hungry hearts across Chennai. Join our mission to create a 
                  <span className="text-aqua font-semibold"> Pasi illa Tamil Nadu</span> 🌾
                </p>

                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-green-400 mr-2" />
                    Verified Donors
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-aqua mr-2" />
                    24/7 Support
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-2" />
                    5-Star Rated
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button variant="hero" size="xl" className="group shadow-premium hover:shadow-aqua-strong transition-all duration-500" asChild>
                  <Link to="/donate">
                    Donate Food Now
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="request" size="xl" className="shadow-elevation hover:shadow-glow transition-all duration-300" asChild>
                  <Link to="/request">Request Food Support</Link>
                </Button>
              </div>
            </div>

            {/* Right Content - Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-dark-card/90 backdrop-blur-md border-border/50 hover:shadow-premium transition-all duration-500 hover:border-aqua/30 group">
                  <CardContent className="p-6 text-center">
                    <stat.icon className="h-8 w-8 text-aqua mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-3xl font-bold text-foreground font-display">{stat.number}</div>
                    <div className="text-sm font-medium text-aqua">{stat.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Premium floating elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-aqua/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-aqua-light/10 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-aqua-dark/10 rounded-full blur-xl animate-pulse delay-500" />
      </section>

      {/* Impact Metrics Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Real <span className="text-aqua">Impact</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Numbers that matter - see how our Chennai community is making a difference together.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {impactMetrics.map((metric, index) => (
              <Card key={index} className="bg-dark-card/50 backdrop-blur-md border-border/30 text-center group hover:shadow-premium transition-all duration-500">
                <CardContent className="p-8">
                  <div className="text-4xl md:text-5xl font-display font-bold text-aqua mb-2 group-hover:scale-110 transition-transform duration-300">
                    {metric.metric}
                  </div>
                  <div className="text-lg font-semibold text-foreground mb-1">{metric.label}</div>
                  <div className="text-sm text-muted-foreground">{metric.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Chennai People */}
      <section className="py-20 bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              How <span className="text-aqua">Pasi Thulir</span> Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform makes food donation simple, efficient, and impactful for everyone involved across Chennai.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <Card className="bg-dark-card border-border hover:border-aqua/50 transition-all duration-500 hover:shadow-premium overflow-hidden">
                  {/* Feature Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={`${feature.title} - Chennai community`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card/80 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <feature.icon className="h-10 w-10 text-aqua group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-display font-semibold text-foreground mb-4 group-hover:text-aqua transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Chennai Community <span className="text-aqua">Stories</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from our valued donors and recipients who are making Pasi Thulir a success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-dark-card border-border hover:shadow-glow transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-foreground mb-6 italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="border-t border-border pt-4">
                    <div className="font-semibold text-aqua">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Image Section */}
      <section className="py-20 bg-gradient-to-r from-dark-surface to-dark-card relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={volunteerTeam} 
            alt="Pasi Thulir volunteer team from Chennai"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/90 to-dark-surface/90" />
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            Join the Chennai Food Revolution
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Be part of our growing community of food heroes across Chennai and Tamil Nadu. 
            Together, we're building a future where <span className="text-aqua font-semibold">Pasi illa Tamil Nadu</span> becomes reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" className="shadow-premium hover:shadow-aqua-strong transition-all duration-500" asChild>
              <Link to="/donate">Become a Food Hero</Link>
            </Button>
            <Button variant="outline" size="xl" className="shadow-elevation hover:shadow-glow transition-all duration-300" asChild>
              <Link to="/about">Our Mission</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-dark-bg via-dark-surface to-dark-bg">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Leaf className="h-16 w-16 text-aqua mx-auto mb-4 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Every meal shared brings us closer to our dream of zero hunger in Tamil Nadu.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="glow" size="xl" className="shadow-premium hover:shadow-aqua-strong transition-all duration-500" asChild>
              <Link to="/donate">Start Donating Now</Link>
            </Button>
            <Button variant="request" size="xl" className="shadow-elevation hover:shadow-glow transition-all duration-300" asChild>
              <Link to="/request">Request Food Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;