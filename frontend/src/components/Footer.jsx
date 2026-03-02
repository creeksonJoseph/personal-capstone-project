import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-charcoal" style={{ backgroundColor: "#A9DCE6" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Address */}
          <div>
            <h3 className="font-bold text-primary mb-4">
              Birch Hill Educational Center
            </h3>
            <p>Town, 500M From Kangundo Rd.</p>
            <p>Joska, Ruai</p>

            <p>P O BOX 464 - 00520, Nairobi, Kenya</p>
            <p className="mt-2 text-sm">Phone: 011 555 3592</p>
            <p className="text-sm">0723 138 209 | 0722 293 606</p>
            <p className="text-sm">0717 561434</p>
            <p className="mt-2">Email: hello.birchhilledu@gmail.com</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/academics"
                  className="hover:text-primary transition-colors"
                >
                  Academics
                </Link>
              </li>
              <li>
                <Link
                  to="/admissions"
                  className="hover:text-primary transition-colors"
                >
                  Admissions
                </Link>
              </li>
              <li>
                <Link
                  to="/story"
                  className="hover:text-primary transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div className="relative w-full h-64 md:h-full min-h-[200px] rounded-lg overflow-hidden shadow-xl border-2 border-white">
            <iframe
              title="Birch Hill Educational Center Map"
              className="absolute inset-0 w-full h-full rounded-lg border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.850451558245!2d37.095767075841095!3d-1.289023998698579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f6ef7a01cf223%3A0xee36058dcb08c352!2sBirch%20Hill%20Educational%20Center!5e0!3m2!1sen!2ske!4v1715600000000!5m2!1sen!2ske"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-8 pt-8 border-t border-primary/20 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Birch Hill Educational Center. All
            rights reserved.
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            {/* Socials */}
            <a className="hover:text-primary transition-colors" href="#">
              <svg
                fill="currentColor"
                height="24px"
                viewBox="0 0 256 256"
                width="24px"
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0-16h24v63.63a88,88,0,1,1,16,0Z"></path>
              </svg>
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              <svg
                fill="currentColor"
                height="24px"
                viewBox="0 0 256 256"
                width="24px"
              >
                <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Z"></path>
              </svg>
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              <svg
                fill="currentColor"
                height="24px"
                viewBox="0 0 256 256"
                width="24px"
              >
                <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
