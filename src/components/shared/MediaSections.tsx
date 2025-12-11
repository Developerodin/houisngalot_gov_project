/**
 * Media Sections Component
 * Banner, Slider, Image, and Video placeholder sections
 */

export default function MediaSections() {
  return (
    <>
      {/* Banner Image Area */}
      <section className="mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#0747A6' }}>
            Banner Section
          </h2>
          <div 
            className="w-full h-48 md:h-64 lg:h-80 rounded-lg flex items-center justify-center"
            style={{ 
              backgroundColor: '#F0F7FF',
              border: '2px dashed #0747A6',
              borderStyle: 'dashed'
            }}
          >
            <p className="text-base md:text-lg font-medium" style={{ color: '#0747A6' }}>
              Banner will come here
            </p>
          </div>
        </div>
      </section>

      {/* Slider / Carousel Area */}
      <section className="mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#0747A6' }}>
            Carousel Section
          </h2>
          <div 
            className="w-full h-48 md:h-64 lg:h-80 rounded-lg flex items-center justify-center"
            style={{ 
              backgroundColor: '#F0F7FF',
              border: '2px dashed #0747A6',
              borderStyle: 'dashed'
            }}
          >
            <p className="text-base md:text-lg font-medium" style={{ color: '#0747A6' }}>
              Slider will come here
            </p>
          </div>
        </div>
      </section>

      {/* Informational Image Area */}
      <section className="mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#0747A6' }}>
            Information Section
          </h2>
          <div 
            className="w-full h-48 md:h-64 lg:h-80 rounded-lg flex items-center justify-center"
            style={{ 
              backgroundColor: '#F0F7FF',
              border: '2px dashed #0747A6',
              borderStyle: 'dashed'
            }}
          >
            <p className="text-base md:text-lg font-medium" style={{ color: '#0747A6' }}>
              Image will come here
            </p>
          </div>
        </div>
      </section>

      {/* Video Section Area */}
      <section className="mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#0747A6' }}>
            Video Section
          </h2>
          <div 
            className="w-full h-48 md:h-64 lg:h-80 rounded-lg flex items-center justify-center"
            style={{ 
              backgroundColor: '#F0F7FF',
              border: '2px dashed #0747A6',
              borderStyle: 'dashed'
            }}
          >
            <p className="text-base md:text-lg font-medium" style={{ color: '#0747A6' }}>
              Video will come here
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
