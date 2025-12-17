import React from "react";

export function PageHeader({
  Icon,
  heading,
  description,
}: {
  Icon?: React.ElementType;
  heading: string;
  description: string;
}) {
  return (
    <header className="text-center max-w-3xl mx-auto mt-8">
      {!!Icon && (
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-50 text-blue-600 grid place-items-center">
          <Icon className="w-6 h-6" />
        </div>
      )}

      <h1 className="text-3xl md:text-4xl font-extrabold">{heading}</h1>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </header>
  );
}
