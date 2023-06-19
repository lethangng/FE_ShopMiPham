import React, { ChangeEvent, useEffect, useState } from "react";
import ChartComponent from "./ChartComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store";
import { loadBillChartPaging } from "store/bills/actions";

const ChartBill = () => {
  const datasets = useSelector((state: AppState) => state.bills.charts);
  const dispatch = useDispatch();
  const now = new Date();
  const [searchKeyword, setSearchKeyword] = useState(
    now.getFullYear().toString()
  );
  const labels = [];
  for (let i = 1; i <= 12; i++) {
    labels.push(i);
  }

  useEffect(() => {
    dispatch(loadBillChartPaging(searchKeyword) as any);
  }, [dispatch]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Số lượng",
        data: datasets,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
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

  const handleKeywordPress = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = () => {
    dispatch(loadBillChartPaging(searchKeyword) as any);
  };
  return (
    <>
      <h1 className="h3 mb-2 text-gray-800">Thống kê hóa đơn</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Thống kê hóa đơn
          </h6>
        </div>
        <div className="header-buttons row">
          <input
            type="number"
            value={searchKeyword}
            onChange={handleKeywordPress}
            className="form-control col mr-1"
            placeholder="Năm"
            min={2000}
          />
          <button
            onClick={handleSearch}
            type="button"
            className="btn btn-outline-primary mr-3"
          >
            <i className="fas fa-search"></i> Tìm kiếm
          </button>
        </div>
      </div>
      <ChartComponent type="bar" data={data} options={options} />
    </>
  );
};

export default ChartBill;
