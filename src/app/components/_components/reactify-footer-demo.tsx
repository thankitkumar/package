'use client';
import { ReactifyFooter, type FooterAddressColumn, type FooterLinkColumn, type SocialLink } from '@/components/reactify/footer';
import { Card, CardContent } from '@/components/ui/card';

// Example data configuration for the footer
const footerAddress: FooterAddressColumn = {
  title: "Corporate Address:",
  addressLines: [
    "#59/2, Heritage Building,",
    "Kaderanahalli, Dr. Puneeth Rajkumar Road,",
    "Banashankari 2nd Stage,",
    "Bangalore 560070,",
    "Karnataka, India",
  ],
  tel: "+91 80 2669 0145",
  email: "info@molecularconnections.com",
};

const footerLinkColumns: FooterLinkColumn[] = [
  {
    title: "Verticals",
    links: [
      { text: "Publishing & Technology", href: "#" },
      { text: "Pharma & Medicine", href: "#" },
      { text: "IP Research", href: "#" },
      { text: "Analytics", href: "#" },
      { text: "Career", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { text: "About", href: "#" },
      { text: "Certifications", href: "#" },
      { text: "Leadership", href: "#" },
      { text: "Sustainable Development", href: "#" },
      { text: "CSR", href: "#" },
      { text: "Meet Us", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { text: "Digital Transformation", href: "#" },
      { text: "Our Assets", href: "#" },
      { text: "Awards & Recognitions", href: "#" },
      { text: "Press Release", href: "#" },
      { text: "Blog", href: "#" },
      { text: "Get in touch", href: "#" },
    ],
  },
];

const socialLinks: SocialLink[] = [
  { type: "linkedin", href: "#" },
  { type: "youtube", href: "#" },
];

const copyright = `Copyright © ${new Date().getFullYear()} Molecular Connections Pvt. Ltd. | All Rights Reserved`;

export default function ReactifyFooterDemo() {
  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-0">
         <div className="p-6 text-sm text-muted-foreground h-24">
          <p>Content above the footer.</p>
           <p>The ReactifyFooter component is configured by passing data objects as props.</p>
        </div>
        <ReactifyFooter 
          address={footerAddress}
          linkColumns={footerLinkColumns}
          socials={socialLinks}
          copyrightText={copyright}
        />
      </CardContent>
    </Card>
  );
}
