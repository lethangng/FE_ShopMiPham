import React, { ChangeEvent, useEffect, useState } from "react";
import ChartComponent from "./ChartComponent";
import { productService } from "services/product.service";

const ChartTop10Product = () => {
  const now = new Date();
  const [searchKeywordYear, setSearchKeywordYear] = useState(
    now.getFullYear().toString()
  );

  const [searchKeywordMonth, setSearchKeywordMonth] = useState(
    now.getMonth().toString()
  );

  const [products, setProducts] = useState<
    { productId: number; name: string; count: number }[] | []
  >([]);

  useEffect(() => {
    const getProduct = async (
      month: string | number,
      year: string | number
    ) => {
      const res = await productService.getTop10Product(month, year);
      setProducts(res);
    };
    getProduct(searchKeywordMonth, searchKeywordYear);
  }, []);

  // Cắt chuỗi chỉ để lại số ký tự cần thiết
  function truncateString(str: string, maxLength: number = 20) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength - 3) + "...";
    } else {
      return str;
    }
  }
  const labels = products?.map((product) => {
    return truncateString(product.name, 20);
  });

  const datasets = products?.map((product) => {
    return product.count;
  });

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
      x: {
        title: {
          display: true,
          text: "Tên sản phẩm",
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

  const handleSearch = async () => {
    const res = await productService.getTop10Product(
      searchKeywordMonth,
      searchKeywordYear
    );
    setProducts(res);
  };
  return (
    <>
      <h1 className="h3 mb-2 text-gray-800">Thống kê top sản phẩm</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Thống kê top 10 sản phẩm bán chạy của tháng
          </h6>
        </div>
        <div className="header-buttons row">
          <input
            type="number"
            value={searchKeywordMonth}
            onChange={handleKeywordPressMonth}
            className="form-control col mr-1"
            placeholder="Tháng"
            min={1}
            max={12}
          />
          <input
            type="number"
            value={searchKeywordYear}
            onChange={handleKeywordPressYear}
            className="form-control col mr-1"
            placeholder="Năm"
            min={2000}
            max={now.getFullYear().toString()}
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

export default ChartTop10Product;
