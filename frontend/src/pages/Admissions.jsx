import Header from "../components/Header";
import Footer from "../components/Footer";
import whatsapp5 from "../assets/whatsapp_5.jpeg";

function Admissions() {
  return (
    <div className="selection:bg-accent/30">
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        <Header
          schoolName="Birch Hill Educational Center"
          activePage="admissions"
          logoIcon="child_care"
        />
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 md:py-12">
          <section className="mb-16 relative">
            <div className="bg-accent/20 overflow-hidden border-2 border-accent/30 flex flex-col md:flex-row items-center">
              <div className="flex-1 p-8 md:p-16 space-y-6">
                <span className="inline-block bg-accent text-primary px-4 py-1 text-sm font-bold tracking-wide">
                  OPEN FOR ENROLLMENT
                </span>
                <h1 className="text-5xl md:text-6xl leading-[1.1]">
                  Where Little Seeds Grow Into Great Minds
                </h1>
                <p className="text-xl text-charcoal/80 leading-relaxed max-w-lg italic">
                  Choosing the right start for your child is a beautiful
                  journey. At Birch Hill Educational Center, we nurture
                  curiosity, celebrate kindness, and inspire a lifelong love for
                  learning in our warm, sunlit classrooms.
                </p>
                <div className="flex flex-wrap gap-4 pt-4"></div>
              </div>
              <div className="flex-1 w-full h-[500px] relative overflow-hidden">
                <div
                  aria-label="Young children age 5-11 playing and learning in a colorful classroom"
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                  style={{
                    backgroundImage: `url(${whatsapp5})`,
                  }}
                ></div>
              </div>
            </div>
          </section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-16">
              <section className="bg-white p-8 md:p-10 border-2 border-primary/10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 playful-blob -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                  <div className="bg-accent/30 p-6 shrink-0">
                    <span className="material-symbols-outlined text-6xl text-primary">
                      auto_stories
                    </span>
                  </div>
                  <div>
                    <h2 className="text-3xl mb-4">
                      Early Years & Foundation Stage
                    </h2>
                    <p className="text-charcoal/90 leading-relaxed mb-4">
                      Our EYFS program (Ages 3-5) is designed to ensure a gentle
                      transition from home to school. We focus on play-based
                      exploration, social development, and building
                      self-confidence in our dedicated 'Acorn' and 'Sapling'
                      classrooms.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <li className="flex items-center gap-2 text-sm font-bold text-primary/80">
                        <span className="material-symbols-outlined text-accent">
                          check_circle
                        </span>{" "}
                        1:8 Staff-to-Child Ratio
                      </li>
                      <li className="flex items-center gap-2 text-sm font-bold text-primary/80">
                        <span className="material-symbols-outlined text-accent">
                          check_circle
                        </span>{" "}
                        Daily Outdoor Learning
                      </li>
                      <li className="flex items-center gap-2 text-sm font-bold text-primary/80">
                        <span className="material-symbols-outlined text-accent">
                          check_circle
                        </span>{" "}
                        Sensory Play Areas
                      </li>
                      <li className="flex items-center gap-2 text-sm font-bold text-primary/80">
                        <span className="material-symbols-outlined text-accent">
                          check_circle
                        </span>{" "}
                        Creative Arts Focus
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
              <section>
                <h2 className="text-4xl mb-10 text-center md:text-left">
                  Your Journey to Joining Us
                </h2>
                <div className="relative space-y-12 before:absolute before:left-8 before:top-4 before:bottom-4 before:w-0.5 before:bg-primary/10">
                  <div className="relative pl-24 group">
                    <div className="absolute left-0 top-0 w-16 h-16 bg-off-white border-2 border-accent flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl text-primary">
                        edit
                      </span>
                    </div>
                    <div className="bg-white p-6 shadow-sm border border-primary/5 hover:border-accent transition-colors">
                      <h3 className="text-xl mb-1">1. Share Your Interest</h3>
                      <p className="text-charcoal/70">
                        Simply contact our admissions team at the contacts page.
                        We'd love to learn a little bit about your child's
                        personality and interests!
                      </p>
                    </div>
                  </div>
                  <div className="relative pl-24 group">
                    <div className="absolute left-0 top-0 w-16 h-16 bg-off-white border-2 border-accent flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl text-primary">
                        extension
                      </span>
                    </div>
                    <div className="bg-white p-6 shadow-sm border border-primary/5 hover:border-accent transition-colors">
                      <h3 className="text-xl mb-1">2. Play & Discover Tour</h3>
                      <p className="text-charcoal/70">
                        Visit us during a school day. While you chat with our
                        Headteacher, your little one can enjoy some activities
                        in our playroom.
                      </p>
                    </div>
                  </div>
                  <div className="relative pl-24 group">
                    <div className="absolute left-0 top-0 w-16 h-16 bg-off-white border-2 border-accent flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl text-primary">
                        draw
                      </span>
                    </div>
                    <div className="bg-white p-6 shadow-sm border border-primary/5 hover:border-accent transition-colors">
                      <h3 className="text-xl mb-1">3. Formal Application</h3>
                      <p className="text-charcoal/70">
                        Complete the enrollment pack. We'll help you with every
                        document and answer any questions you have along the
                        way.
                      </p>
                    </div>
                  </div>
                  <div className="relative pl-24 group">
                    <div className="absolute left-0 top-0 w-16 h-16 bg-off-white border-2 border-accent flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl text-primary">
                        toys
                      </span>
                    </div>
                    <div className="bg-white p-6 shadow-sm border border-primary/5 hover:border-accent transition-colors">
                      <h3 className="text-xl mb-1">4. Taster Morning</h3>
                      <p className="text-charcoal/70">
                        Your child will be invited for a friendly 'taster
                        session' to meet their future classmates and teachers.
                      </p>
                    </div>
                  </div>
                  <div className="relative pl-24 group">
                    <div className="absolute left-0 top-0 w-16 h-16 bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl text-white">
                        celebration
                      </span>
                    </div>
                    <div className="bg-white p-6 shadow-md border-2 border-primary/20 bg-gradient-to-br from-white to-accent/5">
                      <h3 className="text-xl mb-1">
                        5. Welcome to the Family!
                      </h3>
                      <p className="text-charcoal/70">
                        Once accepted, you'll receive your welcome kit and
                        uniform details. We can't wait to start this journey
                        together!
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <h2 className="text-3xl mb-8">General Requirements</h2>
                <div className="bg-white border-2 border-primary/10 shadow-lg p-8 md:p-10">
                  <ol className="space-y-4 list-decimal list-inside text-charcoal leading-relaxed">
                    <li>A certified copy of the Birth Certificate.</li>
                    <li>
                      KCPE result slip certified by your former head teacher.
                    </li>
                    <li>
                      Two passport-size photographs
                      <span className="italic text-charcoal/70">
                        (not from "photo me studios"), with your name clearly
                        printed at the back and signed by your former head
                        teacher.
                      </span>
                    </li>
                    <li>
                      School Leaving Certificate signed and stamped by the head
                      of the former primary school.
                    </li>
                    <li>
                      Medical certificate duly filled by a qualified doctor.
                    </li>
                    <li>
                      A geometrical set, a 30cm transparent ruler, a 4-figure
                      Mathematics table (6th edition), a spring file, blue biro
                      pens, and pencils.
                    </li>
                    <li>
                      Oxford Advanced Learner's Dictionary,{" "}
                      <em>Kamusi ya Kiswahili Sanifu</em> (TUKI),
                      <em>A Rebirth</em> (OUP), <em>Heri Subira</em> (OUP) —
                      class readers.
                    </li>
                    <li>Fees (as per the 2023 Fees Structure).</li>
                    <li>
                      Two (2) colored passport photographs for both
                      Parents/Guardians/Sponsors.
                    </li>
                    <li>ID copies of Parents/Guardians.</li>
                  </ol>
                </div>
              </section>
            </div>
            <aside className="space-y-8">
              <div className="bg-primary p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10"></div>
                <h3 className="text-2xl text-white mb-6">
                  A Message from the Head Teacher
                </h3>
                <p className="text-white/80 leading-relaxed italic">
                  At Birch Hill Educational Center, we believe in fostering a
                  love for learning that extends beyond the classroom. Our
                  dedicated faculty is committed to providing a nurturing
                  environment where each student can thrive academically,
                  socially, and emotionally. We encourage curiosity, critical
                  thinking, and collaboration, preparing our students for
                  success in a rapidly changing world.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 flex items-center justify-center font-bold">
                    DH
                  </div>
                  <div>
                    <p className="font-bold">Head Teacher</p>
                    <p className="text-xs text-white/60 uppercase tracking-widest">
                      Birch Hill Educational Center
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-accent/20 p-8 border border-accent">
                <span className="material-symbols-outlined text-primary/40 text-4xl">
                  format_quote
                </span>
                <p className="text-charcoal italic leading-relaxed text-lg mb-6">
                  "The teachers at Birch Hill truly see the unique spark in my
                  daughter. She wakes up excited for school every single
                  morning!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 flex items-center justify-center text-primary font-bold italic">
                    S.M
                  </div>
                  <div>
                    <p className="font-bold text-primary">Sarah Mitchell</p>
                    <p className="text-xs text-charcoal/60 uppercase tracking-widest font-bold">
                      Parent
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 border-2 border-primary/5 shadow-sm">
                <h4 className="text-xl mb-4">Chat with Mrs. Bennett</h4>
                <p className="text-sm text-charcoal/70 mb-6">
                  Our Admissions Registrar is here to help you navigate your
                  choices.
                </p>
                <div className="space-y-4">
                  <a
                    className="flex items-center gap-3 text-primary hover:underline"
                    href="mailto:hello.birchhilledu@gmail.com"
                  >
                    <span className="material-symbols-outlined">mail</span>
                    <span className="font-bold text-sm">
                      hello.birchhilledu@gmail.com
                    </span>
                  </a>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-primary">
                      <span className="material-symbols-outlined">call</span>
                      <span className="font-bold">011 555 3592</span>
                    </div>
                    <div className="text-primary text-sm ml-9">
                      0723 138 209 | 0722 293 606 | 0717 561434
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Admissions;
