
'use client';

import React, { type ReactNode } from 'react';
import Link from 'next/link';
import { Linkedin, Youtube, Twitter, Facebook } from 'lucide-react';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';

// Prop Interfaces
export interface FooterLinkItem {
  href: string;
  text: string;
}

export interface FooterLinkColumn {
  title: string;
  links: FooterLinkItem[];
}

export interface FooterAddressColumn {
  title: string;
  addressLines: string[];
  tel?: string;
  email?: string;
}

export interface SocialLink {
  type: 'linkedin' | 'youtube' | 'twitter' | 'facebook';
  href: string;
}

// Component Props
interface ReactifyFooterProps extends ReactifyComponentProps {
  address?: FooterAddressColumn;
  linkColumns?: FooterLinkColumn[];
  socials?: SocialLink[];
  copyrightText?: string;
  topSectionClassName?: string;
  bottomSectionClassName?: string;
}

const socialIcons: Record<SocialLink['type'], ReactNode> = {
  linkedin: <Linkedin size={18} />,
  youtube: <Youtube size={18} />,
  twitter: <Twitter size={18} />,
  facebook: <Facebook size={18} />,
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li className="mb-2">
    <Link href={href} className="hover:underline">
      {children}
    </Link>
  </li>
);

export function ReactifyFooter({
  className,
  as: Component = 'footer',
  address,
  linkColumns = [],
  socials = [],
  copyrightText,
  topSectionClassName,
  bottomSectionClassName,
  ...props
}: ReactifyFooterProps) {
  return (
    <Component className={cn("w-full", className)} {...props}>
      {/* Top Section */}
      <div className={cn("bg-[#D48D2C] text-white p-8 md:p-12", topSectionClassName)}>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* Address Column */}
          {address && (
            <div>
              <h3 className="font-bold text-base mb-4">{address.title}</h3>
              <address className="not-italic text-gray-300">
                {address.addressLines.map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}
                {address.tel && <><br /><strong>Tel:</strong> {address.tel}<br /></>}
                {address.email && <><strong>Email:</strong> {address.email}</>}
              </address>
            </div>
          )}

          {/* Link Columns */}
          {linkColumns.map((column, index) => (
            <div key={index}>
              <h3 className="font-bold text-base mb-4">{column.title}</h3>
              <ul className="text-gray-300">
                {column.links.map((link, linkIndex) => (
                  <FooterLink key={linkIndex} href={link.href}>{link.text}</FooterLink>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className={cn("bg-black text-white py-4 px-8", bottomSectionClassName)}>
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left text-xs space-y-2 sm:space-y-0">
          <p>{copyrightText || `Copyright © ${new Date().getFullYear()} Your Company. | All Rights Reserved`}</p>
          {socials.length > 0 && (
            <div className="flex items-center space-x-4">
              {socials.map((social, index) => (
                <Link key={index} href={social.href} className="hover:opacity-80" aria-label={`Visit our ${social.type}`}>
                  {socialIcons[social.type]}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Component>
  );
}
