import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer mt-auto py-4">
      <div className="container text-center">
        <p className="copyright mb-0">
          &copy; {new Date().getFullYear()} Edwin Gigi. Built with <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a> & <a href="https://flask.palletsprojects.com/" target="_blank" rel="noopener noreferrer">Flask</a>.
        </p>
      </div>
    </footer>
  );
}
