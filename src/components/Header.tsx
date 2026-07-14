import React from 'react';

const Header = () => {
  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
        <div className="flex items-center gap-3 mb-6">
          <img
            src={`${import.meta.env.BASE_URL}icon/Emblem_Serenitea_Pot.webp`}
            alt=""
            className="w-9 h-9 shrink-0 object-contain opacity-80"
            style={{ filter: 'sepia(0.25) saturate(0.65) brightness(0.92)' }}
            width={36}
            height={36}
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground leading-none">
              Serenitea Pot · Fan archive
            </p>
            <div className="rule-jade mt-2.5" />
          </div>
        </div>

        <h1 className="font-display text-4xl md:text-5xl lg:text-[3.35rem] text-foreground leading-[1.12] max-w-2xl">
          A collection of gorgeous teapot and Miliastra Wonderland builds
        </h1>
        <p className="mt-4 max-w-lg text-base text-muted-foreground leading-relaxed">
          Exteriors, interiors, and Wonderland worlds — with replica IDs and Stage GUIDs for in-game use.
        </p>
      </div>
    </header>
  );
};

export default Header;
