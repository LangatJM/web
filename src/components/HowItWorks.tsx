const steps = [
  {
    number: "1",
    title: "Choose Your Phone",
    description: "Browse our catalogue and pick the smartphone that fits your needs and budget.",
  },
  {
    number: "2",
    title: "Send an Inquiry",
    description: "Reach us on WhatsApp, call, or fill the inquiry form. Ask anything — no pressure.",
  },
  {
    number: "3",
    title: "Registration & Onboarding",
    description: "Our agent registers you and explains your Lipa Mdogo Mdogo payment plan clearly.",
  },
  {
    number: "4",
    title: "Receive Your Phone",
    description: "Your agent delivers the phone to you. Payment starts only after you have it in hand.",
  },
];

export function HowItWorks() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-navy md:text-3xl">How It Works</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-muted">
          Four simple steps from browsing to holding your new phone.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="card-shadow rounded-2xl bg-white p-6 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ocean-deep text-lg font-bold text-white">
                {step.number}
              </div>
              <h3 className="mt-4 font-bold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
