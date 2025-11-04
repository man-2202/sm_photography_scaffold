import About from "@/components/About";

const Me = () => {
  return (
    <main>
      <About />
      <section className="section-padding section-spacing bg-background">
        <div className="max-w-4xl mx-auto text-muted-foreground">
          <h3 className="text-2xl font-serif font-semibold mb-4">About Me</h3>
          <p className="mb-4">
            Hi — I'm the photographer behind SM Photography. I specialize in crafting cinematic, timeless images
            that tell a story. My approach combines technical precision with an artistic eye for light and composition.
          </p>
          <p>
            I love working closely with clients to create comfortable, relaxed sessions that bring out authentic
            expressions. Whether it's a wedding, portrait, or commercial shoot, my goal is to capture moments you'll
            cherish forever.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Me;
