import {
  FolderKanban,
  ClipboardList,
  Users,
  Settings,
  BarChart3,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: FolderKanban,
    title: "Projects",
    description:
      "Create and manage projects with ease. Track progress and stay organized.",
  },
  {
    icon: ClipboardList,
    title: "Tasks",
    description:
      "Assign tasks, set priorities, and track completion in real-time.",
  },
  {
    icon: Users,
    title: "Teams",
    description:
      "Collaborate with your team. Assign roles and work together seamlessly.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Get insights into your project progress with visual reports and stats.",
  },
  {
    icon: Settings,
    title: "Customizable",
    description: "Tailor the workflow to fit your team's unique processes.",
  },
  {
    icon: Shield,
    title: "Secure",
    description: "Enterprise-grade security with open-source transparency.",
  },
];

function FeaturesSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Everything you need to ship faster
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            FlowPro brings together all the tools your team needs to plan,
            track, and deliver projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/20 transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
