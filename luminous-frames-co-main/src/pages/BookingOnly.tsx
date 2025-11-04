import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingSection from "@/components/BookingSection";

const BookingOnly = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
};

export default BookingOnly;
