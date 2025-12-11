export default function Footer() {
  return (
    <footer
      className="mt-12"
      style={{
        backgroundColor: '#1F2937',
        color: '#FFFFFF',
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p style={{ color: '#E5E7EB' }}>
            © {new Date().getFullYear()} Housingalot Project. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
