import React from "react";
import { Helmet } from "react-helmet-async";

export const SITE_URL = "https://www.fabliss.in";
export const DEFAULT_TITLE = "Fabliss | Premium Gift Hampers for Every Occasion";
export const DEFAULT_DESCRIPTION =
  "Discover premium gift hampers for birthdays, baby showers, housewarmings, festivals, and more with Fabliss.";
export const DEFAULT_IMAGE = `${SITE_URL}/fabliss-logo.png`;
export const DEFAULT_ROBOTS = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
export const CONTACT_PHONE = "+91 7607175551";
export const INSTAGRAM_URL = "https://www.instagram.com/your_fabliss/";

export const buildOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Fabliss",
  url: SITE_URL,
  logo: DEFAULT_IMAGE,
  email: "hello@fabliss.in",
  telephone: CONTACT_PHONE,
  sameAs: [INSTAGRAM_URL],
});

export const buildWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE_URL,
  name: "Fabliss",
});

export const buildItemListSchema = (hampers = []) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: hampers.map((hamper, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: hamper.name,
    url: `${SITE_URL}/hampers/${hamper.slug}`,
  })),
});

export const buildProductSchema = (hamper) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: hamper.name,
  description: hamper.description,
  image: hamper.image || hamper.gallery?.[0] || DEFAULT_IMAGE,
  sku: hamper.slug,
  brand: {
    "@type": "Brand",
    name: "Fabliss",
  },
  offers: {
    "@type": "Offer",
    price: hamper.price,
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    url: `${SITE_URL}/hampers/${hamper.slug}`,
  },
});

const Seo = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonicalUrl = SITE_URL,
  image = DEFAULT_IMAGE,
  type = "website",
  robots = DEFAULT_ROBOTS,
  jsonLd,
}) => {
  const resolvedTitle = title;
  const resolvedDescription = description;
  const resolvedCanonicalUrl = canonicalUrl;
  const resolvedImage = image;

  const schemaMarkup = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={resolvedCanonicalUrl} />

      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:url" content={resolvedCanonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Fabliss" />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedImage} />

      {schemaMarkup.map((schema, index) => (
        <script key={`${schema["@type"] || "schema"}-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
