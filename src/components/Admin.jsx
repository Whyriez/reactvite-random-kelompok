import React, { useState, useEffect } from "react";

function Admin() {
  const [dataAnggota, setDataAnggota] = useState([]);
  const [inputAnggota, setInputAnggota] = useState("");

  const [shuffledDataAnggota, setShuffledDataAnggota] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name: inputAnggota, status: false };
    addData(data);
    setInputAnggota("");
  };

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  useEffect(() => {
    const myData = JSON.parse(localStorage.getItem("myData"));
    if (myData) {
      setDataAnggota(myData);
      setShuffledDataAnggota(shuffleArray(myData));
    }
  }, []);

  const addData = (data) => {
    const updatedArray = [...dataAnggota, data];
    setDataAnggota(updatedArray);
    localStorage.setItem("myData", JSON.stringify(updatedArray));
  };

  const updateFixStatus = (index) => {
    const updatedArray = [...dataAnggota];
    updatedArray[index].status = !updatedArray[index].status; // Toggle status
    setDataAnggota(updatedArray);
    localStorage.setItem("myData", JSON.stringify(updatedArray));
  };

  const removeData = (index) => {
    const updatedArray = [...dataAnggota];
    updatedArray.splice(index, 1);
    setDataAnggota(updatedArray);
    localStorage.setItem("myData", JSON.stringify(updatedArray));
  };

  return (
    <div>
      <div className="md:block lg:flex xl-flex sm:block space-x-6">
        {/* Start Inputs */}
        <div className="block w-[30rem] h-[35rem] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800  ">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Inputs
          </h5>
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="name"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Add
            </label>
            <div className="relative">
              <input type="hidden" name="id" id="id" />
              <input
                type="text"
                id="name"
                name="name"
                value={inputAnggota}
                onChange={(e) => setInputAnggota(e.target.value)}
                className="block w-full p-3 pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Input Anggota"
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                +
              </button>
            </div>
            <hr className="w-full h-1 mx-auto my-3 bg-gray-400 border-0 rounded md:my-3 dark:bg-gray-700" />
            <div
              className="w-full h-[24.5rem] overflow-y-auto scrollbar"
              id="style-1"
            >
              {dataAnggota.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-300 dark:bg-gray-200 rounded-lg w-full py-2.5 px-4 mb-2 flex items-center justify-between"
                >
                  <p className="text-gray-900 break-words dark:text-gray-400">
                    {item.name}
                  </p>
                  <div>
                    <button
                      onClick={() => updateFixStatus(index)}
                      className={`text-white mr-3 ${
                        item.status ? "bg-blue-700" : "bg-red-700"
                      } hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 dark:${
                        item.status ? "bg-blue-600" : "bg-red-600"
                      } dark:hover:bg-ref-700 dark:focus:ring-blue-800`}
                    >
                      {item.status ? "True" : "False"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>
        {/* End Inputs */}

        {/* Start Results */}
        <div className="block w-[30rem] h-[35rem] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800  ">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Results
          </h5>
        </div>
        {/* End Results */}
      </div>
    </div>
  );
}

export default Admin;
