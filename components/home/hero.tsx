"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calculator, Download, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = [
    "Quote Finder",
    "Policy Advisor",
    "Policy Guide",
    "Plan Saver",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-teal-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3Cg%20fill%3D%27none%27%20fill-rule%3D%27evenodd%27%3E%3Cg%20fill%3D%27%23e5e7eb%27%20fill-opacity%3D%270.3%27%3E%3Ccircle%20cx%3D%2730%27%20cy%3D%2730%27%20r%3D%271%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-linear-to-r from-teal-500/10 to-purple-500/10 rounded-full text-sm font-medium text-teal-700 mb-4">
                Available for you
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Smart
                <span className="block bg-linear-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                  {roles[currentRole]}
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mb-8">
                I transform ideas into compelling visual stories. From brand
                identity to digital experiences, I create designs that connect,
                inspire, and drive results.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-linear-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700"
              >
                <Link href="/insurance-options">
                  Start your quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/calculators">
                  <Calculator className="mr-2 w-5 h-5" />
                  Savings Calculators
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900">25+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900">5+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Main Image */}
              <div className="relative w-80 h-80 mx-auto bg-linear-to-br from-teal-400 to-purple-600 rounded-full p-1">
                <div className="w-full h-full bg-white rounded-full overflow-hidden">
                  <Image
                    src="https://images.pexels.com/photos/3184358/pexels-photo-3184358.jpeg"
                    alt="Alex Designer"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center animate-bounce">
                <div className="w-8 h-8 bg-linear-to-r from-orange-400 to-red-500 rounded-lg"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center animate-pulse">
                <Play className="w-8 h-8 text-teal-600" fill="currentColor" />
              </div>
              <div className="absolute top-1/4 -right-8 w-12 h-12 bg-linear-to-br from-purple-400 to-pink-500 rounded-full opacity-80 animate-ping"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
