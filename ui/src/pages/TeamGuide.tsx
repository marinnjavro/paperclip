import type { ReactNode } from "react";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";

export function TeamGuide() {
  useBreadcrumbs([{ label: "Team Guide" }]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          LSB Finance &amp; Accounting — Team Guide
        </h1>
        <p className="mt-2 text-muted-foreground">
          A plain-English guide for the Luxembourg School of Business accounting
          team on how to work with your AI finance agents.
        </p>
      </div>

      {/* What is this */}
      <Section title="What is this system?">
        <p>
          This is <strong>Paperclip</strong>, a control panel that manages a
          team of AI agents. Each agent is responsible for a specific area of
          LSB's finance and accounting work: accounts receivable, accounts
          payable, bookkeeping, budgeting, and overall financial coordination.
        </p>
        <p>
          The agents don't replace you. They prepare documents, flag overdue
          items, draft templates, and keep processes consistent &mdash; so you
          can focus on decisions and relationships.
        </p>
      </Section>

      {/* Your AI Team */}
      <Section title="Your AI finance team">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead className="bg-muted">
            <tr>
              <th className="text-left px-4 py-2 font-medium">Agent</th>
              <th className="text-left px-4 py-2 font-medium">What it does</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <Row
              agent="Finance Director"
              desc="Coordinates the team, produces monthly reports, maintains governance rules"
            />
            <Row
              agent="AR Agent"
              desc="Tracks invoices sent to clients, flags overdue payments, prepares reminder emails"
            />
            <Row
              agent="AP Agent"
              desc="Tracks vendor bills, manages payment schedules, routes approvals"
            />
            <Row
              agent="Bookkeeping Agent"
              desc="Maintains the chart of accounts, records journal entries, runs monthly closing checklists"
            />
            <Row
              agent="Budget & Compliance"
              desc="Monitors budget vs. actual spending, tracks VAT deadlines, flags variances"
            />
          </tbody>
        </table>
      </Section>

      {/* How to assign work */}
      <Section title="How to give agents work">
        <ol className="list-decimal list-inside space-y-3">
          <li>
            Go to <strong>Issues</strong> in the left sidebar.
          </li>
          <li>
            Click <strong>New Issue</strong> and describe what you need in plain
            English. For example:{" "}
            <em>
              "Prepare the January AR aging report based on the invoice tracker"
            </em>
            .
          </li>
          <li>
            Assign it to the right agent (e.g. the AR Agent for receivables
            work).
          </li>
          <li>
            Set priority (<strong>high</strong> = urgent,{" "}
            <strong>medium</strong> = this week, <strong>low</strong> = when
            available).
          </li>
          <li>
            Move the issue status to <strong>Todo</strong>. The agent will pick
            it up automatically on its next cycle.
          </li>
        </ol>
      </Section>

      {/* The reference folder */}
      <Section title="The Reference folder — feeding policies and data">
        <p>
          All company policies, templates, and real data live in the{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
            reference/
          </code>{" "}
          folder of the LSB Finance GitHub repository. Agents are instructed to
          regularly read this folder and use its contents as the source of truth.
        </p>
        <p>What to put there:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>chart-of-accounts.csv</strong> &mdash; your actual LSB chart
            of accounts
          </li>
          <li>
            <strong>vendor-list.csv</strong> &mdash; current vendor / supplier
            list
          </li>
          <li>
            <strong>tuition-fee-schedule.md</strong> &mdash; fee structure by
            programme
          </li>
          <li>
            <strong>payment-terms-policy.md</strong> &mdash; standard payment
            terms
          </li>
          <li>
            <strong>vat-rules.md</strong> &mdash; Luxembourg VAT specifics for
            LSB
          </li>
          <li>
            <strong>approval-thresholds.md</strong> &mdash; who signs off on
            what amounts
          </li>
          <li>
            <strong>bank-accounts.md</strong> &mdash; account names (never put
            passwords or credentials here)
          </li>
        </ul>
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 text-sm">
          <strong>Important:</strong> Whenever you update a policy or add a new
          document to the reference folder, agents will pick it up on their next
          task. They are instructed to verify their work against these documents.
        </div>
      </Section>

      {/* How agents work */}
      <Section title="How agents actually work">
        <ul className="list-disc list-inside space-y-2">
          <li>
            Agents <strong>wake up on a schedule</strong> (heartbeat) or when
            you assign them a task.
          </li>
          <li>
            They read the issue description, check the reference folder for
            relevant policies, do the work, and commit the result to the GitHub
            repository.
          </li>
          <li>
            When done, the issue moves to <strong>In Review</strong>. You review
            the output, approve or request changes.
          </li>
          <li>
            Agents never send emails, make payments, or access bank accounts
            directly. They <em>prepare</em> documents and <em>flag</em> actions
            for you.
          </li>
        </ul>
      </Section>

      {/* Approvals */}
      <Section title="Approvals and governance">
        <p>
          Some actions require human approval before agents can proceed. You'll
          see these in the <strong>Approvals</strong> section of the sidebar.
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>New agent creation always needs board approval</li>
          <li>
            Spending above thresholds is flagged for Finance Director or board
            review
          </li>
          <li>
            Check the Approvals page regularly to unblock any waiting items
          </li>
        </ul>
      </Section>

      {/* Day-to-day */}
      <Section title="Your daily routine with this system">
        <ol className="list-decimal list-inside space-y-2">
          <li>
            <strong>Morning:</strong> Check your <strong>Inbox</strong> for
            overnight updates and completed work.
          </li>
          <li>
            <strong>Review:</strong> Look at issues marked{" "}
            <strong>In Review</strong> &mdash; approve or send back with
            comments.
          </li>
          <li>
            <strong>Assign:</strong> Create new issues for any ad-hoc requests
            (e.g. "prepare the Q1 VAT declaration draft").
          </li>
          <li>
            <strong>Approvals:</strong> Clear any pending approval requests.
          </li>
          <li>
            <strong>Reference updates:</strong> If a policy changed, update the
            file in the reference folder and push to GitHub.
          </li>
        </ol>
      </Section>

      {/* What agents cannot do */}
      <Section title="What agents cannot do">
        <ul className="list-disc list-inside space-y-1">
          <li>Access bank accounts or make payments</li>
          <li>Send emails to clients or vendors (they draft, you send)</li>
          <li>Sign legal documents</li>
          <li>Override your decisions</li>
          <li>Access systems outside this workspace</li>
        </ul>
        <p>
          Think of them as very fast, tireless junior accountants who need your
          supervision and sign-off.
        </p>
      </Section>

      {/* Need help */}
      <Section title="Need help?">
        <p>
          If something looks wrong or an agent is stuck, check the agent's
          detail page (click its name in the sidebar) to see its recent runs and
          logs. You can pause any agent at any time from its settings.
        </p>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  );
}

function Row({ agent, desc }: { agent: string; desc: string }) {
  return (
    <tr>
      <td className="px-4 py-2 font-medium text-foreground">{agent}</td>
      <td className="px-4 py-2 text-muted-foreground">{desc}</td>
    </tr>
  );
}
