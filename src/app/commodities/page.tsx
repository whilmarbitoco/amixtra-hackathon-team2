"use client";

import { useState } from "react";
import { Package, MapPin, Calendar, DollarSign, Phone, AlertCircle, Weight } from "lucide-react";
import { commodities } from "@/constants";
import ListingWrapper from "@/components/ListingWrapper";

export default function CommoditiesListing() {
  const [filter, setFilter] = useState("All");

  const filteredCommodities = filter === "All" 
    ? commodities 
    : commodities.filter(c => c.urgency === filter);

  return (
    <ListingWrapper 
      title="Commodity Listings" 
      description="Find transportation requests for agricultural commodities"
    >
      <div className="container mx-auto px-6 py-8">
        {/* Filter */}
        <div className="mb-8">
          <div className="flex gap-3">
            {['All', 'High', 'Medium', 'Low'].map((urgency) => (
              <button
                key={urgency}
                onClick={() => setFilter(urgency)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === urgency
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {urgency === 'All' ? 'All Requests' : `${urgency} Priority`}
              </button>
            ))}
          </div>
        </div>

        {/* Commodity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommodities.map((commodity) => (
            <div key={commodity.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">{commodity.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  commodity.urgency === 'High' ? 'bg-red-100 text-red-800' :
                  commodity.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {commodity.urgency} Priority
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Package className="h-4 w-4" />
                  <span>{commodity.commodity}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{commodity.from} → {commodity.to}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Weight className="h-4 w-4" />
                  <span>{commodity.weight}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="h-4 w-4" />
                  <span>{commodity.budget}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Deadline: {commodity.deadline}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{commodity.contact}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>{commodity.phone}</span>
                </div>
              </div>

              <button className="w-full mt-6 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                Submit Bid
              </button>
            </div>
          ))}
        </div>
      </div>
    </ListingWrapper>
  );
}