import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CurriculumCard from "../components/CurriculumCard";
import FacilityCard from "../components/FacilityCard";
import whatsapp7 from "../assets/whatsapp_7.jpeg";

function Academics() {
  const curriculumData = [
    {
      icon: "child_care",
      title: "Daycare",
      ageRange: "(Ages 1–3)",
      description:
        "A nurturing environment for the youngest learners, focusing on basic social skills, motor development, and emotional security. We provide a safe space for exploration and early learning.",
      features: [
        "Motor Skill Development",
        "Emotional Security",
        "Basic Social Skills",
      ],
    },
    {
      icon: "extension",
      title: "Playgroup",
      ageRange: "(Ages 3–5)",
      description:
        "Our play-based learning approach focuses on social integration, sensory exploration, and early cognitive development. We use building blocks, storytelling, and music to create a joyful introduction to school life.",
      features: [
        "Sensory & Creative Play",
        "Social Skill Development",
        "Early Literacy & Numeracy",
      ],
    },
    {
      icon: "school",
      title: "Pre-Primary 1",
      ageRange: "(Ages 5–6)",
      description:
        "Building on playgroup foundations, we introduce structured learning with phonics, basic math, and creative arts. Children develop independence and prepare for formal schooling.",
      features: ["Phonics & Reading", "Basic Mathematics", "Creative Arts"],
    },
    {
      icon: "edit",
      title: "Pre-Primary 2",
      ageRange: "(Ages 6–7)",
      description:
        "Advanced pre-primary education with enhanced literacy, numeracy, and science concepts. We foster curiosity and critical thinking in preparation for primary school.",
      features: ["Advanced Literacy", "Numeracy Skills", "Science Exploration"],
    },
    {
      icon: "edit_note",
      title: "Grade 1-8",
      ageRange: "(Ages 7–15)",
      description:
        "A comprehensive curriculum designed to build strong academic skills in core subjects while encouraging critical thinking. We transition students toward independent study and more complex problem-solving.",
      features: [
        "Advanced Core Subjects",
        "Critical Thinking Lab",
        "Sports & Arts Excellence",
      ],
    },
  ];

  const facilitiesData = [
    {
      icon: "school",
      title: "Well-Equipped Classrooms",
      description: "Modern learning spaces with all necessary resources",
    },
    {
      icon: "verified",
      title: "CBE-Certified Teachers",
      description: "Highly qualified educators dedicated to excellence",
    },
    {
      icon: "park",
      title: "Ample Playground",
      description: "Safe outdoor spaces for physical development",
    },
    {
      icon: "translate",
      title: "French Lessons",
      description: "Early language exposure for global readiness",
    },
    {
      icon: "music_note",
      title: "Music Classes",
      description: "Developing creativity through musical education",
    },
    {
      icon: "computer",
      title: "Computer Classes",
      description: "Technology skills for primary students",
    },
    {
      icon: "pool",
      title: "Swimming Lessons",
      description: "Building confidence and fitness in the water",
    },
    {
      icon: "public",
      title: "Cultural Activities",
      description: "Celebrating diversity and cultural awareness",
    },
    {
      icon: "directions_bus",
      title: "School Van Transport",
      description: "Safe and reliable transportation services",
    },
    {
      icon: "restaurant",
      title: "FREE Meals",
      description: "Complimentary meals for Playgroup and PP1",
    },
    {
      icon: "child_care",
      title: "Daycare Services",
      description: "Extended care for working parents",
    },
  ];

  return (
    <div className="bg-off-white font-serif-body text-charcoal">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          {/* Top Navigation Bar */}
          <Header activePage="academics" />
          {/* Hero Section */}
          <div className="w-full flex justify-center bg-off-white py-12 md:py-20">
            <div className="layout-content-container flex flex-col max-w-[1200px] w-full px-6">
              <div className="grid md:grid-cols-2 items-center gap-12">
                <div className="flex flex-col gap-6 text-left">
                  <h1 className="text-primary text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight">
                    Academics
                  </h1>
                  <h2 className="text-charcoal/80 text-lg md:text-xl font-serif-body italic leading-relaxed max-w-lg">
                    Nurturing minds and building futures through a holistic
                    approach to early education, where curiosity meets
                    character.
                  </h2>
                  <div className="flex gap-4">
                    <Link
                      to="/story"
                      className="flex min-w-[160px] cursor-pointer items-center justify-center h-12 px-6 border-2 border-primary text-primary text-base font-bold hover:bg-primary/5 transition-colors"
                    >
                      <span className="truncate">Our Story</span>
                    </Link>
                  </div>
                </div>
                <div
                  className="relative h-[400px] w-full bg-cover bg-center shadow-2xl overflow-hidden"
                  style={{
                    backgroundImage: `url(${whatsapp7})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
          {/* Deputy Head Teacher Section */}
          <div className="w-full flex justify-center py-16 bg-white">
            <div className="layout-content-container flex flex-col max-w-[1200px] w-full px-6">
              <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 p-8 bg-off-white border border-primary/5 shadow-sm">
                <div className="w-full md:w-1/3 flex justify-center">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover shadow-lg w-full max-w-[320px] ring-8 ring-primary/5"
                    style={{
                      backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBy4Dkjs2XspGoo5MWh0Ybu6ShQtJbeoP9r76_F6K5lly5O9653w60su1YGR0E2IdU1n40Y-1IBH8s8N2_MO6qZPN9aGpmDEbjWYK7_VpDrlPu-Ae1B9iyI8hUs9YiWXjrxuVLjcxHSCWRM7p3TXhxIiinGOGgWgaVqgXW_9m-pAe5hIXI0GtjalGLwITYOtMNPnjH4920bUdN9nhuYUwSrizvO3Q7XomuymrJK97Q5SslZOIilMbKW3-olrr0Wh4_YWuX20UeN6KE")`,
                    }}
                  ></div>
                </div>
                <div className="w-full md:w-2/3 flex flex-col gap-4">
                  <span className="text-primary font-bold tracking-widest text-xs uppercase">
                    Leadership Perspective
                  </span>
                  <h2 className="text-primary text-3xl md:text-4xl font-display font-bold leading-tight">
                    A Message from the <br />
                    Deputy Head Teacher
                  </h2>
                  <div className="w-16 h-1 bg-primary/20 mb-2"></div>
                  <p className="text-charcoal text-lg font-serif-body leading-relaxed italic">
                    "At Birch Hill, we believe in a balanced education that
                    encourages curiosity and character development. Our mission
                    is to create a safe, stimulating environment where children
                    feel empowered to explore."
                  </p>
                  <p className="text-charcoal/70 text-base font-serif-body leading-relaxed">
                    We focus on individual growth, ensuring that every student
                    reaches their full potential through a curriculum that
                    balances academic rigor with creative expression. Fostering
                    a love for learning in every child is at the heart of
                    everything we do.
                  </p>
                  <div className="mt-4">
                    <p className="text-primary font-bold text-lg">
                      Mrs. Mary Adhiambo
                    </p>
                    <p className="text-charcoal/60 text-sm">
                      Deputy Head of Academics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Curriculum Section Header */}
          <div className="w-full flex justify-center pt-16 pb-8 bg-off-white">
            <div className="layout-content-container flex flex-col max-w-[1200px] w-full px-6 text-center">
              <h2 className="text-primary text-4xl font-display font-bold mb-4">
                What We Offer
              </h2>
              <p className="text-charcoal/70 max-w-2xl mx-auto text-lg font-serif-body">
                From the first steps of curiosity to the foundations of academic
                excellence, our tiered curriculum adapts to your child's growth.
              </p>
            </div>
          </div>
          {/* Curriculum Cards Section */}
          <div className="w-full flex justify-center pb-24 bg-off-white">
            <div className="layout-content-container flex flex-col max-w-[1200px] w-full px-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {curriculumData.map((curriculum, index) => (
                  <CurriculumCard
                    key={index}
                    icon={curriculum.icon}
                    title={curriculum.title}
                    ageRange={curriculum.ageRange}
                    description={curriculum.description}
                    features={curriculum.features}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Facilities Section */}
          <div className="w-full flex justify-center py-20 bg-white">
            <div className="layout-content-container flex flex-col max-w-[1200px] w-full px-6">
              <div className="text-center mb-12">
                <h2 className="text-primary text-4xl font-display font-bold mb-4">
                  Our Facilities
                </h2>
                <p className="text-charcoal/70 max-w-2xl mx-auto text-lg font-serif-body">
                  World-class amenities designed to support every aspect of your
                  child's development
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilitiesData.map((facility, index) => (
                  <FacilityCard
                    key={index}
                    icon={facility.icon}
                    title={facility.title}
                    description={facility.description}
                    isHighlighted={facility.isHighlighted}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* CTA Section */}
          <div className="w-full flex justify-center py-20 text-charcoal bg-off-white">
            <div className="layout-content-container flex flex-col items-center max-w-[800px] w-full px-6 text-center gap-6">
              <h2
                className="text-3xl md:text-5xl font-display font-bold"
                style={{ color: "#8C0D18" }}
              >
                Ready to Join the Birch Hill Family?
              </h2>
              <p className="text-charcoal/80 text-lg font-serif-body max-w-xl">
                Discover how our unique academic approach can help your child
                thrive.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link
                  to="/contact#top"
                  className="bg-white text-primary px-10 h-14 rounded-full font-bold text-lg shadow-xl hover:bg-off-white transition-colors flex items-center justify-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Academics;
