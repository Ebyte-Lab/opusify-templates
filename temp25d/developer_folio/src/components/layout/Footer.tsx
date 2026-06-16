
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full text-center py-8 text-sm text-text/40 font-mono border-t border-white/5 mt-auto">
      <p>&copy; {currentYear} Developer Folio. Scaffolded with Opusify.</p>
    </footer>
  );
}
