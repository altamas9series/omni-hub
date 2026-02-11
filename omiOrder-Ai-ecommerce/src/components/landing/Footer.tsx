import { siteContent } from "@/data/content";
import {
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import logo9series from "@/assets/9series-logo.png";
import clutchImg from "@/assets/clutch.png";
import googleImg from "@/assets/google.png";

const { brand, footer } = siteContent;

const footerAssetMap: Record<string, string> = {
  "9series-logo": logo9series,
  clutch: clutchImg,
  google: googleImg,
};

const socialIconMap: Record<string, LucideIcon> = {
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
};

export default function Footer() {
  const linkGroups = footer.linkGroups ?? [];
  const social = footer.social ?? [];
  const ratings = footer.ratings ?? [];

  return (
    <footer className="w-full bg-white font-['Lexend',sans-serif]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:px-8 md:py-8">
        {/* Top: Brand + Ratings */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex max-w-[507px] flex-col gap-2">
            {footer.logo ? (
              <img
                src={footerAssetMap[footer.logo] ?? footer.logo}
                alt={footer.logoAlt ?? brand.name}
                className="h-auto w-[100px]"
              />
            ) : (
              <div className="flex items-center gap-2 text-xl font-bold text-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                  {brand.name.charAt(0)}
                </div>
                <span>
                  {brand.name} <span className="gradient-text">{brand.nameAccent}</span>
                </span>
              </div>
            )}
            <p className="m-0 text-base font-normal leading-[26px] text-[#444444]">
              {footer.tagline}
            </p>
            <div className="flex items-center gap-0">
              {social.map((item) => {
                const Icon = socialIconMap[item.icon ?? ""];
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-center p-2.5 transition-opacity hover:opacity-70"
                    aria-label={item.label}
                  >
                    {Icon ? (
                      <Icon className="h-5 w-5 text-[#444444]" />
                    ) : (
                      <span className="text-sm text-[#444444]">{item.label}</span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
          {ratings.length > 0 && (
          <div className="flex items-center gap-14 rounded-2xl border border-[hsl(var(--border))] bg-white px-6 py-3 shadow-[0px_34px_9px_0px_rgba(0,0,0,0),0px_22px_9px_0px_rgba(0,0,0,0),0px_12px_7px_0px_rgba(0,0,0,0.02),0px_5px_5px_0px_rgba(0,0,0,0.03),0px_1px_3px_0px_rgba(0,0,0,0.03)]">
            {ratings.map((r) => (
              <div
                key={r.logoAlt}
                className="flex flex-col items-center gap-1"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold tracking-[0.36px] text-[#E2E200]">
                    ★
                  </span>
                  <span className="font-['Lexend',sans-serif] text-lg font-semibold tracking-[0.36px] text-[#4F4E4E]">
                    {r.score}
                  </span>
                </div>
                {r.logo ? (
                  <img
                    src={footerAssetMap[r.logo] ?? r.logo}
                    alt={r.logoAlt}
                    className="h-[30px] w-auto"
                  />
                ) : (
                  <span className="text-xs text-[#4F4E4E]">{r.logoAlt}</span>
                )}
              </div>
            ))}
          </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[#E5E7EB]" />

        {/* Link groups */}
        <div className="flex flex-wrap justify-between gap-8">
          {linkGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <h4 className="m-0 font-['Lexend',sans-serif] text-base font-bold leading-6 tracking-[0.31px] text-[#333333]">
                {group.title}
              </h4>
              <ul className="m-0 flex flex-col gap-3 p-0 list-none">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-['Lexend',sans-serif] text-sm font-normal leading-normal tracking-[0.36px] text-[#444444] no-underline transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center gap-6">
          <div className="h-px w-full bg-[#E5E7EB]" />
          <p className="m-0 font-['Lexend',sans-serif] text-center text-[14.9px] font-normal leading-6 tracking-[0.36px] text-[#4F4E4E]">
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
