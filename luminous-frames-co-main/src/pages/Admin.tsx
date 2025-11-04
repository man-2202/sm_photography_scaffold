const Admin = () => {
  return (
    <div className="bg-background min-h-screen text-foreground">
      <header className="section-padding section-spacing bg-gradient-to-br from-primary to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-serif font-bold mb-3 text-primary-foreground">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground">Manage galleries, bookings, users, and site content here.</p>
        </div>
      </header>

      <main className="section-padding max-w-5xl mx-auto grid gap-12 py-16">
        <section className="bg-card shadow-md rounded-xl p-8">
          <h2 className="text-2xl font-serif font-semibold mb-4 text-primary">Galleries</h2>
          <div className="text-muted-foreground">[Gallery Management Table Coming Soon]</div>
        </section>
        <section className="bg-card shadow-md rounded-xl p-8">
          <h2 className="text-2xl font-serif font-semibold mb-4 text-primary">Bookings</h2>
          <div className="text-muted-foreground">[Bookings Management Table Coming Soon]</div>
        </section>
        <section className="bg-card shadow-md rounded-xl p-8">
          <h2 className="text-2xl font-serif font-semibold mb-4 text-primary">Users</h2>
          <div className="text-muted-foreground">[User Management Table Coming Soon]</div>
        </section>
      </main>
    </div>
  );
};

export default Admin;
