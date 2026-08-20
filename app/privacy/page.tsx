import { Metadata } from "next";
import { LegalPageLayout, type LegalHighlight, type LegalSection } from "@/components/legal/LegalPageLayout";
import {
  ShieldCheck,
  EyeOff,
  Download,
  Lock,
  Server,
  KeyRound,
  FileCheck2,
  Trash2,
  Globe2,
  Mail,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — LooseNotion",
  description:
    "Learn how LooseNotion protects your privacy, secures your workspace notes and inline databases, and upholds full user data ownership.",
};

const PRIVACY_HIGHLIGHTS: LegalHighlight[] = [
  {
    title: "100% Data Ownership",
    description:
      "You own all your pages, notes, and databases. We do not claim ownership, sell your data, or monetize your workspace content.",
    icon: <ShieldCheck className="h-4 w-4 text-emerald-400" />,
  },
  {
    title: "Zero Ad Tracking",
    description:
      "LooseNotion contains zero third-party advertising trackers or invasive behavioral profiling. Only essential session tokens are used.",
    icon: <EyeOff className="h-4 w-4 text-blue-400" />,
  },
  {
    title: "Complete Data Portability",
    description:
      "Export your entire workspace in standard Markdown and structured JSON anytime with built-in export tools. Zero vendor lock-in.",
    icon: <Download className="h-4 w-4 text-purple-400" />,
  },
];

const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: "overview",
    title: "Overview & Privacy Philosophy",
    badge: "Core Principles",
    content: (
      <div className="space-y-4">
        <p>
          Welcome to <strong>LooseNotion</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). We believe that your digital workspace should be a private, distraction-free environment for thinking, writing, and organizing. Privacy is not a secondary feature for us; it is fundamental to how LooseNotion is built.
        </p>
        <p>
          This Privacy Policy describes the personal information and workspace data we collect when you visit our website, sign up for an account, and use the LooseNotion application, as well as how that data is stored, processed, and safeguarded.
        </p>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-200">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <strong className="text-emerald-300 font-semibold block mb-1">Our Core Privacy Commitment</strong>
              We will never sell, rent, or trade your personal information or workspace content to data brokers or advertising networks. Your documents and databases belong exclusively to you.
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    badge: "Data Collection",
    content: (
      <div className="space-y-4">
        <p>
          We only collect information that is strictly necessary to provide, secure, and improve LooseNotion services. This falls into three primary categories:
        </p>
        
        <div className="space-y-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-1 flex items-center gap-2">
              <KeyRound className="h-3.5 w-3.5 text-blue-400" />
              1. Account & Identity Information
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              When you authenticate with LooseNotion via Google OAuth or email sign-in, we receive your email address, display name, and avatar profile picture provided by your identity provider. We use this solely to create and authenticate your account vault.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-1 flex items-center gap-2">
              <FileCheck2 className="h-3.5 w-3.5 text-emerald-400" />
              2. Workspace Content & User Data
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              This includes the content you create inside LooseNotion: documents, nested pages, inline database records, table schemas, formatting blocks, page titles, icons, and document tags. This data is synchronized to our secure database to enable seamless access across your devices.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-1 flex items-center gap-2">
              <Server className="h-3.5 w-3.5 text-purple-400" />
              3. Technical & Operational Logs
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              When accessing LooseNotion, standard technical metadata is automatically logged for security and error debugging. This includes your IP address, browser type, operating system, timestamp of requests, and anonymous application crash reports.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    badge: "Usage Purpose",
    content: (
      <div className="space-y-4">
        <p>We process your data strictly under legal and legitimate business interests for the following purposes:</p>
        <ul className="list-disc list-inside space-y-2 pl-2 text-xs sm:text-sm text-zinc-300">
          <li><strong>Delivering Core Functionality:</strong> Persisting and synchronizing your notes, pages, and inline databases in real time.</li>
          <li><strong>Authentication & Access Control:</strong> Verifying your identity, maintaining secure login sessions, and preventing unauthorized account takeover.</li>
          <li><strong>Export & Backup Processing:</strong> Generating standard Markdown and JSON export bundles upon your direct request.</li>
          <li><strong>Performance Optimization:</strong> Monitoring system latency, resolving software bugs, and enhancing server reliability.</li>
          <li><strong>Security & Abuse Prevention:</strong> Detecting fraudulent signups, rate-limiting malicious traffic, and defending against DDoS attacks.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "security-and-storage",
    title: "Data Storage, Security & Encryption",
    badge: "Security Architecture",
    content: (
      <div className="space-y-4">
        <p>
          We implement industry-standard administrative, physical, and technical security safeguards to protect your personal and workspace data from unauthorized access, loss, alteration, or disclosure:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
            <div className="flex items-center gap-2 text-white font-medium text-xs mb-1">
              <Lock className="h-4 w-4 text-emerald-400" />
              <span>Encryption in Transit</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              All communications between your browser and our servers are encrypted using TLS 1.3 / HTTPS encryption.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
            <div className="flex items-center gap-2 text-white font-medium text-xs mb-1">
              <Server className="h-4 w-4 text-blue-400" />
              <span>Encryption at Rest</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Database volumes and backups are encrypted at rest using enterprise-grade AES-256 encryption.
            </p>
          </div>
        </div>
        <p className="text-xs text-zinc-400">
          Our backend persistence is powered by Supabase infrastructure hosted in SOC 2 Type II compliant data centers. While no internet-connected platform can guarantee 100% security, we continuously review and harden our infrastructure.
        </p>
      </div>
    ),
  },
  {
    id: "ownership-and-exports",
    title: "Data Ownership, Portability & Deletion",
    badge: "User Rights",
    content: (
      <div className="space-y-4">
        <p>
          You retain full, exclusive intellectual property ownership of all content, documents, text, and database items you create in LooseNotion.
        </p>
        <div className="space-y-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <h4 className="font-semibold text-white text-xs mb-1">Built-in Markdown & JSON Exporters</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              You have the right to download and export your entire workspace at any time in universal formats (Markdown files for notes and structured JSON for databases). We do not implement proprietary locking mechanisms.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <h4 className="font-semibold text-white text-xs mb-1">Right to Complete Deletion</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              When you delete a page or database from your workspace, it is removed from active display. If you request account closure, all associated records, documents, and credentials in our database will be permanently purged in accordance with our data retention schedule.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "third-parties",
    title: "Third-Party Subprocessors & Integrations",
    badge: "Subprocessors",
    content: (
      <div className="space-y-4">
        <p>
          We partner with reputable infrastructure providers to operate LooseNotion. These subprocessors only process data on our explicit instructions and are bound by stringent confidentiality and data protection agreements:
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 border-b border-white/10 text-zinc-300 font-semibold">
              <tr>
                <th className="p-3">Partner / Subprocessor</th>
                <th className="p-3">Role & Purpose</th>
                <th className="p-3">Location & Compliance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-400">
              <tr>
                <td className="p-3 font-medium text-white">Supabase Inc.</td>
                <td className="p-3">Authentication, PostgreSQL Database, Real-time Sync</td>
                <td className="p-3">USA / EU (SOC 2, HIPAA, GDPR compliant)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-white">Google Cloud / OAuth</td>
                <td className="p-3">Federated Single Sign-On Identity Verification</td>
                <td className="p-3">Global (ISO 27001, SOC 2 compliant)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-white">Vercel Inc.</td>
                <td className="p-3">Edge CDN & Web Application Hosting</td>
                <td className="p-3">Global Edge Network</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    id: "cookies-and-storage",
    title: "Cookies & Local Session Storage",
    badge: "Cookies",
    content: (
      <div className="space-y-4">
        <p>
          LooseNotion utilizes essential first-party cookies and modern web browser storage (such as LocalStorage and SessionStorage) solely for crucial application functions:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-2 text-xs sm:text-sm text-zinc-300">
          <li><strong>Authentication Cookies:</strong> Secure, HTTP-only tokens (`sb-*`) that maintain your signed-in state across page reloads without exposing passwords.</li>
          <li><strong>UI State Preferences:</strong> Browser LocalStorage is used to remember your sidebar collapse states, theme preferences, and editor drafts.</li>
          <li><strong>No Third-Party Ad Cookies:</strong> We do not deploy advertising cookies, cross-site trackers, or commercial pixels.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "user-rights",
    title: "Your Rights (GDPR & CCPA/CPRA Compliance)",
    badge: "Compliance",
    content: (
      <div className="space-y-4">
        <p>
          Regardless of where you reside, we grant comprehensive data privacy rights in alignment with the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA/CPRA):
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <strong className="text-white text-xs block mb-1">Right to Access</strong>
            <p className="text-[11px] text-zinc-400">Request a copy of the personal information and workspace records we hold about you.</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <strong className="text-white text-xs block mb-1">Right to Rectification</strong>
            <p className="text-[11px] text-zinc-400">Correct any inaccurate or incomplete personal or profile details.</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <strong className="text-white text-xs block mb-1">Right to Erasure (To be Forgotten)</strong>
            <p className="text-[11px] text-zinc-400">Request permanent deletion of your account vault and all associated records.</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <strong className="text-white text-xs block mb-1">Right to Data Portability</strong>
            <p className="text-[11px] text-zinc-400">Download your files and database schemas in universal machine-readable formats.</p>
          </div>
        </div>

        <p className="text-xs text-zinc-400">
          To exercise any of these rights, contact us at <a href="mailto:privacy@loosenotion.app" className="text-zinc-200 underline hover:text-white">privacy@loosenotion.app</a>. We respond to all verified requests within 30 days.
        </p>
      </div>
    ),
  },
  {
    id: "children-privacy",
    title: "Children's Privacy",
    badge: "Age Requirement",
    content: (
      <div className="space-y-4">
        <p>
          LooseNotion is designed for general productivity and is not directed to children under the age of 13 (or under 16 in certain jurisdictions). We do not knowingly collect personal information from children. If you believe a child has provided us with personal data without parental consent, please contact us immediately so we can promptly delete the account.
        </p>
      </div>
    ),
  },
  {
    id: "policy-changes-and-contact",
    title: "Policy Updates & Contact Information",
    badge: "Contact",
    content: (
      <div className="space-y-4">
        <p>
          We may update this Privacy Policy periodically to reflect enhancements to our platform or legal changes. When changes are made, we will revise the &ldquo;Effective Date&rdquo; at the top of this page. For significant updates, we will provide prominent notice within the application or via email.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#161619] p-5">
          <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
            <Mail className="h-4 w-4 text-emerald-400" />
            Data Protection & Privacy Contact
          </h4>
          <p className="text-xs text-zinc-400 mb-3">
            For questions, data requests, or feedback regarding our privacy practices, please contact our Data Protection Officer:
          </p>
          <div className="text-xs space-y-1 text-zinc-300 font-mono">
            <p><strong>Email:</strong> privacy@loosenotion.app</p>
            <p><strong>Developer:</strong> Md Mizan (<a href="https://github.com/mizan989" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">@mizan989</a>)</p>
            <p><strong>Application:</strong> LooseNotion Connected Workspace</p>
          </div>
        </div>
      </div>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      type="privacy"
      title="Privacy Policy"
      subtitle="How LooseNotion protects your privacy, manages your account data, and upholds 100% user data ownership across your docs and databases."
      effectiveDate="August 20, 2026"
      readingTime="~5 minutes"
      highlights={PRIVACY_HIGHLIGHTS}
      sections={PRIVACY_SECTIONS}
    />
  );
}
