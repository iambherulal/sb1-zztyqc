import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={name} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400" />
              {isLast ? (
                <span className="ml-2 text-gray-900 font-medium capitalize">
                  {name.replace('-', ' ')}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="ml-2 text-gray-500 hover:text-gray-700 capitalize"
                >
                  {name.replace('-', ' ')}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};