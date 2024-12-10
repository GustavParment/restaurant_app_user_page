import React from "react";

const ProfileSection = () => {
  return (
    <>
      <section className="pt-16 bg-blueGray-50">
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="relative">
                    <img
                      src="../images/alexander.jpg"
                      className="mt-10 w-40 h-40 rounded-full object-cover"
                      alt=""
                    />
                  </div>
                </div>
                <div className="w-full px-4 text-center mt-20">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-black">
                        22
                      </span>
                      <span className="text-sm text-black">Friends</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-black">
                        10
                      </span>
                      <span className="text-sm text-black">Photos</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-black">
                        89
                      </span>
                      <span className="text-sm text-black">Comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-black">
                  Maskin Maskinsson
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-black font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-black"></i>
                  Stockholm, sweden
                </div>
                <div className="mb-2 text-black mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-black"></i>
                  Solution Manager - Creative Tim Officer
                </div>
                <div className="mb-2 text-black">
                  <i className="fas fa-university mr-2 text-lg text-black"></i>
                  University of Computer Science
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="relative  pt-8 pb-6 mt-8"></footer>
      </section>
    </>
  );
};

export default ProfileSection;
