import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-sm">
        <p className="text-sm text-muted-foreground mb-3">
          404
        </p>
        <h1 className="font-display text-4xl text-foreground mb-3">
          Page not found
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          That path isn’t in the archive.
        </p>
        <a href="/" className="btn-jade">
          Back to builds
        </a>
      </div>
    </div>
  );
};

export default NotFound;
