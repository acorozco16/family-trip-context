
import React from 'react';
import { useTrip } from '../context/TripContext';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export default function Gallery() {
  const { trip, loading } = useTrip();

  if (loading) {
    return <div className="p-6">Loading photos...</div>;
  }

  if (!trip) {
    return <div className="p-6">No trip data available.</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Trip Gallery</h1>
        <p className="text-gray-600">Beautiful memories from your family adventure</p>
      </div>

      {trip.photos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trip.photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <AspectRatio ratio={1}>
                  <img
                    src={photo.url}
                    alt={photo.caption || 'Trip photo'}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
                {photo.caption && (
                  <div className="p-3">
                    <p className="text-sm text-gray-600">{photo.caption}</p>
                    {photo.location && (
                      <p className="text-xs text-gray-500 mt-1">{photo.location}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No photos yet</h3>
            <p className="text-gray-500">Start capturing memories from your family trip!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
