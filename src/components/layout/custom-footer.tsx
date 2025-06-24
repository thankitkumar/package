'use client';

import Link from 'next/link';
import { Linkedin, Youtube } from 'lucide-react';

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li className="mb-2">
    <Link href={href} className="hover:underline text-gray-300">
      {children}
    </Link>
  </li>
);

export function CustomFooter() {
  return (
    <footer className="w-full">
      {/* Top Section */}
      <div className="bg-[#D48D2C] text-white p-8 md:p-12">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* Column 1: Corporate Address */}
          <div>
            <h3 className="font-bold text-base mb-4">Corporate Address:</h3>
            <address className="not-italic text-gray-300">
              #59/2, Heritage Building,
              <br />
              Kaderanahalli, Dr. Puneeth Rajkumar Road,
              <br />
              Banashankari 2nd Stage,
              <br />
              Bangalore 560070,
              <br />
              Karnataka, India
              <br />
              <br />
              <strong>Tel:</strong> +91 80 2669 0145
              <br />
              <strong>Email:</strong> info@molecularconnections.com
            </address>
          </div>

          {/* Column 2: Verticals */}
          <div>
            <h3 className="font-bold text-base mb-4">Verticals</h3>
            <ul>
              <FooterLink href="#">Publishing & Technology</FooterLink>
              <FooterLink href="#">Pharma & Medicine</FooterLink>
              <FooterLink href="#">IP Research</FooterLink>
              <FooterLink href="#">Analytics</FooterLink>
              <FooterLink href="#">Career</FooterLink>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="font-bold text-base mb-4">Company</h3>
            <ul>
              <FooterLink href="#">About</FooterLink>
              <FooterLink href="#">Certifications</FooterLink>
              <FooterLink href="#">Leadership</FooterLink>
              <FooterLink href="#">Sustainable Development</FooterLink>
              <FooterLink href="#">CSR</FooterLink>
              <FooterLink href="#">Meet Us</FooterLink>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h3 className="font-bold text-base mb-4">Resources</h3>
            <ul>
              <FooterLink href="#">Digital Transformation</FooterLink>
              <FooterLink href="#">Our Assets</FooterLink>
              <FooterLink href="#">Awards & Recognitions</FooterLink>
              <FooterLink href="#">Press Release</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">Get in touch</FooterLink>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-black text-white py-4 px-8">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left text-xs space-y-2 sm:space-y-0">
          <p>Copyright &copy; 2025 Molecular Connections Pvt. Ltd. | All Rights Reserved</p>
          <div className="flex items-center space-x-4">
            <Link href="#" className="hover:opacity-80">
              <Linkedin size={18} />
            </Link>
            <Link href="#" className="hover:opacity-80">
              <Youtube size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
