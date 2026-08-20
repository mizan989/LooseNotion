import { Metadata } from "next";
import { LegalPageLayout, type LegalHighlight, type LegalSection } from "@/components/legal/LegalPageLayout";
import {
  FileText,
  ShieldCheck,
  UserCheck,
  Scale,
  Ban,
  HardDrive,
  Cpu,
  AlertTriangle,
  Mail,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions — LooseNotion",
  description:
    "Review the Terms and Conditions of Service governing your access to and use of the LooseNotion connected workspace application.",
};

const TERMS_HIGHLIGHTS: LegalHighlight[] = [
  {
    title: "You Own Your Content",
    description:
      "All pages, documents, database rows, notes, and attachments you create belong solely to you. We claim zero ownership.",
    icon: <ShieldCheck className="h-4 w-4 text-blue-400" />,
  },
  {
    title: "Transparent & Fair Rules",
    description:
      "Use LooseNotion for personal or team productivity. No hidden catches, no unauthorized resale, and no invasive telemetry.",
    icon: <Scale className="h-4 w-4 text-emerald-400" />,
  },
  {
    title: "Cancel & Export Anytime",
    description:
      "You are free to stop using LooseNotion whenever you want. You can export all your data in standard Markdown and JSON before closing your account.",
    icon: <UserCheck className="h-4 w-4 text-purple-400" />,
  },
];

const TERMS_SECTIONS: LegalSection[] = [
  {
    id: "acceptance-of-terms",
    title: "Acceptance of Terms",
    badge: "Agreement",
    content: (
      <div className="space-y-4">
        <p>
          These Terms and Conditions of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;User&rdquo;, &ldquo;you&rdquo;, or &ldquo;your&rdquo;) and <strong>LooseNotion</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), governing your access to and use of the LooseNotion website, web application, APIs, and connected productivity services (collectively, the &ldquo;Service&rdquo;).
        </p>
        <p>
          By accessing, registering for, or using LooseNotion in any manner, you acknowledge that you have read, understood, and agree to be bound by these Terms and our <a href="/privacy" className="text-zinc-200 underline hover:text-white">Privacy Policy</a>. If you do not agree with these Terms, you must not access or use the Service.
        </p>
      </div>
    ),
  },
  {
    id: "eligibility-and-accounts",
    title: "Account Registration & Security",
    badge: "Account Responsibilities",
    content: (
      <div className="space-y-4">
        <p>
          To access the workspace features of LooseNotion, you must authenticate through our supported authentication methods (such as Google OAuth or verified email).
        </p>
        <ul className="list-disc list-inside space-y-2 pl-2 text-xs sm:text-sm text-zinc-300">
          <li><strong>Eligibility:</strong> You represent and warrant that you are at least 13 years of age (or the minimum legal age required in your jurisdiction) and possess the legal capacity to enter into these Terms.</li>
          <li><strong>Credential Security:</strong> You are solely responsible for maintaining the confidentiality of your credentials, authentication tokens, and third-party login accounts.</li>
          <li><strong>Account Activity:</strong> You are fully responsible for all activities and content created or modified under your account. Notify us immediately if you suspect unauthorized access.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "user-content-and-ownership",
    title: "User Content & Ownership",
    badge: "Your Rights",
    content: (
      <div className="space-y-4">
        <p>
          &ldquo;User Content&rdquo; refers to all text, documents, notes, inline database schemas, records, tags, images, and data that you enter, upload, or generate inside LooseNotion.
        </p>

        <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4 text-blue-200">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <strong className="text-blue-300 font-semibold block mb-1">Full Intellectual Property Ownership</strong>
              You retain 100% intellectual property ownership of all your User Content. LooseNotion does not claim any copyright, ownership, or commercial exploitation rights over your documents and databases.
            </div>
          </div>
        </div>

        <p>
          <strong>Limited Technical License:</strong> You grant LooseNotion only the limited, non-exclusive license necessary to host, store, replicate, and transmit your User Content solely to operate, maintain, and provide the Service to you (e.g., displaying your pages in your browser, generating search indexes, and creating export bundles).
        </p>
      </div>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use & Prohibited Activities",
    badge: "Rules of Conduct",
    content: (
      <div className="space-y-4">
        <p>You agree not to misuse LooseNotion or assist any third party in doing so. Specifically, you agree that you will NOT:</p>

        <div className="space-y-2.5">
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-xs text-zinc-300 flex items-start gap-2.5">
            <Ban className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-red-300">No Illegal or Harmful Content:</strong> Upload or store unlawful, defamatory, malicious, abusive, or infringing material, or content that violates intellectual property or privacy rights.
            </div>
          </div>

          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-xs text-zinc-300 flex items-start gap-2.5">
            <Ban className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-red-300">No Infrastructure Abuse:</strong> Attempt to probe, scan, breach, or circumvent security measures, or overload servers via denial-of-service attacks or automated abusive scripts.
            </div>
          </div>

          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-xs text-zinc-300 flex items-start gap-2.5">
            <Ban className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-red-300">No Unauthorized Scraping:</strong> Use automated bots, crawlers, or scrapers to extract application source code, API keys, or data without express written permission.
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "service-availability-and-backups",
    title: "Service Availability & Backups",
    badge: "Availability",
    content: (
      <div className="space-y-4">
        <p>
          We strive to provide continuous, high-speed availability with low latency. However, you acknowledge that:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-2 text-xs sm:text-sm text-zinc-300">
          <li><strong>Maintenance & Upgrades:</strong> The Service may be occasionally interrupted for scheduled maintenance, updates, or infrastructure improvements.</li>
          <li><strong>Export Best Practice:</strong> While we maintain automated database backups for disaster recovery, we strongly encourage users to regularly export critical workspace content using LooseNotion&apos;s built-in Markdown and JSON export tools.</li>
          <li><strong>Feature Updates:</strong> We continuously refine LooseNotion and reserve the right to modify, introduce, or deprecate non-essential workspace features with reasonable notice where feasible.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "proprietary-rights",
    title: "LooseNotion Proprietary Rights",
    badge: "Intellectual Property",
    content: (
      <div className="space-y-4">
        <p>
          All rights, title, and interest in and to LooseNotion — including but not limited to the software, user interface design, logos, brand names, visual styling, source code, and documentation — are and will remain the exclusive property of LooseNotion and its creator.
        </p>
        <p className="text-xs text-zinc-400">
          These Terms do not grant you any right to use the LooseNotion trademark, logo, or domain names without our prior written consent.
        </p>
      </div>
    ),
  },
  {
    id: "termination",
    title: "Termination & Account Closure",
    badge: "Termination",
    content: (
      <div className="space-y-4">
        <p>
          <strong>By You:</strong> You may discontinue using LooseNotion at any time. You can export your data and request permanent deletion of your account by reaching out to support.
        </p>
        <p>
          <strong>By Us:</strong> We reserve the right to suspend or terminate your account if you violate these Terms, engage in fraudulent or abusive conduct, or if required by applicable legal orders. Where feasible, we will provide advance notice to allow you to export your User Content.
        </p>
      </div>
    ),
  },
  {
    id: "disclaimer-of-warranties",
    title: "Disclaimer of Warranties",
    badge: "Legal Disclaimer",
    content: (
      <div className="space-y-4">
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-amber-200 text-xs leading-relaxed">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 font-semibold block mb-1">Provided &ldquo;As Is&rdquo; and &ldquo;As Available&rdquo;</strong>
              To the maximum extent permitted by applicable law, LooseNotion is provided without warranties of any kind, whether express, implied, statutory, or otherwise, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    badge: "Liability",
    content: (
      <div className="space-y-4">
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          To the maximum extent permitted by law, in no event shall LooseNotion, its maintainers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages (including loss of profits, data, goodwill, or business interruption) arising out of or related to your use of or inability to use the Service.
        </p>
        <p className="text-xs text-zinc-400 leading-relaxed">
          In jurisdictions that do not allow the exclusion or limitation of certain liabilities, our liability shall be limited to the greatest extent permitted by applicable law.
        </p>
      </div>
    ),
  },
  {
    id: "governing-law-and-contact",
    title: "Governing Law, Amendments & Contact",
    badge: "Contact & Legal",
    content: (
      <div className="space-y-4">
        <p>
          These Terms shall be governed by and construed in accordance with applicable laws, without regard to its conflict of law provisions. Any dispute arising from these Terms shall be resolved through friendly and good-faith negotiation.
        </p>
        <p>
          We reserve the right to amend these Terms from time to time. Your continued use of LooseNotion following notice of revised Terms constitutes your acceptance of the updated terms.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#161619] p-5">
          <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
            <Mail className="h-4 w-4 text-blue-400" />
            Terms of Service Inquiries
          </h4>
          <p className="text-xs text-zinc-400 mb-3">
            If you have questions regarding these Terms or need clarification regarding permitted workspace usage, please contact us:
          </p>
          <div className="text-xs space-y-1 text-zinc-300 font-mono">
            <p><strong>Email:</strong> legal@loosenotion.app</p>
            <p><strong>Developer:</strong> Md Mizan (<a href="https://github.com/mizan989" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">@mizan989</a>)</p>
            <p><strong>Service:</strong> LooseNotion Connected Workspace</p>
          </div>
        </div>
      </div>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      type="terms"
      title="Terms and Conditions"
      subtitle="The rules, rights, and standards governing your use of LooseNotion. Clear terms designed to respect your data and creative freedom."
      effectiveDate="August 20, 2026"
      readingTime="~6 minutes"
      highlights={TERMS_HIGHLIGHTS}
      sections={TERMS_SECTIONS}
    />
  );
}
