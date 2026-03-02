import Header from "../components/Header";
import Footer from "../components/Footer";
import { useGalleryImages } from "../hooks/gallery/useGalleryImages";

function Gallery() {
  const { images, loading, error } = useGalleryImages();

  // Handle image load error
  const handleImageError = (e) => {
    e.target.src = "https://placehold.co/800x600?text=Image+Not+Available";
    e.target.alt = "Image not available";
  };

  return (
    <div className="bg-off-white text-charcoal font-body transition-colors duration-200">
      <Header activePage="gallery" />

      {/* Gallery Hero Section */}
      <section className="w-full max-w-[1440px] mx-auto px-10 lg:px-24 py-20">
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase text-xs tracking-[0.2em] mb-4 block">
            Our School Life
          </span>
          <h1 className="text-charcoal text-4xl lg:text-5xl font-serif-bold leading-tight mb-6">
            Photo Gallery
          </h1>
          <p className="text-charcoal/80 text-lg font-serif-body max-w-2xl mx-auto">
            A glimpse into the vibrant life at Birch Hill Educational Center.
            Explore our students' achievements, creative projects, and memorable
            moments.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-6xl text-red-500 mb-4 block">
              error
            </span>
            <p className="text-charcoal/60">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-charcoal/60">
              Loading beautiful moments...
            </p>
          </div>
        )}

        {/* Masonry Gallery - Pinterest Style */}
        {!loading && !error && images.length > 0 && (
          <div>
            {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns, XL: 4 columns */}
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="break-inside-avoid mb-4 group relative"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-xl shadow-lg transform group-hover:scale-[1.02] transition-all duration-300">
                    {/* Actual Image */}
                    <img
                      src={image.image}
                      alt={image.alt_text || "Gallery image"}
                      className="w-full h-auto rounded-xl object-cover"
                      loading="lazy"
                      onError={handleImageError}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && images.length === 0 && (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-6xl text-charcoal/30 mb-4 block">
              photo_library
            </span>
            <p className="text-charcoal/60">No images in the gallery yet.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default Gallery;
