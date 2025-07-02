
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar, Star, ArrowRight, Plane, Hotel, Car, Heart, Brain, Shield, Share2 } from "lucide-react";
import { FamLogo } from "@/components/ui/fam-logo";

const Index = () => {
  const navigate = useNavigate();
  const [activeDemo, setActiveDemo] = useState("onboarding");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <FamLogo size="sm" />
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/dashboard")}
              className="text-gray-600 hover:text-blue-600"
            >
              View Demo
            </Button>
            <Button 
              onClick={() => navigate("/trip-creator")}
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
            AI-Powered Family Trip Assistant
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            The Smart Way to Coordinate
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
              Complex Family Trips
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            Stop being the human travel database for your family. Let AI handle the complexity 
            of coordinating grandparents, toddlers, and everyone's unique needs in one intelligent system.
          </p>
          
          {/* Social Proof Quote */}
          <div className="bg-white/60 border border-blue-100 rounded-lg p-6 mb-8 italic text-gray-700">
            <p className="text-lg">
              "Finally, someone who understands that planning for grandparents AND toddlers 
              requires different strategies! No more being the family travel encyclopedia."
            </p>
            <p className="text-sm text-gray-500 mt-2">— Sarah M., Mom of 3 coordinating 12-person family trips</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/trip-creator")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
            >
              Get Your AI Assistant
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
            >
              See It In Action
            </Button>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="container mx-auto px-6 py-16 bg-white/30 rounded-2xl mx-6 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            You Shouldn't Be the Family Travel Database
          </h2>
          <p className="text-lg text-gray-600">
            Multi-generational trips are complex. Let AI handle the mental load.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-red-100 bg-red-50/50">
            <CardHeader>
              <CardTitle className="text-lg text-red-800">The Overwhelm</CardTitle>
              <CardDescription className="text-red-600">
                Remembering grandpa's mobility needs, the kids' nap schedules, everyone's dietary restrictions, 
                and who's arriving when... it's exhausting being the coordinator.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-orange-100 bg-orange-50/50">
            <CardHeader>
              <CardTitle className="text-lg text-orange-800">The Complexity</CardTitle>
              <CardDescription className="text-orange-600">
                Multi-generational trips mean juggling accessibility, entertainment for different ages, 
                varying budgets, and completely different travel styles all at once.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-blue-100 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800">The Solution</CardTitle>
              <CardDescription className="text-blue-600">
                Family-aware AI that remembers everyone's needs, suggests age-appropriate activities, 
                and keeps the whole family coordinated without you doing all the mental work.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Intelligence That Understands Families
          </h2>
          <p className="text-lg text-gray-600">
            More than just trip planning — it's family coordination made effortless
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Family-Aware AI</CardTitle>
              <CardDescription>
                Remembers each person's needs, preferences, and limitations. From wheelchair accessibility 
                to toddler-friendly restaurants — it knows your family.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-orange-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Multi-Gen Smart Suggestions</CardTitle>
              <CardDescription>
                Activities that work for grandparents AND kids. Restaurants with high chairs AND senior discounts. 
                Intelligence that gets the complexity.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-green-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Share2 className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Effortless Family Sharing</CardTitle>
              <CardDescription>
                Everyone stays updated automatically. No more group text chaos or being the information hub. 
                Real-time coordination that just works.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="container mx-auto px-6 py-16 bg-white/50 rounded-2xl mx-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            See Your AI Assistant in Action
          </h2>
          <p className="text-lg text-gray-600">
            Watch how Fam handles a real 3-generation Barcelona trip
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-4 mb-6 justify-center">
            <Button
              variant={activeDemo === "onboarding" ? "default" : "outline"}
              onClick={() => setActiveDemo("onboarding")}
              size="sm"
            >
              Quick Setup
            </Button>
            <Button
              variant={activeDemo === "trip-creator" ? "default" : "outline"}
              onClick={() => setActiveDemo("trip-creator")}
              size="sm"
            >
              AI Trip Builder
            </Button>
            <Button
              variant={activeDemo === "dashboard" ? "default" : "outline"}
              onClick={() => setActiveDemo("dashboard")}
              size="sm"
            >
              Family Coordination Hub
            </Button>
          </div>

          {activeDemo === "onboarding" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">From Overwhelmed to Organized in Minutes</h3>
              <p className="text-gray-600 mb-4">Quick family profiling → AI learns your dynamics → Instant coordination</p>
              <Button onClick={() => navigate("/trip-creator")} className="bg-blue-600 hover:bg-blue-700">
                Try Quick Setup
              </Button>
            </div>
          )}

          {activeDemo === "trip-creator" && (
            <div className="text-center py-8">
              <div className="flex justify-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-orange-600" />
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI That Gets Multi-Generational Complexity</h3>
              <p className="text-gray-600 mb-4">Family profiles → Smart suggestions → Conflict-free itineraries</p>
              <Button onClick={() => navigate("/trip-creator")} className="bg-orange-600 hover:bg-orange-700">
                See AI Trip Builder
              </Button>
            </div>
          )}

          {activeDemo === "dashboard" && (
            <div className="text-center py-8">
              <div className="flex justify-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Share2 className="w-6 h-6 text-blue-600" />
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">No More Being the Family Information Hub</h3>
              <p className="text-gray-600 mb-4">Automatic updates, smart reminders, effortless coordination</p>
              <Button onClick={() => navigate("/dashboard")} className="bg-green-600 hover:bg-green-700">
                View Coordination Hub
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Stop Being the Family Travel Database?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Let AI handle the complexity while you enjoy planning again
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/trip-creator")}
            className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white px-8 py-4 text-lg"
          >
            Get Your AI Assistant Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <FamLogo size="sm" />
            <p className="text-sm text-gray-600">
              Finally, an AI that understands family trip complexity
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
