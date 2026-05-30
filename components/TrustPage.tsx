import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Wordmark } from "@/components/Nav";
import { Button, GradientCard } from "@/components/ui";
import { AppleIcon, GithubIcon } from "@/components/icons";

type TrustSection = {
  title: string;
  body: string[];
};

type TrustPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: TrustSection[];
  asideTitle: string;
  asideItems: string[];
};

export function TrustPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
  asideTitle,
  asideItems,
}: TrustPageProps) {
  return (
    <>
      <header className="border-b border-line-soft bg-ink-950/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 w-full max-w-page items-center justify-between px-6 lg:px-8">
          <Wordmark />
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/SetFodi/Andspace"
              className="hidden h-9 w-9 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-white/[0.05] hover:text-fg sm:flex"
              aria-label="GitHub"
            >
              <GithubIcon />
            </Link>
            <Button href="https://github.com/SetFodi/Andspace/releases/download/v0.1.0-alpha.9/AndSpace_0.1.0-alpha.9_aarch64.dmg">
              <AppleIcon className="h-4 w-4" />
              Download
            </Button>
          </div>
        </nav>
      </header>

      <main className="mx-auto grid w-full max-w-page gap-8 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_21rem] lg:px-8 lg:py-24">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-violet-400">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-balance text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-[1.03] tracking-[-0.03em] text-fg">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-7 text-fg-muted">
            {intro}
          </p>
          <p className="mt-3 text-[12.5px] text-fg-faint">Last updated: {updated}</p>

          <div className="mt-12 space-y-5">
            {sections.map((section) => (
              <GradientCard key={section.title}>
                <section className="p-6 sm:p-7">
                  <h2 className="text-[18px] font-semibold tracking-tight text-fg">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-3 text-[14px] leading-7 text-fg-muted">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              </GradientCard>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <GradientCard>
            <div className="p-5">
              <h2 className="text-[14px] font-semibold text-fg">{asideTitle}</h2>
              <ul className="mt-4 space-y-3 text-[13px] leading-6 text-fg-muted">
                {asideItems.map((item) => (
                  <li key={item} className="border-l border-violet/30 pl-3">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 border-t border-white/[0.06] pt-4 text-[13px]">
                <Link
                  href="https://github.com/SetFodi/Andspace/issues"
                  className="text-violet-300 transition-colors hover:text-violet-200"
                >
                  Contact through GitHub issues
                </Link>
              </div>
            </div>
          </GradientCard>
        </aside>
      </main>

      <Footer />
    </>
  );
}
