import React, { useState, useEffect } from "react";

function Home() {
  const [inputAnggota, setInputAnggota] = useState("");
  const [inputNoKel, setNoKel] = useState(1);
  const [inputMaxAng, setMaxAng] = useState(1);
  const [inputJumAng, setJumAng] = useState(1);
  const [dataAnggota, setDataAnggota] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const [shuffledDataAnggota, setShuffledDataAnggota] = useState([]);
  const [dataKelompok, setDataKelompok] = useState([]);

  // function shuffleArray(array) {
  //   const shuffledArray = [...array];
  //   for (let i = shuffledArray.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [shuffledArray[i], shuffledArray[j]] = [
  //       shuffledArray[j],
  //       shuffledArray[i],
  //     ];
  //   }
  //   return shuffledArray;
  // }

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

  const handleStartClick = () => {
    const shuffledData = shuffleArray(dataAnggota);

    const trueData = shuffledData.filter((item) => item.status === true);
    const falseData = shuffledData.filter((item) => item.status === false);

    const groups = [];

    if (trueData.length > 0) {
      groups.push(trueData);
    }

    let currentIndex = 0;

    falseData.forEach((item) => {
      if (groups[currentIndex] && groups[currentIndex].length < inputMaxAng) {
        groups[currentIndex].push(item);
      } else {
        currentIndex = (currentIndex + 1) % inputNoKel;
        if (!groups[currentIndex]) {
          groups[currentIndex] = [];
        }
        groups[currentIndex].push(item);
      }
    });

    setDataKelompok(groups);
    setShowResults(true);
  };

  console.log(dataKelompok);

  // const handleStartClick = () => {
  //   const groups = [];
  //   for (let i = 0; i < inputNoKel; i++) {
  //     groups.push(
  //       shuffledDataAnggota.slice(i * inputMaxAng, (i + 1) * inputMaxAng)
  //     );
  //   }
  //   setDataKelompok(groups);
  //   setShowResults(true);
  // };

  // const nokel = Array.from({ length: inputNoKel }, (_, index) => index + 1);

  useEffect(() => {
    const myData = JSON.parse(localStorage.getItem("myData"));
    if (myData) {
      setDataAnggota(myData);
      setShuffledDataAnggota(shuffleArray(myData));
    }
  }, []);

  useEffect(() => {
    setJumAng(dataAnggota.length);
    // setNoKel(2);
  }, [dataAnggota, inputNoKel, inputMaxAng]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name: inputAnggota, status: false };
    addData(data);
    setInputAnggota("");
  };

  const addData = (data) => {
    const updatedArray = [...dataAnggota, data];
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
        <div className="block w-[30rem] h-[35rem] p-6  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800  ">
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
              className="w-full h-[24rem] overflow-y-auto scrollbar"
              id="style-1"
            >
              {dataAnggota.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-300 dark:bg-gray-200 rounded-lg w-full py-2.5 px-4 mb-2 flex items-center justify-between"
                >
                  <p className=" text-gray-900 break-words dark:text-gray-400">
                    {item.name}
                  </p>
                  <button
                    onClick={() => removeData(index)}
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-red-600 dark:hover:bg-ref-700 dark:focus:ring-red-800"
                  >
                    -
                  </button>
                </div>
              ))}
            </div>
          </form>
        </div>
        {/* End Inputs */}

        {/* Start Controller */}
        <div className="block max-w-sm h-[25rem] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800  ">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Controller
          </h5>
          <div className="flex items-center">
            <h3 className="mr-8">Total Anggota :</h3>
            <input
              type="number"
              id="visitors"
              value={inputJumAng}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue >= 0 && inputValue <= dataAnggota.length) {
                  setJumAng(inputValue);
                }
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
            <h3 className="ml-1">/{dataAnggota.length}</h3>
          </div>
          <div className="flex items-center mt-4">
            <h3 className="mr-">Nomor Kelompok :</h3>
            <input
              type="number"
              id="visitors"
              value={inputNoKel}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue >= 0 && inputValue <= dataAnggota.length) {
                  setNoKel(inputValue);
                  let me = Math.ceil(dataAnggota.length / inputValue);
                  setMaxAng(me);

                  setShowResults(false);
                }
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>
          <div className="flex items-center mt-4">
            <h3 className="mr-9">Max Anggota :</h3>
            <h3 className="mr-9">Max Anggota :</h3>
            <input
              type="number"
              id="visitors"
              value={inputMaxAng}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue >= 0 && inputValue <= dataAnggota.length) {
                  setMaxAng(inputValue);
                  let me2 = Math.ceil(dataAnggota.length / inputValue);
                  console.log(me2);
                  setNoKel(me2);
                }
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>
          <button
            type="submit"
            onClick={() => handleStartClick()}
            className="text-white w-full mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Mulai
          </button>
        </div>
        {/* End Controller */}

        {/* Start Results */}
        <div className="block w-[30rem] h-[35rem] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800  ">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Results
          </h5>

          <div className="grid sm:grid-cols-2">
            {/* {nokel.map((no, index) => ( */}
            {dataKelompok.map((group, index) => (
              <div
                key={index}
                className="border-2 rounded  border-gray-300 m-2"
              >
                <h1 className="bg-gray-300 pl-3">Team {index + 1}</h1>
                <div className="p-3 text-black dark:text-white ">
                  {showResults && (
                    <div>
                      {group.map((member, memberIndex) => (
                        <p key={memberIndex}>{member.name}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* End Results */}
      </div>
    </div>
  );
}

export default Home;
