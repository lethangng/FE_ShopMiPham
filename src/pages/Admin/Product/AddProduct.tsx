import { UrlConstants } from "constants/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "store";
import { addProduct } from "store/products/action";
import { IAddProductRequest } from "store/products/types";
import { useFormik } from "formik";
import * as Yup from "yup";
import checkNameExist from "helpers/CheckExist/checkName.product";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import "../../../components/UploadForm/UploadForm.css";
import { loadProductTypePaging } from "store/productTypes/action";

interface FormValues {
  name: string;
  description: string;
  listPhoto: File[];
  importPrice: number;
  quantity: number;
  price: number;
  productTypeId: number;
}

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const productTypes = useSelector(
    (state: AppState) => state.productTypes.items
  );

  // console.log(productTypes);

  useEffect(() => {
    dispatch(loadProductTypePaging("", null) as any);
  }, [dispatch]);

  const initialValues: FormValues = {
    name: "",
    description: "",
    listPhoto: [],
    importPrice: 0,
    quantity: 0,
    price: 0,
    productTypeId: 1,
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Vui lòng nhập loại sản phẩm.")
      .test(
        "name-exist",
        "Tên của loại sản phẩm đã tồn tại.",
        async (value) => {
          const isNameExist = await checkNameExist(value);
          return !isNameExist;
        }
      ),
    description: Yup.string().required("Vui lòng nhập miêu tả."),
    importPrice: Yup.number().required("Vui lòng nhập giá nhập sản phẩm."),
    quantity: Yup.number().required("Vui lòng nhập số lượng sản phẩm."),
    price: Yup.number().required("Vui lòng nhập giá bán sản sản phẩm."),
    productTypeId: Yup.number().required("Vui lòng nhập loại sản phẩm."),
    // listPhoto: Yup.mixed()
    //   .required("Vui lòng chọn ảnh.")
    //   .test("fileSize", "Ảnh này quá dài", (value: any) => {
    //     if (value) {
    //       return value.size <= 2000000;
    //     }
    //     return true;
    //   })
    //   .test(
    //     "fileType",
    //     "Vui lòng chọn đúng định dạng ảnh",
    //     (value: any) => value && /image\/(png|jpe?g|gif)/.test(value.type)
    //   ),
  });

  const onSubmit = async (values: FormValues) => {
    // console.log(listImgs);
    const { description, name, importPrice, quantity, price, productTypeId } =
      values;
    const product: IAddProductRequest = {
      name,
      description,
      listPhoto: selectedFiles,
      importPrice,
      quantity,
      price,
      productTypeId,
    };
    // console.log(product);
    await dispatch(addProduct(product) as any);
    navigate(UrlConstants.PRODUCT_LIST);
    toast.success("Thêm sản phẩm thành công!");
  };

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const loading = useSelector<AppState>(
    (state) => state.products.loading
  ) as boolean;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Thêm các hình ảnh mới vào mảng selectedFiles
      setSelectedFiles((prevSelectedFiles) => {
        const newSelectedFiles = prevSelectedFiles
          ? [...prevSelectedFiles]
          : [];
        for (let i = 0; i < files.length; i++) {
          newSelectedFiles.push(files[i]);
        }
        return newSelectedFiles;
      });

      // Tạo các URL của hình ảnh mới để hiển thị trước
      const fileURLs: string[] = [];
      for (let i = 0; i < files.length; i++) {
        fileURLs.push(URL.createObjectURL(files[i]));
      }
      // Kết hợp với các URL của hình ảnh đã chọn trước đó
      setPreviewImages((prevPreviewImages) => [
        ...prevPreviewImages,
        ...fileURLs,
      ]);
    }
  };

  const handleRemoveImage = (index: number) => {
    // Xóa hình ảnh khỏi mảng selectedFiles và previewImages
    setSelectedFiles((prevSelectedFiles) => {
      const newSelectedFiles = prevSelectedFiles ? [...prevSelectedFiles] : [];
      newSelectedFiles.splice(index, 1);
      return newSelectedFiles;
    });

    setPreviewImages((prevPreviewImages) => {
      const newPreviewImages = [...prevPreviewImages];
      newPreviewImages.splice(index, 1);
      return newPreviewImages;
    });
  };

  return (
    <>
      <h1 className="h3 mb-4 text-gray-800">Thêm mới sản phẩm</h1>
      <div className="card">
        <div className="card-header">Thông tin sản phẩm</div>
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Tên sản phẩm</label>
              <input
                type="text"
                className={
                  "form-control" +
                  (formik.touched.name && formik.errors.name
                    ? " is-invalid"
                    : "")
                }
                name="name"
                id="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                // onBlur={formik.handleBlur}
                placeholder="Vui lòng nhập tên của sản phẩm ..."
              />
              {formik.touched.name && formik.errors.name && (
                <div className="invalid-feedback">{formik.errors.name}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="description">Miêu tả</label>
              <input
                type="text"
                className={
                  "form-control" +
                  (formik.touched.description && formik.errors.description
                    ? " is-invalid"
                    : "")
                }
                onChange={formik.handleChange}
                value={formik.values.description}
                name="description"
                id="description"
                placeholder="Vui lòng nhập miêu tả..."
              />
              {formik.touched.description && formik.errors.description && (
                <div className="invalid-feedback">
                  {formik.errors.description}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="listPhoto">Danh sách hình ảnh</label>
              <>
                <div className="form-group">
                  <input
                    type="file"
                    id="image-upload"
                    className={
                      "form-control-file" +
                      (formik.touched.listPhoto && formik.errors.listPhoto
                        ? " is-invalid"
                        : "")
                    }
                    multiple
                    accept="image/*"
                    // value={formik.values.listPhoto}
                    // {...formik.getFieldProps("listPhoto")}
                    onChange={handleFileChange}
                  />
                  {/* {formik.touched.listPhoto && formik.errors.listPhoto && (
                    <div className="invalid-feedback">
                      {formik.errors.listPhoto as string}
                    </div>
                  )} */}
                </div>
                {selectedFiles && (
                  <div className="row">
                    {Array.from(selectedFiles).map((file, index) => (
                      <div className="col-md-3" key={index}>
                        <div className="image-preview">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Image ${index + 1}`}
                            className="img-fluid"
                          />
                          <button
                            type="button"
                            className="close"
                            aria-label="Remove"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            </div>

            <div className="form-group">
              <label htmlFor="description">Giá nhập sản phẩm</label>
              <input
                type="text"
                className={
                  "form-control" +
                  (formik.touched.importPrice && formik.errors.importPrice
                    ? " is-invalid"
                    : "")
                }
                onChange={formik.handleChange}
                value={formik.values.importPrice}
                name="importPrice"
                id="importPrice"
                placeholder="Vui lòng nhập giá nhập sản phẩm..."
              />
              {formik.touched.importPrice && formik.errors.importPrice && (
                <div className="invalid-feedback">
                  {formik.errors.importPrice}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description">Số lượng sản phẩm</label>
              <input
                type="text"
                className={
                  "form-control" +
                  (formik.touched.quantity && formik.errors.quantity
                    ? " is-invalid"
                    : "")
                }
                onChange={formik.handleChange}
                value={formik.values.quantity}
                name="quantity"
                id="quantity"
                placeholder="Vui lòng nhập số lượng sản phẩm..."
              />
              {formik.touched.quantity && formik.errors.quantity && (
                <div className="invalid-feedback">{formik.errors.quantity}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description">Giá bán sản phẩm</label>
              <input
                type="text"
                className={
                  "form-control" +
                  (formik.touched.price && formik.errors.price
                    ? " is-invalid"
                    : "")
                }
                onChange={formik.handleChange}
                value={formik.values.price}
                name="price"
                id="price"
                placeholder="Vui lòng nhập giá bán sản phẩm..."
              />
              {formik.touched.price && formik.errors.price && (
                <div className="invalid-feedback">{formik.errors.price}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="productTypeId">Loại sản phẩm</label>
              <select
                className="form-control"
                id="productTypeId"
                onChange={formik.handleChange}
                value={formik.values.productTypeId}
              >
                {productTypes.map((productType) => {
                  return (
                    <option key={productType.id} value={productType.id}>
                      {productType.name}
                    </option>
                  );
                })}
              </select>
              {formik.touched.productTypeId && formik.errors.productTypeId && (
                <div className="invalid-feedback">
                  {formik.errors.productTypeId}
                </div>
              )}
            </div>

            {/* <div className="form-group">
              <label htmlFor="description">Loại sản phẩm</label>

              <input
                type="text"
                className={
                  "form-control" +
                  (formik.touched.productTypeId && formik.errors.productTypeId
                    ? " is-invalid"
                    : "")
                }
                onChange={formik.handleChange}
                value={formik.values.productTypeId}
                name="productTypeId"
                id="productTypeId"
                placeholder="Vui lòng nhập loại sản phẩm..."
              />
              {formik.touched.productTypeId && formik.errors.productTypeId && (
                <div className="invalid-feedback">
                  {formik.errors.productTypeId}
                </div>
              )}
            </div> */}

            <div className="form-group d-flex justify-content-end">
              <button className="btn btn-primary mr-3" type="submit">
                {loading && (
                  <span className="spinner-boder spinner-boder-sm mr-1"></span>
                )}{" "}
                Lưu
              </button>
              <Link className="btn btn-danger" to={UrlConstants.PRODUCT_LIST}>
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
