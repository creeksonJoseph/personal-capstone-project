import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import whatsapp1 from "../assets/whatsapp_1.jpeg";
import whatsapp2 from "../assets/whatsapp_2.jpeg";
import whatsapp3 from "../assets/whatsapp_3.jpeg";
import whatsapp4 from "../assets/whatsapp_4.jpeg";

function Home() {
  return (
    <div className="bg-off-white text-charcoal font-body transition-colors duration-200">
      <Header activePage="home" />
      {/* Split-Screen Hero Section */}
      <section className="w-full max-w-[1440px] mx-auto min-h-[600px] flex flex-col md:flex-row bg-off-white overflow-hidden">
        {/* Left Column: Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-10 lg:px-24 py-16 gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm">
              Excellence Our Commitment
            </span>
            <h1 className="text-primary text-6xl lg:text-7xl font-serif-bold leading-[1.1] tracking-tight">
              A Serene Home for <br />
              Growing Minds
            </h1>
            <p className="text-charcoal/80 text-lg lg:text-xl font-serif-body max-w-lg leading-relaxed mt-4">
              Birch Hill Educational Center sits in the calm and quiet town of
              Joska. This serene setting provides an ideal environment for
              children to learn, explore, and play freely.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <Link
              to="/contact"
              className="flex min-w-[180px] cursor-pointer items-center justify-center h-14 px-8 bg-accent text-charcoal text-lg font-bold hover:brightness-105 transition-all shadow-lg shadow-accent/20"
            >
              <span className="truncate">Contact Admissions</span>
            </Link>
          </div>
        </div>
        {/* Right Column: Activity Collage */}
        <div className="w-full md:w-1/2 relative bg-primary/5 p-6 lg:p-12">
          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full min-h-[400px]">
            <div
              className="overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500"
              data-alt="School activity 1"
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${whatsapp1})`,
                }}
              ></div>
            </div>
            <div
              className="overflow-hidden shadow-xl transform translate-y-8 hover:scale-[1.02] transition-transform duration-500"
              data-alt="School activity 2"
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${whatsapp2})`,
                }}
              ></div>
            </div>
            <div
              className="overflow-hidden shadow-xl transform -translate-y-4 hover:scale-[1.02] transition-transform duration-500"
              data-alt="School activity 3"
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${whatsapp3})`,
                }}
              ></div>
            </div>
            <div
              className="overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500"
              data-alt="School activity 4"
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${whatsapp4})`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
      {/* About the School Section */}
      <section className="w-full max-w-[1440px] mx-auto px-10 lg:px-24 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6">
            <span className="text-primary font-bold uppercase text-xs tracking-[0.2em]">
              Who We Are
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
              academically, socially, and emotionally. Our curriculum....
            </p>
            <div className="mt-4">
              <Link
                to="/story#about-birch-hill"
                className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white text-sm font-semibold hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                Read More
              </Link>
            </div>
          </div>
          {/* Visual / Accent Card */}
          <div className="relative">
            <div
              className="overflow-hidden shadow-2xl aspect-[4/3] bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAML38hAOgDDOojYtGVcgjq3KqfAFPsx8QBOHzEAeGCj5RHtrEmdIYd3B96R0ASa5o48vc9R1cW8j9Gh3y9LlhFwa19nc3g9PV0BSJzJeln2ZpJ-1hplolQdsQEjiCyXFQgk3CEMHd3GmNV8-Mo7mFotlVmEBuphnSxzovqDkP_xhxVS7Yv-EN_llkRsYcMHcdYRkQcUdR-pvYmj86MzzD-oR1L_PAtSvJbMJLEnfE3agUzyN3103mqqXm2kf03bpKJbV4uoahfF9I")',
              }}
            ></div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 shadow-xl border border-primary/10">
              <p className="text-xs font-bold text-primary uppercase tracking-widest">
                Since 2010
              </p>
              <p className="text-sm font-semibold text-charcoal">
                Trusted. Proven. Future-focused.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="w-full max-w-[1440px] mx-auto px-10 lg:px-24 py-20">
        <div
          className="p-10 lg:p-20 relative overflow-hidden"
          style={{ backgroundColor: "#A9DCE6" }}
        >
          {/* Decorative shapes */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col items-center text-center gap-8">
            <div className="flex flex-col gap-4 max-w-3xl">
              <h2
                className="text-4xl lg:text-5xl font-serif-bold leading-tight"
                style={{ color: "#8C0D18" }}
              >
                Experience Our School Firsthand
              </h2>
              <p className="text-charcoal/80 text-lg lg:text-xl font-serif-body">
                Schedule a guided tour to see our classrooms, meet our teachers,
                and experience the welcoming environment where your child will
                learn and grow.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact#top"
                className="flex min-w-[200px] cursor-pointer items-center justify-center h-14 px-8 bg-primary text-white text-lg font-bold hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                <span className="truncate">Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
