import React, { ChangeEvent, useEffect, useState } from "react";
import ChartComponent from "./ChartComponent";
import { billService } from "services/bill.service";

const ChartRevenue = () => {
  const now = new Date();
  const [searchKeywordYear, setSearchKeywordYear] = useState(
    now.getFullYear().toString()
  );

  const [searchKeywordMonth, setSearchKeywordMonth] = useState(
    now.getMonth().toString()
  );

  const [inputValue, setInputValue] = useState("year");
  // console.log(inputValue);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const [revenue, setRevenue] = useState([]);

  useEffect(() => {
    const getRevenue = async (
      month: string | number,
      year: string | number
    ) => {
      // console.log(">>> check month:", month, "year:", year);
      const res = await billService.revenueBills(month, year);
      // console.log(">>> check:", res);
      setRevenue(res);
    };

    if (searchKeywordYear || parseInt(searchKeywordYear) >= 0) {
      inputValue === "year"
        ? getRevenue("", searchKeywordYear)
        : getRevenue(searchKeywordMonth, searchKeywordYear);
    }
  }, [inputValue, searchKeywordYear, searchKeywordMonth]);

  const labels = [];
  if (inputValue === "month") {
    for (let i = 1; i <= 4; i++) {
      labels.push(i);
    }
  } else {
    for (let i = 1; i <= 12; i++) {
      labels.push(i);
    }
  }

  const datasets = revenue;

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Tổng",
        data: datasets,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: inputValue === "year" ? "Tháng" : "Tuần",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any, index: any, values: any) {
            if (Number.isInteger(value)) {
              return value;
            }
          },
        },
      },
    },
  };

  const handleKeywordPressYear = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeywordYear(e.target.value);
  };

  const handleKeywordPressMonth = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeywordMonth(e.target.value);
  };

  // const handleSearch = async () => {
  //   const res =
  //     inputValue === "year"
  //       ? await billService.revenueBills("", searchKeywordYear)
  //       : await billService.revenueBills(searchKeywordMonth, searchKeywordYear);
  //   setRevenue(res);
  // };
  return (
    <>
      <h1 className="h3 mb-2 text-gray-800">Thống kê danh thu</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Thống kê doanh thu
          </h6>
          <div className="header-buttons">
            <form className="form-inline">
              <div className="row mr-4">
                <label className="col-auto mr-2">Tìm kiếm theo:</label>
                <div className="col-auto">
                  <div className="row mr-2">
                    <input
                      type="radio"
                      value={"month"}
                      name="search"
                      onChange={handleChangeInput}
                      checked={inputValue === "month"}
                    />
                    <label className="ml-2">Tháng</label>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="row">
                    <input
                      type="radio"
                      value={"year"}
                      name="search"
                      onChange={handleChangeInput}
                      checked={inputValue === "year"}
                    />
                    <label className="ml-2">Năm</label>
                  </div>
                </div>
              </div>
              <div className="col">
                {inputValue === "month" && (
                  <input
                    type="number"
                    value={searchKeywordMonth}
                    onChange={handleKeywordPressMonth}
                    className="form-control col-auto mr-1"
                    placeholder="Tháng"
                    min={1}
                    max={12}
                  />
                )}

                <input
                  type="number"
                  value={searchKeywordYear}
                  onChange={handleKeywordPressYear}
                  className="form-control col-auto mr-1"
                  placeholder="Năm"
                  min={2000}
                  max={now.getFullYear().toString()}
                />
                {/* <button
                  onClick={handleSearch}
                  type="button"
                  className="btn btn-outline-primary"
                >
                  <i className="fas fa-search"></i> Tìm kiếm
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
      <ChartComponent type="line" data={data} options={options} />
    </>
  );
};

export default ChartRevenue;
