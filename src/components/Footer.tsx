export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div>
          <strong>Workplace Learning</strong>
          <p>Practical development for the work in front of you.</p>
        </div>
        <p>© {new Date().getFullYear()} Workplace Learning</p>
      </div>
    </footer>
  );
}
