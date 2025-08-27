import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Users, Filter, Search, Utensils } from "lucide-react";

// Mock data for available food
const mockFoodData = [
  {
    id: 1,
    donorName: "Saravana Bhavan",
    location: "T. Nagar, Chennai",
    distance: "2.3 km",
    foodType: "South Indian Meals",
    quantity: "50 people",
    timeLeft: "2 hours",
    urgency: "high",
    description: "Fresh vegetarian meals with rice, sambar, rasam, and vegetables",
    contactNumber: "+91 98765 43210",
    verified: true,
  },
  {
    id: 2,
    donorName: "Grand Wedding Hall",
    location: "Adyar, Chennai",
    distance: "3.1 km",
    foodType: "Mixed Vegetarian",
    quantity: "100 people",
    timeLeft: "4 hours",
    urgency: "medium",
    description: "Wedding leftover food - variety rice, sweets, and curries",
    contactNumber: "+91 98765 43211",
    verified: true,
  },
  {
    id: 3,
    donorName: "Pizza Corner",
    location: "Velachery, Chennai",
    distance: "5.2 km",
    foodType: "Fast Food",
    quantity: "25 people",
    timeLeft: "1 hour",
    urgency: "high",
    description: "Fresh pizzas and garlic bread",
    contactNumber: "+91 98765 43212",
    verified: false,
  },
  {
    id: 4,
    donorName: "Temple Kitchen",
    location: "Mylapore, Chennai",
    distance: "4.8 km",
    foodType: "Prasadam",
    quantity: "200 people",
    timeLeft: "6 hours",
    urgency: "low",
    description: "Temple prasadam - rice, dal, and vegetable curry",
    contactNumber: "+91 98765 43213",
    verified: true,
  },
  {
    id: 5,
    donorName: "Biriyani House",
    location: "Anna Nagar, Chennai",
    distance: "7.1 km",
    foodType: "Biriyani & Curry",
    quantity: "75 people",
    timeLeft: "3 hours",
    urgency: "medium",
    description: "Chicken and mutton biriyani with raita and curry",
    contactNumber: "+91 98765 43214",
    verified: true,
  },
];

const LiveBoard = () => {
  const [foodItems, setFoodItems] = useState(mockFoodData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterUrgency, setFilterUrgency] = useState("all");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Filter food items based on search and urgency
  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.foodType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUrgency = filterUrgency === "all" || item.urgency === filterUrgency;
    return matchesSearch && matchesUrgency;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const stats = [
    { label: "Available Now", value: foodItems.length, icon: Utensils },
    { label: "Total Donors", value: "50+", icon: Users },
    { label: "Locations", value: "25+", icon: MapPin },
    { label: "Active Hours", value: "24/7", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Live <span className="text-aqua">Food Board</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time food availability near you. Find fresh donated food and connect with generous donors.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            Last updated: {currentTime.toLocaleTimeString()}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-dark-card border-border text-center">
              <CardContent className="p-4">
                <stat.icon className="h-6 w-6 text-aqua mx-auto mb-2" />
                <div className="text-xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by location, donor, or food type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-dark-surface border-border text-foreground"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterUrgency === "all" ? "default" : "outline"}
              onClick={() => setFilterUrgency("all")}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={filterUrgency === "high" ? "default" : "outline"}
              onClick={() => setFilterUrgency("high")}
              size="sm"
            >
              <Filter className="h-4 w-4 mr-1" />
              Urgent
            </Button>
            <Button
              variant={filterUrgency === "medium" ? "default" : "outline"}
              onClick={() => setFilterUrgency("medium")}
              size="sm"
            >
              Medium
            </Button>
            <Button
              variant={filterUrgency === "low" ? "default" : "outline"}
              onClick={() => setFilterUrgency("low")}
              size="sm"
            >
              Low
            </Button>
          </div>
        </div>

        {/* Food Items Grid */}
        {filteredItems.length === 0 ? (
          <Card className="bg-dark-card border-border">
            <CardContent className="p-12 text-center">
              <Utensils className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No food available</h3>
              <p className="text-muted-foreground">
                {searchTerm || filterUrgency !== "all" 
                  ? "Try adjusting your search or filters" 
                  : "Check back soon for new donations"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card 
                key={item.id} 
                className="bg-dark-card border-border hover:border-aqua/50 transition-all duration-300 hover:shadow-glow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg text-foreground">{item.donorName}</CardTitle>
                    {item.verified && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        ✓ Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {item.location} • {item.distance}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Food Type:</span>
                      <Badge variant="outline" className="text-aqua border-aqua/50">
                        {item.foodType}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Quantity:</span>
                      <span className="text-sm font-medium text-foreground">{item.quantity}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Time Left:</span>
                      <Badge className={getUrgencyColor(item.urgency)}>
                        <Clock className="h-3 w-3 mr-1" />
                        {item.timeLeft}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground bg-dark-surface p-3 rounded-md">
                      {item.description}
                    </p>
                    
                    <div className="pt-3 space-y-2">
                      <Button variant="hero" className="w-full" size="sm">
                        📞 Call: {item.contactNumber}
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        📍 Get Directions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Emergency Contact */}
        <div className="mt-12 text-center">
          <Card className="bg-dark-surface border-border">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Need Immediate Food Assistance?
              </h3>
              <p className="text-muted-foreground mb-4">
                Call our emergency helpline for urgent food needs
              </p>
              <Button variant="glow" size="lg">
                🚨 Emergency: +91 9597256330
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveBoard;