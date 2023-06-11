import React from "react";

const NotFound = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="text-center">
            <div className="error mx-auto" data-text={404}>
              404
            </div>
            <p className="lead text-gray-800 mb-5">Page Not Found</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
