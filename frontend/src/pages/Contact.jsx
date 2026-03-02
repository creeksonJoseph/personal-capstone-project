import Header from "../components/Header";
import Footer from "../components/Footer";
import whatsapp6 from "../assets/whatsapp_6.jpeg";

function Contact() {
  return (
    <div id="top" className="bg-off-white font-serif-body text-charcoal">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <Header activePage="contact" />
          <main className="flex-1">
            {/* Hero Section Split Screen */}
            <div className="mx-auto max-w-[1280px] px-4 md:px-10 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: School Image */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
                  <div
                    className="w-full h-full bg-center bg-no-repeat bg-cover"
                    style={{
                      backgroundImage: `url(${whatsapp6})`,
                    }}
                  ></div>
                </div>
                {/* Right: Contact Header & Intro */}
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <h1 className="text-primary text-5xl md:text-6xl font-display font-black leading-tight tracking-[-0.033em]">
                      Get in Touch
                    </h1>
                    <div className="w-24 h-1 bg-accent-blue rounded-full"></div>
                    <p className="text-charcoal text-lg md:text-xl font-normal leading-relaxed">
                      Schedule a school tour by contacting the admissions team
                    </p>
                    <p className="text-charcoal text-lg md:text-xl font-normal leading-relaxed">
                      We welcome your inquiries. Whether you're considering
                      enrollment or have general questions, our dedicated team
                      is here to support you.
                    </p>
                  </div>
                  {/* Detailed Contact Lists */}
                  <div className="space-y-6">
                    <div className="border-l-4 border-primary pl-6 py-2 bg-white/50 rounded-r-lg">
                      <h3 className="text-primary text-xl font-bold mb-2">
                        Admissions Office
                      </h3>
                      <div className="flex flex-col gap-1 text-charcoal">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-sm">
                            mail
                          </span>
                          <a
                            className="hover:underline text-sm"
                            href="mailto:hello.birchhilledu@gmail.com"
                          >
                            hello.birchhilledu@gmail.com
                          </a>
                        </div>
                        <div className="flex flex-col gap-1 mt-2">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-sm">
                              call
                            </span>
                            <span className="text-sm">011 555 3592</span>
                          </div>
                          <div className="text-sm ml-6">
                            0723 138 209 | 0722 293 606
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-l-4 border-accent-blue pl-6 py-2 bg-white/50 rounded-r-lg">
                      <h3 className="text-primary text-xl font-bold mb-2">
                        General Enquiries
                      </h3>
                      <div className="flex flex-col gap-1 text-charcoal">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-sm">
                            mail
                          </span>
                          <a
                            className="hover:underline"
                            href="mailto:hello.birchhilledu@gmail.com"
                          >
                            hello.birchhilledu@gmail.com
                          </a>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="material-symbols-outlined text-primary text-sm">
                            call
                          </span>
                          <span>011 555 3592 | 0723 138 209</span>
                        </div>
                      </div>
                    </div>
                    <div className="border-l-4 border-primary pl-6 py-2 bg-white/50 rounded-r-lg">
                      <h3 className="text-primary text-xl font-bold mb-2">
                        School Office
                      </h3>
                      <div className="flex flex-col gap-1 text-charcoal">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-sm">
                            schedule
                          </span>
                          <span>Mon - Fri: 8:00 AM - 4:30 PM</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-sm">
                            location_on
                          </span>
                          <span>
                            Town, 500M From Kangundo Rd., Joska, Ruai
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Section Header for Map */}
            <div className="mx-auto max-w-[1280px] px-10">
              <div className="flex items-center gap-4 py-8">
                <div className="h-[1px] flex-1 bg-accent-blue"></div>
                <h2 className="text-primary text-3xl font-bold leading-tight tracking-[-0.015em] px-4">
                  Visit Our School
                </h2>
                <div className="h-[1px] flex-1 bg-accent-blue"></div>
              </div>
            </div>
            {/* Text Grid Information */}
            <div className="mx-auto max-w-[1280px] px-10 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-1 gap-4 rounded-xl border border-accent-blue/20 bg-white p-6 flex-col shadow-sm">
                  <div className="text-primary">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "32px" }}
                    >
                      map
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-primary text-lg font-bold leading-tight">
                      Location
                    </h2>
                    <p className="text-charcoal text-sm font-normal leading-normal">
                      Located in the serene town of Joska, our school sits in a
                      calm and quiet environment, ideal for children to learn,
                      explore, and play freely.
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 gap-4 rounded-xl border border-accent-blue/20 bg-white p-6 flex-col shadow-sm">
                  <div className="text-primary">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "32px" }}
                    >
                      directions_bus
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-primary text-lg font-bold leading-tight">
                      Transport Links
                    </h2>
                    <p className="text-charcoal text-sm font-normal leading-normal">
                      500M From Kangundo Rd.
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 gap-4 rounded-xl border border-accent-blue/20 bg-white p-6 flex-col shadow-sm">
                  <div className="text-primary">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "32px" }}
                    >
                      public
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-primary text-lg font-bold leading-tight">
                      Social Media
                    </h2>
                    <p className="text-charcoal text-sm font-normal leading-normal">
                      Stay updated with our daily activities and announcements
                      by following us @birchhills_school on all platforms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Map Section */}
            <div
              id="get-in-touch"
              className="mx-auto max-w-[1280px] px-4 md:px-10 pb-20"
            >
              <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <iframe
                  title="Birch Hill Educational Center Map"
                  className="absolute inset-0 w-full h-full rounded-2xl border-0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.850451558245!2d37.095767075841095!3d-1.289023998698579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f6ef7a01cf223%3A0xee36058dcb08c352!2sBirch%20Hill%20Educational%20Center!5e0!3m2!1sen!2ske!4v1715600000000!5m2!1sen!2ske"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Contact;
