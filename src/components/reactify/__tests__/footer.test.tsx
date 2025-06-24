import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifyFooter, type FooterAddressColumn, type FooterLinkColumn, type SocialLink } from '../footer';

const mockAddress: FooterAddressColumn = {
  title: "Test Address",
  addressLines: ["123 Test St", "Testville, TS 12345"],
  tel: "111-222-3333",
  email: "test@test.com",
};

const mockLinkColumns: FooterLinkColumn[] = [
  {
    title: "Company Links",
    links: [{ href: "/about", text: "About Us" }],
  },
  {
    title: "Resource Links",
    links: [{ href: "/blog", text: "Blog" }],
  },
];

const mockSocials: SocialLink[] = [
  { type: "linkedin", href: "https://linkedin.com" },
  { type: "youtube", href: "https://youtube.com" },
];

const mockCopyright = "Test Copyright 2024";


describe('ReactifyFooter', () => {
  it('renders default copyright if no props are provided', () => {
    render(<ReactifyFooter />);
    // Default copyright will still render
    expect(screen.getByText(/Copyright ©/)).toBeInTheDocument();
    expect(screen.queryByText("Test Address")).not.toBeInTheDocument();
  });

  it('renders all sections when data is provided', () => {
    render(<ReactifyFooter 
        address={mockAddress}
        linkColumns={mockLinkColumns}
        socials={mockSocials}
        copyrightText={mockCopyright}
    />);
    
    // Check address
    expect(screen.getByText('Test Address')).toBeInTheDocument();
    expect(screen.getByText('123 Test St')).toBeInTheDocument();
    expect(screen.getByText(/111-222-3333/)).toBeInTheDocument();

    // Check link columns
    expect(screen.getByText('Company Links')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Resource Links')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();

    // Check socials
    const socialLinks = screen.getAllByRole('link');
    expect(socialLinks.some(link => link.getAttribute('aria-label')?.includes('linkedin'))).toBe(true);
    expect(socialLinks.some(link => link.getAttribute('aria-label')?.includes('youtube'))).toBe(true);

    // Check copyright
    expect(screen.getByText(mockCopyright)).toBeInTheDocument();
  });

  it('applies custom classNames to sections', () => {
    const { container } = render(<ReactifyFooter 
        topSectionClassName="bg-custom-top"
        bottomSectionClassName="bg-custom-bottom"
    />);

    const topSection = container.querySelector('.bg-custom-top');
    const bottomSection = container.querySelector('.bg-custom-bottom');

    expect(topSection).toBeInTheDocument();
    expect(bottomSection).toBeInTheDocument();
  });
});
