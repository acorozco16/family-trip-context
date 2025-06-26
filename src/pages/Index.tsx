
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar, Heart, Star, ArrowRight, Plane, Hotel, Car } from "lucide-react";

const Index = () => {
  console.log("Index component is rendering");
  const navigate = useNavigate();
  const [activeDemo, setActiveDemo] = useState("onboarding");

  console.log("Navigate function:", navigate);
  console.log("Active demo state:", activeDemo);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {console.log("Rendering Index page content")}
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">FamilySync</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => {
                console.log("Dashboard button clicked");
                navigate("/dashboard");
              }}
              className="text-gray-600 hover:text-blue-600"
            >
              View Demo
            </Button>
            <Button 
              onClick={() => {
                console.log("Start Planning button clicked");
                navigate("/trip-creator");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Start Planning
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-100">
            Try First, Signup Later
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Family Travel Planning
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
              Made Simple
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Get AI-powered recommendations tailored to your family's unique needs. 
            From kids' sleep schedules to travel preferences, we help you plan the perfect trip.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/trip-creator")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
            >
              Plan Your Trip
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
            >
              See Demo Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything Your Family Needs
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive trip planning that understands family dynamics
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Family Profiles</CardTitle>
              <CardDescription>
                Capture each family member's needs, from sleep schedules to dietary restrictions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-orange-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Smart Recommendations</CardTitle>
              <CardDescription>
                AI-powered suggestions based on your family's unique travel style and concerns
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-green-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Complete Booking</CardTitle>
              <CardDescription>
                Flights, hotels, transport, and activities - all organized in one collaborative space
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="container mx-auto px-6 py-16 bg-white/50 rounded-2xl mx-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            See FamilySync in Action
          </h2>
          <p className="text-lg text-gray-600">
            Explore our Barcelona family trip demo
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-4 mb-6 justify-center">
            <Button
              variant={activeDemo === "onboarding" ? "default" : "outline"}
              onClick={() => setActiveDemo("onboarding")}
              size="sm"
            >
              Onboarding Flow
            </Button>
            <Button
              variant={activeDemo === "trip-creator" ? "default" : "outline"}
              onClick={() => setActiveDemo("trip-creator")}
              size="sm"
            >
              Trip Creator
            </Button>
            <Button
              variant={activeDemo === "dashboard" ? "default" : "outline"}
              onClick={() => setActiveDemo("dashboard")}
              size="sm"
            >
              Operations Dashboard
            </Button>
          </div>

          {activeDemo === "onboarding" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Start Experience</h3>
              <p className="text-gray-600 mb-4">Land → Quick Tour → Start Planning → Welcome</p>
              <Button onClick={() => navigate("/trip-creator")} className="bg-blue-600 hover:bg-blue-700">
                Try Onboarding
              </Button>
            </div>
          )}

          {activeDemo === "trip-creator" && (
            <div className="text-center py-8">
              <div className="flex justify-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">6-Step Trip Builder</h3>
              <p className="text-gray-600 mb-4">Destination → Kids → Style → Concerns → Budget → Bookings</p>
              <Button onClick={() => navigate("/trip-creator")} className="bg-orange-600 hover:bg-orange-700">
                Start Trip Creator
              </Button>
            </div>
          )}

          {activeDemo === "dashboard" && (
            <div className="text-center py-8">
              <div className="flex justify-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Plane className="w-6 h-6 text-blue-600" />
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Hotel className="w-6 h-6 text-green-600" />
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Car className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Collaboration Dashboard</h3>
              <p className="text-gray-600 mb-4">Real-time updates, bookings, and family coordination</p>
              <Button onClick={() => navigate("/dashboard")} className="bg-green-600 hover:bg-green-700">
                View Dashboard
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Plan Your Family Adventure?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join families who've discovered stress-free travel planning with FamilySync
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/trip-creator")}
            className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white px-8 py-4 text-lg"
          >
            Start Your Free Trip
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-orange-500 rounded flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">FamilySync</span>
            </div>
            <p className="text-sm text-gray-600">
              Making family travel planning delightful, one trip at a time
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
