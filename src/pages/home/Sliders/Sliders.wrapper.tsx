import Link from '@/components/Link'
import type { WrapperProps } from './Sliders.type'

const tabletHeroImage = (src: string) => {
  if (src.endsWith('hero-consorcio.webp')) return '/img/hero/hero-consorcio-1024.webp'
  if (src.endsWith('hero-resultados.webp')) return '/img/hero/hero-resultados-1024.webp'
  return src
}

export default function SlidersWrapper({
  id, bgImage, bgImageMobile, bgPosition = 'md:object-[62%_center]',
  bgPositionMobile = 'object-[68%_top]', eyebrow, primary = false,
  title, description, cta, secondaryCta, trust, overlay = 'medium', alt = ''
}: WrapperProps) {
  const Title = primary ? 'h1' : 'h2'
  return <div className="bc-hero-slide bc-hero-slide--refined" data-overlay={overlay} aria-labelledby={`${id}-title`}>
    <picture className="bc-hero-media">
      {bgImageMobile && <source media="(max-width: 767px)" srcSet={bgImageMobile}/>}
      <source media="(max-width: 1023px)" srcSet={tabletHeroImage(bgImage)}/>
      <img src={bgImage} alt={alt} width={1920} height={1080}
        className={`${bgPositionMobile} ${bgPosition}`}
        {...{ fetchpriority: primary ? 'high' : 'low' }}
        loading={primary ? 'eager' : 'lazy'} decoding="async"/>
    </picture>
    <div className="bc-hero-scrim" aria-hidden="true"/>
    <div className="be-wrap bc-hero-grid"><div className="bc-hero-copy">
      {eyebrow && <p className="bc-hero-eyebrow">{eyebrow}</p>}
      <Title id={`${id}-title`}>{title}</Title>
      <p className="bc-hero-description">{description}</p>
      <div className="bc-hero-actions">
        <Link href={cta.href} target={cta.target ?? '_self'} rel={cta.target === '_blank' ? 'noopener noreferrer' : undefined}
          className="be-button" data-cta-name={cta.label} data-cta-location="hero">{cta.label}</Link>
        {secondaryCta && <Link href={secondaryCta.href} target={secondaryCta.target ?? '_self'} rel={secondaryCta.target === '_blank' ? 'noopener noreferrer' : undefined}
          className="bc-hero-secondary bc-arrow-action bc-arrow-action--dark" data-cta-name={secondaryCta.label} data-cta-location="hero">{secondaryCta.label}</Link>}
      </div>
      {trust && <p className="bc-hero-trust">{trust}</p>}
    </div></div>
  </div>
}
