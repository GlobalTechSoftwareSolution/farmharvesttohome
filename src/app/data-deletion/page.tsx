export const metadata = {
  title: "Data Deletion Instructions | Farm Harvest To Home",
  description:
    "How to request deletion of your account and personal data from Farm Harvest To Home.",
};

export default function DataDeletionPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Data Deletion Instructions
        </h1>
        <p className="mt-2 text-sm text-gray-500">Last Updated: Sep 6, 2025</p>

        <div className="prose prose-indigo mt-8 max-w-none">
          <p>
            If you would like to delete your account or personal data from Farm
            Harvest To Home, please follow the steps below.
          </p>

          <h2>How to Request Deletion</h2>
          <ol>
            <li>
              Send an email to{" "}
              <a href="mailto:farmharvest@gmail.com">farmharvest@gmail.com</a>{" "}
              with the subject line: <em>Request for Data Deletion</em>.
            </li>
            <li>
              Include your registered email address and phone number (if
              applicable) so we can verify your identity.
            </li>
            <li>
              We will confirm your request and delete your account and associated
              personal data within <strong>7 working days</strong>, unless we are
              required to retain certain data for legal or operational reasons.
            </li>
          </ol>

          <h2>What Will Be Deleted</h2>
          <p>
            We will remove personal identifiers associated with your account from
            our application databases. Certain records (e.g., invoices and tax
            documents) may be retained as required by law.
          </p>

          <h2>Contact</h2>
          <p>
            For any questions about data deletion, contact us at:<br />
            <strong>Email:</strong> <a href="mailto:farmharvesttohome@gmail.com">farmharvesttohome@gmail.com
</a><br />
            <strong>Phone:</strong> +91-9844281875
          </p>
        </div>
      </section>
    </main>
  );
}
