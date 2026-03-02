import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Story() {
  return (
    <div className="bg-off-white font-serif-body text-charcoal">
      <Header activePage="story" />
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(140, 13, 24, 0.7), rgba(31, 31, 31, 0.5)), url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop")`,
          }}
        ></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 drop-shadow-lg">
            Our Legacy of Excellence
          </h1>
          <p className="text-lg md:text-xl text-off-white/90 max-w-2xl mx-auto font-light italic">
            Nurturing minds, building character, and shaping future leaders
            since 2010.
          </p>
        </div>
      </section>
      {/* About Birch Hill Section */}
      <section
        id="about-birch-hill"
        className="w-full max-w-[1440px] mx-auto px-10 lg:px-24 py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <span className="text-primary font-bold uppercase text-xs tracking-[0.2em]">
              About Us
            </span>
            <h2 className="text-charcoal text-4xl lg:text-5xl font-serif-bold leading-tight">
              About Birch Hill School
            </h2>
            <p className="text-charcoal/80 text-lg font-serif-body leading-relaxed max-w-xl">
              Birch Hill School has been a trusted place of learning and growth
              for many years. We are committed to nurturing curious minds,
              building confidence, and encouraging good character in every
              child. Through engaging lessons, strong values, and a caring
              school community, we support each learner as they grow
              academically, socially, and emotionally. Our curriculum is
              designed to provide a strong foundation while allowing children to
              explore their creativity and interests. With dedicated teachers
              and a supportive learning environment, Birch Hill School helps
              every child feel valued, capable, and inspired to do their best.
            </p>
          </div>
          <div className="relative hidden md:block">
            <div
              className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop")',
              }}
            ></div>
          </div>
        </div>
      </section>
      {/* Our Little Secret Section */}
      <section className="py-20 px-6 lg:px-40 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Our Little Secret
            </h2>
            <div className="w-20 h-1 bg-sky-blue mx-auto"></div>
          </div>
          <div className="bg-sky-blue/20 border-2 border-sky-blue/30 p-10 md:p-16 rounded-2xl">
            <p className="text-xl md:text-2xl text-charcoal/90 leading-relaxed text-center font-serif-body italic mb-8">
              Founded on the core values of integrity, resilience,
              responsibility and independence. Birch Hill Educational Centre is
              dedicated to promote wholistic development of a child
            </p>
            <div className="grid md:grid-cols-4 gap-6 mt-10">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl">
                    security
                  </span>
                </div>
                <h3 className="font-bold text-primary text-lg">Integrity</h3>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl">
                    fitness_center
                  </span>
                </div>
                <h3 className="font-bold text-primary text-lg">Resilience</h3>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl">
                    handshake
                  </span>
                </div>
                <h3 className="font-bold text-primary text-lg">
                  Responsibility
                </h3>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl">
                    landscape
                  </span>
                </div>
                <h3 className="font-bold text-primary text-lg">Independence</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Heritage Narrative Section */}
      <section className="py-24 px-6 lg:px-40 bg-off-white relative">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative hidden md:block">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-sky-blue/30 rounded-full blur-3xl z-0"></div>
            <div className="relative z-10 shadow-2xl rounded-xl overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                alt="school photo"
                className="w-full h-auto object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQmrh7AZJEL6-xCcHU2QY4zs9G0pYJ5RXoBudelAZ59phpD6KHLuT6hshzVRzvpeU6pAZM78yzDJBQWNH4fE67oiX5TKUzxNMfMXZ8toPMRofyayCGtQQMXkJV7MUeh7kekJXqbE9-6FsQaCgcnhRhOiZf4ZXcvGUfSsz3ThVlnqxwe7pGw-byKleqnkcrCClJJVPdm1lgTd3mCvo72FIS3r08nH_41SOnWVXAiGPF7hx0eMK8VbpnM4vPiO-K_ahw-LIzSIv1mnc"
              />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-bold text-primary">Our Heritage</h2>
            <div className="w-20 h-1 bg-sky-blue"></div>
            <p className="text-lg leading-relaxed text-charcoal/80">
              Founded on the principles of academic rigor and character
              development, Birch Hill School has been a beacon of education for
              the community. Our journey began with a simple vision: to create
              an environment where intellectual curiosity meets unwavering
              integrity.
            </p>
            <p className="text-lg leading-relaxed text-charcoal/80">
              From our humble beginnings in a simple brick building, we have
              grown into a modern, welcoming school dedicated to nurturing young
              minds. As a school serving learners from kindergarten to Grade 9,
              we focus on building strong foundations through quality education,
              care, and guidance. Every classroom, lesson, and milestone
              reflects our commitment to helping each child grow academically
              and personally.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Grid */}
      <section className="py-24 px-6 lg:px-40 bg-off-white">
        <div className="max-w-[1200px] mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Our Core Pillars
          </h2>
          <p className="text-charcoal/60">
            What guides us every day at Birch Hill.
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-8">
          {/* Mission Card */}
          <div className="bg-sky-blue/20 border-t-4 border-primary p-10 rounded-xl hover:shadow-lg transition-shadow">
            <div className="text-primary mb-6">
              <span className="material-symbols-outlined text-4xl">flag</span>
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">
              Our Mission
            </h3>
            <p className="text-charcoal/80 leading-relaxed">
              To provide a supportive and engaging learning environment where
              every child is encouraged to grow academically, socially, and
              emotionally.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-sky-blue/20 border-t-4 border-primary p-10 rounded-xl hover:shadow-lg transition-shadow">
            <div className="text-primary mb-6">
              <span className="material-symbols-outlined text-4xl">
                visibility
              </span>
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
            <p className="text-charcoal/80 leading-relaxed">
              To nurture confident, curious learners who are well prepared for
              the next stage of their education and life beyond the classroom.
            </p>
          </div>

          {/* Values Card */}
          <div className="bg-sky-blue/20 border-t-4 border-primary p-10 rounded-xl hover:shadow-lg transition-shadow">
            <div className="text-primary mb-6">
              <span className="material-symbols-outlined text-4xl">
                favorite
              </span>
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Our Values</h3>
            <p className="text-charcoal/80 leading-relaxed">
              We believe in integrity, resilience, responsibility, and
              independence. These core values shape our school culture and guide
              how we care for and support every learner in their wholistic
              development.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 lg:px-40">
        <div
          className="max-w-[1000px] mx-auto  p-12 text-center text-charcoal relative overflow-hidden"
          style={{ backgroundColor: "#A9DCE6" }}
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <span className="material-symbols-outlined text-9xl">
              auto_stories
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: "#8C0D18" }}
          >
            Join Our Growing History
          </h2>
          <p className="text-lg text-charcoal/80 mb-10 max-w-xl mx-auto">
            Be part of our school community. Schedule a visit today and see how
            Birch Hill School supports your child's growth and learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact#top"
              className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-sky-blue transition-colors text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Story;
