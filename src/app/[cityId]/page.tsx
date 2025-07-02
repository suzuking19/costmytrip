interface CityPageProps {
  params: Promise<{
    cityId: string;
  }>;
}

export default async function CityPage({ params }: CityPageProps) {
  const { cityId } = await params;

  return (
    <div className="min-h-screen bg-stone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {cityId.charAt(0).toUpperCase() + cityId.slice(1).replace("-", " ")}
        </h1>
        <p className="text-lg text-gray-600">
          This page will show expense cards for this city. (Under construction)
        </p>
      </div>
    </div>
  );
}
